"use client";

import { useCallback, useEffect, useState } from "react";
import { buildDownloadFilename, resolveFormat, useImageProcessor } from "@/hooks/useImageProcessor";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground tabular-nums outline-none transition-colors placeholder:text-muted focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

export function Resizer() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
  } = useImageProcessor();

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const aspectRatio =
    source && source.height > 0 ? source.width / source.height : 1;

  useEffect(() => {
    if (!source) {
      setWidth("");
      setHeight("");
      return;
    }

    setWidth(String(source.width));
    setHeight(String(source.height));
  }, [source]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleWidthChange = useCallback(
    (value: string) => {
      setWidth(value);
      if (!lockAspectRatio || !value) return;

      const nextWidth = Number(value);
      if (!Number.isFinite(nextWidth) || nextWidth <= 0) return;

      setHeight(String(Math.round(nextWidth / aspectRatio)));
    },
    [lockAspectRatio, aspectRatio],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setHeight(value);
      if (!lockAspectRatio || !value) return;

      const nextHeight = Number(value);
      if (!Number.isFinite(nextHeight) || nextHeight <= 0) return;

      setWidth(String(Math.round(nextHeight * aspectRatio)));
    },
    [lockAspectRatio, aspectRatio],
  );

  const handleResize = useCallback(async () => {
    const targetWidth = Math.round(Number(width));
    const targetHeight = Math.round(Number(height));

    if (
      !source ||
      !Number.isFinite(targetWidth) ||
      !Number.isFinite(targetHeight) ||
      targetWidth <= 0 ||
      targetHeight <= 0
    ) {
      return;
    }

    const result = await processImage(source.file, {
      width: targetWidth,
      height: targetHeight,
      format: resolveFormat(source.mimeType),
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-resized`, result.format),
      { stripMetadata },
    );
  }, [source, width, height, stripMetadata, processImage, handleDownload, canvasRef]);

  const parsedWidth = Number(width);
  const parsedHeight = Number(height);
  const canResize =
    !!source &&
    Number.isFinite(parsedWidth) &&
    Number.isFinite(parsedHeight) &&
    parsedWidth > 0 &&
    parsedHeight > 0 &&
    !isProcessing;

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
            id="resizer-upload"
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

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="resizer-width" className="font-label text-muted">
              Width
            </label>
            <input
              id="resizer-width"
              type="number"
              inputMode="numeric"
              min={1}
              value={width}
              disabled={!source}
              onChange={(event) => handleWidthChange(event.target.value)}
              className={inputClassName}
              placeholder="—"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="resizer-height" className="font-label text-muted">
              Height
            </label>
            <input
              id="resizer-height"
              type="number"
              inputMode="numeric"
              min={1}
              value={height}
              disabled={!source}
              onChange={(event) => handleHeightChange(event.target.value)}
              className={inputClassName}
              placeholder="—"
            />
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-[#333] pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={lockAspectRatio}
              disabled={!source}
              onChange={(event) => setLockAspectRatio(event.target.checked)}
              className="h-4 w-4 shrink-0 rounded-sm border border-[#333] bg-background accent-accent"
            />
            <span className="font-label text-muted">Maintain Aspect Ratio</span>
          </label>

          {source && lockAspectRatio && (
            <span className="font-mono text-xs tabular-nums text-muted sm:text-right">
              {aspectRatio.toFixed(3)} : 1
            </span>
          )}
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={!canResize}
          onClick={() => void handleResize()}
          className="mt-5 min-h-11 w-full rounded-sm border border-[#333] bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isProcessing ? "Processing…" : "Resize & Download"}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
