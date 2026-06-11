"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
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
import { CHARACTER_SIZES } from "@/lib/characters";

export function LensCorrector() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
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
    <ToolWorkspace>
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

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="relative space-y-3 overflow-visible pb-20 sm:pb-24">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label text-muted">{t("common.preview")}</span>
              <span className="font-mono text-[10px] text-muted">
                {correctionLabel(correction)}
              </span>
            </div>
            <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-72">
              {source ? (
                <>
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
                </>
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  {t("toolUi.lensCorrector.previewHint")}
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isCorrecting || isUpdatingPreview
                  ? t("toolUi.lensCorrector.correcting")
                  : t("toolUi.lensCorrector.dragToStraighten")}
              </p>
            )}

            <div
              className="pointer-events-none absolute bottom-0 left-0 z-10 sm:left-1"
              dir="ltr"
            >
              <HelperCharacter
                character="robot"
                alt={t("characters.robotAlt")}
                size={characterSize}
                glow="soft"
                pixelated
                animate="float"
              />
            </div>
          </div>

          <div className="relative space-y-4 overflow-visible border border-border bg-background p-4 pb-20 sm:pb-24">
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
              className="min-h-9 w-full rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              {t("toolUi.lensCorrector.resetCorrection")}
            </button>

            <div
              className="pointer-events-none absolute bottom-2 right-0 z-10 sm:right-1"
              dir="ltr"
            >
              <HelperCharacter
                character="widthAlt"
                alt={t("characters.widthAlt")}
                size={characterSize}
                glow="soft"
                pixelated
                animate="float"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5">
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
