"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  type CropRegion,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

type AspectPreset = "free" | "1:1" | "16:9" | "4:3";

const ASPECT_PRESETS: { id: AspectPreset; ratio: number | null }[] = [
  { id: "free", ratio: null },
  { id: "1:1", ratio: 1 },
  { id: "16:9", ratio: 16 / 9 },
  { id: "4:3", ratio: 4 / 3 },
];

const buttonClassName =
  "min-h-9 rounded-sm border border-border px-3 py-1.5 font-label text-muted transition-colors hover:border-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

const activeButtonClassName =
  "border-accent/40 bg-accent-muted text-accent";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function createInitialCrop(
  imageWidth: number,
  imageHeight: number,
  aspect: number | null,
): CropRegion {
  if (!aspect) {
    const margin = 0.1;
    return {
      x: Math.round(imageWidth * margin),
      y: Math.round(imageHeight * margin),
      width: Math.round(imageWidth * (1 - margin * 2)),
      height: Math.round(imageHeight * (1 - margin * 2)),
    };
  }

  let cropWidth = imageWidth * 0.8;
  let cropHeight = cropWidth / aspect;

  if (cropHeight > imageHeight * 0.8) {
    cropHeight = imageHeight * 0.8;
    cropWidth = cropHeight * aspect;
  }

  return {
    x: Math.round((imageWidth - cropWidth) / 2),
    y: Math.round((imageHeight - cropHeight) / 2),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight),
  };
}

