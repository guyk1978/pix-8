"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { SliderControl } from "@/components/ui/SliderControl";
import { useToast } from "@/components/ui/ToastProvider";
import {
  copyImageToClipboard,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { useImageToolProject } from "@/hooks/useToolProject";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildFaviconExport,
  DEFAULT_FAVICON_SETTINGS,
  downloadBlob,
  FAVICON_PREVIEW_SIZES,
  renderFaviconCanvas,
  type FaviconExportFormat,
  type FaviconSettings,
} from "@/lib/faviconRender";
import { CHARACTER_SIZES } from "@/lib/characters";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

const FORMAT_VALUES: FaviconExportFormat[] = ["ico", "png"];

export function FaviconGenerator() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const { source, error, isProcessing, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [settings, setSettings] = useState<FaviconSettings>(
    DEFAULT_FAVICON_SETTINGS,
  );
  const [exportFormat, setExportFormat] = useState<FaviconExportFormat>("ico");

  useImageToolProject({
    toolId: "favicon-generator",
    source,
    loadFile,
    getExtraPayload: () => ({ settings, exportFormat }),
    applyPayload: (payload) => {
      if (payload.settings && typeof payload.settings === "object") {
        setSettings(payload.settings as FaviconSettings);
      }
      if (payload.exportFormat === "ico" || payload.exportFormat === "png") {
        setExportFormat(payload.exportFormat);
      }
    },
  });

  const formatLabels: Record<FaviconExportFormat, string> = {
    ico: t("toolUi.favicon.ico"),
    png: t("toolUi.favicon.png32"),
  };

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_FAVICON_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  const renderPreviews = useCallback(
    (image: HTMLImageElement) => {
      if (sourceCanvasRef.current) {
        renderFaviconCanvas(image, 128, settings, sourceCanvasRef.current);
      }

      for (const size of FAVICON_PREVIEW_SIZES) {
        const canvas = previewRefs.current[size];
        if (canvas) {
          renderFaviconCanvas(image, size, settings, canvas);
        }
      }
    },
    [settings],
  );

  useEffect(() => {
    if (!source) {
      loadedImageRef.current = null;
      return;
    }

    const image = new Image();
    image.onload = () => {
      loadedImageRef.current = image;
      requestAnimationFrame(() => renderPreviews(image));
    };
    image.src = source.url;
  }, [source, renderPreviews]);

  const exportFavicon = useCallback(async () => {
    if (!source) return null;

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = source.url;
    });

    return buildFaviconExport(image, settings, exportFormat);
  }, [source, settings, exportFormat]);

  const handleDownload = useCallback(async () => {
    if (!source) return;

    setIsExporting(true);
    setError(null);

    try {
      const result = await exportFavicon();
      if (!result) return;

      downloadBlob(result.blob, result.filename);
      showToast(result.filename, { title: t("toast.faviconReady") });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.exportFailed"));
    } finally {
      setIsExporting(false);
    }
  }, [source, exportFavicon, showToast, setError, t]);

  const handleCopy = useCallback(async () => {
    if (!source) return;

    setIsExporting(true);
    setError(null);

    try {
      const result = await exportFavicon();
      if (!result) return;

      await copyImageToClipboard(result.blob);
      showToast(t("toast.faviconCopied"), {
        title: t("toast.copiedToClipboard"),
      });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.copyImageFailed"));
    } finally {
      setIsExporting(false);
    }
  }, [source, exportFavicon, showToast, setError, t]);

  const busy = isProcessing || isExporting;
  const canDownload = !!source && !busy;

  return (
    <ToolWorkspace>
        {!source ? (
          <ToolStyledUploadZone
            inputId="favicon-generator-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            ariaLabel={t("upload.uploadLogoAria")}
            hint={t("upload.dropLogoHint")}
            formatHint={t("toolUi.favicon.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="favicon-generator-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="relative space-y-4 overflow-visible pb-20 sm:pb-24">
            <div className="space-y-3">
              <span className="font-label text-muted">
                {t("toolUi.favicon.cropPreview")}
              </span>
              <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-4">
                {source ? (
                  <canvas
                    ref={sourceCanvasRef}
                    className="max-h-36 max-w-full object-contain"
                  />
                ) : (
                  <p className="px-4 text-center text-sm text-muted">
                    {t("toolUi.favicon.uploadHint")}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-label text-muted">
                {t("toolUi.favicon.tabPreview")}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {FAVICON_PREVIEW_SIZES.map((size) => (
                  <div
                    key={size}
                    className="flex flex-col items-center gap-2 rounded-sm border border-border bg-background p-3"
                  >
                    <canvas
                      ref={(node) => {
                        previewRefs.current[size] = node;
                        if (node && loadedImageRef.current) {
                          renderFaviconCanvas(
                            loadedImageRef.current,
                            size,
                            settings,
                            node,
                          );
                        }
                      }}
                      width={size}
                      height={size}
                      className="border border-border"
                      style={{
                        width: size * 2,
                        height: size * 2,
                        imageRendering: "pixelated",
                      }}
                    />
                    <span className="font-mono text-[10px] text-muted">
                      {size}×{size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {t("toolUi.favicon.sourceInfo", {
                  width: source.width,
                  height: source.height,
                  name: source.file.name,
                })}
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
              id="favicon-zoom"
              label={t("toolUi.favicon.zoom")}
              value={settings.zoom}
              min={0.6}
              max={1.8}
              step={0.05}
              suffix="×"
              disabled={!source}
              onChange={(zoom) => setSettings({ zoom })}
              description={t("toolUi.favicon.zoomDescription")}
            />

            <div className="space-y-2">
              <label htmlFor="favicon-format" className="font-label text-muted">
                {t("toolUi.favicon.exportFormat")}
              </label>
              <select
                id="favicon-format"
                disabled={!source}
                value={exportFormat}
                onChange={(event) =>
                  setExportFormat(event.target.value as FaviconExportFormat)
                }
                className={inputClassName}
              >
                {FORMAT_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {formatLabels[value]}
                  </option>
                ))}
              </select>
            </div>

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

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <ToolOutputActions
          onDownload={handleDownload}
          onCopy={handleCopy}
          downloadLabel={t("downloads.download")}
          disabled={!canDownload}
          isProcessing={busy}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {t("toolUi.favicon.footer")}
        </p>
      
    </ToolWorkspace>
  );
}
