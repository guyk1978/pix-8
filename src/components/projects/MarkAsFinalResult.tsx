"use client";

import { useId } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";

export function MarkAsFinalResult() {
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
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          checked={isResultMarked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 shrink-0 accent-accent disabled:opacity-50"
        />
        <span className="tool-control-label normal-case">
          {t("projects.markAsFinalResult")}
        </span>
      </label>
      <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted">
        {hint ?? t("projects.markAsFinalHint")}
      </p>
    </div>
  );
}
