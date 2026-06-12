"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { SliderControl } from "@/components/ui/SliderControl";
import {
  DEFAULT_LIGHT_ADJUST_SETTINGS,
  renderLightAdjustedCanvas,
  type LightAdjustSettings,
} from "@/lib/lightAdjustRender";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
import { CHARACTER_SIZES } from "@/lib/characters";

const PRESET_KEYS = ["balanced", "brighten", "punch"] as const;

const PRESET_SETTINGS: Record<
  (typeof PRESET_KEYS)[number],
  LightAdjustSettings
> = {
  balanced: { brightness: 0, contrast: 100 },
  brighten: { brightness: 18, contrast: 105 },
  punch: { brightness: 5, contrast: 125 },
};

export function LightAdjuster() {
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
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<LightAdjustSettings>(
    DEFAULT_LIGHT_ADJUST_SETTINGS,
  );
  const debouncedSettings = useDebouncedValue(settings, 150);

  useImageToolProject({
    toolId: "light-adjuster",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, settings }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      if (payload.settings && typeof payload.settings === "object") {
        setSettings(payload.settings as LightAdjustSettings);
      }
    },
  });

  const presets = useMemo(
    () =>
      PRESET_KEYS.map((key) => ({
        key,
        label: t(`toolUi.lightAdjuster.${key}`),
        settings: PRESET_SETTINGS[key],
      })),
    [t],
  );

  const patchSettings = useCallback((patch: Partial<LightAdjustSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_LIGHT_ADJUST_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    let cancelled = false;
    setIsAdjusting(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          renderLightAdjustedCanvas(
            image,
            source.width,
            source.height,
            debouncedSettings,
            previewCanvasRef.current,
          );
        } catch (cause) {
          setError(
            resolveErrorMessage(language, cause, "toolUi.lightAdjuster.adjustmentFailed"),
          );
        } finally {
          if (!cancelled) setIsAdjusting(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError(t("toolUi.lightAdjuster.loadFailed"));
          setIsAdjusting(false);
        }
      };

      image.src = source.url;
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, debouncedSettings, setError, t]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-adjusted`, format),
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

  const busy = isProcessing || isAdjusting;
  const isUpdatingPreview =
    settings.brightness !== debouncedSettings.brightness ||
    settings.contrast !== debouncedSettings.contrast;
  const canDownload = !!source && !busy && !isUpdatingPreview;

  const brightnessLabel =
    settings.brightness > 0 ? `+${settings.brightness}` : String(settings.brightness);

  return (
    <ToolWorkspace>
        {!source ? (
          <ToolStyledUploadZone
            inputId="light-adjuster-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.lightAdjuster.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="light-adjuster-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="relative space-y-3 overflow-visible pb-20 sm:pb-24">
            <span className="font-label text-muted">{t("common.preview")}</span>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[min(50vh,420px)] max-w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  {t("toolUi.lightAdjuster.previewHint")}
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isAdjusting
                  ? t("toolUi.lightAdjuster.applying")
                  : t("toolUi.lightAdjuster.values", {
                      brightness: brightnessLabel,
                      contrast: settings.contrast,
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
            <div className="space-y-2">
              <span className="font-label text-muted">{t("common.presets")}</span>
              <div className="grid grid-cols-3 gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    disabled={!source}
                    onClick={() => setSettings(preset.settings)}
                    className="min-h-9 rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <SliderControl
              id="light-brightness"
              label={t("common.brightness")}
              value={settings.brightness}
              min={-50}
              max={50}
              step={1}
              suffix=""
              disabled={!source}
              onChange={(brightness) => patchSettings({ brightness })}
            />

            <SliderControl
              id="light-contrast"
              label={t("common.contrast")}
              value={settings.contrast}
              min={50}
              max={150}
              step={1}
              suffix="%"
              disabled={!source}
              onChange={(contrast) => patchSettings({ contrast })}
            />

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_LIGHT_ADJUST_SETTINGS)}
              className="min-h-9 w-full rounded-sm border border-border bg-card font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
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
          {t("toolUi.lightAdjuster.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
