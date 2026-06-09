"use client";

import { useCallback, useEffect, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import {
  buildDownloadFilename,
  processImage as processImageCore,
  resolveFormat,
  type ImageFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getCompressionFormat(sourceMime: string): ImageFormat {
  const format = resolveFormat(sourceMime);
  return format === "png" ? "webp" : format;
}

export function Compressor() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
  } = useImageProcessor();

  const [quality, setQuality] = useState(80);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const outputFormat = source ? getCompressionFormat(source.mimeType) : "jpeg";
  const qualityNormalized = quality / 100;

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setEstimatedSize(null);
      return;
    }

    let cancelled = false;
    setIsEstimating(true);

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const result = await processImageCore(source.file, {
            width: source.width,
            height: source.height,
            format: outputFormat,
            quality: qualityNormalized,
            stripMetadata,
            canvas: canvasRef.current,
          });

          if (cancelled) return;
          setEstimatedSize(result.blob.size);
        } catch {
          if (!cancelled) setEstimatedSize(null);
        } finally {
          if (!cancelled) setIsEstimating(false);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, quality, outputFormat, qualityNormalized, stripMetadata, canvasRef]);

  const handleCompress = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: outputFormat,
      quality: qualityNormalized,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-optimized`, result.format),
      { stripMetadata },
    );
  }, [
    source,
    outputFormat,
    qualityNormalized,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const canCompress = !!source && !isProcessing;
  const originalSize = source?.file.size ?? 0;
  const savings =
    estimatedSize !== null && originalSize > 0
      ? Math.max(0, Math.round((1 - estimatedSize / originalSize) * 100))
      : null;

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        <div
          className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
            isDragging
              ? "border-accent bg-accent-muted"
              : "border-[#333] bg-background hover:border-muted"
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
            const file = event.dataTransfer.files[0];
            handleFileChange(file ?? null);
          }}
        >
          <input
            id="compressor-upload"
            type="file"
            accept="image/*"
            aria-label="Upload image"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(event) => {
              handleFileChange(event.target.files?.[0] ?? null);
              event.target.value = "";
            }}
          />
          {source ? (
            <div className="pointer-events-none flex w-full flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="Preview"
                className="max-h-40 max-w-full rounded-sm border border-[#333] object-contain sm:max-h-48"
              />
              <p className="max-w-full truncate px-2 text-center font-mono text-xs text-muted">
                {source.width} × {source.height}px · {source.file.name}
              </p>
            </div>
          ) : (
            <div className="pointer-events-none px-2 text-center">
              <p className="font-label text-muted">Upload</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Drop an image here or tap to browse
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                PNG · JPEG · WebP
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="compressor-quality" className="font-label text-muted">
              Quality
            </label>
            <span className="font-mono text-sm tabular-nums text-foreground">
              {quality}%
            </span>
          </div>
          <input
            id="compressor-quality"
            type="range"
            min={0}
            max={100}
            step={1}
            value={quality}
            disabled={!source}
            onChange={(event) => setQuality(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex justify-between font-mono text-[10px] text-muted">
            <span>Smaller file</span>
            <span>Higher quality</span>
          </div>
        </div>

        <div className="mt-5 border-t border-[#333] pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
        </div>

        {source && (
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#333] pt-5">
            <div className="space-y-1">
              <p className="font-label text-muted">Original Size</p>
              <p className="font-mono text-sm text-foreground">
                {formatFileSize(originalSize)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-label text-muted">Estimated Size</p>
              <p className="font-mono text-sm text-foreground">
                {isEstimating
                  ? "Calculating…"
                  : estimatedSize !== null
                    ? formatFileSize(estimatedSize)
                    : "—"}
              </p>
            </div>
          </div>
        )}

        {source && savings !== null && !isEstimating && (
          <p className="mt-3 font-mono text-xs text-accent">
            ~{savings}% reduction
          </p>
        )}

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={!canCompress}
          onClick={() => void handleCompress()}
          className="mt-5 min-h-11 w-full rounded-sm border border-[#333] bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isProcessing ? "Processing…" : "Download Optimized"}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
