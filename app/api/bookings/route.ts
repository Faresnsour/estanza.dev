import { NextResponse } from 'next/server';

type BookingRequest = {
  name?: string;
  email?: string;
  challenge?: string;
  date?: string;
  time?: string;
  timeZone?: string;
};

const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    submissionLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const notificationEmail = process.env.BOOKING_NOTIFICATION_EMAIL ?? 'hello@estanza.dev';

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured. Add the Resend environment variables.' },
      { status: 503 },
    );
  }

  let body: BookingRequest;
  try {
    body = (await request.json()) as BookingRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid booking request.' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const date = body.date?.trim();
  const time = body.time?.trim();
  const timeZone = body.timeZone?.trim() || 'Local time';
  const challenge = body.challenge?.trim() ?? '';

  if (!name || !email || !date || !time || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid name, email, date, and time.' }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDate = escapeHtml(date);
  const safeTime = escapeHtml(time);
  const safeChallenge = escapeHtml(challenge || 'Not provided');
  const safeTimeZone = escapeHtml(timeZone);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      bcc: [notificationEmail],
      reply_to: notificationEmail,
      subject: 'Your Estanza discovery call is confirmed',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#131b2e">
          <h1 style="color:#2563eb">Your call is confirmed</h1>
          <p>Hi ${safeName},</p>
          <p>Thanks for booking an Estanza discovery call. We will review your lead flow and show you how to automate the first call and booking.</p>
          <div style="background:#f2f3ff;padding:20px;border-radius:12px">
            <p><strong>Date:</strong> ${safeDate}</p>
            <p><strong>Time:</strong> ${safeTime} (${safeTimeZone})</p>
            <p><strong>Duration:</strong> 15 minutes</p>
          </div>
          <p><strong>Contact email:</strong> ${safeEmail}</p>
          <p><strong>Lead response challenge:</strong> ${safeChallenge}</p>
          <p>We will send the meeting details to this email address before the call.</p>
          <p style="color:#64748b;font-size:13px">Estanza · AI voice agents for faster lead response</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Resend booking email failed:', response.status, errorBody);
    return NextResponse.json({ error: 'We could not send the confirmation email. Please try again.' }, { status: 502 });
  }

  console.info('New Estanza booking:', { name, email, date, time, timeZone, challenge });
  return NextResponse.json({ success: true });
}
