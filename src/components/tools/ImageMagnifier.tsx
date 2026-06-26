"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { MagnifierMiniMap } from "@/components/tools/MagnifierMiniMap";
import { AppLink } from "@/components/layout/AppLink";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { SliderControl } from "@/components/ui/SliderControl";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { useToast } from "@/components/ui/ToastProvider";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  buildDownloadFilename,
  copyImageToClipboard,
  handleDownload,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { useToolExportSettings } from "@/hooks/useToolExportSettings";
import { useToolProject } from "@/hooks/useToolProject";
import { MAIN_IMAGE_KEY } from "@/lib/projects/types";
import {
  buildMagnifierToolState,
  buildRestoredViewState,
  getSourceFileKey,
  parseMagnifierProjectSettings,
  type MagnifierProjectSettings,
} from "@/lib/imageMagnifierProject";
import {
  centerOnImagePoint,
  createInitialViewState,
  getDisplayScale,
  getImageViewportRect,
  MAX_USER_ZOOM,
  MIN_USER_ZOOM,
  panView,
  type MagnifierViewState,
  zoomAtPoint,
} from "@/lib/imageMagnifierView";
import {
  copyCanvasToCanvas,
  DEFAULT_REFINEMENT_SETTINGS,
  drawImageToCanvas,
  renderRefinedCanvasFromSource,
  type RefinementSettings,
  type SharpenType,
} from "@/lib/sharpenRender";
import {
  buildMagnifierExportCanvas,
  createResultSnapshot,
  snapshotsMatch,
  type MagnifierResultSnapshot,
} from "@/lib/imageMagnifierExport";

const WHEEL_ZOOM_FACTOR = 1.12;
const SHARPEN_TYPES: SharpenType[] = ["adaptive", "high-pass", "unsharp-mask"];

interface PendingProjectRestore {
  settings: MagnifierProjectSettings;
  sourceKey: string;
  isResultMarked: boolean;
}

function shouldSkipViewReset(
  pendingRestore: PendingProjectRestore | null,
  skipViewReset: boolean,
): boolean {
  return skipViewReset || pendingRestore !== null;
}

