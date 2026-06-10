export const CONSENT_STORAGE_KEY = "pix8-cookie-consent";
export const CONSENT_ACCEPTED_EVENT = "consent-accepted";
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-47MX2VE4YM";

export type ConsentStatus = "accepted" | "declined";

export function getConsentStatus(): ConsentStatus | null {
  if (typeof window === "undefined") return null;

  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function setConsentStatus(status: ConsentStatus): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, status);

  if (status === "accepted") {
    window.dispatchEvent(new Event(CONSENT_ACCEPTED_EVENT));
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === "accepted";
}
