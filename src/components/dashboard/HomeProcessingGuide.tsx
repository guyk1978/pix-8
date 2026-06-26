"use client";

import { BookOpen, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const STEPS = ["upload", "process", "download"] as const;

export function HomeProcessingGuide({
  variant = "default",
}: {
  variant?: "default" | "toolbar-menu";
}) {
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
            className="home-guide-overlay fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6"
            role="presentation"
            onClick={close}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="home-guide-dialog flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_24px_64px_color-mix(in_srgb,var(--foreground)_14%,transparent)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
                <div className="min-w-0 space-y-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {t("home.guideEyebrow")}
                  </p>
                  <h2
                    id={titleId}
                    className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                  >
                    {t("home.processingSteps.title")}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-muted">
                    {t("home.processingSteps.intro")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background/80 text-muted transition-colors hover:border-muted hover:bg-background hover:text-foreground"
                  aria-label={t("home.guideClose")}
                >
                  <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <div className="px-5 py-4 sm:px-6">
                <ol className="space-y-4">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex gap-3 sm:gap-3.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background font-mono text-xs font-medium text-foreground"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 space-y-1">
                        <h3 className="font-label text-sm font-semibold text-foreground">
                          {t(`home.processingSteps.${step}.label`)}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted">
                          {t(`home.processingSteps.${step}.detail`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="shrink-0 border-t border-border/70 px-5 py-3.5 sm:px-6">
                <button
                  type="button"
                  onClick={close}
                  className="min-h-10 w-full rounded-xl border border-border/80 bg-background px-4 font-label text-sm text-foreground transition-colors hover:border-muted hover:bg-card sm:w-auto sm:min-w-32"
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
        className={
          variant === "toolbar-menu"
            ? "embedded-toolbar-menu-link"
            : "inline-flex min-h-8 items-center gap-2 rounded-md bg-foreground/[0.06] px-2.5 font-label text-[0.625rem] uppercase tracking-[0.06em] text-foreground/85 transition-colors hover:bg-foreground/[0.1] hover:text-foreground"
        }
      >
        {variant === "toolbar-menu" ? null : (
          <BookOpen className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden />
        )}
        {t("home.guideButton")}
      </button>
      {modal}
    </>
  );
}
