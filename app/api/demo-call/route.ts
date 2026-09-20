import { createHash, randomUUID } from "crypto";
import { Redis } from "@upstash/redis";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { NextResponse } from "next/server";
import { z } from "zod";

import { CURRENT_CONSENT_TEXT_VERSION } from "@/lib/demo-consent-text";

const PHONE_WINDOW_SECONDS = 60 * 60 * 24;
const IP_WINDOW_SECONDS = 60 * 60 * 24;
const IP_LIMIT = 2;
const GLOBAL_LIMIT = 8;
const UPSTREAM_TIMEOUT_MS = 8000;
const VAPI_MAX_DURATION_SECONDS = 120;

// Requires the `u` flag for \p{...} Unicode property escapes. Starts with a
// letter/mark, then up to 39 more letters/marks/apostrophes/hyphens/spaces.
// This value is injected into a live voice prompt via {{name}}, so it must
// never contain digits, punctuation beyond ' and -, or control characters.
const FIRST_NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' -]{0,39}$/u;

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(40).regex(FIRST_NAME_PATTERN),
  phone: z.string().min(1).max(32),
  consent: z.literal(true),
  turnstileToken: z.string().min(1),
});

type DemoJson = {
  status:
    | "calling"
    | "invalid"
    | "unsupported_region"
    | "rate_limited"
    | "at_capacity"
    | "unavailable"
    | "error";
  field?: "firstName" | "phone" | "consent" | "turnstile";
  message?: string;
};

type ConsentStatus = "pending" | "called" | "failed";

type ConsentRecord = {
  timestamp: string;
  ip: string;
  userAgent: string | null;
  consentTextVersion: string;
  phone: string;
  status: ConsentStatus;
  vapiCallId: string | null;
};

type Reservation = {
  phoneKey?: string;
  ipKey?: string;
  globalKey?: string;
};

function json(status: number, body: DemoJson) {
  return NextResponse.json(body, { status });
}

/**
 * Resolves the caller's IP from whichever edge proxy sits in front of this
 * deployment. Checked in order of trust: Cloudflare (if the domain is
 * proxied through it) > Vercel's x-forwarded-for > x-real-ip. Assumption:
 * this deployment may sit behind Cloudflare in front of Vercel; if that's
 * wrong for your setup, tell me and I'll drop the header you don't use.
 */
function clientIp(request: Request): string | undefined {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  const real = request.headers.get("x-real-ip")?.trim();
  return real || undefined;
}

function secondsUntilUtcMidnight(): number {
  const now = new Date();
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );
  return Math.max(1, Math.ceil((next - now.getTime()) / 1000));
}

function hashPhone(e164: string): string {
  return createHash("sha256").update(e164).digest("hex");
}

function toUsCaE164(input: string): string | null {
  const parsed = parsePhoneNumberFromString(input, "US");
  if (!parsed?.isValid()) return null;
  if (parsed.country !== "US" && parsed.country !== "CA") return null;
  return parsed.number;
}

function envReady(): boolean {
  return Boolean(
    process.env.VAPI_PRIVATE_KEY &&
      process.env.VAPI_ASSISTANT_ID &&
      process.env.VAPI_PHONE_NUMBER_ID &&
      process.env.TURNSTILE_SECRET_KEY &&
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const payload = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY!,
    response: token,
  });
  if (ip) payload.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: payload,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    }
  );

  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

async function isOptedOut(redis: Redis, phoneHash: string): Promise<boolean> {
  const value = await redis.get(`demo:optout:${phoneHash}`);
  return value !== null && value !== undefined;
}

/**
 * Atomically increments a counter and, only on its first increment, sets its
 * TTL -- both inside one Lua script so the two steps can never be split by a
 * crash or an interleaved request the way a bare INCR followed by a separate
 * EXPIRE call could be (those are two independent HTTP round trips on
 * Upstash, not one atomic step).
 */
