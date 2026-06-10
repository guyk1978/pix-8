"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  CONSENT_ACCEPTED_EVENT,
  GA_MEASUREMENT_ID,
  hasAnalyticsConsent,
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
  if (!GA_MEASUREMENT_ID) return;

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

function applyConsentIfGranted(): void {
  if (hasAnalyticsConsent()) {
    grantConsentAndConfigure();
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    setDefaultConsentDenied();
    applyConsentIfGranted();

    const handleConsentAccepted = () => {
      grantConsentAndConfigure();
    };

    window.addEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <Script
      id="google-analytics-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={applyConsentIfGranted}
    />
  );
}
