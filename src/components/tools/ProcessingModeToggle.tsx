"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export type ProcessingMode = "single" | "batch";

interface ProcessingModeToggleProps {
  mode: ProcessingMode;
  onChange: (mode: ProcessingMode) => void;
}

export function ProcessingModeToggle({
  mode,
  onChange,
}: ProcessingModeToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="tool-segment-track mb-5 flex gap-1 rounded-md border border-border bg-background p-1">
      <button
        type="button"
        onClick={() => onChange("single")}
        className={`tool-segment ${
          mode === "single" ? "tool-segment-active" : "tool-segment-idle hover:text-foreground"
        }`}
      >
        {t("processingMode.single")}
      </button>
      <button
        type="button"
        onClick={() => onChange("batch")}
        className={`tool-segment ${
          mode === "batch" ? "tool-segment-active" : "tool-segment-idle hover:text-foreground"
        }`}
      >
        {t("processingMode.batch")}
      </button>
    </div>
  );
}
