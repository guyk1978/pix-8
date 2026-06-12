"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { SupportingArticleLink } from "@/components/tools/SupportingArticleLink";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import {
  DEFAULT_IMAGE_FILTER,
  drawImageToCanvas,
  IMAGE_FILTER_IDS,
  renderFilteredCanvasAsync,
  type ImageFilterId,
} from "@/lib/filterRender";
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
import { CHARACTER_SIZES } from "@/lib/characters";

const activeFilterClassName =
  "border-accent/40 bg-accent-muted text-accent";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function ImageFilters() {
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

  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isDraggingCompareRef = useRef(false);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [comparePosition, setComparePosition] = useState(50);
  const [activeFilter, setActiveFilter] = useState<ImageFilterId>(
    DEFAULT_IMAGE_FILTER,
  );

  useImageToolProject({
    toolId: "image-filters",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, activeFilter, comparePosition }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyNumberPayload(payload, "comparePosition", setComparePosition);
      if (typeof payload.activeFilter === "string") {
        setActiveFilter(payload.activeFilter as ImageFilterId);
      }
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setActiveFilter(DEFAULT_IMAGE_FILTER);
        setComparePosition(50);
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

      setIsApplyingFilter(true);
      setError(null);

      try {
        const image = await loadImageElement(source.url);
        if (cancelled) return;

        drawImageToCanvas(image, source.width, source.height, beforeCanvas);

        if (activeFilter === "none") {
          drawImageToCanvas(image, source.width, source.height, afterCanvas);
        } else {
          await renderFilteredCanvasAsync(
            image,
            source.width,
            source.height,
            activeFilter,
            afterCanvas,
            () => cancelled,
          );
        }
      } catch (cause) {
        if (cancelled) return;
        setError(
          resolveErrorMessage(language, cause, "toolUi.imageFilters.filterFailed"),
        );
      } finally {
        if (!cancelled) {
          setIsApplyingFilter(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [source, activeFilter, setError, language]);

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
      buildDownloadFilename(`${source.name}-filtered`, format),
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

  const busy = isProcessing || isApplyingFilter;
  const canDownload = !!source && !busy;

  return (
    <ToolWorkspace>
      {!source ? (
        <ToolStyledUploadZone
          inputId="image-filters-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.imageFilters.uploadHint")}
        />
      ) : (
        <ImageFileInput
          id="image-filters-replace"
          fileName={source.file.name}
          onFileChange={handleFileChange}
        />
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="relative space-y-4 overflow-visible border border-border bg-background p-4 pb-20 sm:pb-24">
          <div className="space-y-2">
            <span className="font-label text-muted">
              {t("toolUi.imageFilters.filters")}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {IMAGE_FILTER_IDS.map((filterId) => (
                <button
                  key={filterId}
                  type="button"
                  disabled={!source || busy}
                  onClick={() => setActiveFilter(filterId)}
                  className={`min-h-10 rounded-sm border border-border bg-card px-2 py-2 font-mono text-[10px] leading-tight text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50 ${
                    activeFilter === filterId ? activeFilterClassName : ""
                  }`}
                >
                  {t(`toolUi.imageFilters.filterNames.${filterId}`)}
                </button>
              ))}
            </div>
          </div>

          <p className="font-mono text-[10px] leading-relaxed text-muted">
            {t(`toolUi.imageFilters.filterDescriptions.${activeFilter}`)}
          </p>

          <button
            type="button"
            disabled={!source || activeFilter === "none"}
            onClick={() => setActiveFilter(DEFAULT_IMAGE_FILTER)}
            className="min-h-9 w-full rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
          >
            {t("toolUi.imageFilters.resetFilter")}
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
          <div className="flex items-center justify-between gap-2">
            <span className="font-label text-muted">
              {t("toolUi.imageFilters.beforeAfter")}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {t("toolUi.imageFilters.compareHint")}
            </span>
          </div>

          <div
            ref={comparisonRef}
            className={`relative flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-72 ${
              source ? "cursor-col-resize touch-none" : ""
            }`}
            onPointerDown={source ? handleComparePointerDown : undefined}
            onPointerMove={source ? handleComparePointerMove : undefined}
            onPointerUp={source ? handleComparePointerUp : undefined}
            onPointerCancel={source ? handleComparePointerUp : undefined}
          >
            {source ? (
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
                  <span className="rounded-sm border border-border bg-card px-2 py-1 font-mono text-[9px] text-muted">
                    {t("common.before")}
                  </span>
                  <span className="h-8 w-4 rounded-sm border border-border bg-card" />
                  <span className="rounded-sm border border-border bg-card px-2 py-1 font-mono text-[9px] text-muted">
                    {t("common.after")}
                  </span>
                </div>
              </div>
            ) : (
              <p className="px-4 text-center text-sm text-muted">
                {t("toolUi.imageFilters.previewHint")}
              </p>
            )}
          </div>

          {source && (
            <p className="text-center font-mono text-[10px] text-muted">
              {source.width} × {source.height}px ·{" "}
              {isApplyingFilter
                ? t("toolUi.imageFilters.applying")
                : t(`toolUi.imageFilters.filterNames.${activeFilter}`)}
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
          disabled={!source}
          onChange={setStripMetadata}
        />
      </div>

      {error ? <HelperErrorAlert message={error} className="mt-4" /> : null}

      <ToolOutputActions
        onDownload={handleDownloadImage}
        onCopy={handleCopyImage}
        downloadLabel={t("downloads.download")}
        disabled={!canDownload}
        isProcessing={busy}
      />

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.imageFilters.footer")}
      </p>

      <SupportingArticleLink
        slug="online-photo-filters"
        label={t("toolUi.imageFilters.guideLabel")}
        title={t("toolUi.imageFilters.guideTitle")}
      />

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
