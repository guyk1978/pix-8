"use client";

import { EditorCanvasGridControl } from "@/components/editor/EditorCanvasGridControl";
import { EditorCanvasZoomControls } from "@/components/editor/EditorCanvasZoomControls";
import type { CanvasBackgroundMode } from "@/lib/editor/canvasBackgroundMode";

interface EditorCanvasViewportControlsProps {
  canvasBackgroundMode: CanvasBackgroundMode;
  onCycleBackground: () => void;
}

export function EditorCanvasViewportControls({
  canvasBackgroundMode,
  onCycleBackground,
}: EditorCanvasViewportControlsProps) {
  return (
    <div className="canvas-viewport-controls" role="toolbar">
      <EditorCanvasGridControl
        mode={canvasBackgroundMode}
        onCycle={onCycleBackground}
      />
      <span className="canvas-viewport-controls-divider" aria-hidden />
      <EditorCanvasZoomControls />
    </div>
  );
}
