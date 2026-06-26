"use client";

import { useId } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";

export function MarkAsFinalResult({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { t } = useLanguage();
  const projectContext = useOptionalToolProjectContext();
  const generatedId = useId();

  if (!projectContext?.resultMark) return null;

  const {
    isResultMarked,
    onChange,
    disabled,
    hint,
    checkboxId = generatedId,
  } = projectContext.resultMark;

  return (
    <div
      className={
        compact
          ? `embedded-mark-final inline-flex h-9 w-full items-center rounded-md bg-foreground/[0.06] px-2.5 ${className}`.trim()
          : "rounded-lg border border-border bg-background/60 p-3"
      }
    >
      <label className={`flex cursor-pointer items-center gap-3 ${compact ? "min-h-0 gap-2" : "min-h-11"}`}>
        <input
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          checked={isResultMarked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 shrink-0 accent-accent disabled:opacity-50"
        />
        <span className={`tool-control-label ${compact ? "text-[0.6875rem] normal-case" : "normal-case"}`}>
          {t("projects.markAsFinalResult")}
        </span>
      </label>
      {!compact ? (
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted">
          {hint ?? t("projects.markAsFinalHint")}
        </p>
      ) : null}
    </div>
  );
}
