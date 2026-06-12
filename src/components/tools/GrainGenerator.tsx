"use client";

import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { SliderControl } from "@/components/ui/SliderControl";
import {
  DEFAULT_GRAIN_SETTINGS,
  drawImageToCanvas,
  renderGrainCanvas,
} from "@/lib/grainRender";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  applyBooleanPayload,
  applyNumberPayload,
  useImageToolProject,
} from "@/hooks/useToolProject";
function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function GrainGenerator() {
  const { t, language } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isDraggingCompareRef = useRef(false);

  const [grainSeed, setGrainSeed] = useState(1);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [comparePosition, setComparePosition] = useState(50);
  const [intensity, setIntensity] = useState(DEFAULT_GRAIN_SETTINGS.intensity);
  const debouncedIntensity = useDebouncedValue(intensity, 150);

  useImageToolProject({
    toolId: "grain-generator",
    source,
    loadFile,
    getExtraPayload: () => ({
      stripMetadata,
      intensity,
      comparePosition,
      grainSeed,
    }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyNumberPayload(payload, "intensity", setIntensity);
      applyNumberPayload(payload, "comparePosition", setComparePosition);
      applyNumberPayload(payload, "grainSeed", setGrainSeed);
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setGrainSeed((current) => current + 1);
        setComparePosition(50);
        setIntensity(DEFAULT_GRAIN_SETTINGS.intensity);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) return;

    let cancelled = false;

    const run = async () => {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      const beforeCanvas = beforeCanvasRef.current;
      const afterCanvas = afterCanvasRef.current;
      if (!beforeCanvas || !afterCanvas || cancelled) return;

      setIsApplying(true);
      setError(null);

      try {
        const image = await loadImageElement(source.url);
        if (cancelled) return;

        drawImageToCanvas(image, source.width, source.height, beforeCanvas);
        renderGrainCanvas(
          image,
          source.width,
          source.height,
          { intensity: debouncedIntensity },
          afterCanvas,
          grainSeed,
        );
      } catch (cause) {
        if (cancelled) return;

        setError(resolveErrorMessage(language, cause, "errors.grainFailed"));
      } finally {
        if (!cancelled) {
          setIsApplying(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [source, debouncedIntensity, grainSeed, setError]);

  const updateComparePosition = useCallback((clientX: number) => {
    const container = comparisonRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setComparePosition(Math.max(8, Math.min(92, next)));
  }, []);

  const handleComparePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingCompareRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateComparePosition(event.clientX);
    },
    [updateComparePosition],
  );

  const handleComparePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingCompareRef.current) return;
      updateComparePosition(event.clientX);
    },
    [updateComparePosition],
  );

  const handleComparePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingCompareRef.current = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleRegenerateGrain = useCallback(() => {
    setGrainSeed((current) => current + 1);
  }, []);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !afterCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      afterCanvasRef.current,
      buildDownloadFilename(`${source.name}-grain`, format),
      { format, quality, stripMetadata },
    );
  }, [source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !afterCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(afterCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, stripMetadata, handleCopyToClipboard]);

  const busy = isProcessing || isApplying;
  const isUpdatingPreview = intensity !== debouncedIntensity;
  const canDownload = !!source && !busy && !isUpdatingPreview;

  return (
    <ToolWorkspace hasActiveImage={!!source}>
        {!source ? (
          <ToolStyledUploadZone
            inputId="grain-generator-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.grain.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="grain-generator-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        {source ? (
          <ToolWorkspacePreview
            hint={t("toolUi.grain.compareHint")}
            caption={
              <>
                {source.width} × {source.height}px ·{" "}
                {isApplying || isUpdatingPreview
                  ? t("toolUi.grain.applying")
                  : t("toolUi.grain.intensityPercent", { percent: intensity })}
              </>
            }
          >
            <div
              ref={comparisonRef}
              className="relative flex min-h-56 w-full items-center justify-center sm:min-h-72 cursor-col-resize touch-none"
              onPointerDown={handleComparePointerDown}
              onPointerMove={handleComparePointerMove}
              onPointerUp={handleComparePointerUp}
              onPointerCancel={handleComparePointerUp}
            >
              <div className="relative inline-block max-w-full">
                <canvas
                  ref={afterCanvasRef}
                  className="block max-h-[min(50vh,420px)] max-w-full"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${comparePosition}%` }}
                >
                  <canvas
                    ref={beforeCanvasRef}
                    className="block max-h-[min(50vh,420px)] max-w-full"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-px bg-foreground"
                  style={{ left: `${comparePosition}%` }}
                />
                <div
                  className="pointer-events-none absolute top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
                  style={{ left: `${comparePosition}%` }}
                >
                  <span className="rounded-sm bg-card px-2 py-1 font-mono text-[9px] text-muted shadow-[var(--shadow-elevated)]">
                    {t("common.before")}
                  </span>
                  <span className="h-8 w-4 rounded-sm bg-card shadow-[var(--shadow-elevated)]" />
                  <span className="rounded-sm bg-card px-2 py-1 font-mono text-[9px] text-muted shadow-[var(--shadow-elevated)]">
                    {t("common.after")}
                  </span>
                </div>
              </div>
            </div>
          </ToolWorkspacePreview>
        ) : null}

        <WorkflowSettings>
          <div className="space-y-4">
            <SliderControl
              id="grain-intensity"
              label={t("toolUi.grain.grainIntensity")}
              value={intensity}
              min={0}
              max={100}
              step={1}
              suffix="%"
              disabled={!source}
              onChange={setIntensity}
              description={t("toolUi.grain.description")}
            />

            <button
              type="button"
              disabled={!source || isApplying}
              onClick={handleRegenerateGrain}
              className="min-h-9 w-full font-mono text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
            >
              {t("toolUi.grain.regenerate")}
            </button>

            <button
              type="button"
              disabled={!source}
              onClick={() => setIntensity(DEFAULT_GRAIN_SETTINGS.intensity)}
              className="min-h-9 w-full font-mono text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
            >
              {t("toolUi.grain.resetIntensity")}
            </button>
          </div>
        </WorkflowSettings>

        <StripMetadataToggle
          checked={stripMetadata}
          disabled={!source}
          onChange={setStripMetadata}
        />

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel={t("downloads.download")}
          disabled={!canDownload}
          isProcessing={busy}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {t("toolUi.grain.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
