"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SliderControl } from "@/components/ui/SliderControl";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  getBorderedCanvasSize,
  renderBorderedCanvas,
  type BorderSettings,
} from "@/lib/borderRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const PRESETS: { key: "gallery" | "minimal" | "soft"; settings: BorderSettings }[] = [
  {
    key: "gallery",
    settings: { width: 48, color: "#ffffff", cornerRadius: 0 },
  },
  {
    key: "minimal",
    settings: { width: 8, color: "#121212", cornerRadius: 4 },
  },
  {
    key: "soft",
    settings: { width: 32, color: "#e8e8e8", cornerRadius: 16 },
  },
];

const DEFAULT_SETTINGS: BorderSettings = {
  width: 48,
  color: "#ffffff",
  cornerRadius: 0,
};

export function BorderGenerator() {
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
  const [settings, setSettings] = useState<BorderSettings>(DEFAULT_SETTINGS);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderBorderedCanvas(
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
      buildDownloadFilename(`${source.name}-framed`, format),
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

  const outputSize = source
    ? getBorderedCanvasSize(source.width, source.height, settings.width)
    : null;

  const patchSettings = useCallback((patch: Partial<BorderSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const canDownload = !!source && !isProcessing;

  return (
    <ToolWorkspace>
        {!source ? (
          <ImageUploadDropzone
            inputId="border-generator-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.border.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="border-generator-replace"
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
                  {t("toolUi.border.previewHint")}
                </p>
              )}
            </div>
            {source && outputSize && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px → {outputSize.width} ×{" "}
                {outputSize.height}px
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
                    {t(`toolUi.border.${preset.key}`)}
                  </button>
                ))}
              </div>
            </div>

            <SliderControl
              id="border-width"
              label={t("common.width")}
              value={settings.width}
              min={0}
              max={120}
              step={1}
              suffix="px"
              disabled={!source}
              onChange={(width) => patchSettings({ width })}
            />

            <div className="space-y-2">
              <label htmlFor="border-color" className="font-label text-muted">
                {t("common.color")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="border-color"
                  type="color"
                  disabled={!source}
                  value={settings.color}
                  onChange={(event) =>
                    patchSettings({ color: event.target.value })
                  }
                  className="h-11 w-14 shrink-0 cursor-pointer rounded-sm border border-border bg-background p-1 disabled:opacity-50"
                />
                <span className="font-mono text-xs text-muted">{settings.color}</span>
              </div>
            </div>

            <SliderControl
              id="border-radius"
              label={t("toolUi.border.cornerRadius")}
              value={settings.cornerRadius}
              min={0}
              max={64}
              step={1}
              suffix="px"
              disabled={!source}
              onChange={(cornerRadius) => patchSettings({ cornerRadius })}
            />
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
          {t("toolUi.border.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
