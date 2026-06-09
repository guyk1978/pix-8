"use client";

import { useCallback, useEffect, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import {
  type ImageFormat,
  buildDownloadFilename,
  formatToExtension,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

const FORMAT_OPTIONS: { label: string; value: ImageFormat }[] = [
  { label: "JPG", value: "jpeg" },
  { label: "PNG", value: "png" },
  { label: "WebP", value: "webp" },
];

export function Converter() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
  } = useImageProcessor();

  const [targetFormat, setTargetFormat] = useState<ImageFormat>("jpeg");
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!source) return;
    setTargetFormat(resolveFormat(source.mimeType));
  }, [source]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleConvert = useCallback(async () => {
    if (!source) return;

    const quality =
      targetFormat === "jpeg" || targetFormat === "webp" ? 0.92 : undefined;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: targetFormat,
      quality,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(source.name, result.format),
      { stripMetadata },
    );
  }, [
    source,
    targetFormat,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const canConvert = !!source && !isProcessing;
  const outputExtension = formatToExtension(targetFormat);

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
            id="converter-upload"
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

        <div className="mt-5 space-y-2">
          <label htmlFor="converter-format" className="font-label text-muted">
            Target Format
          </label>
          <select
            id="converter-format"
            value={targetFormat}
            disabled={!source}
            onChange={(event) =>
              setTargetFormat(event.target.value as ImageFormat)
            }
            className={inputClassName}
          >
            {FORMAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {source && (
          <p className="mt-3 font-mono text-xs text-muted">
            Output: {source.name}.{outputExtension}
          </p>
        )}

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

        <button
          type="button"
          disabled={!canConvert}
          onClick={() => void handleConvert()}
          className="mt-5 min-h-11 w-full rounded-sm border border-[#333] bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isProcessing ? "Processing…" : "Convert & Download"}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
