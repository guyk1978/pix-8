"use client";

import { Eye, EyeOff, GripVertical, Lock, Trash2, Unlock } from "lucide-react";
import type { DragEvent } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LayerProgressBar } from "@/components/ui/animations";
import type { LayerLiveFeedback, LiveFeedbackPhase } from "@/hooks/useLiveFeedback";
import type { EditorLayer } from "@/lib/editor/layerTypes";

interface LayerItemProps {
  layer: EditorLayer;
  index: number;
  isActive: boolean;
  isDragging: boolean;
  feedback: LayerLiveFeedback | null;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
  onDragStart: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDragEnd: () => void;
}

function resolveDisplayPhase(
  layer: EditorLayer,
  feedback: LayerLiveFeedback | null,
): LiveFeedbackPhase {
  if (feedback?.phase && feedback.phase !== "idle") {
    return feedback.phase;
  }
  if (layer.type === "bg-remove" && layer.enabled && layer.resultImage) {
    return "success";
  }
  return "idle";
}

export function LayerItem({
  layer,
  index,
  isActive,
  isDragging,
  feedback,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}: LayerItemProps) {
  const { t } = useLanguage();
  const isSource = layer.type === "source";
  const phase = resolveDisplayPhase(layer, feedback);
  const phaseClass =
    phase !== "idle" ? `live-feedback-layer-item--${phase}` : "";

  return (
    <li
      draggable={!isSource && !layer.locked}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`unified-editor-layer-item ${isActive ? "is-active" : ""} ${
        isDragging ? "is-dragging" : ""
      } ${phaseClass}`}
    >
      <button
        type="button"
        className="unified-editor-layer-grip"
        aria-hidden={isSource}
        tabIndex={isSource ? -1 : 0}
        disabled={isSource || layer.locked}
      >
        <GripVertical className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <button
        type="button"
        className="unified-editor-layer-label"
        onClick={onSelect}
      >
        <span className="unified-editor-layer-index">{index + 1}.</span>
        <span className="truncate">{t(layer.nameKey)}</span>
      </button>

      <div className="unified-editor-layer-actions">
        {!isSource ? (
          <>
            <button
              type="button"
              className="unified-editor-layer-action"
              onClick={onToggleVisibility}
              aria-label={
                layer.visible ? t("editor.layers.hide") : t("editor.layers.show")
              }
            >
              {layer.visible ? (
                <Eye className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <EyeOff className="h-3.5 w-3.5" strokeWidth={2} />
              )}
            </button>
            <button
              type="button"
              className="unified-editor-layer-action"
              onClick={onToggleLock}
              aria-label={
                layer.locked ? t("editor.layers.unlock") : t("editor.layers.lock")
              }
            >
              {layer.locked ? (
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <Unlock className="h-3.5 w-3.5" strokeWidth={2} />
              )}
            </button>
            <button
              type="button"
              className="unified-editor-layer-action unified-editor-layer-action--danger"
              onClick={onDelete}
              disabled={layer.locked}
              aria-label={t("editor.layers.delete")}
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </>
        ) : null}
      </div>

      {feedback?.isAiLayer && phase !== "idle" ? (
        <LayerProgressBar
          phase={phase}
          progress={feedback.progress}
          label={t(layer.nameKey)}
        />
      ) : null}
    </li>
  );
}
