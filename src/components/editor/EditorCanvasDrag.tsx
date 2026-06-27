"use client";

import { useCallback, useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { isDraggableLayerType } from "@/lib/editor/editorProject";
import { displayToNaturalCoords } from "@/lib/textOverlayRender";
import type { EditorLayer } from "@/lib/editor/layerTypes";

export function EditorCanvasDrag() {
  const { t } = useLanguage();
  const { activeLayer, updateLayer, previewCanvasRef } = useEditor();
  const dragging = useRef(false);

  const canDrag =
    activeLayer && isDraggableLayerType(activeLayer.type) && !activeLayer.locked;

  const applyPosition = useCallback(
    (layer: EditorLayer, x: number, y: number) => {
      updateLayer(layer.id, (current) => {
        if (current.id !== layer.id) return current;
        if (current.type === "text-overlay") {
          return {
            ...current,
            settings: { ...current.settings, x, y },
          };
        }
        if (current.type === "watermark") {
          return { ...current, x, y };
        }
        if (current.type === "image-overlay") {
          return {
            ...current,
            transform: { ...current.transform, x, y },
          };
        }
        return current;
      });
    },
    [updateLayer],
  );

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !activeLayer || !canDrag) return;
      const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);
      applyPosition(activeLayer, x, y);
    },
    [activeLayer, applyPosition, canDrag, previewCanvasRef],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canDrag) return;
      dragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromPointer(event.clientX, event.clientY);
    },
    [canDrag, updateFromPointer],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!dragging.current) return;
      updateFromPointer(event.clientX, event.clientY);
    },
    [updateFromPointer],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  if (!canDrag) return null;

  return (
    <span className="unified-editor-drag-hint" aria-live="polite">
      {t("editor.canvas.dragHint")}
    </span>
  );
}

export function useEditorCanvasDragHandlers() {
  const { activeLayer, updateLayer, previewCanvasRef } = useEditor();
  const dragging = useRef(false);

  const canDrag =
    activeLayer && isDraggableLayerType(activeLayer.type) && !activeLayer.locked;

  const applyPosition = useCallback(
    (layer: EditorLayer, x: number, y: number) => {
      updateLayer(layer.id, (current) => {
        if (current.id !== layer.id) return current;
        if (current.type === "text-overlay") {
          return {
            ...current,
            settings: { ...current.settings, x, y },
          };
        }
        if (current.type === "watermark") {
          return { ...current, x, y };
        }
        if (current.type === "image-overlay") {
          return {
            ...current,
            transform: { ...current.transform, x, y },
          };
        }
        return current;
      });
    },
    [updateLayer],
  );

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !activeLayer || !canDrag) return;
      const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);
      applyPosition(activeLayer, x, y);
    },
    [activeLayer, applyPosition, canDrag, previewCanvasRef],
  );

  return {
    canDrag: !!canDrag,
    onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canDrag) return;
      dragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromPointer(event.clientX, event.clientY);
    },
    onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!dragging.current) return;
      updateFromPointer(event.clientX, event.clientY);
    },
    onPointerUp: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
  };
}
