"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  DEFAULT_LENS_CORRECTION_SETTINGS,
  renderLensCorrectedCanvas,
  type LensCorrectionSettings,
} from "@/lib/lensCorrectorRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

function correctionLabel(value: number): string {
  if (value === 0) return "Neutral";
  if (value < 0) return `Barrel ${value}`;
  return `Pincushion +${value}`;
}

export function LensCorrector() {
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

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<LensCorrectionSettings>(
    DEFAULT_LENS_CORRECTION_SETTINGS,
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_LENS_CORRECTION_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    let cancelled = false;
    setIsCorrecting(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          renderLensCorrectedCanvas(
            image,
            source.width,
            source.height,
            settings,
            previewCanvasRef.current,
          );
        } catch (cause) {
          const message =
            cause instanceof Error ? cause.message : "Correction failed.";
          setError(message);
        } finally {
          if (!cancelled) setIsCorrecting(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError("Failed to load image.");
          setIsCorrecting(false);
        }
      };

      image.src = source.url;
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, settings, setError]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-corrected`, format),
      { format, quality, stripMetadata },
    );
  }, [source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, stripMetadata, handleCopyToClipboard]);

  const busy = isProcessing || isCorrecting;
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
              id="lens-corrector-upload"
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
                Barrel · pincushion · perspective
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="lens-corrector-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="lens-corrector-replace"
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
              <span className="font-label text-muted">Preview</span>
              <span className="font-mono text-[10px] text-muted">
                {correctionLabel(settings.correction)}
              </span>
            </div>
            <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-72">
              {source ? (
                <>
                  <canvas
                    ref={previewCanvasRef}
                    className="max-h-[min(50vh,420px)] max-w-full object-contain"
                  />
                  {showGrid && (
                    <div
                      className="pointer-events-none absolute inset-3 opacity-60"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(232,232,232,0.35) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(232,232,232,0.35) 1px, transparent 1px)
                        `,
                        backgroundSize: "24px 24px",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </>
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to preview lens correction.
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isCorrecting ? "Correcting…" : "Drag slider to straighten lines"}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="lens-correction" className="font-label text-muted">
                  Lens correction
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.correction > 0 ? "+" : ""}
                  {settings.correction}
                </span>
              </div>
              <input
                id="lens-correction"
                type="range"
                min={-100}
                max={100}
                step={1}
                disabled={!source || isCorrecting}
                value={settings.correction}
                onChange={(event) =>
                  setSettings({ correction: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
              <div className="flex justify-between font-mono text-[9px] text-muted">
                <span>Barrel</span>
                <span>0</span>
                <span>Pincushion</span>
              </div>
            </div>

            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                disabled={!source}
                checked={showGrid}
                onChange={(event) => setShowGrid(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded-sm border border-[#333] bg-background accent-accent disabled:opacity-50"
              />
              <span className="font-label text-muted">Grid overlay</span>
            </label>

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_LENS_CORRECTION_SETTINGS)}
              className="min-h-9 w-full rounded-sm border border-[#333] bg-[#161616] font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              Reset correction
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
          Geometric correction runs locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
