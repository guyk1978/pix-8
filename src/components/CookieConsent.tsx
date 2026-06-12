"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  getConsentStatus,
  setConsentStatus,
  type ConsentStatus,
} from "@/lib/consent";

export function CookieConsent() {
  const { t } = useLanguage();
  const [consent, setConsent] = useState<ConsentStatus | null | "pending">(
    "pending",
  );
  const [isOverlayActive, setIsOverlayActive] = useState(true);

  useEffect(() => {
    const status = getConsentStatus();
    setConsent(status);
    setIsOverlayActive(status !== "accepted");
  }, []);

  const hasDeclined = consent === "declined";
  const showBanner = consent !== "accepted" && consent !== "declined";

  useEffect(() => {
    if (!isOverlayActive) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOverlayActive]);

  const handleAccept = () => {
    setConsentStatus("accepted");
    setConsent("accepted");
    setIsOverlayActive(false);
  };

  const handleDecline = () => {
    setConsentStatus("declined");
    setConsent("declined");
    setIsOverlayActive(true);
  };

  if (!isOverlayActive) return null;

  return (
    <>
      <div
        className="cookie-consent-overlay fixed inset-0 z-[9999] bg-neutral-950/90 backdrop-blur-[8px] pointer-events-auto"
        aria-hidden="false"
      />

      {hasDeclined ? (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
          role="dialog"
          aria-labelledby="cookie-denied-title"
          aria-describedby="cookie-denied-description"
        >
          <div className="glass-panel pointer-events-auto mx-auto w-full max-w-md space-y-5 rounded-sm p-6 text-center sm:p-8">
            <p
              id="cookie-denied-title"
              className="font-label text-lg text-foreground"
            >
              {t("cookie.deniedTitle")}
            </p>
            <p
              id="cookie-denied-description"
              className="text-sm leading-relaxed text-muted"
            >
              {t("cookie.denied")}
            </p>
            <button
              type="button"
              onClick={handleAccept}
              className="min-h-11 w-full rounded-sm bg-accent-muted px-5 py-3 font-label text-sm text-accent transition-colors hover:bg-accent/20"
            >
              {t("cookie.accept")}
            </button>
          </div>
        </div>
      ) : showBanner ? (
        <div
          className="fixed inset-x-0 bottom-0 z-[10000] p-4 sm:p-5 pointer-events-none"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="glass-panel pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-sm p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0 space-y-2">
              <p id="cookie-consent-title" className="font-label text-foreground">
                {t("cookie.title")}
              </p>
              <p
                id="cookie-consent-description"
                className="text-sm leading-relaxed text-muted"
              >
                {t("cookie.description")}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleDecline}
                className="min-h-10 rounded-sm bg-background/80 px-4 py-2.5 font-label text-sm text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-surface"
              >
                {t("cookie.decline")}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="min-h-10 rounded-sm bg-accent-muted px-4 py-2.5 font-label text-sm text-accent transition-colors hover:bg-accent/20"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
