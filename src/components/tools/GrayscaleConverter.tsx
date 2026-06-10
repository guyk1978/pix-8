"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  DEFAULT_GRAYSCALE_SETTINGS,
  renderGrayscaleCanvas,
  type GrayscaleSettings,
} from "@/lib/grayscaleRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

type GrayscalePresetKey = "neutral" | "dramatic" | "soft";

const PRESETS: { key: GrayscalePresetKey; settings: GrayscaleSettings }[] = [
  { key: "neutral", settings: { contrast: 100, brightness: 0 } },
  { key: "dramatic", settings: { contrast: 130, brightness: -5 } },
  { key: "soft", settings: { contrast: 85, brightness: 8 } },
];

export function GrayscaleConverter() {
  const { t } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<GrayscaleSettings>(
    DEFAULT_GRAYSCALE_SETTINGS,
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_GRAYSCALE_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderGrayscaleCanvas(
        image,
        source.width,
        source.height,
        settings,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, settings]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-grayscale`, format),
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

  const patchSettings = useCallback((patch: Partial<GrayscaleSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const canDownload = !!source && !isProcessing;

  return (
    <ToolWorkspace>
        {!source ? (
          <ImageUploadDropzone
            inputId="grayscale-converter-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.grayscale.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="grayscale-converter-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-3">
            <span className="font-label text-muted">{t("common.preview")}</span>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[min(50vh,420px)] max-w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  {t("toolUi.grayscale.previewHint")}
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px · {source.file.name}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-border bg-background p-4">
            <div className="space-y-2">
              <span className="font-label text-muted">{t("common.presets")}</span>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    disabled={!source}
                    onClick={() => setSettings(preset.settings)}
                    className="min-h-9 rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
                  >
                    {t(`toolUi.grayscale.${preset.key}`)}
                  </button>
                ))}
              </div>
            </div>

            <SliderControl
              id="grayscale-contrast"
              label={t("common.contrast")}
              value={settings.contrast}
              min={50}
              max={150}
              step={1}
              suffix="%"
              disabled={!source}
              onChange={(contrast) => patchSettings({ contrast })}
            />

            <SliderControl
              id="grayscale-brightness"
              label={t("common.brightness")}
              value={settings.brightness}
              min={-50}
              max={50}
              step={1}
              suffix=""
              disabled={!source}
              onChange={(brightness) => patchSettings({ brightness })}
            />

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_GRAYSCALE_SETTINGS)}
              className="min-h-9 w-full rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              {t("toolUi.grayscale.resetAdjustments")}
            </button>
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
          isProcessing={isProcessing}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {t("toolUi.grayscale.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
