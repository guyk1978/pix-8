import { GA_MEASUREMENT_ID } from "@/lib/consent";

export function getGoogleAnalyticsConsentInlineScript(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});
`.trim();
}

export function getGoogleAnalyticsScriptSrc(): string | null {
  if (!GA_MEASUREMENT_ID) return null;
  return `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
}

export function isGoogleAnalyticsDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;

  if (new URLSearchParams(window.location.search).has("ga_debug")) {
    return true;
  }

  try {
    return localStorage.getItem("pix8-ga-debug") === "1";
  } catch {
    return false;
  }
}

export function getGoogleAnalyticsConfigOptions(): Record<string, unknown> {
  return {
    anonymize_ip: true,
    ...(isGoogleAnalyticsDebugEnabled() ? { debug_mode: true } : {}),
  };
}
