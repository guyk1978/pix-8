"use client";

import { Minus, Plus } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";

export function EditorCanvasZoomControls() {
  const { t } = useLanguage();
  const { source, canvasZoom, zoomCanvasIn, zoomCanvasOut, resetCanvasZoom } = useEditor();

  if (!source) return null;

  const zoomLabel = `${Math.round(canvasZoom * 100)}%`;

  return (
    <div className="unified-editor-zoom-controls" role="group" aria-label={t("editor.canvas.zoom")}>
      <button
        type="button"
        className="unified-editor-zoom-btn"
        onClick={zoomCanvasOut}
        disabled={canvasZoom <= 0.5}
        title={t("editor.canvas.zoomOut")}
        aria-label={t("editor.canvas.zoomOut")}
      >
        <Minus size={14} aria-hidden />
      </button>
      <button
        type="button"
        className="unified-editor-zoom-label"
        onClick={resetCanvasZoom}
        title={t("editor.canvas.zoomReset")}
      >
        {zoomLabel}
      </button>
      <button
        type="button"
        className="unified-editor-zoom-btn"
        onClick={zoomCanvasIn}
        disabled={canvasZoom >= 4}
        title={t("editor.canvas.zoomIn")}
        aria-label={t("editor.canvas.zoomIn")}
      >
        <Plus size={14} aria-hidden />
      </button>
    </div>
  );
}