function fitCropToAspect(
  crop: CropRegion,
  imageWidth: number,
  imageHeight: number,
  aspect: number | null,
): CropRegion {
  if (!aspect) return crop;

  const centerX = crop.x + crop.width / 2;
  const centerY = crop.y + crop.height / 2;

  let width = crop.width;
  let height = width / aspect;

  if (height > imageHeight) {
    height = imageHeight;
    width = height * aspect;
  }

  if (width > imageWidth) {
    width = imageWidth;
    height = width / aspect;
  }

  let x = centerX - width / 2;
  let y = centerY - height / 2;

  x = clamp(x, 0, imageWidth - width);
  y = clamp(y, 0, imageHeight - height);

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

function clampCrop(
  crop: CropRegion,
  imageWidth: number,
  imageHeight: number,
): CropRegion {
  const width = clamp(crop.width, 1, imageWidth);
  const height = clamp(crop.height, 1, imageHeight);
  const x = clamp(crop.x, 0, imageWidth - width);
  const y = clamp(crop.y, 0, imageHeight - height);

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

type DragMode = "move" | "resize-se" | "resize-sw" | "resize-ne" | "resize-nw";

export function Cropper() {
  const { t } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
    handleCopyToClipboard,
  } = useImageProcessor();

  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startCrop: CropRegion;
  } | null>(null);

  const [crop, setCrop] = useState<CropRegion | null>(null);
  const [aspectPreset, setAspectPreset] = useState<AspectPreset>("free");
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const aspectRatio =
    ASPECT_PRESETS.find((preset) => preset.id === aspectPreset)?.ratio ?? null;

  const updateDisplaySize = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    setDisplaySize({
      width: image.clientWidth,
      height: image.clientHeight,
    });
  }, []);

  useEffect(() => {
    if (!source) {
      setCrop(null);
      return;
    }

    setCrop(createInitialCrop(source.width, source.height, aspectRatio));
  }, [source]);

  useEffect(() => {
    if (!source) return;

    setCrop((current) =>
      current
        ? fitCropToAspect(current, source.width, source.height, aspectRatio)
        : createInitialCrop(source.width, source.height, aspectRatio),
    );
  }, [aspectPreset, aspectRatio, source]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    updateDisplaySize();

    const observer = new ResizeObserver(updateDisplaySize);
    observer.observe(image);

    return () => observer.disconnect();
  }, [source, updateDisplaySize]);

  const scale =
    source && displaySize.width > 0 ? displaySize.width / source.width : 1;

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const toNaturalDelta = useCallback(
    (deltaX: number, deltaY: number) => ({
      x: deltaX / scale,
      y: deltaY / scale,
    }),
    [scale],
  );

  const startDrag = useCallback(
    (mode: DragMode, clientX: number, clientY: number) => {
      if (!crop) return;

      dragRef.current = {
        mode,
        startX: clientX,
        startY: clientY,
        startCrop: crop,
      };
    },
    [crop],
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current || !source) return;

      const { mode, startX, startY, startCrop } = dragRef.current;
      const delta = toNaturalDelta(event.clientX - startX, event.clientY - startY);

      let next = { ...startCrop };

      if (mode === "move") {
        next.x = startCrop.x + delta.x;
        next.y = startCrop.y + delta.y;
      } else {
        if (mode.includes("e")) {
          next.width = startCrop.width + delta.x;
        }
        if (mode.includes("w")) {
          next.x = startCrop.x + delta.x;
          next.width = startCrop.width - delta.x;
        }
        if (mode.includes("s")) {
          next.height = startCrop.height + delta.y;
        }
        if (mode.includes("n")) {
          next.y = startCrop.y + delta.y;
          next.height = startCrop.height - delta.y;
        }

        if (aspectRatio) {
          next.height = next.width / aspectRatio;
          if (mode.includes("n")) {
            next.y = startCrop.y + startCrop.height - next.height;
          }
        }

        if (next.width < 1) next.width = 1;
        if (next.height < 1) next.height = 1;
      }

      next = clampCrop(next, source.width, source.height);

      if (aspectRatio) {
        next = fitCropToAspect(next, source.width, source.height, aspectRatio);
      }

      setCrop(next);
    };

    const onPointerUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [source, aspectRatio, toNaturalDelta]);

  const runCrop = useCallback(async () => {
    if (!source || !crop) return null;

    const cropRegion = clampCrop(crop, source.width, source.height);

    return processImage(source.file, {
      width: cropRegion.width,
      height: cropRegion.height,
      crop: cropRegion,
      format: resolveFormat(source.mimeType),
      stripMetadata,
      canvas: canvasRef.current,
    });
  }, [source, crop, stripMetadata, processImage, canvasRef]);

  const handleCropDownload = useCallback(async () => {
    const result = await runCrop();
    if (!result || !source) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-cropped`, result.format),
      { stripMetadata },
    );
  }, [runCrop, source, stripMetadata, handleDownload]);

  const handleCropCopy = useCallback(async () => {
    const result = await runCrop();
    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [runCrop, stripMetadata, handleCopyToClipboard]);

  const canCrop =
    !!source && !!crop && crop.width > 0 && crop.height > 0 && !isProcessing;

  const displayCrop = crop
    ? {
        x: crop.x * scale,
        y: crop.y * scale,
        width: crop.width * scale,
        height: crop.height * scale,
      }
    : null;

  const cropSizeDisplay =
    crop && source
      ? `${crop.width} × ${crop.height}px`
      : t("toolUi.cropper.cropPlaceholder");

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!crop && crop.width > 0 && crop.height > 0,
        isProcessing,
        isReady: canCrop,
      }}
    >
        {!source ? (
          <ToolStyledUploadZone
            inputId="cropper-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
          />
        ) : (
          <div className="space-y-4 rounded-sm border border-border bg-background p-2 sm:p-3">
            <div className="flex justify-center">
              <div className="relative inline-block max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  src={source.url}
                  alt={t("alt.cropPreview")}
                  draggable={false}
                  onLoad={updateDisplaySize}
                  className="character-pixelated block h-auto max-h-[min(60vh,480px)] w-auto max-w-full select-none"
                />

                {displayCrop && displaySize.width > 0 && (
                  <div className="absolute inset-0 touch-none">
                    <div
                      className="absolute inset-0 bg-black/55"
                      style={{
                        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${displayCrop.x}px ${displayCrop.y}px, ${displayCrop.x}px ${displayCrop.y + displayCrop.height}px, ${displayCrop.x + displayCrop.width}px ${displayCrop.y + displayCrop.height}px, ${displayCrop.x + displayCrop.width}px ${displayCrop.y}px, ${displayCrop.x}px ${displayCrop.y}px)`,
                      }}
                    />

                    <div
                      className="absolute border border-accent"
                      style={{
                        left: displayCrop.x,
                        top: displayCrop.y,
                        width: displayCrop.width,
                        height: displayCrop.height,
                        boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
                      }}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        (event.currentTarget as HTMLElement).setPointerCapture(
                          event.pointerId,
                        );
                        startDrag("move", event.clientX, event.clientY);
                      }}
                    >
                      {(
                        [
                          ["resize-nw", "left-0 top-0 -translate-x-1/2 -translate-y-1/2"],
                          ["resize-ne", "right-0 top-0 translate-x-1/2 -translate-y-1/2"],
                          ["resize-sw", "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"],
                          ["resize-se", "bottom-0 right-0 translate-x-1/2 translate-y-1/2"],
                        ] as const
                      ).map(([mode, position]) => (
                        <div
                          key={mode}
                          className={`absolute h-3 w-3 rounded-sm border border-accent bg-background ${position}`}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            (event.currentTarget as HTMLElement).setPointerCapture(
                              event.pointerId,
                            );
                            startDrag(mode, event.clientX, event.clientY);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center font-mono text-xs text-muted">
              {source.width} × {source.height}px
            </p>
          </div>
        )}

        <ToolFieldsStage
          robotAlt={t("characters.robotAlt")}
          widthAlt={t("characters.widthAlt")}
          fields={[
            {
              label: t("toolUi.cropper.aspectRatio"),
              englishLabel: "Aspect",
              htmlFor: "cropper-aspect-free",
              children: (
                <div className="flex flex-wrap gap-2 px-1 py-2.5">
                  {ASPECT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      id={preset.id === "free" ? "cropper-aspect-free" : undefined}
                      type="button"
                      disabled={!source}
                      onClick={() => setAspectPreset(preset.id)}
                      className={`${buttonClassName} ${
                        aspectPreset === preset.id
                          ? activeButtonClassName
                          : "bg-background"
                      }`}
                    >
                      {preset.id === "free"
                        ? t("toolUi.cropper.free")
                        : preset.id}
                    </button>
                  ))}
                </div>
              ),
            },
            {
              label: t("toolUi.cropper.cropSize"),
              englishLabel: "Crop",
              htmlFor: "cropper-size-preview",
              accentClass: "text-[var(--glow-purple)]",
              children: (
                <output
                  id="cropper-size-preview"
                  className={`tool-input block truncate border-transparent bg-transparent ${
                    !source ? "text-muted" : ""
                  }`}
                >
                  {cropSizeDisplay}
                </output>
              ),
            },
          ]}
        />

        <div className="mt-2 flex justify-end border-t border-border pt-5 rtl:justify-start">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
        </div>

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <ToolOutputActions
          onDownload={handleCropDownload}
          onCopy={handleCropCopy}
          downloadLabel={t("downloads.cropAndDownload")}
          disabled={!canCrop}
          isProcessing={isProcessing}
        />
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
