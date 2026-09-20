/**
 * Canonical consent copy for the demo-call flow, keyed by version.
 *
 * IMPORTANT: I was not given the client-side form component, so the "v1"
 * text below is a PLACEHOLDER, not the real copy the user currently sees.
 * Replace it with your actual, currently-displayed consent checkbox text
 * verbatim before shipping this -- the whole point of centralizing it here
 * is so the logged `consentTextVersion` always matches what a real person
 * actually saw and agreed to. If wording ever changes, bump the version key
 * (e.g. "v2") and add a new entry rather than editing "v1" in place, so
 * historical consent records stay attributable to the exact text that was
 * shown at the time.
 */
export const CONSENT_TEXT_VERSIONS = {
  v1: "PLACEHOLDER -- replace with the exact, currently-live consent checkbox copy from the demo-call form before shipping.",
} as const;

export type ConsentTextVersion = keyof typeof CONSENT_TEXT_VERSIONS;

export const CURRENT_CONSENT_TEXT_VERSION: ConsentTextVersion = "v1";

export function getConsentText(version: ConsentTextVersion): string {
  return CONSENT_TEXT_VERSIONS[version];
}