export function ImageMagnifier() {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const { source, error, loadFile, setError } = useImageProcessor();

  const viewportRef = useRef<HTMLDivElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [sourceCanvasReady, setSourceCanvasReady] = useState(false);
  const isPanningRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [viewState, setViewState] = useState<MagnifierViewState>({
    fitScale: 1,
    userZoom: MIN_USER_ZOOM,
    translateX: 0,
    translateY: 0,
  });
  const [refinement, setRefinement] = useState<RefinementSettings>(
    DEFAULT_REFINEMENT_SETTINGS,
  );
  const [lockedSnapshot, setLockedSnapshot] =
    useState<MagnifierResultSnapshot | null>(null);
  const {
    stripMetadata,
    setStripMetadata,
    cornerRadius,
    setCornerRadius,
    downloadOptions,
  } = useToolExportSettings();
  const [isExporting, setIsExporting] = useState(false);
  const [settingsRevision, setSettingsRevision] = useState(0);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const pendingProjectRestoreRef = useRef<PendingProjectRestore | null>(null);
  const skipViewResetRef = useRef(false);
  const sourceCanvasGenerationRef = useRef(0);
  const readyCanvasGenerationRef = useRef(0);
  const restoredCanvasGenerationRef = useRef(0);

  const debouncedRefinement = useDebouncedValue(refinement, 150);

  const { isResultMarked, setIsResultMarked } = useToolProject({
    toolId: "magnifier",
    canSave: !!source,
    getToolState: () =>
      buildMagnifierToolState(viewState, refinement, stripMetadata, cornerRadius),
    getImages: () =>
      source ? [{ key: MAIN_IMAGE_KEY, file: source.file }] : [],
    restore: async (settings, files, meta) => {
      const file = files.get(MAIN_IMAGE_KEY);
      if (!file) return;

      const parsed = parseMagnifierProjectSettings(settings);
      if (parsed) {
        pendingProjectRestoreRef.current = {
          settings: parsed,
          sourceKey: getSourceFileKey(file),
          isResultMarked: meta.isResultMarked,
        };
        skipViewResetRef.current = true;
        restoredCanvasGenerationRef.current = 0;
      }

      await loadFile(file);
    },
    resultMarkHint: t("toolUi.magnifier.export.markHint"),
    resultMarkCheckboxId: "magnifier-mark-result",
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        pendingProjectRestoreRef.current = null;
        skipViewResetRef.current = false;
        restoredCanvasGenerationRef.current = 0;
        setIsComparing(false);
        setRefinement(DEFAULT_REFINEMENT_SETTINGS);
        setIsResultMarked(false);
        setLockedSnapshot(null);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  const renderPreviewCanvas = useCallback(
    (comparing: boolean, sharpenSettings: RefinementSettings) => {
      if (!sourceCanvasRef.current || !displayCanvasRef.current) {
        return;
      }

      const shouldShowOriginal =
        comparing ||
        !sharpenSettings.enabled ||
        sharpenSettings.intensity <= 0;

      if (shouldShowOriginal) {
        copyCanvasToCanvas(sourceCanvasRef.current, displayCanvasRef.current);
      } else {
        renderRefinedCanvasFromSource(
          sourceCanvasRef.current,
          sharpenSettings,
          displayCanvasRef.current,
        );
      }
    },
    [],
  );

  const handleCompareToggle = useCallback(() => {
    const next = !isComparing;
    setIsComparing(next);
    if (sourceCanvasReady) {
      renderPreviewCanvas(next, refinement);
    }
  }, [isComparing, refinement, renderPreviewCanvas, sourceCanvasReady]);

  const resetView = useCallback(() => {
    if (!source || !viewportRef.current) return;
    if (
      shouldSkipViewReset(
        pendingProjectRestoreRef.current,
        skipViewResetRef.current,
      )
    ) {
      return;
    }

    const { width, height } = viewportRef.current.getBoundingClientRect();
    setViewState(
      createInitialViewState(width, height, source.width, source.height),
    );
  }, [source]);

  useEffect(() => {
    if (!source || !viewportRef.current) return;

    const element = viewportRef.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setViewportSize({ width, height });
      if (
        !shouldSkipViewReset(
          pendingProjectRestoreRef.current,
          skipViewResetRef.current,
        )
      ) {
        setViewState(
          createInitialViewState(width, height, source.width, source.height),
        );
      }
    });

    observer.observe(element);
    const rect = element.getBoundingClientRect();
    setViewportSize({ width: rect.width, height: rect.height });
    if (
      !shouldSkipViewReset(
        pendingProjectRestoreRef.current,
        skipViewResetRef.current,
      )
    ) {
      setViewState(
        createInitialViewState(rect.width, rect.height, source.width, source.height),
      );
    }

    return () => observer.disconnect();
  }, [source]);

  useEffect(() => {
    if (!source) {
      setSourceCanvasReady(false);
      return;
    }

    const generation = ++sourceCanvasGenerationRef.current;
    setSourceCanvasReady(false);

    if (!sourceCanvasRef.current) return;

    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled || generation !== sourceCanvasGenerationRef.current) return;
      if (!sourceCanvasRef.current) return;

      drawImageToCanvas(
        image,
        source.width,
        source.height,
        sourceCanvasRef.current,
      );
      readyCanvasGenerationRef.current = generation;
      setSourceCanvasReady(true);
    };

    image.onerror = () => {
      if (!cancelled) {
        setError(t("toolUi.magnifier.refinement.loadFailed"));
      }
    };

    image.src = source.url;

    return () => {
      cancelled = true;
    };
  }, [source, setError, t]);

  useEffect(() => {
    const pending = pendingProjectRestoreRef.current;
    if (!pending || !source) return;

    let cancelled = false;
    let frameId = 0;

    const tryApplyRestore = () => {
      if (cancelled) return;

      const currentPending = pendingProjectRestoreRef.current;
      if (!currentPending) return;

      const generation = sourceCanvasGenerationRef.current;
      const viewportRect = viewportRef.current?.getBoundingClientRect();
      const viewportWidth = viewportRect?.width ?? viewportSize.width;
      const viewportHeight = viewportRect?.height ?? viewportSize.height;

      const canvasReady =
        sourceCanvasReady &&
        readyCanvasGenerationRef.current === generation &&
        restoredCanvasGenerationRef.current !== generation;
      const viewportReady = viewportWidth > 0 && viewportHeight > 0;
      const sourceMatches =
        getSourceFileKey(source.file) === currentPending.sourceKey;

      if (!canvasReady || !viewportReady || !sourceMatches) {
        frameId = window.requestAnimationFrame(tryApplyRestore);
        return;
      }

      const { settings, isResultMarked: restoredMarked } = currentPending;
      const restoredView = buildRestoredViewState(
        settings,
        viewportWidth,
        viewportHeight,
        source.width,
        source.height,
      );

      setViewportSize({ width: viewportWidth, height: viewportHeight });
      setViewState(restoredView);
      setRefinement(settings.sharpenSettings);
      setIsResultMarked(restoredMarked);

      if (restoredMarked) {
        setLockedSnapshot(
          createResultSnapshot(
            restoredView,
            settings.sharpenSettings,
            viewportWidth,
            viewportHeight,
          ),
        );
      } else {
        setLockedSnapshot(null);
      }

      if (typeof settings.stripMetadata === "boolean") {
        setStripMetadata(settings.stripMetadata);
      }
      if (typeof settings.cornerRadius === "number") {
        setCornerRadius(settings.cornerRadius);
      }

      renderPreviewCanvas(false, settings.sharpenSettings);
      setSettingsRevision((current) => current + 1);

      restoredCanvasGenerationRef.current = generation;
      pendingProjectRestoreRef.current = null;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          skipViewResetRef.current = false;
        });
      });
    };

    frameId = window.requestAnimationFrame(tryApplyRestore);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [
    source,
    sourceCanvasReady,
    viewportSize.width,
    viewportSize.height,
    renderPreviewCanvas,
    setIsResultMarked,
  ]);

  useEffect(() => {
    if (
      !source ||
      !sourceCanvasReady ||
      !sourceCanvasRef.current ||
      !displayCanvasRef.current
    ) {
      return;
    }

    if (pendingProjectRestoreRef.current) {
      return;
    }

    if (isComparing) {
      renderPreviewCanvas(true, refinement);
    }
  }, [isComparing, source, sourceCanvasReady, refinement, renderPreviewCanvas]);

  useEffect(() => {
    if (
      !source ||
      !sourceCanvasReady ||
      !sourceCanvasRef.current ||
      !displayCanvasRef.current
    ) {
      return;
    }

    if (pendingProjectRestoreRef.current) {
      return;
    }

    if (isComparing) {
      return;
    }

    const awaitingDebounceSync =
      restoredCanvasGenerationRef.current === sourceCanvasGenerationRef.current &&
      restoredCanvasGenerationRef.current > 0 &&
      JSON.stringify(debouncedRefinement) !== JSON.stringify(refinement);

    if (awaitingDebounceSync) {
      return;
    }

    let cancelled = false;
    setIsRefining(true);
    setError(null);

    const timer = window.setTimeout(() => {
      try {
        if (cancelled) return;
        renderPreviewCanvas(false, debouncedRefinement);
      } catch (cause) {
        if (!cancelled) {
          setError(
            resolveErrorMessage(
              language,
              cause,
              "toolUi.magnifier.refinement.failed",
            ),
          );
        }
      } finally {
        if (!cancelled) setIsRefining(false);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    source,
    sourceCanvasReady,
    debouncedRefinement,
    refinement,
    isComparing,
    language,
    setError,
    renderPreviewCanvas,
  ]);

  const displayScale = getDisplayScale(viewState);
  const zoomPercent = Math.round(viewState.userZoom * 100);

  const viewportRect = useMemo(() => {
    if (!source || viewportSize.width <= 0 || viewportSize.height <= 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    return getImageViewportRect(
      viewState,
      viewportSize.width,
      viewportSize.height,
      source.width,
      source.height,
    );
  }, [source, viewState, viewportSize]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!source || !viewportRef.current) return;

      event.preventDefault();

      const rect = viewportRef.current.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextZoom =
        direction > 0
          ? viewState.userZoom * WHEEL_ZOOM_FACTOR
          : viewState.userZoom / WHEEL_ZOOM_FACTOR;

      setViewState((current) => ({
        ...current,
        ...zoomAtPoint(
          current,
          rect.width,
          rect.height,
          source.width,
          source.height,
          pointerX,
          pointerY,
          nextZoom,
        ),
      }));
    },
    [source, viewState.userZoom],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!source || !viewport) return;

    const handleNativeWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    viewport.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleNativeWheel);
  }, [source]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!source || viewState.userZoom <= MIN_USER_ZOOM) return;

      isPanningRef.current = true;
      setIsPanning(true);
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [source, viewState.userZoom],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanningRef.current) return;

      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      setViewState((current) => ({
        ...current,
        ...panView(current, deltaX, deltaY),
      }));
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isPanningRef.current = false;
      setIsPanning(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleZoomSlider = useCallback(
    (percent: number) => {
      if (!source || !viewportRef.current) return;

      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setViewState((current) => ({
        ...current,
        ...zoomAtPoint(
          current,
          rect.width,
          rect.height,
          source.width,
          source.height,
          centerX,
          centerY,
          percent / 100,
        ),
      }));
    },
    [source],
  );

  const handleMiniMapNavigate = useCallback(
    (imageX: number, imageY: number) => {
      if (!source || !viewportRef.current) return;

      const rect = viewportRef.current.getBoundingClientRect();
      setViewState((current) => ({
        ...current,
        ...centerOnImagePoint(
          current,
          rect.width,
          rect.height,
          imageX,
          imageY,
        ),
      }));
    },
    [source],
  );

  const patchRefinement = useCallback((patch: Partial<RefinementSettings>) => {
    setRefinement((current) => ({ ...current, ...patch }));
  }, []);

  const currentSnapshot = useMemo((): MagnifierResultSnapshot | null => {
    if (!source || viewportSize.width <= 0 || viewportSize.height <= 0) {
      return null;
    }

    return createResultSnapshot(
      viewState,
      refinement,
      viewportSize.width,
      viewportSize.height,
    );
  }, [source, viewState, refinement, viewportSize]);

  const exportDimensions = useMemo(() => {
    if (!isResultMarked || !source || !currentSnapshot) return null;

    const rect = getImageViewportRect(
      currentSnapshot.viewState,
      currentSnapshot.viewportWidth,
      currentSnapshot.viewportHeight,
      source.width,
      source.height,
    );

    return {
      width: Math.max(1, Math.round(rect.width)),
      height: Math.max(1, Math.round(rect.height)),
    };
  }, [isResultMarked, currentSnapshot, source]);

  const resultStale =
    isResultMarked &&
    !!lockedSnapshot &&
    !!currentSnapshot &&
    !snapshotsMatch(currentSnapshot, lockedSnapshot);

  useEffect(() => {
    if (!isResultMarked) {
      setLockedSnapshot(null);
      return;
    }

    if (!currentSnapshot) return;

    setLockedSnapshot(currentSnapshot);
  }, [isResultMarked, currentSnapshot]);

  const buildExportCanvas = useCallback(() => {
    if (!source || !currentSnapshot || !sourceCanvasRef.current) {
      throw new Error("Export snapshot unavailable.");
    }

    return buildMagnifierExportCanvas(
      sourceCanvasRef.current,
      currentSnapshot,
      source.width,
      source.height,
      exportCanvasRef.current,
    );
  }, [source, currentSnapshot]);

  const handleDownloadView = useCallback(async () => {
    if (!source || !isResultMarked) return;

    setIsExporting(true);
    setError(null);

    try {
      const exportCanvas = buildExportCanvas();
      const format = resolveFormat(source.mimeType);
      const quality =
        format === "jpeg" || format === "webp" ? 0.95 : undefined;

      await handleDownload(
        exportCanvas,
        buildDownloadFilename(`${source.name}-magnifier-view`, format),
        { format, quality, ...downloadOptions },
      );

      showToast(t("toolUi.magnifier.export.saved"), {
        title: t("toolUi.magnifier.export.download"),
      });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.downloadFailed"));
    } finally {
      setIsExporting(false);
    }
  }, [
    source,
    isResultMarked,
    buildExportCanvas,
    downloadOptions,
    showToast,
    t,
    language,
    setError,
  ]);

  const handleCopyView = useCallback(async () => {
    if (!source || !isResultMarked) return;

    setIsExporting(true);
    setError(null);

    try {
      const exportCanvas = buildExportCanvas();
      await copyImageToClipboard(exportCanvas, {
        format: "png",
        ...downloadOptions,
      });

      showToast(t("toast.imageCopiedPaste"));
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "toast.couldNotCopy"));
    } finally {
      setIsExporting(false);
    }
  }, [
    source,
    isResultMarked,
    buildExportCanvas,
    downloadOptions,
    showToast,
    t,
    language,
    setError,
  ]);

  const canExport =
    !!source &&
    isResultMarked &&
    !!currentSnapshot &&
    viewportSize.width > 0 &&
    viewportSize.height > 0;

  const canPan = viewState.userZoom > MIN_USER_ZOOM;
  const cursorClass = isPanning
    ? "cursor-grabbing"
    : canPan
      ? "cursor-grab"
      : "cursor-default";

  const refinementActive =
    refinement.enabled && refinement.intensity > 0 && !isComparing;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!source && isResultMarked,
        isProcessing: isRefining || isExporting,
        isReady: canExport,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="magnifier-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.magnifier.uploadHint")}
        />
      ) : (
        <>
          <ImageFileInput
            id="magnifier-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />

          <ToolWorkspacePreview
            hint={t("toolUi.magnifier.previewHint")}
            caption={
              <>
                {source.width} × {source.height}px · {zoomPercent}%
                {refinementActive ? (
                  <> · {t("toolUi.magnifier.refinement.active")}</>
                ) : null}
                {isRefining ? (
                  <> · {t("toolUi.magnifier.refinement.processing")}</>
                ) : null}
              </>
            }
          >
            <div
              ref={viewportRef}
              className={`relative h-[min(56vh,520px)] w-full touch-none overflow-hidden rounded-sm border bg-[repeating-conic-gradient(var(--checker-a)_0%_25%,var(--checker-b)_0%_50%)] bg-[length:16px_16px] ${cursorClass} ${
                isResultMarked && !resultStale
                  ? "border-accent/50 ring-2 ring-accent/25"
                  : resultStale
                    ? "border-amber-500/40 ring-2 ring-amber-500/15"
                    : "border-border"
              }`}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                className="absolute start-0 top-0 will-change-transform"
                style={{
                  transform: `translate3d(${viewState.translateX}px, ${viewState.translateY}px, 0) scale(${displayScale})`,
                  transformOrigin: "0 0",
                }}
              >
                <canvas
                  ref={displayCanvasRef}
                  width={source.width}
                  height={source.height}
                  className="block max-w-none select-none"
                  aria-hidden="true"
                />
              </div>

              <MagnifierMiniMap
                imageUrl={source.url}
                imageWidth={source.width}
                imageHeight={source.height}
                viewportRect={viewportRect}
                label={t("toolUi.magnifier.miniMapLabel")}
                onNavigate={handleMiniMapNavigate}
              />

              {isComparing ? (
                <div className="pointer-events-none absolute end-3 top-3 z-10 rounded-sm border border-accent/40 bg-card/95 px-2.5 py-1 font-mono text-[10px] text-accent shadow-[var(--shadow-elevated)] backdrop-blur-sm">
                  {t("toolUi.magnifier.refinement.activeComparison")}
                </div>
              ) : null}

              {isResultMarked && !resultStale ? (
                <div className="pointer-events-none absolute start-3 top-3 z-10 rounded-sm border border-accent/40 bg-card/95 px-2.5 py-1 font-mono text-[10px] text-accent shadow-[var(--shadow-elevated)] backdrop-blur-sm">
                  {t("toolUi.magnifier.export.resultLocked")}
                </div>
              ) : resultStale ? (
                <div className="pointer-events-none absolute start-3 top-3 z-10 rounded-sm border border-amber-500/40 bg-card/95 px-2.5 py-1 font-mono text-[10px] text-amber-600 dark:text-amber-400 shadow-[var(--shadow-elevated)] backdrop-blur-sm">
                  {t("toolUi.magnifier.export.resultStale")}
                </div>
              ) : null}
            </div>
          </ToolWorkspacePreview>

          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                disabled={!source}
                aria-pressed={isComparing}
                onClick={handleCompareToggle}
                className={`tool-chip-button disabled:cursor-not-allowed disabled:opacity-40 ${
                  isComparing
                    ? "border-accent/50 bg-accent-muted text-accent shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_35%,transparent)] ring-2 ring-accent/30"
                    : ""
                }`}
              >
                {t("toolUi.magnifier.refinement.compareOriginal")}
              </button>

              <button
                type="button"
                disabled={!source}
                onClick={resetView}
                className="tool-chip-button disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("toolUi.magnifier.resetView")}
              </button>
            </div>

            {isComparing ? (
              <p className="font-mono text-[10px] text-accent">
                {t("toolUi.magnifier.refinement.activeComparison")}
              </p>
            ) : null}
          </div>
        </>
      )}

      <ToolFieldsStage
        key={`magnifier-fields-${settingsRevision}`}
        fields={[
          {
            label: t("toolUi.magnifier.zoom"),
            englishLabel: "Zoom",
            htmlFor: "magnifier-zoom",
            children: (
              <div className="flex flex-col gap-4">
                <SliderControl
                  id="magnifier-zoom"
                  label={t("toolUi.magnifier.zoomLevel")}
                  value={zoomPercent}
                  min={100}
                  max={MAX_USER_ZOOM * 100}
                  step={10}
                  suffix="%"
                  disabled={!source}
                  onChange={handleZoomSlider}
                />

                <output
                  htmlFor="magnifier-zoom"
                  className="font-mono text-xs text-muted"
                >
                  {t("toolUi.magnifier.scaleDisplay", {
                    scale: (displayScale * 100).toFixed(1),
                  })}
                </output>

                <button
                  type="button"
                  disabled={!source}
                  onClick={resetView}
                  className="tool-chip-button disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("toolUi.magnifier.resetView")}
                </button>
              </div>
            ),
          },
          {
            label: t("toolUi.magnifier.refinement.title"),
            englishLabel: "IMAGE REFINEMENT",
            htmlFor: "magnifier-sharpen",
            children: (
              <div className="flex flex-col gap-5">
                <label className="flex min-h-9 cursor-pointer items-center justify-between gap-3">
                  <span className="tool-control-label">
                    {t("toolUi.magnifier.refinement.sharpen")}
                  </span>
                  <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
                    <input
                      id="magnifier-sharpen"
                      type="checkbox"
                      role="switch"
                      aria-checked={refinement.enabled}
                      disabled={!source}
                      checked={refinement.enabled}
                      onChange={(event) =>
                        patchRefinement({ enabled: event.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-border bg-background transition-colors peer-checked:border-accent/40 peer-checked:bg-accent-muted peer-disabled:opacity-50"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute start-0.5 h-4 w-4 rounded-full bg-muted transition-transform peer-checked:translate-x-4 peer-checked:bg-accent"
                    />
                  </span>
                </label>

                <SliderControl
                  id="magnifier-sharpen-level"
                  label={t("toolUi.magnifier.refinement.level")}
                  value={refinement.intensity}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                  disabled={!source || !refinement.enabled}
                  onChange={(intensity) => patchRefinement({ intensity })}
                />

                <div className="tool-control-group">
                  <label
                    htmlFor="magnifier-sharpen-type"
                    className="tool-control-label"
                  >
                    {t("toolUi.magnifier.refinement.type")}
                  </label>
                  <select
                    id="magnifier-sharpen-type"
                    disabled={!source || !refinement.enabled}
                    value={refinement.type}
                    onChange={(event) =>
                      patchRefinement({
                        type: event.target.value as SharpenType,
                      })
                    }
                    className="tool-input block"
                  >
                    {SHARPEN_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {t(`toolUi.magnifier.refinement.types.${type}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="font-mono text-[10px] leading-relaxed text-muted">
                  {t("toolUi.magnifier.refinement.hint")}
                </p>
              </div>
            ),
          },
          {
            label: t("toolUi.magnifier.export.title"),
            englishLabel: "SAVE & EXPORT",
            htmlFor: "magnifier-export-status",
            children: (
              <div className="flex flex-col gap-4">
                <p className="font-mono text-[10px] leading-relaxed text-muted">
                  {resultStale
                    ? t("toolUi.magnifier.export.resultStale")
                    : t("toolUi.magnifier.export.markHint")}
                </p>

                {exportDimensions && isResultMarked ? (
                  <output className="block font-mono text-[10px] text-muted">
                    {t("toolUi.magnifier.export.dimensions", exportDimensions)}
                  </output>
                ) : null}
              </div>
            ),
          },
        ]}
      />

      <StripMetadataToggle
        checked={stripMetadata}
        disabled={!source}
        onChange={setStripMetadata}
          cornerRadius={cornerRadius}
          onCornerRadiusChange={setCornerRadius}
          maxCornerRadius={
            source
              ? Math.floor(Math.min(source.width, source.height) / 2)
              : 200
          }
      />

      <ToolOutputActions
        onDownload={handleDownloadView}
        onCopy={handleCopyView}
        downloadLabel={t("toolUi.magnifier.export.download")}
        copyLabel={t("toolUi.magnifier.export.copyView")}
        disabled={!canExport}
        isProcessing={isExporting}
        showSuccessHint={false}
      />

      {error ? (
        <HelperErrorAlert message={error} className="mt-4" />
      ) : null}

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.magnifier.footer")}
      </p>

      <section
        aria-labelledby="magnifier-seo-title"
        className="mt-10 space-y-4 border-t border-border pt-8"
      >
        <h2
          id="magnifier-seo-title"
          className="font-display text-lg text-foreground"
        >
          {t("toolUi.magnifier.seo.title")}
        </h2>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {t("toolUi.magnifier.seo.intro")}
        </p>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {t("toolUi.magnifier.seo.keywords")}
        </p>
        <p className="font-mono text-xs leading-relaxed">
          <AppLink
            href="/articles/online-image-magnifier"
            className="text-accent underline-offset-2 hover:underline"
          >
            {t("toolUi.magnifier.seo.articleLink")}
          </AppLink>
        </p>
      </section>

      <canvas ref={sourceCanvasRef} className="hidden" aria-hidden="true" />
      <canvas ref={exportCanvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
