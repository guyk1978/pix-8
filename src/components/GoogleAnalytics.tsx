"use client";

import { useEffect } from "react";
import {
  CONSENT_ACCEPTED_EVENT,
  GA_MEASUREMENT_ID,
  hasAnalyticsConsent,
} from "@/lib/consent";
import { getGoogleAnalyticsConfigOptions } from "@/lib/googleAnalyticsScripts";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function activateGoogleAnalytics(): void {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, getGoogleAnalyticsConfigOptions());
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      activateGoogleAnalytics();
    }

    const handleConsentAccepted = () => {
      activateGoogleAnalytics();
    };

    window.addEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);
    };
  }, []);

  return null;
}
