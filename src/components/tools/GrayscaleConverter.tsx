"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
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
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
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

  useImageToolProject({
    toolId: "grayscale-converter",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, settings }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      if (payload.settings && typeof payload.settings === "object") {
        setSettings(payload.settings as GrayscaleSettings);
      }
    },
  });

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
    <ToolWorkspace hasActiveImage={!!source}>
        {!source ? (
          <ToolStyledUploadZone
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

        {source ? (
          <ToolWorkspacePreview
            caption={
              <>
                {source.width} × {source.height}px · {source.file.name}
              </>
            }
          >
            <canvas
              ref={previewCanvasRef}
              className="max-h-[min(50vh,420px)] max-w-full object-contain"
            />
          </ToolWorkspacePreview>
        ) : null}

        <WorkflowSettings>
          <div className="space-y-4">
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
                className="min-h-9 w-full font-mono text-xs text-muted transition-colors hover:text-foreground disabled:opacity-50"
              >
                {t("toolUi.grayscale.resetAdjustments")}
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
          isProcessing={isProcessing}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {t("toolUi.grayscale.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
