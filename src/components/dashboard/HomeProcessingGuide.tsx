"use client";

import { BookOpen, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const STEPS = ["upload", "process", "download"] as const;

export function HomeProcessingGuide() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px] sm:p-8"
            role="presentation"
            onClick={close}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="flex max-h-[min(92vh,44rem)] w-full max-w-3xl flex-col overflow-hidden rounded-none border border-border bg-card shadow-[var(--shadow-float)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
                <div className="min-w-0 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {t("home.guideEyebrow")}
                  </p>
                  <h2
                    id={titleId}
                    className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
                  >
                    {t("home.processingSteps.title")}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">
                    {t("home.processingSteps.intro")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-border bg-background text-muted transition-colors hover:border-muted hover:text-foreground"
                  aria-label={t("home.guideClose")}
                >
                  <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                <ol className="space-y-8">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex gap-4 sm:gap-5">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-border bg-background font-mono text-sm text-foreground"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 space-y-2">
                        <h3 className="font-label text-lg text-foreground sm:text-xl">
                          {t(`home.processingSteps.${step}.label`)}
                        </h3>
                        <p className="text-base leading-relaxed text-foreground sm:text-[1.0625rem] sm:leading-8">
                          {t(`home.processingSteps.${step}.detail`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="shrink-0 border-t border-border px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={close}
                  className="min-h-11 w-full rounded-none border border-border bg-background px-4 font-label text-sm text-foreground transition-colors hover:border-muted sm:w-auto sm:min-w-36"
                >
                  {t("home.guideClose")}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-8 items-center gap-2 rounded-md bg-foreground/[0.06] px-2.5 font-label text-[0.625rem] uppercase tracking-[0.06em] text-foreground/85 transition-colors hover:bg-foreground/[0.1] hover:text-foreground"
      >
        <BookOpen className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden />
        {t("home.guideButton")}
      </button>
      {modal}
    </>
  );
}
