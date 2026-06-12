"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ProcessingIndicator } from "@/components/characters/ProcessingIndicator";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import {
  buildDownloadFilename,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  applyBooleanPayload,
  applyStringPayload,
  useImageToolProject,
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
  const {
    canvasRef,
    source,
    error,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultImageRef = useRef<HTMLImageElement | null>(null);

  const [backgroundMode, setBackgroundMode] =
    useState<BackgroundMode>("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [stripMetadata, setStripMetadata] = useState(true);
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

  useImageToolProject({
    toolId: "bg-remover",
    source,
    loadFile,
    getExtraPayload: () => ({
      backgroundMode,
      backgroundColor,
      stripMetadata,
    }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyStringPayload(payload, "backgroundColor", setBackgroundColor);
      if (
        payload.backgroundMode === "transparent" ||
        payload.backgroundMode === "solid"
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
    (mode: BackgroundMode, color: string) => {
      const canvas = previewCanvasRef.current;
      const image = resultImageRef.current;

      if (!canvas || !image) return;

      renderResultToCanvas(image, {
        backgroundMode: mode,
        backgroundColor: mode === "solid" ? color : undefined,
        canvas,
      });
    },
    [],
  );

  useLayoutEffect(() => {
    if (!hasProcessed) return;
    paintPreview(backgroundMode, backgroundColor);
  }, [hasProcessed, backgroundMode, backgroundColor, paintPreview]);

  const resetProcessing = useCallback(() => {
    resultImageRef.current = null;
    setHasProcessed(false);
    setRemovalProgress(null);
  }, []);

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

  const handleFileChange = useCallback(
    (file: File | null) => {
      resetProcessing();
      if (file) void loadFile(file);
    },
    [loadFile, resetProcessing],
  );

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
        canvas: canvasRef.current,
      });

      const blob = await canvasToPngBlob(resultCanvas);

      await handleDownload(
        blob,
        buildDownloadFilename(`${source.name}-nobg`, "png"),
        { stripMetadata },
      );
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.downloadFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
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
        canvas: canvasRef.current,
      });

      const blob = await canvasToPngBlob(resultCanvas);
      await handleCopyToClipboard(blob, { stripMetadata, format: "png" });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.copyImageFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
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
        ? t("toolUi.bgRemover.removing")
        : null;

  const modelProgress = formatDownloadProgress(removalProgress);

  const previewPanelClassName = `relative flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-border p-3 sm:min-h-56 ${
    backgroundMode === "transparent" && hasProcessed
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
            <div className="flex gap-2">
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
            </div>
          </div>

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
              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center gap-3 rounded-sm border border-border bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm sm:inset-x-auto sm:bottom-4 sm:right-4">
                <ProcessingIndicator
                  active
                  size="sm"
                  progress={
                    modelProgress ?? (processingPhase === "processing" ? 75 : 25)
                  }
                />
                <div className="min-w-0">
                  <p className="font-label text-accent">{processingLabel}</p>
                  {modelProgress !== undefined ? (
                    <p className="font-mono text-[10px] text-muted">
                      {t("toolUi.bgRemover.downloadingModel", {
                        percent: modelProgress,
                      })}
                    </p>
                  ) : (
                    <p className="font-mono text-[10px] text-muted">
                      {t("toolUi.bgRemover.processingLocal")}
                    </p>
                  )}
                </div>
              </div>
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
        <button
          type="button"
          disabled={!canProcess}
          onClick={() => void handleProcess()}
          className="min-h-11 w-full rounded-sm border border-border bg-background px-4 py-3 font-label text-foreground transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isBusy
            ? t("common.processing")
            : isPreparingEngine
              ? t("toolUi.bgRemover.preparingModel")
              : t("toolUi.bgRemover.removeBackground")}
        </button>

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
