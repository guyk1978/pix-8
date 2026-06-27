"use client";

import { useCallback, useState } from "react";
import { useEditor } from "@/hooks/useEditorState";
import { displayToNaturalCoords } from "@/lib/textOverlayRender";
import type { ClickPulse } from "@/components/ui/animations";

export function useEditorMaskClickHandlers() {
  const {
    maskClickMode,
    maskClickReady,
    isClickSegmentationLoading,
    applyMaskClickAt,
    previewCanvasRef,
  } = useEditor();

  const [pulses, setPulses] = useState<ClickPulse[]>([]);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [naturalPoint, setNaturalPoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  const canClick = Boolean(maskClickMode && maskClickReady && !isClickSegmentationLoading);

  const updateCursor = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !canClick) {
        setCursor(null);
        setNaturalPoint(null);
        return;
      }

      const rect = canvas.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setCursor({ x, y });
      setNaturalPoint(displayToNaturalCoords(clientX, clientY, canvas));
    },
    [canClick, previewCanvasRef],
  );

  const handleClick = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas || !canClick) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const { x: naturalX, y: naturalY } = displayToNaturalCoords(
        clientX,
        clientY,
        canvas,
      );

      setPulses((prev) => [
        ...prev,
        { id: crypto.randomUUID(), x, y },
      ]);
      setNaturalPoint({ x: naturalX, y: naturalY });
      void applyMaskClickAt(naturalX, naturalY);
    },
    [applyMaskClickAt, canClick, previewCanvasRef],
  );

  const removePulse = useCallback((id: string) => {
    setPulses((prev) => prev.filter((pulse) => pulse.id !== id));
  }, []);

  return {
    canClick,
    isClickSegmentationLoading,
    pulses,
    removePulse,
    cursor,
    naturalPoint,
    handlePointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canClick) return;
      event.preventDefault();
      handleClick(event.clientX, event.clientY);
    },
    handlePointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canClick) return;
      updateCursor(event.clientX, event.clientY);
    },
    handlePointerLeave: () => {
      if (!canClick) return;
      setCursor(null);
      setNaturalPoint(null);
    },
  };
}
