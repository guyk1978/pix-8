"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { BackgroundRemovalScanOverlay } from "@/components/tools/BackgroundRemovalScanOverlay";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import {
  buildDownloadFilename,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { useToolExportSettings } from "@/hooks/useToolExportSettings";
import {
  applyBooleanPayload,
  applyStringPayload,
  useImageToolProject,
  applyNumberPayload,
} from "@/hooks/useToolProject";
import {
  blobToImage,
  canvasToPngBlob,
  getBackgroundRemovalEngineError,
  hasBackgroundRemovalEngineFailed,
  isBackgroundRemovalEngineAvailable,
  removeImageBackground,
  renderResultToCanvas,
  resetBackgroundRemovalEngine,
  warmBackgroundRemovalEngine,
  type BackgroundMode,
  type RemovalProgress,
} from "@/lib/backgroundRemoval";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { SliderControl } from "@/components/ui/SliderControl";
import { BackgroundReplacePicker } from "@/components/ui/BackgroundReplacePicker";
import {
  type BackgroundImageLoaded,
} from "@/lib/backgroundPresets";

const toggleButtonClassName =
  "min-h-10 flex-1 rounded-sm border border-border bg-background px-3 py-2 font-label text-muted transition-colors hover:border-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

const activeToggleClassName = "border-accent/40 bg-accent-muted text-accent";

type ProcessingPhase = "idle" | RemovalProgress["phase"];

function formatDownloadProgress(progress: RemovalProgress | null): number | undefined {
  if (
    progress?.phase === "loading-model" &&
    progress.current !== undefined &&
    progress.total
  ) {
    return Math.round((progress.current / progress.total) * 100);
  }

  return undefined;
}

