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
  DEFAULT_LENS_CORRECTION_SETTINGS,
  renderLensCorrectedCanvas,
} from "@/lib/lensCorrectorRender";
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
export function LensCorrector() {
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

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [correction, setCorrection] = useState(
    DEFAULT_LENS_CORRECTION_SETTINGS.correction,
  );
  const debouncedCorrection = useDebouncedValue(correction, 150);

  useImageToolProject({
    toolId: "lens-corrector",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, showGrid, correction }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyBooleanPayload(payload, "showGrid", setShowGrid);
      applyNumberPayload(payload, "correction", setCorrection);
    },
  });

  const correctionLabel = useCallback(
    (value: number): string => {
      if (value === 0) return t("toolUi.lensCorrector.neutral");
      if (value < 0) return t("toolUi.lensCorrector.barrel", { value });
      return t("toolUi.lensCorrector.pincushion", { value });
    },
    [t],
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setCorrection(DEFAULT_LENS_CORRECTION_SETTINGS.correction);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    let cancelled = false;
    setIsCorrecting(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          renderLensCorrectedCanvas(
            image,
            source.width,
            source.height,
            { correction: debouncedCorrection },
            previewCanvasRef.current,
          );
        } catch (cause) {
          setError(resolveErrorMessage(language, cause, "errors.correctionFailed"));
        } finally {
          if (!cancelled) setIsCorrecting(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError(t("errors.loadImage"));
          setIsCorrecting(false);
        }
      };

      image.src = source.url;
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, debouncedCorrection, setError]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-corrected`, format),
      { format, quality, stripMetadata },
    );
  }, [source, stripMetadata, handleDownload]);

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

  const busy = isProcessing || isCorrecting;
  const isUpdatingPreview = correction !== debouncedCorrection;
  const canDownload = !!source && !busy && !isUpdatingPreview;

  return (
    <ToolWorkspace hasActiveImage={!!source}>
        {!source ? (
          <ToolStyledUploadZone
            inputId="lens-corrector-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.lensCorrector.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="lens-corrector-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        {source ? (
          <ToolWorkspacePreview
            hint={correctionLabel(correction)}
            caption={
              <>
                {source.width} × {source.height}px ·{" "}
                {isCorrecting || isUpdatingPreview
                  ? t("toolUi.lensCorrector.correcting")
                  : t("toolUi.lensCorrector.dragToStraighten")}
              </>
            }
          >
            <div className="relative flex min-h-56 w-full items-center justify-center sm:min-h-72">
              <canvas
                ref={previewCanvasRef}
                className="max-h-[min(50vh,420px)] max-w-full object-contain"
              />
              {showGrid && (
                <div
                  className="pointer-events-none absolute inset-3 opacity-60"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(232,232,232,0.35) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(232,232,232,0.35) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          </ToolWorkspacePreview>
        ) : null}

        <WorkflowSettings>
          <div className="space-y-4">
              <SliderControl
                id="lens-correction"
                label={t("toolUi.lensCorrector.lensCorrection")}
                value={correction}
                min={-100}
                max={100}
                step={1}
                suffix=""
                disabled={!source}
                onChange={setCorrection}
              />
              <div className="flex justify-between font-mono text-[9px] text-muted">
                <span>{t("toolUi.lensCorrector.barrelLabel")}</span>
                <span>0</span>
                <span>{t("toolUi.lensCorrector.pincushionLabel")}</span>
              </div>

              <label className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  disabled={!source}
                  checked={showGrid}
                  onChange={(event) => setShowGrid(event.target.checked)}
                  className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:opacity-50"
                />
                <span className="font-label text-muted">
                  {t("toolUi.lensCorrector.gridOverlay")}
                </span>
              </label>

              <button
                type="button"
                disabled={!source}
                onClick={() =>
                  setCorrection(DEFAULT_LENS_CORRECTION_SETTINGS.correction)
                }
                className="min-h-9 w-full font-mono text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
              >
                {t("toolUi.lensCorrector.resetCorrection")}
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
          {t("toolUi.lensCorrector.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
