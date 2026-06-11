"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { SupportingArticleLink } from "@/components/tools/SupportingArticleLink";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { SliderControl } from "@/components/ui/SliderControl";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import {
  buildSvgDownloadFilename,
  DEFAULT_SVG_TRACE_SETTINGS,
  downloadSvgFile,
  traceImageToSvgAsync,
  type SvgColorMode,
  type SvgTraceSettings,
} from "@/lib/svgTraceRender";
import { CHARACTER_SIZES } from "@/lib/characters";

const COLOR_MODES: SvgColorMode[] = ["color", "grayscale", "bw"];

const activeModeClassName =
  "border-accent/40 bg-accent-muted text-accent";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function ImageToSvgConverter() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const { source, error, isProcessing, loadFile, setError } = useImageProcessor();

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isTracing, setIsTracing] = useState(false);
  const [settings, setSettings] = useState<SvgTraceSettings>(
    DEFAULT_SVG_TRACE_SETTINGS,
  );
  const [svgOutput, setSvgOutput] = useState<string | null>(null);
  const debouncedSettings = useDebouncedValue(settings, 250);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_SVG_TRACE_SETTINGS);
        setSvgOutput(null);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setSvgOutput(null);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setIsTracing(true);
      setError(null);

      try {
        const image = await loadImageElement(source.url);
        if (cancelled) return;

        const svg = await traceImageToSvgAsync(
          image,
          source.width,
          source.height,
          debouncedSettings,
          () => cancelled,
        );

        if (!cancelled) {
          setSvgOutput(svg);
        }
      } catch (cause) {
        if (cancelled) return;

        if (cause instanceof DOMException && cause.name === "AbortError") {
          return;
        }

        setError(
          resolveErrorMessage(language, cause, "toolUi.imageToSvg.traceFailed"),
        );
        setSvgOutput(null);
      } finally {
        if (!cancelled) {
          setIsTracing(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [source, debouncedSettings, setError, language]);

  const handleDownloadSvg = useCallback(async () => {
    if (!source || !svgOutput) return;
    await downloadSvgFile(
      svgOutput,
      buildSvgDownloadFilename(source.name),
    );
  }, [source, svgOutput]);

  const handleCopySvg = useCallback(async () => {
    if (!svgOutput) return;

    try {
      await navigator.clipboard.writeText(svgOutput);
    } catch {
      setError(t("toolUi.imageToSvg.copyFailed"));
    }
  }, [svgOutput, setError, t]);

  const busy = isProcessing || isTracing;
  const isUpdatingPreview =
    settings.complexity !== debouncedSettings.complexity ||
    settings.colorMode !== debouncedSettings.colorMode ||
    settings.simplifyPaths !== debouncedSettings.simplifyPaths;
  const canDownload = !!source && !!svgOutput && !busy && !isUpdatingPreview;

  return (
    <ToolWorkspace>
      {!source ? (
        <ToolStyledUploadZone
          inputId="image-to-svg-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.imageToSvg.uploadHint")}
        />
      ) : (
        <ImageFileInput
          id="image-to-svg-replace"
          fileName={source.file.name}
          onFileChange={handleFileChange}
        />
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="relative space-y-4 overflow-visible border border-border bg-background p-4 pb-20 sm:pb-24">
          <SliderControl
            id="svg-trace-complexity"
            label={t("toolUi.imageToSvg.complexity")}
            value={settings.complexity}
            min={0}
            max={100}
            step={1}
            suffix="%"
            disabled={!source || busy}
            onChange={(complexity) =>
              setSettings((current) => ({ ...current, complexity }))
            }
            description={t("toolUi.imageToSvg.complexityHint")}
          />

          <div className="space-y-2">
            <span className="font-label text-muted">
              {t("toolUi.imageToSvg.colorMode")}
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {COLOR_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  disabled={!source || busy}
                  onClick={() =>
                    setSettings((current) => ({ ...current, colorMode: mode }))
                  }
                  className={`min-h-9 rounded-sm border border-border bg-card px-2 py-2 font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50 ${
                    settings.colorMode === mode ? activeModeClassName : ""
                  }`}
                >
                  {t(`toolUi.imageToSvg.colorModes.${mode}`)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-border bg-card px-3 py-2.5">
            <input
              type="checkbox"
              className="mt-0.5 accent-[var(--glow-teal)]"
              checked={settings.simplifyPaths}
              disabled={!source || busy}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  simplifyPaths: event.target.checked,
                }))
              }
            />
            <span className="space-y-1">
              <span className="block font-label text-xs text-foreground">
                {t("toolUi.imageToSvg.simplifyPaths")}
              </span>
              <span className="block font-mono text-[10px] leading-relaxed text-muted">
                {t("toolUi.imageToSvg.simplifyPathsHint")}
              </span>
            </span>
          </label>

          <button
            type="button"
            disabled={!source}
            onClick={() => setSettings(DEFAULT_SVG_TRACE_SETTINGS)}
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

        <div className="relative space-y-3 overflow-visible pb-20 sm:pb-24">
          <span className="font-label text-muted">{t("common.preview")}</span>
          <div className="flex min-h-56 items-center justify-center overflow-auto rounded-sm border border-border bg-background p-3 sm:min-h-72">
            {source && svgOutput && !isTracing && !isUpdatingPreview ? (
              <div
                className="svg-preview max-h-[min(50vh,420px)] max-w-full [&_svg]:h-auto [&_svg]:max-h-[min(50vh,420px)] [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : source && (isTracing || isUpdatingPreview) ? (
              <p className="px-4 text-center text-sm text-muted">
                {t("toolUi.imageToSvg.converting")}
              </p>
            ) : (
              <p className="px-4 text-center text-sm text-muted">
                {t("toolUi.imageToSvg.previewHint")}
              </p>
            )}
          </div>

          {source && (
            <p className="text-center font-mono text-[10px] text-muted">
              {source.width} × {source.height}px ·{" "}
              {isTracing || isUpdatingPreview
                ? t("toolUi.imageToSvg.converting")
                : svgOutput
                  ? t("toolUi.imageToSvg.ready")
                  : source.file.name}
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

      {error ? <HelperErrorAlert message={error} className="mt-4" /> : null}

      <ToolOutputActions
        onDownload={handleDownloadSvg}
        onCopy={handleCopySvg}
        downloadLabel={t("toolUi.imageToSvg.downloadSvg")}
        copyLabel={t("toolUi.imageToSvg.copySvg")}
        disabled={!canDownload}
        copyDisabled={!canDownload}
        isProcessing={busy || isUpdatingPreview}
      />

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.imageToSvg.footer")}
      </p>

      <SupportingArticleLink
        slug="image-to-svg-guide"
        label={t("toolUi.imageToSvg.guideLabel")}
        title={t("toolUi.imageToSvg.guideTitle")}
      />
    </ToolWorkspace>
  );
}
