"use client";

import type { ReactNode } from "react";

interface CanvasContainerProps {
  width: number;
  height: number;
  children: ReactNode;
}

export function CanvasContainer({ width, height, children }: CanvasContainerProps) {
  if (width <= 0 || height <= 0) {
    return null;
  }

  return (
    <div
      className="canvas-container"
      style={{ width, height }}
    >
      <div className="canvas-container__matte">{children}</div>
    </div>
  );
}
