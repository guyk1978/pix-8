"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  DEFAULT_SHARPEN_SETTINGS,
  drawImageToCanvas,
  renderSharpenedCanvas,
  type SharpenSettings,
} from "@/lib/sharpenRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

export function Sharpener() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isDraggingCompareRef = useRef(false);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isSharpening, setIsSharpening] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<SharpenSettings>(
    DEFAULT_SHARPEN_SETTINGS,
  );
  const [comparePosition, setComparePosition] = useState(50);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_SHARPEN_SETTINGS);
        setComparePosition(50);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) return;

    let cancelled = false;
    setIsSharpening(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          if (beforeCanvasRef.current) {
            drawImageToCanvas(
              image,
              source.width,
              source.height,
              beforeCanvasRef.current,
            );
          }

          if (afterCanvasRef.current) {
            renderSharpenedCanvas(
              image,
              source.width,
              source.height,
              settings,
              afterCanvasRef.current,
            );
          }
        } catch (cause) {
          const message =
            cause instanceof Error ? cause.message : "Sharpening failed.";
          setError(message);
        } finally {
          if (!cancelled) setIsSharpening(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError("Failed to load image for sharpening.");
          setIsSharpening(false);
        }
      };

      image.src = source.url;
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, settings, setError]);

  const updateComparePosition = useCallback((clientX: number) => {
    const container = comparisonRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setComparePosition(Math.max(8, Math.min(92, next)));
  }, []);

  const handleComparePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingCompareRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateComparePosition(event.clientX);
    },
    [updateComparePosition],
  );

  const handleComparePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingCompareRef.current) return;
      updateComparePosition(event.clientX);
    },
    [updateComparePosition],
  );

  const handleComparePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingCompareRef.current = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleDownloadImage = useCallback(async () => {
    if (!source || !afterCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      afterCanvasRef.current,
      buildDownloadFilename(`${source.name}-sharpened`, format),
      { format, quality, stripMetadata },
    );
  }, [source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !afterCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(afterCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, stripMetadata, handleCopyToClipboard]);

  const busy = isProcessing || isSharpening;
  const canDownload = !!source && !busy;

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        {!source ? (
          <div
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
              isDraggingFile
                ? "border-accent bg-accent-muted"
                : "border-[#333] bg-background hover:border-muted"
            }`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDraggingFile(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsDraggingFile(false);
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setIsDraggingFile(false);
              handleFileChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <input
              id="sharpener-upload"
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
                Edge recovery · clarity · detail
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="sharpener-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="sharpener-replace"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              className={`${inputClassName} file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted`}
            />
          </div>
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label text-muted">Before / After</span>
              <span className="font-mono text-[10px] text-muted">
                Drag divider to compare
              </span>
            </div>

            <div
              ref={comparisonRef}
              className={`relative flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-72 ${
                source ? "cursor-col-resize touch-none" : ""
              }`}
              onPointerDown={source ? handleComparePointerDown : undefined}
              onPointerMove={source ? handleComparePointerMove : undefined}
              onPointerUp={source ? handleComparePointerUp : undefined}
              onPointerCancel={source ? handleComparePointerUp : undefined}
            >
              {source ? (
                <div className="relative inline-block max-w-full">
                  <canvas
                    ref={afterCanvasRef}
                    className="block max-h-[min(50vh,420px)] max-w-full"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${comparePosition}%` }}
                  >
                    <canvas
                      ref={beforeCanvasRef}
                      className="block max-h-[min(50vh,420px)] max-w-full"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-y-0 z-10 w-px bg-foreground"
                    style={{ left: `${comparePosition}%` }}
                  />
                  <div
                    className="pointer-events-none absolute top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
                    style={{ left: `${comparePosition}%` }}
                  >
                    <span className="rounded-sm border border-[#333] bg-[#161616] px-2 py-1 font-mono text-[9px] text-muted">
                      Before
                    </span>
                    <span className="h-8 w-4 rounded-sm border border-[#333] bg-[#161616]" />
                    <span className="rounded-sm border border-[#333] bg-[#161616] px-2 py-1 font-mono text-[9px] text-muted">
                      After
                    </span>
                  </div>
                </div>
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to compare sharpening results.
                </p>
              )}
            </div>

            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isSharpening ? "Sharpening…" : `${settings.intensity}% intensity`}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="sharpener-intensity" className="font-label text-muted">
                  Sharpen
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.intensity}%
                </span>
              </div>
              <input
                id="sharpener-intensity"
                type="range"
                min={0}
                max={100}
                step={1}
                disabled={!source || isSharpening}
                value={settings.intensity}
                onChange={(event) =>
                  setSettings({ intensity: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
              <p className="font-mono text-[10px] text-muted">
                3×3 convolution kernel — increase slowly to avoid halos.
              </p>
            </div>

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_SHARPEN_SETTINGS)}
              className="min-h-9 w-full rounded-sm border border-[#333] bg-[#161616] font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              Reset intensity
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-[#333] pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel="Download"
          disabled={!canDownload}
          isProcessing={busy}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Sharpening runs locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
