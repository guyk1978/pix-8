"use client";

import { useState, type DragEvent } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LayerItem } from "@/components/editor/LayerItem";
import { useEditor } from "@/hooks/useEditorState";
import { useLiveFeedback } from "@/hooks/useLiveFeedback";
import { useContextualScrollContext } from "@/hooks/useContextualScroll";

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
  const { registerLayerRef } = useContextualScrollContext();
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
    <section className="contextual-panel contextual-panel--layers">
      <header className="unified-editor-panel-header contextual-panel-header">
        <h2 className="unified-editor-panel-title">{t("editor.layers.stackTitle")}</h2>
        {source ? (
          <span className="unified-editor-panel-meta">
            {layers.length - 1} {t("editor.layers.operations")}
          </span>
        ) : null}
      </header>

      <ul className="unified-editor-layer-list contextual-panel-body" role="list">
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
              registerRef={(element) => registerLayerRef(layer.id, element)}
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
    </section>
  );
}