export function BackgroundRemover() {
  const { t, language } = useLanguage();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultImageRef = useRef<HTMLImageElement | null>(null);

  const [backgroundMode, setBackgroundMode] =
    useState<BackgroundMode>("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);
  const [subjectOpacity, setSubjectOpacity] = useState(100);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const [backgroundImageKey, setBackgroundImageKey] = useState<string | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const {
    stripMetadata,
    setStripMetadata,
    cornerRadius,
    setCornerRadius,
    downloadOptions,
  } = useToolExportSettings();
  const [processingPhase, setProcessingPhase] = useState<ProcessingPhase>("idle");
  const [removalProgress, setRemovalProgress] = useState<RemovalProgress | null>(
    null,
  );
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [engineLoading, setEngineLoading] = useState(false);
  const [engineFailed, setEngineFailed] = useState(false);
  const [engineError, setEngineError] = useState<string | null>(null);

  const resetProcessing = useCallback(() => {
    resultImageRef.current = null;
    setHasProcessed(false);
    setRemovalProgress(null);
  }, []);

  const resetBackgroundImage = useCallback(() => {
    if (backgroundImageUrl) URL.revokeObjectURL(backgroundImageUrl);
    backgroundImageRef.current = null;
    setBackgroundImageUrl(null);
    setBackgroundImageKey(null);
  }, [backgroundImageUrl]);

  const {
    canvasRef,
    source,
    error,
    loadFile,
    clear,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor({
    onWorkspaceImageSwitch: resetProcessing,
  });

  useImageToolProject({
    toolId: "bg-remover",
    source,
    loadFile,
    getExtraPayload: () => ({
      backgroundMode,
      backgroundColor,
      backgroundOpacity,
      subjectOpacity,
      stripMetadata,
    }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyNumberPayload(payload, "cornerRadius", setCornerRadius);
      applyStringPayload(payload, "backgroundColor", setBackgroundColor);
      applyNumberPayload(payload, "backgroundOpacity", setBackgroundOpacity);
      applyNumberPayload(payload, "subjectOpacity", setSubjectOpacity);
      if (
        payload.backgroundMode === "transparent" ||
        payload.backgroundMode === "solid" ||
        payload.backgroundMode === "image"
      ) {
        setBackgroundMode(payload.backgroundMode);
      }
      setHasProcessed(false);
      resultImageRef.current = null;
    },
  });

  const isBusy = processingPhase !== "idle";
  const isPreparingEngine =
    !mounted || engineLoading || (!engineReady && !engineFailed);
  const canProcess =
    mounted &&
    !!source &&
    !isBusy &&
    !engineLoading &&
    engineReady &&
    !engineFailed;

  const paintPreview = useCallback(
    (mode: BackgroundMode, color: string, bgOpacity: number, subOpacity: number) => {
      const canvas = previewCanvasRef.current;
      const image = resultImageRef.current;

      if (!canvas || !image) return;

      renderResultToCanvas(image, {
        backgroundMode: mode,
        backgroundColor: mode === "solid" ? color : undefined,
        backgroundOpacity: bgOpacity,
        subjectOpacity: subOpacity,
        backgroundImage:
          mode === "image" ? backgroundImageRef.current : undefined,
        canvas,
      });
    },
    [],
  );

  useLayoutEffect(() => {
    if (!hasProcessed) return;
    paintPreview(backgroundMode, backgroundColor, backgroundOpacity, subjectOpacity);
  }, [
    hasProcessed,
    backgroundMode,
    backgroundColor,
    backgroundOpacity,
    subjectOpacity,
    backgroundImageUrl,
    paintPreview,
  ]);

  const applyBackgroundImage = useCallback(
    (payload: BackgroundImageLoaded) => {
      resetBackgroundImage();
      backgroundImageRef.current = payload.image;
      setBackgroundImageUrl(payload.objectUrl);
      setBackgroundImageKey(payload.key);
      setBackgroundMode("image");
      if (hasProcessed) {
        paintPreview(
          "image",
          backgroundColor,
          backgroundOpacity,
          subjectOpacity,
        );
      }
    },
    [
      resetBackgroundImage,
      hasProcessed,
      paintPreview,
      backgroundColor,
      backgroundOpacity,
      subjectOpacity,
    ],
  );

  const preloadEngine = useCallback(async () => {
    if (!isBackgroundRemovalEngineAvailable()) {
      setEngineFailed(true);
      setEngineReady(false);
      setEngineError(null);
      return;
    }

    resetBackgroundRemovalEngine();
    setEngineFailed(false);
    setEngineError(null);
    setEngineLoading(true);

    try {
      await warmBackgroundRemovalEngine((progress) => {
        if (progress.phase === "loading-model") {
          setRemovalProgress(progress);
        }
      });
      setEngineReady(true);
    } catch (cause) {
      setEngineFailed(true);
      setEngineReady(false);
      setEngineError(
        getBackgroundRemovalEngineError() ??
          (cause instanceof Error ? cause.message : null),
      );
    } finally {
      setEngineLoading(false);
      setRemovalProgress(null);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    void preloadEngine();
  }, [preloadEngine]);

  useEffect(() => {
    return () => {
      if (backgroundImageUrl) URL.revokeObjectURL(backgroundImageUrl);
    };
  }, [backgroundImageUrl]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      resetProcessing();
      if (file) {
        void loadFile(file);
        return;
      }
      clear();
    },
    [clear, loadFile, resetProcessing],
  );

  const handleBackgroundFileChange = useCallback(
    (file: File | null) => {
      resetBackgroundImage();
      if (!file) return;

      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        backgroundImageRef.current = image;
        setBackgroundImageUrl(url);
        setBackgroundImageKey(`upload:${file.name}`);
        setBackgroundMode("image");
        if (hasProcessed) {
          paintPreview(
            "image",
            backgroundColor,
            backgroundOpacity,
            subjectOpacity,
          );
        }
      };
      image.src = url;
    },
    [
      resetBackgroundImage,
      hasProcessed,
      paintPreview,
      backgroundColor,
      backgroundOpacity,
      subjectOpacity,
    ],
  );

  const handlePresetColorSelect = useCallback((color: string) => {
    setBackgroundMode("solid");
    setBackgroundColor(color);
    resetBackgroundImage();
    if (hasProcessed) {
      paintPreview("solid", color, backgroundOpacity, subjectOpacity);
    }
  }, [
    resetBackgroundImage,
    hasProcessed,
    paintPreview,
    backgroundOpacity,
    subjectOpacity,
  ]);

  const backgroundDimensions = {
    width: resultImageRef.current?.naturalWidth ?? source?.width ?? 1920,
    height: resultImageRef.current?.naturalHeight ?? source?.height ?? 1080,
  };

  const handleModeChange = useCallback((mode: BackgroundMode) => {
    setBackgroundMode(mode);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setBackgroundColor(color);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!source || engineFailed) return;

    setError(null);
    setProcessingPhase("processing");
    setRemovalProgress({ phase: "processing" });

    try {
      if (!engineReady) {
        await preloadEngine();
      }

      const resultBlob = await removeImageBackground(source.file, (progress) => {
        setRemovalProgress(progress);
        setProcessingPhase(progress.phase);
      });

      const resultImage = await blobToImage(resultBlob);
      resultImageRef.current = resultImage;
      setHasProcessed(true);
    } catch (cause) {
      if (hasBackgroundRemovalEngineFailed()) {
        setEngineFailed(true);
        setEngineReady(false);
      }
      setError(resolveErrorMessage(language, cause, "errors.backgroundRemovalFailed"));
    } finally {
      setProcessingPhase("idle");
      setRemovalProgress(null);
    }
  }, [source, engineFailed, engineReady, preloadEngine, setError, language]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !resultImageRef.current) return;

    setError(null);

    try {
      const resultCanvas = renderResultToCanvas(resultImageRef.current, {
        backgroundMode,
        backgroundColor:
          backgroundMode === "solid" ? backgroundColor : undefined,
        backgroundOpacity,
        subjectOpacity,
        backgroundImage:
          backgroundMode === "image" ? backgroundImageRef.current : undefined,
        canvas: canvasRef.current,
      });

      const blob = await canvasToPngBlob(resultCanvas);

      await handleDownload(
        blob,
        buildDownloadFilename(`${source.name}-nobg`, "png"),
        { ...downloadOptions },
      );
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.downloadFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
    backgroundOpacity,
    subjectOpacity,
    stripMetadata,
    handleDownload,
    canvasRef,
    setError,
    language,
  ]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !resultImageRef.current) return;

    setError(null);

    try {
      const resultCanvas = renderResultToCanvas(resultImageRef.current, {
        backgroundMode,
        backgroundColor:
          backgroundMode === "solid" ? backgroundColor : undefined,
        backgroundOpacity,
        subjectOpacity,
        backgroundImage:
          backgroundMode === "image" ? backgroundImageRef.current : undefined,
        canvas: canvasRef.current,
      });

      const blob = await canvasToPngBlob(resultCanvas);
      await handleCopyToClipboard(blob, { ...downloadOptions, format: "png" });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.copyImageFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
    backgroundOpacity,
    subjectOpacity,
    stripMetadata,
    handleCopyToClipboard,
    canvasRef,
    setError,
    language,
  ]);

  const processingLabel =
    processingPhase === "loading-model"
      ? t("toolUi.bgRemover.loadingModel")
      : processingPhase === "processing"
        ? t("toolUi.bgRemover.scanning")
        : null;

  const modelProgress = formatDownloadProgress(removalProgress);

  const previewPanelClassName = `relative flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-border p-3 sm:min-h-56 ${
    backgroundMode === "transparent" && hasProcessed && subjectOpacity >= 100
      ? "transparency-checkerboard"
      : ""
  }`;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: true,
        isProcessing: isBusy,
        isReady: hasProcessed,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="bg-remover-upload"
          onFileChange={handleFileChange}
          isDragging={isDragging}
          onDraggingChange={setIsDragging}
          formatHint={t("toolUi.bgRemover.formatsHint")}
        />
      ) : (
        <ImageFileInput
          id="bg-remover-replace"
          fileName={source.file.name}
          onFileChange={handleFileChange}
        />
      )}

      <WorkflowSettings>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="font-label text-muted">{t("toolUi.bgRemover.background")}</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!source || isBusy}
                onClick={() => handleModeChange("transparent")}
                className={`${toggleButtonClassName} ${
                  backgroundMode === "transparent" ? activeToggleClassName : ""
                }`}
              >
                {t("toolUi.bgRemover.transparent")}
              </button>
              <button
                type="button"
                disabled={!source || isBusy}
                onClick={() => handleModeChange("solid")}
                className={`${toggleButtonClassName} ${
                  backgroundMode === "solid" ? activeToggleClassName : ""
                }`}
              >
                {t("toolUi.bgRemover.solidColor")}
              </button>
              <button
                type="button"
                disabled={!source || isBusy}
                onClick={() => handleModeChange("image")}
                className={`${toggleButtonClassName} ${
                  backgroundMode === "image" ? activeToggleClassName : ""
                }`}
              >
                {t("toolUi.bgRemover.backgroundImage")}
              </button>
            </div>
          </div>

          {backgroundMode !== "transparent" ? (
            <BackgroundReplacePicker
              disabled={!source || isBusy}
              selectedColor={backgroundMode === "solid" ? backgroundColor : null}
              selectedImageKey={
                backgroundMode === "image" ? backgroundImageKey : null
              }
              dimensions={backgroundDimensions}
              onSelectColor={handlePresetColorSelect}
              onSelectImage={applyBackgroundImage}
            />
          ) : null}

          {backgroundMode === "solid" && (
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="bg-remover-color" className="font-label text-muted">
                {t("common.color")}
              </label>
              <input
                id="bg-remover-color"
                type="color"
                value={backgroundColor}
                disabled={!source || isBusy}
                onInput={(event) => handleColorChange(event.currentTarget.value)}
                onChange={(event) => handleColorChange(event.currentTarget.value)}
                className="h-10 w-14 cursor-pointer rounded-sm border border-border bg-background disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="font-mono text-xs text-muted">{backgroundColor}</span>
            </div>
          )}

          {backgroundMode === "image" && (
            <div className="mt-4 space-y-2">
              <label htmlFor="bg-remover-bg-image" className="font-label text-muted">
                {t("toolUi.bgRemover.uploadBackground")}
              </label>
              <input
                id="bg-remover-bg-image"
                type="file"
                accept="image/*"
                disabled={!source || isBusy}
                onChange={(event) =>
                  handleBackgroundFileChange(event.target.files?.[0] ?? null)
                }
                className="block w-full text-sm text-muted file:me-3 file:rounded-sm file:border file:border-border file:bg-background file:px-3 file:py-2 file:font-label file:text-foreground"
              />
            </div>
          )}

          {backgroundMode !== "transparent" ? (
            <SliderControl
              label={t("toolUi.bgRemover.backgroundOpacity")}
              value={backgroundOpacity}
              min={0}
              max={100}
              suffix="%"
              disabled={!source || isBusy}
              onChange={setBackgroundOpacity}
            />
          ) : null}

          <SliderControl
            label={t("toolUi.bgRemover.subjectOpacity")}
            value={subjectOpacity}
            min={0}
            max={100}
            suffix="%"
            disabled={!source || isBusy}
            onChange={setSubjectOpacity}
          />
        </div>
      </WorkflowSettings>

      {source ? (
        <ToolWorkspacePreview
          hint={
            hasProcessed ? t("toolUi.bgRemover.result") : t("common.original")
          }
          caption={
            <>
              {source.width} × {source.height}px · {source.file.name}
              {hasProcessed && backgroundMode === "solid" && (
                <> · {t("toolUi.bgRemover.backgroundColor", { color: backgroundColor })}</>
              )}
            </>
          }
        >
          <div
            className={
              hasProcessed
                ? previewPanelClassName
                : `relative flex min-h-48 w-full items-center justify-center sm:min-h-56 ${
                    backgroundMode === "transparent" ? "transparency-checkerboard" : ""
                  }`
            }
            style={
              !hasProcessed && backgroundMode === "solid"
                ? { backgroundColor }
                : undefined
            }
          >
            {isBusy && (
              <BackgroundRemovalScanOverlay
                label={processingLabel ?? t("common.processing")}
                sublabel={
                  modelProgress !== undefined
                    ? t("toolUi.bgRemover.downloadingModel", {
                        percent: modelProgress,
                      })
                    : t("toolUi.bgRemover.processingLocal")
                }
                progress={modelProgress}
                variant={
                  processingPhase === "loading-model" ? "download" : "scan"
                }
              />
            )}

            {hasProcessed ? (
              <canvas
                ref={previewCanvasRef}
                className="max-h-[min(50vh,420px)] max-w-full"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={source.url}
                alt={t("alt.originalPreview")}
                className="max-h-[min(50vh,420px)] max-w-full object-contain"
              />
            )}
          </div>
        </ToolWorkspacePreview>
      ) : null}

      <StripMetadataToggle
        checked={stripMetadata}
        disabled={!source || isBusy}
        onChange={setStripMetadata}
          cornerRadius={cornerRadius}
          onCornerRadiusChange={setCornerRadius}
          maxCornerRadius={
            source
              ? Math.floor(Math.min(source.width, source.height) / 2)
              : 200
          }
      />

      {mounted && engineFailed ? (
        <div className="mt-4 rounded-sm border border-border bg-card p-4">
          <p className="text-sm text-muted">{t("toolUi.bgRemover.modelUnavailable")}</p>
          {engineError ? (
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted">
              {engineError}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => void preloadEngine()}
            disabled={isBusy}
            className="mt-3 min-h-10 rounded-sm border border-border bg-background px-4 py-2 font-label text-foreground transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("toolUi.bgRemover.retryModel")}
          </button>
        </div>
      ) : null}

      {error ? <HelperErrorAlert message={error} className="mt-4" /> : null}

      <div className="mt-5 space-y-2">
        <ToolSidebarSlot id="tool-process-action" panel="actions" order={0}>
          <button
            type="button"
            disabled={!canProcess}
            onClick={() => void handleProcess()}
            className="embedded-toolbar-process min-h-11 w-full rounded-sm border border-border bg-background px-4 py-3 font-label text-foreground transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isBusy
              ? t("common.processing")
              : isPreparingEngine
                ? t("toolUi.bgRemover.preparingModel")
                : t("toolUi.bgRemover.removeBackground")}
          </button>
        </ToolSidebarSlot>

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel={t("downloads.downloadPng")}
          disabled={!hasProcessed || isBusy}
          isProcessing={isBusy}
        />
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
