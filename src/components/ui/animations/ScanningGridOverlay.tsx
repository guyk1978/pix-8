"use client";

import { useEffect, useRef } from "react";
import { startScanningGrid } from "@/components/ui/animations/scanningGridController";

interface ScanningGridOverlayProps {
  active: boolean;
  width: number;
  height: number;
}

export function ScanningGridOverlay({
  active,
  width,
  height,
}: ScanningGridOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!active || !canvas || width <= 0 || height <= 0) return;

    const controller = startScanningGrid(canvas, width, height);
    return () => controller.stop();
  }, [active, width, height]);

  if (!active || width <= 0 || height <= 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="live-feedback-scanning-grid"
      width={width}
      height={height}
      aria-hidden
    />
  );
}
