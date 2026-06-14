"use client";

import { useEffect, useRef } from "react";
import type { ViewportRect } from "@/lib/imageMagnifierView";

interface MagnifierMiniMapProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  viewportRect: ViewportRect;
  label: string;
  onNavigate: (imageX: number, imageY: number) => void;
}

const MINI_MAP_WIDTH = 128;
const MINI_MAP_HEIGHT = 88;

export function MagnifierMiniMap({
  imageUrl,
  imageWidth,
  imageHeight,
  viewportRect,
  label,
  onNavigate,
}: MagnifierMiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, MINI_MAP_WIDTH, MINI_MAP_HEIGHT);
      context.drawImage(image, 0, 0, MINI_MAP_WIDTH, MINI_MAP_HEIGHT);
    };
    image.src = imageUrl;
  }, [imageUrl]);

  const scaleX = MINI_MAP_WIDTH / imageWidth;
  const scaleY = MINI_MAP_HEIGHT / imageHeight;
  const viewportStyle = {
    left: `${viewportRect.x * scaleX}px`,
    top: `${viewportRect.y * scaleY}px`,
    width: `${Math.max(viewportRect.width * scaleX, 6)}px`,
    height: `${Math.max(viewportRect.height * scaleY, 6)}px`,
  };

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const imageX = (localX / MINI_MAP_WIDTH) * imageWidth;
    const imageY = (localY / MINI_MAP_HEIGHT) * imageHeight;
    onNavigate(imageX, imageY);
  };

  return (
    <div
      className="pointer-events-auto absolute end-3 bottom-3 z-10 overflow-hidden rounded-md border border-border bg-card/95 shadow-[var(--shadow-elevated)] backdrop-blur-sm"
      aria-label={label}
    >
      <div
        className="relative cursor-crosshair touch-none"
        style={{ width: MINI_MAP_WIDTH, height: MINI_MAP_HEIGHT }}
        onPointerDown={handlePointer}
        onPointerMove={(event) => {
          if (event.buttons !== 1) return;
          handlePointer(event);
        }}
      >
        <canvas
          ref={canvasRef}
          width={MINI_MAP_WIDTH}
          height={MINI_MAP_HEIGHT}
          className="block h-full w-full opacity-90"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute rounded-sm border-2 border-[var(--glow-teal)] bg-[color-mix(in_srgb,var(--glow-teal)_18%,transparent)]"
          style={viewportStyle}
        />
      </div>
    </div>
  );
}
