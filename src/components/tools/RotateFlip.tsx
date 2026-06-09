"use client";

import { useCallback, useEffect, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import {
  buildDownloadFilename,
  getTransformedDimensions,
  type ImageTransform,
  type RotationDegrees,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const buttonClassName =
  "min-h-10 rounded-sm border border-[#333] bg-background px-3 py-2 font-label text-muted transition-colors hover:border-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

export function RotateFlip() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
  } = useImageProcessor();

  const [rotation, setRotation] = useState<RotationDegrees>(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const transform: ImageTransform = {
    rotation,
    flipHorizontal,
    flipVertical,
  };

  const outputDimensions = source
    ? getTransformedDimensions(source.width, source.height, rotation)
    : null;

  useEffect(() => {
    if (!source) {
      setRotation(0);
      setFlipHorizontal(false);
      setFlipVertical(false);
    }
  }, [source]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const rotateClockwise = useCallback(() => {
    setRotation((current) => ((current + 90) % 360) as RotationDegrees);
  }, []);

  const rotateCounterClockwise = useCallback(() => {
    setRotation((current) => ((current + 270) % 360) as RotationDegrees);
  }, []);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !outputDimensions) return;

    const result = await processImage(source.file, {
      width: outputDimensions.width,
      height: outputDimensions.height,
      format: resolveFormat(source.mimeType),
      transform,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-transformed`, result.format),
      { stripMetadata },
    );
  }, [
    source,
    outputDimensions,
    rotation,
    flipHorizontal,
    flipVertical,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const canDownload = !!source && !isProcessing;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        {!source ? (
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
              handleFileChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <input
              id="rotate-flip-upload"
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
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                type="button"
                onClick={rotateClockwise}
                className={buttonClassName}
              >
                Rotate 90° CW
              </button>
              <button
                type="button"
                onClick={rotateCounterClockwise}
                className={buttonClassName}
              >
                Rotate 90° CCW
              </button>
              <button
                type="button"
                onClick={() => setFlipHorizontal((value) => !value)}
                className={`${buttonClassName} ${
                  flipHorizontal ? "border-accent/40 bg-accent-muted text-accent" : ""
                }`}
              >
                Flip Horizontal
              </button>
              <button
                type="button"
                onClick={() => setFlipVertical((value) => !value)}
                className={`${buttonClassName} ${
                  flipVertical ? "border-accent/40 bg-accent-muted text-accent" : ""
                }`}
              >
                Flip Vertical
              </button>
            </div>

            <div className="mt-5 flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-4 sm:min-h-56">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="Transform preview"
                draggable={false}
                className="max-h-[min(50vh,420px)] max-w-full select-none object-contain transition-transform duration-200"
                style={{
                  transform: `rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
                }}
              />
            </div>

            <p className="mt-3 text-center font-mono text-xs text-muted">
              {outputDimensions
                ? `${outputDimensions.width} × ${outputDimensions.height}px`
                : "—"}
              {" · "}
              {source.file.name}
            </p>
          </>
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
          disabled={!canDownload}
          onClick={() => void handleDownloadImage()}
          className="mt-5 min-h-11 w-full rounded-sm border border-[#333] bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isProcessing ? "Processing…" : "Download Transformed"}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
