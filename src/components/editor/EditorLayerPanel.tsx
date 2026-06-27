"use client";

import { useState, type DragEvent } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LayerItem } from "@/components/editor/LayerItem";
import { useEditor } from "@/hooks/useEditorState";
import { useLiveFeedback } from "@/hooks/useLiveFeedback";

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
  const { layerFeedback } = useLiveFeedback();
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
        <h2 className="unified-editor-panel-title">{t("editor.layers.stackTitle")}</h2>
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
          layers.map((layer, index) => (
            <LayerItem
              key={layer.id}
              layer={layer}
              index={index}
              isActive={layer.id === activeLayerId}
              isDragging={dragIndex === index}
              feedback={layerFeedback.get(layer.id) ?? null}
              onSelect={() => selectLayer(layer.id)}
              onToggleVisibility={() => toggleLayerVisibility(layer.id)}
              onToggleLock={() => toggleLayerLock(layer.id)}
              onDelete={() => deleteLayer(layer.id)}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </ul>
    </div>
  );
}
