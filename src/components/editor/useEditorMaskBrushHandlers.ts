"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor } from "@/hooks/useEditorState";
import {
  naturalBrushRadiusToDisplay,
  resolveMaskBrushRadius,
} from "@/lib/backgroundRemoval/maskBrush";
import { displayToNaturalCoords } from "@/lib/textOverlayRender";

export interface MaskBrushCursorState {
  x: number;
  y: number;
  displayRadius: number;
  mode: "clean" | "default";
}

export function useEditorMaskBrushHandlers() {
  const {
    maskBrushTool,
    maskBrushSize,
    maskBrushReady,
    paintMaskBrushAt,
    paintMaskBrushStrokeAt,
    commitMaskBrushRevision,
    recordHistoryBeforeGesture,
    previewCanvasRef,
    source,
  } = useEditor();
  const painting = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [cursor, setCursor] = useState<MaskBrushCursorState | null>(null);

  const canPaint = Boolean(maskBrushTool && maskBrushReady);

  const updateCursor = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !canPaint || !maskBrushTool || !source) {
        setCursor(null);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const naturalRadius = resolveMaskBrushRadius(
        maskBrushTool,
        source.width,
        source.height,
        maskBrushSize,
      );

      setCursor({
        x,
        y,
        displayRadius: naturalBrushRadiusToDisplay(naturalRadius, canvas),
        mode: maskBrushTool === "clean" ? "clean" : "default",
      });
    },
    [canPaint, maskBrushSize, maskBrushTool, previewCanvasRef, source],
  );

  const paintAtClient = useCallback(
    (clientX: number, clientY: number, stroke = false) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !canPaint) return;
      const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);

      if (stroke && lastPoint.current) {
        paintMaskBrushStrokeAt(lastPoint.current.x, lastPoint.current.y, x, y);
      } else {
        paintMaskBrushAt(x, y);
      }

      lastPoint.current = { x, y };
    },
    [canPaint, paintMaskBrushAt, paintMaskBrushStrokeAt, previewCanvasRef],
  );

  return {
    canPaint,
    cursor,
    onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canPaint) return;
      recordHistoryBeforeGesture();
      painting.current = true;
      lastPoint.current = null;
      updateCursor(event.clientX, event.clientY);
      event.currentTarget.setPointerCapture(event.pointerId);
      paintAtClient(event.clientX, event.clientY, false);
    },
    onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (canPaint) {
        updateCursor(event.clientX, event.clientY);
      }
      if (!painting.current || !canPaint) return;
      paintAtClient(event.clientX, event.clientY, true);
    },
    onPointerUp: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!painting.current) return;
      painting.current = false;
      lastPoint.current = null;
      commitMaskBrushRevision();
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerLeave: () => {
      if (!painting.current) {
        setCursor(null);
      }
    },
  };
}
