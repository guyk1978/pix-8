"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { useToast } from "@/components/ui/ToastProvider";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import {
  extractDominantColors,
  type PaletteColor,
} from "@/lib/paletteExtraction";
import { CHARACTER_SIZES } from "@/lib/characters";

function loadImageElement(
  url: string,
  loadFailedMessage: string,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(loadFailedMessage));
    image.src = url;
  });
}

export function PaletteExtractor() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useImageToolProject({
    toolId: "palette-extractor",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, palette }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      if (Array.isArray(payload.palette)) {
        setPalette(payload.palette as PaletteColor[]);
      }
    },
  });

  useEffect(() => {
    if (!source) {
      setPalette([]);
      return;
    }

    let cancelled = false;
    setIsExtracting(true);
    setError(null);

    void loadImageElement(source.url, t("toolUi.paletteExtractor.loadFailed"))
      .then((image) => {
        if (cancelled) return;
        setPalette(extractDominantColors(image));
      })
      .catch((cause) => {
        if (cancelled) return;
        setError(
          resolveErrorMessage(language, cause, "toolUi.paletteExtractor.extractFailed"),
        );
        setPalette([]);
      })
      .finally(() => {
        if (!cancelled) setIsExtracting(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, setError, t]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleCopyHex = useCallback(
    async (hex: string) => {
      try {
        await navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        showToast(hex, { title: t("common.copied") });
        window.setTimeout(() => setCopiedHex(null), 1500);
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
            inputId="palette-upload"
            onFileChange={handleFileChange}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            formatHint={t("toolUi.paletteExtractor.uploadHint")}
          />
        ) : (
          <div className="space-y-4">
            <ImageFileInput
              id="palette-replace"
              fileName={source.file.name}
              onFileChange={handleFileChange}
            />

            <div className="relative overflow-visible pb-20 sm:pb-24">
              <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={source.url}
                  alt={t("alt.sourcePreview")}
                  className="max-h-48 max-w-full object-contain"
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

        <section className="relative mt-6 overflow-visible pb-20 sm:pb-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-label text-foreground">
              {t("toolUi.paletteExtractor.extractedPalette")}
            </h2>
            {source && (
              <span className="font-mono text-xs text-muted">
                {isExtracting
                  ? t("toolUi.paletteExtractor.analyzing")
                  : t("toolUi.paletteExtractor.colorCount", {
                      count: palette.length,
                    })}
              </span>
            )}
          </div>

          {!source ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.paletteExtractor.uploadHint")}
              </p>
            </div>
          ) : isExtracting ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
                <p className="font-label text-muted">
                  {t("toolUi.paletteExtractor.extracting")}
                </p>
              </div>
            </div>
          ) : palette.length === 0 ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.paletteExtractor.noColors")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {palette.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => void handleCopyHex(color.hex)}
                  className="group flex flex-col items-center gap-2 rounded-sm border border-transparent p-1 transition-colors hover:border-border focus-visible:border-muted focus-visible:outline-none"
                  aria-label={t("toolUi.paletteExtractor.copyHex", {
                    hex: color.hex,
                  })}
                >
                  <span
                    className="h-14 w-full rounded-md border border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-[1.03] sm:h-16"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide transition-colors sm:text-xs ${
                      copiedHex === color.hex
                        ? "text-foreground"
                        : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {copiedHex === color.hex ? t("common.copied") : color.hex}
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

        {source && (
          <p className="mt-4 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
          </p>
        )}

        <div className="mt-5 border-t border-border pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
          {stripMetadata && source && (
            <p className="mt-2 font-mono text-[10px] text-muted">
              {t("privacy.privacyModeActive")}
            </p>
          )}
        </div>

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <div className="mt-4">
          <ToolProjectSaveButton />
        </div>
    </ToolWorkspace>
  );
}
