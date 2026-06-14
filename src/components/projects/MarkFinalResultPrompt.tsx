"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface MarkFinalResultPromptProps {
  open: boolean;
  onClose: () => void;
}

export function MarkFinalResultPrompt({
  open,
  onClose,
}: MarkFinalResultPromptProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="mark-final-prompt-title"
        className="borderless-float w-full max-w-md rounded-xl bg-card p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="mark-final-prompt-title" className="font-label text-foreground">
          {t("projects.markFinalRequiredTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t("projects.markFinalRequiredHint")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="borderless-interactive mt-5 min-h-10 w-full rounded-lg bg-accent-muted px-4 py-2 font-label text-accent shadow-[var(--shadow-elevated)] transition-colors hover:bg-accent/20 hover:shadow-[var(--shadow-hover)]"
        >
          {t("projects.markFinalRequiredDismiss")}
        </button>
      </div>
    </div>
  );
}
