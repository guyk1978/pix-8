"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import {
  sampleColorFromCanvas,
  type SampledColor,
} from "@/lib/colorUtils";

const MAGNIFIER_SIZE = 11;
const MAGNIFIER_ZOOM = 12;

interface PointerPosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

function getNaturalCoords(
  clientX: number,
  clientY: number,
  image: HTMLImageElement,
): { x: number; y: number } {
  const rect = image.getBoundingClientRect();
  const scaleX = image.naturalWidth / rect.width;
  const scaleY = image.naturalHeight / rect.height;

  const x = Math.floor((clientX - rect.left) * scaleX);
  const y = Math.floor((clientY - rect.top) * scaleY);

  return {
    x: Math.max(0, Math.min(image.naturalWidth - 1, x)),
    y: Math.max(0, Math.min(image.naturalHeight - 1, y)),
  };
}

function drawMagnifier(
  magnifierCanvas: HTMLCanvasElement,
  sourceCanvas: HTMLCanvasElement,
  centerX: number,
  centerY: number,
): void {
  const ctx = magnifierCanvas.getContext("2d");
  if (!ctx) return;

  const half = Math.floor(MAGNIFIER_SIZE / 2);
  const sourceX = Math.max(0, centerX - half);
  const sourceY = Math.max(0, centerY - half);
  const sourceWidth = Math.min(
    MAGNIFIER_SIZE,
    sourceCanvas.width - sourceX,
  );
  const sourceHeight = Math.min(
    MAGNIFIER_SIZE,
    sourceCanvas.height - sourceY,
  );

  const outputSize = MAGNIFIER_SIZE * MAGNIFIER_ZOOM;
  magnifierCanvas.width = outputSize;
  magnifierCanvas.height = outputSize;

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, outputSize, outputSize);
  ctx.drawImage(
    sourceCanvas,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    sourceWidth * MAGNIFIER_ZOOM,
    sourceHeight * MAGNIFIER_ZOOM,
  );

  ctx.strokeStyle = "#e8e8e8";
  ctx.lineWidth = 1;
  for (let i = 0; i <= MAGNIFIER_SIZE; i++) {
    const offset = i * MAGNIFIER_ZOOM;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, outputSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(outputSize, offset);
    ctx.stroke();
  }

  const centerOffset = half * MAGNIFIER_ZOOM;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(
    centerOffset,
    centerOffset,
    MAGNIFIER_ZOOM,
    MAGNIFIER_ZOOM,
  );
}

