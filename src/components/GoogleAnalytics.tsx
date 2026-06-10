"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_ACCEPTED_EVENT,
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

function setDefaultConsentDenied(): void {
  ensureGtagStub();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

function grantConsentAndConfigure(): void {
  ensureGtagStub();
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setDefaultConsentDenied();

    const enableAnalytics = () => {
      setEnabled(true);
    };

    if (localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted") {
      enableAnalytics();
    }

    window.addEventListener(CONSENT_ACCEPTED_EVENT, enableAnalytics);
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, enableAnalytics);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="google-analytics-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={grantConsentAndConfigure}
      />
    </>
  );
}
