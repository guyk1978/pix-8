"use client";

import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
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
    <ToolSidebarSlot
      id="processing-mode"
      order={5}
      className="mb-5"
      showInlineWhenIdle
    >
      <div className="tool-segment-track sidebar-segment-track flex gap-2">
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
    </ToolSidebarSlot>
  );
}
