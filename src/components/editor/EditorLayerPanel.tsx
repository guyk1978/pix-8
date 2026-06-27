"use client";

import { useState, type DragEvent } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, GripVertical } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";

export function EditorLayerPanel() {
  const { t } = useLanguage();
  const {
    layers,
    activeLayerId,
    selectLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    deleteLayer,
    reorderLayers,
    source,
  } = useEditor();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => (event: DragEvent) => {
    if (index === 0) {
      event.preventDefault();
      return;
    }
    setDragIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (index: number) => (event: DragEvent) => {
    event.preventDefault();
    if (dragIndex === null || dragIndex === index || index === 0) return;
    reorderLayers(dragIndex, index);
    setDragIndex(index);
  };

  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="unified-editor-layers flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="unified-editor-panel-header">
        <h2 className="unified-editor-panel-title">{t("editor.layers.title")}</h2>
        {source ? (
          <span className="unified-editor-panel-meta">
            {layers.length - 1} {t("editor.layers.operations")}
          </span>
        ) : null}
      </header>

      <ul className="unified-editor-layer-list flex-1 overflow-y-auto" role="list">
        {!source ? (
          <li className="unified-editor-layer-empty">
            {t("editor.layers.empty")}
          </li>
        ) : (
          layers.map((layer, index) => {
            const isActive = layer.id === activeLayerId;
            const isSource = layer.type === "source";
            return (
              <li
                key={layer.id}
                draggable={!isSource && !layer.locked}
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver(index)}
                onDragEnd={handleDragEnd}
                className={`unified-editor-layer-item ${isActive ? "is-active" : ""} ${dragIndex === index ? "is-dragging" : ""}`}
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
                  onClick={() => selectLayer(layer.id)}
                >
                  <span className="unified-editor-layer-index">{index + 1}.</span>
                  <span className="truncate">{t(layer.nameKey)}</span>
                  {layer.type === "bg-remove" && layer.processing ? (
                    <span className="unified-editor-layer-badge">
                      {t("editor.processing")}
                    </span>
                  ) : null}
                  {layer.type === "export-svg" && layer.processing ? (
                    <span className="unified-editor-layer-badge">
                      {t("toolUi.imageToSvg.converting")}
                    </span>
                  ) : null}
                </button>

                <div className="unified-editor-layer-actions">
                  {!isSource ? (
                    <>
                      <button
                        type="button"
                        className="unified-editor-layer-action"
                        onClick={() => toggleLayerVisibility(layer.id)}
                        aria-label={
                          layer.visible
                            ? t("editor.layers.hide")
                            : t("editor.layers.show")
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
                        onClick={() => toggleLayerLock(layer.id)}
                        aria-label={
                          layer.locked
                            ? t("editor.layers.unlock")
                            : t("editor.layers.lock")
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
                        onClick={() => deleteLayer(layer.id)}
                        disabled={layer.locked}
                        aria-label={t("editor.layers.delete")}
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </>
                  ) : null}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
