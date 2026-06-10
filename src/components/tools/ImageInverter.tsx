"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { renderInvertedCanvas } from "@/lib/invertRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

export function ImageInverter() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [inverted, setInverted] = useState(true);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setInverted(true);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderInvertedCanvas(
        image,
        source.width,
        source.height,
        inverted,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, inverted]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;
    const suffix = inverted ? "inverted" : "original";

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-${suffix}`, format),
      { format, quality, stripMetadata },
    );
  }, [source, inverted, stripMetadata, handleDownload]);

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

  const canDownload = !!source && !isProcessing;

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
              id="image-inverter-upload"
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
                Negative effect · color swap · masks
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="image-inverter-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="image-inverter-replace"
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
                {inverted ? "Inverted" : "Original"}
              </span>
            </div>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[min(50vh,420px)] max-w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to preview the inverted result.
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px · {source.file.name}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                disabled={!source}
                checked={inverted}
                onChange={(event) => setInverted(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded-sm border border-[#333] bg-background accent-accent disabled:opacity-50"
              />
              <span className="font-label text-muted">Invert colors</span>
            </label>
            <p className="font-mono text-[10px] leading-relaxed text-muted">
              Swaps each RGB channel to its complement (255 − value). Alpha is
              preserved.
            </p>
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
          isProcessing={isProcessing}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Inversion runs locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
