"use client";

import { useEffect, useRef } from "react";

interface FloatingPreviewProps {
  active: boolean;
  x: number;
  y: number;
  sourceCanvas: HTMLCanvasElement | null;
  naturalX: number;
  naturalY: number;
  size?: number;
}

export function FloatingPreview({
  active,
  x,
  y,
  sourceCanvas,
  naturalX,
  naturalY,
  size = 100,
}: FloatingPreviewProps) {
  const previewRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!active || !preview || !sourceCanvas || sourceCanvas.width === 0) return;

    const ctx = preview.getContext("2d");
    if (!ctx) return;

    const half = size / 2;
    const sx = Math.max(0, Math.min(sourceCanvas.width - size, naturalX - half));
    const sy = Math.max(0, Math.min(sourceCanvas.height - size, naturalY - half));

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(sourceCanvas, sx, sy, size, size, 0, 0, size, size);

    ctx.strokeStyle = "rgba(77, 159, 255, 0.85)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, size - 2, size - 2);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();
  }, [active, naturalX, naturalY, size, sourceCanvas, x, y]);

  if (!active) return null;

  return (
    <div
      className="live-feedback-floating-preview"
      style={{
        transform: `translate(${x + 18}px, ${y + 18}px)`,
      }}
    >
      <canvas ref={previewRef} width={size} height={size} aria-hidden />
      <span className="live-feedback-floating-preview__label">SAM</span>
    </div>
  );
}
