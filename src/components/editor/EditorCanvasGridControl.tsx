"use client";

import { LayoutGrid } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { CanvasBackgroundMode } from "@/lib/editor/canvasBackgroundMode";

interface EditorCanvasGridControlProps {
  mode: CanvasBackgroundMode;
  onCycle: () => void;
}

export function EditorCanvasGridControl({
  mode,
  onCycle,
}: EditorCanvasGridControlProps) {
  const { t } = useLanguage();

  const modeLabel = t(`editor.canvas.backgroundMode.${mode}`);
  const tooltip = t("editor.canvas.backgroundToggle", { mode: modeLabel });

  return (
    <button
      type="button"
      className={`unified-editor-grid-btn ${mode !== "grid" ? "is-active" : ""}`}
      onClick={onCycle}
      aria-pressed={mode !== "grid"}
      aria-label={tooltip}
      title={tooltip}
      data-mode={mode}
    >
      <LayoutGrid size={14} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
