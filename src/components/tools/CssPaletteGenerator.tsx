"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { useToast } from "@/components/ui/ToastProvider";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import {
  buildCodeSnippet,
  CODE_FORMAT_OPTIONS,
  toPaletteSwatches,
  type CodeFormat,
  type PaletteSwatch,
} from "@/lib/cssPaletteFormat";
import { extractDominantColors } from "@/lib/paletteExtraction";
import { CHARACTER_SIZES } from "@/lib/characters";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function CssPaletteGenerator() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const [palette, setPalette] = useState<PaletteSwatch[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [codeFormat, setCodeFormat] = useState<CodeFormat>("css");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const codeSnippet = useMemo(
    () => (palette.length > 0 ? buildCodeSnippet(palette, codeFormat) : ""),
    [palette, codeFormat],
  );

  useEffect(() => {
    if (!source) {
      setPalette([]);
      return;
    }

    let cancelled = false;
    setIsExtracting(true);
    setError(null);

    void loadImageElement(source.url)
      .then((image) => {
        if (cancelled) return;
        setPalette(toPaletteSwatches(extractDominantColors(image, 5)));
      })
      .catch((cause) => {
        if (cancelled) return;
        setError(resolveErrorMessage(language, cause, "errors.extractPaletteFailed"));
        setPalette([]);
      })
      .finally(() => {
        if (!cancelled) setIsExtracting(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, setError]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleCopy = useCallback(
    async (value: string, key: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedKey(key);
        showToast(value, { title: t("common.copied") });
        window.setTimeout(() => setCopiedKey(null), 1500);
      } catch {
        setError(t("toast.couldNotCopy"));
      }
    },
    [showToast, setError, t],
  );

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: true,
        isProcessing: false,
        isReady: !!source,
      }}
    >
        {!source ? (
          <ToolStyledUploadZone
            inputId="css-palette-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.cssPalette.uploadHint")}
          />
        ) : (
          <div className="space-y-4">
            <ImageFileInput
              id="css-palette-replace"
              fileName={source.file.name}
              onFileChange={handleFileChange}
            />

            <div className="relative overflow-visible pb-20 sm:pb-24">
              <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={source.url}
                  alt={t("alt.sourcePreview")}
                  className="max-h-40 max-w-full object-contain"
                />
              </div>

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
        )}

        <section className="relative mt-6 space-y-4 overflow-visible pb-20 sm:pb-24">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-label text-foreground">{t("toolUi.cssPalette.extractedPalette")}</h2>
            {source && (
              <span className="font-mono text-[10px] text-muted">
                {isExtracting
                  ? t("toolUi.cssPalette.analyzing")
                  : t("toolUi.cssPalette.colorCount", { count: palette.length })}
              </span>
            )}
          </div>

          {!source ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.cssPalette.uploadHintLong")}
              </p>
            </div>
          ) : isExtracting ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
                <p className="font-label text-muted">{t("toolUi.cssPalette.extracting")}</p>
              </div>
            </div>
          ) : palette.length === 0 ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.cssPalette.noColors")}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {palette.map((color) => (
                <button
                  key={color.role}
                  type="button"
                  onClick={() => void handleCopy(color.hex, color.hex)}
                  className="flex items-center gap-3 rounded-sm border border-border bg-background p-3 text-left transition-colors hover:border-muted"
                >
                  <span
                    className="h-12 w-12 shrink-0 rounded-sm border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="min-w-0">
                    <span className="block font-label text-muted">
                      {t(`toolUi.cssPalette.roles.${color.role}`)}
                    </span>
                    <span
                      className={`block truncate font-mono text-xs ${
                        copiedKey === color.hex ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {copiedKey === color.hex ? t("common.copied") : color.hex}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

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
        </section>

        {palette.length > 0 && (
          <section className="mt-6 space-y-3 border-t border-border pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-label text-foreground">{t("toolUi.cssPalette.codeExport")}</h2>
              <select
                value={codeFormat}
                onChange={(event) =>
                  setCodeFormat(event.target.value as CodeFormat)
                }
                className="min-h-9 rounded-sm border border-border bg-background px-3 font-mono text-[10px] text-foreground outline-none focus:border-muted"
              >
                {CODE_FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`toolUi.cssPalette.formats.${option.value}`)}
                  </option>
                ))}
              </select>
            </div>

            <pre className="overflow-x-auto rounded-sm border border-border bg-background p-4 font-mono text-[11px] leading-relaxed text-muted">
              {codeSnippet}
            </pre>

            <button
              type="button"
              onClick={() => void handleCopy(codeSnippet, "snippet")}
              className="min-h-11 w-full rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20"
            >
              {copiedKey === "snippet"
                ? t("toolUi.cssPalette.snippetCopied")
                : t("toolUi.cssPalette.copySnippet")}
            </button>
          </section>
        )}

        {source && (
          <p className="mt-4 text-center font-mono text-[10px] text-muted">
            {source.width} × {source.height}px · {t("toolUi.cssPalette.footer")}
          </p>
        )}

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}
      
    </ToolWorkspace>
  );
}
