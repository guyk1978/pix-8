"use client";

import { useEffect, useState } from "react";
import { getConsentStatus, setConsentStatus } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsentStatus() === null);
  }, []);

  const handleAccept = () => {
    setConsentStatus("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus("declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="glass-panel mx-auto flex max-w-3xl flex-col gap-4 rounded-sm border border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0 space-y-2">
          <p id="cookie-consent-title" className="font-label text-foreground">
            Cookie preferences
          </p>
          <p
            id="cookie-consent-description"
            className="text-sm leading-relaxed text-muted"
          >
            We use optional analytics cookies to understand how the site is used.
            Image processing always stays in your browser — your files are never
            uploaded. Accept to enable Google Analytics; decline to continue
            without tracking.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleDecline}
            className="min-h-10 rounded-sm border border-border bg-background px-4 py-2.5 font-label text-sm text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="min-h-10 rounded-sm border border-border bg-accent-muted px-4 py-2.5 font-label text-sm text-accent transition-colors hover:bg-accent/20"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
