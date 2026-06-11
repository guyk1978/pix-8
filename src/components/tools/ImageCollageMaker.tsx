"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { BulkFileQueue } from "@/components/tools/BulkFileQueue";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { SupportingArticleLink } from "@/components/tools/SupportingArticleLink";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { SliderControl } from "@/components/ui/SliderControl";
import { useBulkFiles } from "@/hooks/useBulkFiles";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  buildDownloadFilename,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  COLLAGE_LAYOUT_IDS,
  DEFAULT_COLLAGE_SETTINGS,
  drawCollage,
  getCollageCanvasSize,
  getCollageGrid,
  loadImageElement,
  type CollageSettings,
} from "@/lib/collageRender";
import { CHARACTER_SIZES } from "@/lib/characters";

const activeLayoutClassName =
  "border-accent/40 bg-accent-muted text-accent";

const buttonClassName =
  "min-h-9 rounded-sm border border-border bg-card px-2 py-2 font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50";

export function ImageCollageMaker() {
  const { t } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const {
    canvasRef,
    error,
    isProcessing,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const bulk = useBulkFiles();

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<CollageSettings>(
    DEFAULT_COLLAGE_SETTINGS,
  );
  const debouncedGap = useDebouncedValue(settings.gap, 150);

  const renderSettings: CollageSettings = {
    ...settings,
    gap: debouncedGap,
  };

  const handleFilesAdded = useCallback(
    (files: FileList) => {
      void bulk.addFiles(files);
    },
    [bulk],
  );

  useEffect(() => {
    if (bulk.items.length === 0) {
      const canvas = previewCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = 0;
          canvas.height = 0;
        }
      }
      return;
    }

    let cancelled = false;

    const run = async () => {
      const canvas = previewCanvasRef.current;
      if (!canvas || cancelled) return;

      setIsRendering(true);
      setError(null);

      try {
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve());
        });

        if (cancelled) return;

        const elements = await Promise.all(
          bulk.items.map((item) => loadImageElement(item.url)),
        );

        if (cancelled) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Canvas context unavailable.");
        }

        drawCollage(ctx, elements, renderSettings);
      } catch (cause) {
        if (cancelled) return;
        setError(
          cause instanceof Error ? cause.message : t("toolUi.collage.renderFailed"),
        );
      } finally {
        if (!cancelled) {
          setIsRendering(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [bulk.items, renderSettings, setError, t]);

  const handleDownloadCollage = useCallback(async () => {
    if (!previewCanvasRef.current || bulk.items.length === 0) return;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename("collage", "png"),
      { format: "png", stripMetadata },
    );
  }, [bulk.items.length, stripMetadata, handleDownload]);

  const handleCopyCollage = useCallback(async () => {
    if (!previewCanvasRef.current || bulk.items.length === 0) return;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format: "png",
      stripMetadata,
    });
  }, [bulk.items.length, stripMetadata, handleCopyToClipboard]);

  const hasImages = bulk.items.length > 0;
  const isUpdatingPreview = settings.gap !== debouncedGap;
  const busy = isProcessing || isRendering || bulk.isLoading;
  const canDownload =
    hasImages && !busy && !isUpdatingPreview && !!previewCanvasRef.current;

  const grid = hasImages
    ? getCollageGrid(renderSettings.layout, bulk.items.length)
    : null;
  const outputSize = grid
    ? getCollageCanvasSize(grid, renderSettings.gap)
    : null;

  const displayError = error ?? bulk.error;

  return (
    <ToolWorkspace>
      <ToolStyledUploadZone
        inputId="image-collage-upload"
        onFileChange={() => {}}
        onFilesChange={handleFilesAdded}
        multiple
        isDragging={isDraggingFile}
        onDraggingChange={setIsDraggingFile}
        formatHint={t("toolUi.collage.uploadHint")}
      />

      {hasImages ? (
        <div className="mt-4">
          <BulkFileQueue
            items={bulk.items}
            onRemove={bulk.removeFile}
            onClear={bulk.clear}
          />
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="relative space-y-4 overflow-visible border border-border bg-background p-4 pb-20 sm:pb-24">
          <div className="space-y-2">
            <span className="font-label text-muted">
              {t("toolUi.collage.layout")}
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {COLLAGE_LAYOUT_IDS.map((layoutId) => (
                <button
                  key={layoutId}
                  type="button"
                  disabled={!hasImages || busy}
                  onClick={() =>
                    setSettings((current) => ({ ...current, layout: layoutId }))
                  }
                  className={`${buttonClassName} text-start ${
                    settings.layout === layoutId ? activeLayoutClassName : ""
                  }`}
                >
                  <span className="block font-label text-xs text-foreground">
                    {t(`toolUi.collage.layouts.${layoutId}.title`)}
                  </span>
                  <span className="block font-mono text-[10px] text-muted">
                    {t(`toolUi.collage.layouts.${layoutId}.hint`)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <SliderControl
            id="collage-gap"
            label={t("toolUi.collage.gap")}
            value={settings.gap}
            min={0}
            max={48}
            step={1}
            suffix="px"
            disabled={!hasImages}
            onChange={(gap) => setSettings((current) => ({ ...current, gap }))}
            description={t("toolUi.collage.gapHint")}
          />

          <div className="space-y-2">
            <label htmlFor="collage-background" className="font-label text-muted">
              {t("toolUi.collage.background")}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="collage-background"
                type="color"
                disabled={!hasImages}
                value={settings.backgroundColor}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    backgroundColor: event.target.value,
                  }))
                }
                className="h-11 w-14 shrink-0 cursor-pointer rounded-sm border border-border bg-background p-1 disabled:opacity-50"
              />
              <span className="font-mono text-xs text-muted">
                {settings.backgroundColor}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!hasImages}
            onClick={() => setSettings(DEFAULT_COLLAGE_SETTINGS)}
            className={`${buttonClassName} w-full`}
          >
            {t("common.reset")}
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

        <div className="relative space-y-3 overflow-visible pb-20 sm:pb-24">
          <span className="font-label text-muted">{t("common.preview")}</span>
          <div className="relative flex min-h-56 items-center justify-center overflow-auto rounded-sm border border-border bg-background p-3 sm:min-h-72">
            {hasImages ? (
              <>
                <canvas
                  ref={previewCanvasRef}
                  className={`max-h-[min(60vh,520px)] max-w-full object-contain transition-opacity ${
                    isRendering || isUpdatingPreview ? "opacity-30" : "opacity-100"
                  }`}
                />
                {isRendering || isUpdatingPreview ? (
                  <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted">
                    {t("toolUi.collage.rendering")}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="px-4 text-center text-sm text-muted">
                {t("toolUi.collage.previewHint")}
              </p>
            )}
          </div>

          {hasImages && outputSize && (
            <p className="text-center font-mono text-[10px] text-muted">
              {outputSize.width} × {outputSize.height}px ·{" "}
              {bulk.items.length === 1
                ? t("bulk.imagesQueuedOne")
                : t("bulk.imagesQueued", { count: bulk.items.length })}
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
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <StripMetadataToggle
          checked={stripMetadata}
          disabled={!hasImages}
          onChange={setStripMetadata}
        />
      </div>

      {displayError ? (
        <HelperErrorAlert message={displayError} className="mt-4" />
      ) : null}

      <ToolOutputActions
        onDownload={handleDownloadCollage}
        onCopy={handleCopyCollage}
        downloadLabel={t("toolUi.collage.downloadCollage")}
        disabled={!canDownload}
        isProcessing={busy || isUpdatingPreview}
      />

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.collage.footer")}
      </p>

      <SupportingArticleLink
        slug="image-collage-guide"
        label={t("toolUi.collage.guideLabel")}
        title={t("toolUi.collage.guideTitle")}
      />

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
