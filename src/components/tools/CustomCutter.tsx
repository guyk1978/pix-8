"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { WorkspaceImageFilmstrip } from "@/components/ui/WorkspaceImageFilmstrip";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  resolveFormat,
  type CropRegion,
  type ImageFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
import {
  exportCustomCutterCanvas,
  renderKeepSelectionCanvas,
  renderRemoveSelectionCanvas,
} from "@/lib/customCutterRender";
import {
  applyDragDelta,
  clampCrop,
  clientPointToNatural,
  getDisplayScale,
  hitTestSelection,
  MIN_SELECTION_SIZE,
  naturalToDisplayCrop,
  rectFromPoints,
  type CustomCutterDragMode,
} from "@/lib/customCutterSelection";

const actionButtonClassName =
  "min-h-10 rounded-sm border border-border px-4 py-2.5 font-label text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

const primaryActionClassName =
  "border-accent/40 bg-accent-muted text-accent hover:bg-accent/20";

const secondaryActionClassName =
  "bg-background text-foreground hover:border-muted hover:text-foreground";

interface DragState {
  mode: CustomCutterDragMode;
  startX: number;
  startY: number;
  startCrop: CropRegion;
  drawEndX?: number;
  drawEndY?: number;
}

export function CustomCutter() {
  const { t } = useLanguage();
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const [selection, setSelection] = useState<CropRegion | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [outputFormat, setOutputFormat] = useState<ImageFormat>("png");
  const [overlayCursor, setOverlayCursor] = useState("crosshair");

  useImageToolProject({
    toolId: "custom-cutter",
    source,
    loadFile,
    getExtraPayload: () => ({
      stripMetadata,
      selection,
      outputFormat,
    }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      if (payload.selection && typeof payload.selection === "object") {
        setSelection(payload.selection as CropRegion);
      }
      if (typeof payload.outputFormat === "string") {
        setOutputFormat(payload.outputFormat as ImageFormat);
      }
    },
  });

  const scale =
    source && displaySize.width > 0
      ? getDisplayScale(source.width, displaySize.width)
      : 1;

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
      setSelection(null);
      setOutputFormat("png");
      return;
    }

    setOutputFormat(resolveFormat(source.mimeType));
  }, [source]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    updateDisplaySize();

    const observer = new ResizeObserver(updateDisplaySize);
    observer.observe(image);

    return () => observer.disconnect();
  }, [source, updateDisplaySize]);

  const getImageRect = useCallback((): DOMRect | null => {
    return imageRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const toNaturalPoint = useCallback(
    (clientX: number, clientY: number) => {
      const rect = getImageRect();
      if (!rect) return { x: 0, y: 0 };
      return clientPointToNatural(clientX, clientY, rect, scale);
    },
    [getImageRect, scale],
  );

  const toNaturalDelta = useCallback(
    (deltaX: number, deltaY: number) => ({
      x: deltaX / scale,
      y: deltaY / scale,
    }),
    [scale],
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSelection(null);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  const handleResetSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const applyResultBlob = useCallback(
    async (blob: Blob, format: ImageFormat, suffix: string) => {
      if (!source) return;

      const extension = format === "jpeg" ? "jpg" : format;
      const file = new File([blob], `${source.name}-${suffix}.${extension}`, {
        type: blob.type,
      });

      setSelection(null);
      setOutputFormat(format);
      await loadFile(file);
    },
    [loadFile, source],
  );

  const handleKeepSelection = useCallback(async () => {
    const image = imageRef.current;
    if (!image || !source || !selection) return;

    const crop = clampCrop(selection, source.width, source.height);
    const canvas = renderKeepSelectionCanvas(image, crop);
    const format = resolveFormat(source.mimeType);
    const blob = await exportCustomCutterCanvas(canvas, format);
    await applyResultBlob(blob, format, "kept");
  }, [applyResultBlob, selection, source]);

  const handleRemoveSelection = useCallback(async () => {
    const image = imageRef.current;
    if (!image || !source || !selection) return;

    const crop = clampCrop(selection, source.width, source.height);
    const canvas = renderRemoveSelectionCanvas(image, crop);
    const blob = await exportCustomCutterCanvas(canvas, "png");
    await applyResultBlob(blob, "png", "cutout");
  }, [applyResultBlob, selection, source]);

  const handleExportDownload = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: outputFormat,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-custom-cut`, result.format),
      { stripMetadata, format: outputFormat },
    );
  }, [canvasRef, handleDownload, outputFormat, processImage, source, stripMetadata]);

  const handleExportCopy = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: outputFormat,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata, format: outputFormat });
  }, [
    canvasRef,
    handleCopyToClipboard,
    outputFormat,
    processImage,
    source,
    stripMetadata,
  ]);

  const handleOverlayPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!source) return;

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);

      const overlayRect = overlayRef.current?.getBoundingClientRect();
      if (!overlayRect) return;

      const localX = event.clientX - overlayRect.left;
      const localY = event.clientY - overlayRect.top;

      if (selection) {
        const hit = hitTestSelection(localX, localY, selection, scale);
        if (hit) {
          dragRef.current = {
            mode: hit,
            startX: event.clientX,
            startY: event.clientY,
            startCrop: selection,
          };
          return;
        }
      }

      const natural = toNaturalPoint(event.clientX, event.clientY);
      dragRef.current = {
        mode: "draw",
        startX: natural.x,
        startY: natural.y,
        startCrop: {
          x: natural.x,
          y: natural.y,
          width: 0,
          height: 0,
        },
        drawEndX: natural.x,
        drawEndY: natural.y,
      };
      setSelection({
        x: natural.x,
        y: natural.y,
        width: 0,
        height: 0,
      });
    },
    [scale, selection, source, toNaturalPoint],
  );

  const handleOverlayPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!source) return;

      const overlayRect = overlayRef.current?.getBoundingClientRect();
      if (!overlayRect) return;

      const localX = event.clientX - overlayRect.left;
      const localY = event.clientY - overlayRect.top;

      if (!dragRef.current) {
        if (selection) {
          const hit = hitTestSelection(localX, localY, selection, scale);
          if (hit?.startsWith("resize-ne") || hit?.startsWith("resize-sw")) {
            setOverlayCursor("nesw-resize");
          } else if (hit?.startsWith("resize-nw") || hit?.startsWith("resize-se")) {
            setOverlayCursor("nwse-resize");
          } else if (hit === "move") {
            setOverlayCursor("move");
          } else {
            setOverlayCursor("crosshair");
          }
        } else {
          setOverlayCursor("crosshair");
        }
        return;
      }

      const drag = dragRef.current;

      if (drag.mode === "draw") {
        const natural = toNaturalPoint(event.clientX, event.clientY);
        drag.drawEndX = natural.x;
        drag.drawEndY = natural.y;

        const next = rectFromPoints(
          drag.startX,
          drag.startY,
          natural.x,
          natural.y,
        );
        setSelection(clampCrop(next, source.width, source.height));
        return;
      }

      const delta = toNaturalDelta(
        event.clientX - drag.startX,
        event.clientY - drag.startY,
      );

      setSelection(
        applyDragDelta(
          drag.mode,
          drag.startCrop,
          delta.x,
          delta.y,
          source.width,
          source.height,
        ),
      );
    },
    [scale, selection, source, toNaturalDelta, toNaturalPoint],
  );

  const handleOverlayPointerUp = useCallback(() => {
    if (!source || !dragRef.current) return;

    if (dragRef.current.mode === "draw") {
      setSelection((current) => {
        if (!current) return null;
        const clamped = clampCrop(current, source.width, source.height);
        if (
          clamped.width < MIN_SELECTION_SIZE ||
          clamped.height < MIN_SELECTION_SIZE
        ) {
          return null;
        }
        return clamped;
      });
    }

    dragRef.current = null;
  }, [source]);

  useEffect(() => {
    const onPointerUp = () => {
      if (dragRef.current) {
        handleOverlayPointerUp();
      }
    };

    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [handleOverlayPointerUp]);

  const displaySelection =
    selection && displaySize.width > 0
      ? naturalToDisplayCrop(selection, scale)
      : null;

  const hasValidSelection =
    !!selection &&
    selection.width >= MIN_SELECTION_SIZE &&
    selection.height >= MIN_SELECTION_SIZE;

  const selectionSizeLabel = hasValidSelection
    ? t("toolUi.customCutter.selectionSize", {
        width: selection!.width,
        height: selection!.height,
      })
    : t("toolUi.customCutter.selectionPlaceholder");

  const canExport = !!source && !isProcessing;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: hasValidSelection,
        isProcessing,
        isReady: canExport,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="custom-cutter-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
        />
      ) : (
        <div className="custom-cutter-stage space-y-4 rounded-sm border border-border bg-background p-2 sm:p-3">
          <div className="flex justify-center">
            <div className="relative inline-block max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={source.url}
                alt={t("alt.customCutterPreview")}
                draggable={false}
                onLoad={updateDisplaySize}
                className="custom-cutter-image character-pixelated block h-auto max-h-[min(60vh,480px)] w-auto max-w-full select-none"
              />

              <div
                ref={overlayRef}
                className="custom-cutter-overlay absolute inset-0 touch-none"
                style={{ cursor: overlayCursor }}
                onPointerDown={handleOverlayPointerDown}
                onPointerMove={handleOverlayPointerMove}
                onPointerUp={handleOverlayPointerUp}
                onPointerLeave={() => {
                  if (!dragRef.current) setOverlayCursor("crosshair");
                }}
              >
                {displaySelection &&
                  displaySelection.width > 0 &&
                  displaySelection.height > 0 && (
                    <>
                      <div
                        className="absolute inset-0 bg-black/55"
                        style={{
                          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${displaySelection.x}px ${displaySelection.y}px, ${displaySelection.x}px ${displaySelection.y + displaySelection.height}px, ${displaySelection.x + displaySelection.width}px ${displaySelection.y + displaySelection.height}px, ${displaySelection.x + displaySelection.width}px ${displaySelection.y}px, ${displaySelection.x}px ${displaySelection.y}px)`,
                        }}
                      />

                      <div
                        className="absolute border-2 border-[var(--glow-teal)]"
                        style={{
                          left: displaySelection.x,
                          top: displaySelection.y,
                          width: displaySelection.width,
                          height: displaySelection.height,
                          boxShadow: "0 0 0 1px rgba(0,0,0,0.35)",
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
                            className={`absolute h-2 w-2 border border-border bg-card ${position}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>

          <p className="text-center font-mono text-xs text-muted">{selectionSizeLabel}</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={!hasValidSelection || isProcessing}
              onClick={() => void handleKeepSelection()}
              className={`${actionButtonClassName} ${primaryActionClassName}`}
            >
              {t("toolUi.customCutter.keepSelection")}
            </button>
            <button
              type="button"
              disabled={!hasValidSelection || isProcessing}
              onClick={() => void handleRemoveSelection()}
              className={`${actionButtonClassName} ${secondaryActionClassName}`}
            >
              {t("toolUi.customCutter.removeSelection")}
            </button>
            <button
              type="button"
              disabled={!hasValidSelection || isProcessing}
              onClick={handleResetSelection}
              className={`${actionButtonClassName} font-label text-muted hover:text-foreground`}
            >
              {t("toolUi.customCutter.reset")}
            </button>
          </div>

          <p className="text-center text-xs leading-relaxed text-muted">
            {t("toolUi.customCutter.hintDraw")}
          </p>

          {!embeddedToolbarLayout ? <WorkspaceImageFilmstrip /> : null}
        </div>
      )}

      <StripMetadataToggle
        checked={stripMetadata}
        disabled={!source}
        onChange={setStripMetadata}
      />

      {error ? <HelperErrorAlert message={error} /> : null}

      <ToolOutputActions
        onDownload={handleExportDownload}
        onCopy={handleExportCopy}
        downloadLabel={t("common.downloadImage")}
        disabled={!canExport}
        isProcessing={isProcessing}
      />
    </ToolWorkspace>
  );
}