export function ColorPicker() {
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const pickCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const magnifierRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [pointer, setPointer] = useState<PointerPosition | null>(null);
  const [hoverColor, setHoverColor] = useState<SampledColor | null>(null);
  const [pickedColor, setPickedColor] = useState<SampledColor | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setIsReady(false);
        setPointer(null);
        setHoverColor(null);
        setPickedColor(null);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setIsReady(false);
      return;
    }

    const image = new Image();
    let cancelled = false;

    image.onload = () => {
      if (cancelled) return;

      const canvas = pickCanvasRef.current;
      if (!canvas) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas context unavailable.");
        return;
      }

      ctx.drawImage(image, 0, 0);
      setIsReady(true);
    };

    image.onerror = () => {
      if (!cancelled) setError("Failed to load image for sampling.");
    };

    image.src = source.url;

    return () => {
      cancelled = true;
    };
  }, [source, setError]);

  useEffect(() => {
    if (!pointer || !pickCanvasRef.current || !magnifierRef.current) return;
    drawMagnifier(
      magnifierRef.current,
      pickCanvasRef.current,
      pointer.x,
      pointer.y,
    );
  }, [pointer, hoverColor]);

  const updateSample = useCallback(
    (clientX: number, clientY: number, commit = false) => {
      const image = imageRef.current;
      const canvas = pickCanvasRef.current;
      if (!image || !canvas || !isReady) return;

      const { x, y } = getNaturalCoords(clientX, clientY, image);

      try {
        const color = sampleColorFromCanvas(canvas, x, y);
        setPointer({ x, y, clientX, clientY });
        setHoverColor(color);

        if (commit) {
          setPickedColor(color);
        }
      } catch (cause) {
        const message =
          cause instanceof Error ? cause.message : "Could not sample color.";
        setError(message);
      }
    },
    [isReady, setError],
  );

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      updateSample(event.clientX, event.clientY);
    },
    [updateSample],
  );

  const handlePointerLeave = useCallback(() => {
    setPointer(null);
    setHoverColor(null);
  }, []);

  const handlePick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      updateSample(event.clientX, event.clientY, true);
    },
    [updateSample],
  );

  const handleCopy = useCallback(
    async (value: string, format: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedFormat(format);
        showToast(value, { title: "Copied!" });
        window.setTimeout(() => setCopiedFormat(null), 1500);
      } catch {
        setError("Could not copy to clipboard.");
      }
    },
    [showToast, setError],
  );

  const activeColor = pickedColor ?? hoverColor;

  const magnifierStyle = pointer
    ? {
        left: Math.min(
          pointer.clientX + 16,
          (viewerRef.current?.getBoundingClientRect().right ?? pointer.clientX) -
            MAGNIFIER_SIZE * MAGNIFIER_ZOOM -
            8,
        ),
        top: Math.max(
          (viewerRef.current?.getBoundingClientRect().top ?? 0) + 8,
          pointer.clientY - MAGNIFIER_SIZE * MAGNIFIER_ZOOM - 16,
        ),
      }
    : undefined;

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        {!source ? (
          <div
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
              isDragging
                ? "border-accent bg-accent-muted"
                : "border-border bg-background hover:border-muted"
            }`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsDragging(false);
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFileChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <input
              id="color-picker-upload"
              type="file"
              accept="image/*"
              aria-label="Upload image"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <div className="pointer-events-none px-2 text-center">
              <p className="font-label text-muted">Upload</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Drop an image here or tap to browse
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                Click any pixel to sample · Hover for zoom
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="color-picker-replace" className="font-label text-muted">
                Replace Image
              </label>
              <span className="font-mono text-[10px] text-muted">
                {source.width} × {source.height}px
              </span>
            </div>
            <input
              id="color-picker-replace"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              className="w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted focus:border-muted"
            />

            <div
              ref={viewerRef}
              className="relative overflow-hidden rounded-sm border border-border bg-background"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={source.url}
                alt="Color sampling source"
                className="mx-auto block max-h-[28rem] w-full cursor-crosshair object-contain"
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
                onClick={handlePick}
              />

              {pointer && (
                <div
                  className="pointer-events-none fixed z-50 rounded-sm border border-border bg-card p-1 shadow-lg"
                  style={magnifierStyle}
                >
                  <p className="mb-1 px-1 font-mono text-[9px] text-muted">
                    {pointer.x}, {pointer.y}
                  </p>
                  <canvas
                    ref={magnifierRef}
                    className="block"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <p className="font-mono text-[10px] text-muted">
              Hover to preview · Click to lock a color sample
            </p>
          </div>
        )}

        <section className="mt-6 border-t border-border pt-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="font-label text-foreground">Sampled Color</h2>
            {pointer && (
              <span className="font-mono text-[10px] text-muted">
                Pixel {pointer.x}, {pointer.y}
              </span>
            )}
          </div>

          {!activeColor ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                Upload an image and click a pixel to sample its color.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 border border-border bg-background p-4">
                <span
                  className="h-16 w-16 shrink-0 rounded-sm border border-border"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <div className="min-w-0 space-y-1">
                  <p className="font-label text-muted">
                    {pickedColor ? "Locked sample" : "Live preview"}
                  </p>
                  <p className="truncate font-mono text-sm text-foreground">
                    {activeColor.hex}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {(
                  [
                    { label: "HEX", value: activeColor.hex, key: "hex" },
                    { label: "RGB", value: activeColor.rgb, key: "rgb" },
                    { label: "HSL", value: activeColor.hsl, key: "hsl" },
                  ] as const
                ).map((format) => (
                  <button
                    key={format.key}
                    type="button"
                    onClick={() => void handleCopy(format.value, format.key)}
                    className="flex min-h-11 flex-col items-start gap-1 rounded-sm border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-muted hover:bg-surface"
                  >
                    <span className="font-label text-muted">{format.label}</span>
                    <span
                      className={`truncate font-mono text-xs ${
                        copiedFormat === format.key
                          ? "text-accent"
                          : "text-foreground"
                      }`}
                    >
                      {copiedFormat === format.key ? "Copied!" : format.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <p className="mt-4 text-center font-mono text-[10px] text-muted">
          All sampling runs locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={pickCanvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
