"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
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
  DEFAULT_SHARPEN_SETTINGS,
  drawImageToCanvas,
  renderSharpenedCanvas,
} from "@/lib/sharpenRender";
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
export function Sharpener() {
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

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isSharpening, setIsSharpening] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [intensity, setIntensity] = useState(DEFAULT_SHARPEN_SETTINGS.intensity);
  const debouncedIntensity = useDebouncedValue(intensity, 150);
  const [comparePosition, setComparePosition] = useState(50);

  useImageToolProject({
    toolId: "sharpener",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, intensity, comparePosition }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyNumberPayload(payload, "intensity", setIntensity);
      applyNumberPayload(payload, "comparePosition", setComparePosition);
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setIntensity(DEFAULT_SHARPEN_SETTINGS.intensity);
        setComparePosition(50);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) return;

    let cancelled = false;
    setIsSharpening(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          if (beforeCanvasRef.current) {
            drawImageToCanvas(
              image,
              source.width,
              source.height,
              beforeCanvasRef.current,
            );
          }

          if (afterCanvasRef.current) {
            renderSharpenedCanvas(
              image,
              source.width,
              source.height,
              { intensity: debouncedIntensity },
              afterCanvasRef.current,
            );
          }
        } catch (cause) {
          setError(
            resolveErrorMessage(language, cause, "toolUi.sharpener.sharpeningFailed"),
          );
        } finally {
          if (!cancelled) setIsSharpening(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError(t("toolUi.sharpener.loadFailed"));
          setIsSharpening(false);
        }
      };

      image.src = source.url;
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, debouncedIntensity, setError, t]);

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

  const handleDownloadImage = useCallback(async () => {
    if (!source || !afterCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      afterCanvasRef.current,
      buildDownloadFilename(`${source.name}-sharpened`, format),
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

  const busy = isProcessing || isSharpening;
  const isUpdatingPreview = intensity !== debouncedIntensity;
  const canDownload = !!source && !busy && !isUpdatingPreview;

  return (
    <ToolWorkspace hasActiveImage={!!source}>
        {!source ? (
          <ToolStyledUploadZone
            inputId="sharpener-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.sharpener.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="sharpener-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        {source ? (
          <ToolWorkspacePreview
            hint={t("toolUi.sharpener.compareHint")}
            caption={
              <>
                {source.width} × {source.height}px ·{" "}
                {isSharpening || isUpdatingPreview
                  ? t("toolUi.sharpener.sharpening")
                  : t("toolUi.sharpener.intensityPercent", { percent: intensity })}
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
              id="sharpener-intensity"
              label={t("toolUi.sharpener.sharpen")}
              value={intensity}
              min={0}
              max={100}
              step={1}
              suffix="%"
              disabled={!source}
              onChange={setIntensity}
              description={t("toolUi.sharpener.description")}
            />

            <button
              type="button"
              disabled={!source}
              onClick={() => setIntensity(DEFAULT_SHARPEN_SETTINGS.intensity)}
              className="min-h-9 w-full font-mono text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
            >
              {t("toolUi.sharpener.resetIntensity")}
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
          {t("toolUi.sharpener.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
