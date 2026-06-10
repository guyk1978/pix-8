"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  DEFAULT_GRAIN_SETTINGS,
  renderGrainCanvas,
  type GrainSettings,
} from "@/lib/grainRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

export function GrainGenerator() {
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
  const [grainSeed, setGrainSeed] = useState(0);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<GrainSettings>(DEFAULT_GRAIN_SETTINGS);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setGrainSeed((current) => current + 1);
        setSettings(DEFAULT_GRAIN_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    let cancelled = false;
    setIsApplying(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          renderGrainCanvas(
            image,
            source.width,
            source.height,
            settings,
            previewCanvasRef.current,
          );
        } catch (cause) {
          const message =
            cause instanceof Error ? cause.message : "Grain application failed.";
          setError(message);
        } finally {
          if (!cancelled) setIsApplying(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError("Failed to load image.");
          setIsApplying(false);
        }
      };

      image.src = source.url;
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, settings, grainSeed, setError]);

  const handleRegenerateGrain = useCallback(() => {
    setGrainSeed((current) => current + 1);
  }, []);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-grain`, format),
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

  const busy = isProcessing || isApplying;
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
              id="grain-generator-upload"
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
                Film grain · texture · vintage look
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="grain-generator-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="grain-generator-replace"
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
            <span className="font-label text-muted">Preview</span>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[min(50vh,420px)] max-w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to preview film grain.
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isApplying ? "Applying grain…" : `${settings.intensity}% intensity`}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="grain-intensity" className="font-label text-muted">
                  Grain intensity
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.intensity}%
                </span>
              </div>
              <input
                id="grain-intensity"
                type="range"
                min={0}
                max={100}
                step={1}
                disabled={!source || isApplying}
                value={settings.intensity}
                onChange={(event) =>
                  setSettings({ intensity: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
              <p className="font-mono text-[10px] leading-relaxed text-muted">
                Gaussian noise blended per pixel — start subtle for a filmic look.
              </p>
            </div>

            <button
              type="button"
              disabled={!source || isApplying}
              onClick={handleRegenerateGrain}
              className="min-h-9 w-full rounded-sm border border-[#333] bg-[#161616] font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              Regenerate grain pattern
            </button>

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_GRAIN_SETTINGS)}
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
          Grain is generated locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