const INCR_WITH_TTL_SCRIPT = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return current
`;

async function reserveCounter(
  redis: Redis,
  key: string,
  ttlSeconds: number
): Promise<number> {
  return redis.eval<[number], number>(
    INCR_WITH_TTL_SCRIPT,
    [key],
    [ttlSeconds]
  );
}

/** SET NX EX in one command: reserves the key only if nothing else holds it. */
async function reservePhoneSlot(
  redis: Redis,
  phoneKey: string
): Promise<boolean> {
  const result = await redis.set(phoneKey, "1", {
    nx: true,
    ex: PHONE_WINDOW_SECONDS,
  });
  return result === "OK";
}

/**
 * Releases only the reservations this request itself made. The phone key is
 * a one-shot lock, so it's deleted outright; the IP/global keys are shared
 * counters, so this request's own increment is undone with DECR rather than
 * deleting the key outright (which would wipe out other callers' legitimate
 * reservations). Every release is independently best-effort: a failure here
 * must never mask the real error response going back to the caller.
 */
async function releaseReservation(
  redis: Redis,
  reserved: Reservation
): Promise<void> {
  const releases: Promise<unknown>[] = [];

  if (reserved.phoneKey) {
    const phoneKey = reserved.phoneKey;
    releases.push(
      redis.del(phoneKey).catch((err) => {
        console.error("demo-call: failed to release phone reservation", err);
      })
    );
  }
  if (reserved.ipKey) {
    const ipKey = reserved.ipKey;
    releases.push(
      redis.decr(ipKey).catch((err) => {
        console.error("demo-call: failed to release ip reservation", err);
      })
    );
  }
  if (reserved.globalKey) {
    const globalKey = reserved.globalKey;
    releases.push(
      redis.decr(globalKey).catch((err) => {
        console.error("demo-call: failed to release global reservation", err);
      })
    );
  }

  await Promise.all(releases);
}

async function writeConsentRecord(
  redis: Redis,
  record: ConsentRecord
): Promise<string> {
  const id = randomUUID();
  await redis.set(`demo:consent:record:${id}`, record);
  await redis.lpush("demo:consent:log", id);
  return id;
}

async function updateConsentRecord(
  redis: Redis,
  id: string,
  patch: Partial<Pick<ConsentRecord, "status" | "vapiCallId">>
): Promise<void> {
  try {
    const key = `demo:consent:record:${id}`;
    const existing = await redis.get<ConsentRecord>(key);
    if (!existing) return;
    await redis.set(key, { ...existing, ...patch });
  } catch (err) {
    // The call has already been placed (or already failed) by this point;
    // a failure to update the audit record must not fail the response.
    console.error("demo-call: failed to update consent record", err);
  }
}

function redactPhone(text: string, e164: string): string {
  return text.split(e164).join("[redacted]");
}

/**
 * Vapi returns a 400 (worded a couple of different ways) when the account's
 * daily outbound-call cap is hit; we want to surface that the same way we
 * surface the 429 concurrency limit, rather than as a generic 502 error.
 */
function isDailyOutboundLimitMessage(message: unknown): boolean {
  const text = Array.isArray(message) ? message.join(" ") : message;
  return typeof text === "string" && text.includes("Daily Outbound Limit");
}

export async function POST(request: Request) {
  if (process.env.DEMO_ENABLED !== "true") {
    return json(503, { status: "unavailable" });
  }

  if (!envReady()) {
    return json(503, { status: "unavailable" });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(400, { status: "invalid", field: "phone" });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue?.path[0];
    const field =
      path === "firstName" ||
      path === "phone" ||
      path === "consent" ||
      path === "turnstileToken"
        ? path === "turnstileToken"
          ? "turnstile"
          : path
        : "phone";
    return json(400, { status: "invalid", field });
  }

  const { firstName, phone, turnstileToken } = parsed.data;

  const detectedIp = clientIp(request);
  if (!detectedIp && process.env.NODE_ENV === "production") {
    return json(503, { status: "unavailable" });
  }
  const ip = detectedIp ?? "127.0.0.1";

  try {
    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      return json(400, { status: "invalid", field: "turnstile" });
    }
  } catch {
    return json(503, { status: "unavailable" });
  }

  const e164 = toUsCaE164(phone);
  if (!e164) {
    return json(422, { status: "unsupported_region" });
  }
  const phoneHash = hashPhone(e164);

  let redis: Redis;
  try {
    redis = Redis.fromEnv();
  } catch {
    return json(503, { status: "unavailable" });
  }

  try {
    if (await isOptedOut(redis, phoneHash)) {
      return json(429, { status: "rate_limited" });
    }
  } catch {
    return json(503, { status: "unavailable" });
  }

  const phoneKey = `demo:rl:phone:${phoneHash}`;
  const ipKey = `demo:rl:ip:${ip}`;
  const day = new Date().toISOString().slice(0, 10);
  const globalKey = `demo:rl:global:${day}`;

  const reserved: Reservation = {};
  try {
    const phoneReserved = await reservePhoneSlot(redis, phoneKey);
    if (!phoneReserved) {
      return json(429, { status: "rate_limited" });
    }
    reserved.phoneKey = phoneKey;

    const ipCount = await reserveCounter(redis, ipKey, IP_WINDOW_SECONDS);
    reserved.ipKey = ipKey;
    if (ipCount > IP_LIMIT) {
      await releaseReservation(redis, reserved);
      return json(429, { status: "rate_limited" });
    }

    const globalCount = await reserveCounter(
      redis,
      globalKey,
      secondsUntilUtcMidnight()
    );
    reserved.globalKey = globalKey;
    if (globalCount > GLOBAL_LIMIT) {
      await releaseReservation(redis, reserved);
      return json(429, { status: "rate_limited" });
    }
  } catch {
    await releaseReservation(redis, reserved);
    return json(503, { status: "unavailable" });
  }

  let recordId: string;
  try {
    recordId = await writeConsentRecord(redis, {
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
      consentTextVersion: CURRENT_CONSENT_TEXT_VERSION,
      phone: e164,
      status: "pending",
      vapiCallId: null,
    });
  } catch (err) {
    console.error("demo-call: failed to write consent record", err);
    await releaseReservation(redis, reserved);
    return json(503, { status: "unavailable" });
  }

  let vapiCallId: string | undefined;
  try {
    const vapiResponse = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: process.env.VAPI_ASSISTANT_ID,
        phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
        customer: {
          number: e164,
          name: firstName,
        },
        assistantOverrides: {
          variableValues: {
            name: firstName,
          },
          maxDurationSeconds: VAPI_MAX_DURATION_SECONDS,
        },
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (vapiResponse.status === 429) {
      await releaseReservation(redis, reserved);
      await updateConsentRecord(redis, recordId, { status: "failed" });
      return json(503, { status: "at_capacity" });
    }

    if (!vapiResponse.ok) {
      const bodyText = await vapiResponse.text();
      let parsedBody: unknown = undefined;
      try {
        parsedBody = JSON.parse(bodyText);
      } catch {
        // Vapi didn't return JSON; fall through with parsedBody undefined.
      }
      const message =
        parsedBody && typeof parsedBody === "object" && "message" in parsedBody
          ? (parsedBody as { message?: unknown }).message
          : undefined;

      if (
        vapiResponse.status === 400 &&
        isDailyOutboundLimitMessage(message)
      ) {
        await releaseReservation(redis, reserved);
        await updateConsentRecord(redis, recordId, { status: "failed" });
        return json(503, { status: "at_capacity" });
      }

      console.error(
        "demo-call: vapi call creation failed",
        vapiResponse.status,
        redactPhone(bodyText, e164)
      );
      await releaseReservation(redis, reserved);
      await updateConsentRecord(redis, recordId, { status: "failed" });
      return json(502, { status: "error" });
    }

    const vapiBody = (await vapiResponse.json()) as { id?: string };
    vapiCallId = vapiBody.id;
  } catch (err) {
    console.error("demo-call: vapi request threw", err);
    await releaseReservation(redis, reserved);
    await updateConsentRecord(redis, recordId, { status: "failed" });
    return json(502, { status: "error" });
  }

  await updateConsentRecord(redis, recordId, {
    status: "called",
    vapiCallId: vapiCallId ?? null,
  });

  return json(200, { status: "calling" });
}