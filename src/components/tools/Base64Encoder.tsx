"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { useToast } from "@/components/ui/ToastProvider";
import {
  fileToDataUrl,
  formatBase64Output,
  formatByteCount,
} from "@/lib/base64Encode";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import { CHARACTER_SIZES } from "@/lib/characters";

export function Base64Encoder() {
  const { t, language } = useLanguage();
  const characterSize = CHARACTER_SIZES.field + 8;
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [includePrefix, setIncludePrefix] = useState(true);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isEncoding, setIsEncoding] = useState(false);
  const [copied, setCopied] = useState(false);

  useImageToolProject({
    toolId: "base64-encoder",
    source,
    loadFile,
    getExtraPayload: () => ({ includePrefix }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "includePrefix", setIncludePrefix);
    },
  });

  const output = useMemo(
    () => (dataUrl ? formatBase64Output(dataUrl, includePrefix) : ""),
    [dataUrl, includePrefix],
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setDataUrl(null);
      return;
    }

    let cancelled = false;
    setIsEncoding(true);
    setError(null);

    void fileToDataUrl(source.file)
      .then((encoded) => {
        if (!cancelled) setDataUrl(encoded);
      })
      .catch((cause) => {
        if (cancelled) return;
        setError(resolveErrorMessage(language, cause, "errors.encodeImageFailed"));
        setDataUrl(null);
      })
      .finally(() => {
        if (!cancelled) setIsEncoding(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, setError]);

  const handleCopy = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast(
        includePrefix ? t("toast.dataUrlCopied") : t("toast.base64Copied"),
        { title: t("common.copied") },
      );
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError(t("toast.couldNotCopy"));
    }
  }, [output, includePrefix, showToast, setError, t]);

  return (
    <ToolWorkspace>
        {!source ? (
          <ToolStyledUploadZone
            inputId="base64-encoder-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.base64.uploadHint")}
          />
        ) : (
          <div className="space-y-4">
            <ImageFileInput
              id="base64-encoder-replace"
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-label text-foreground">{t("toolUi.base64.output")}</h2>
            {source && dataUrl && !isEncoding && (
              <span className="font-mono text-[10px] text-muted">
                {t("toolUi.base64.charsSize", {
                  chars: output.length.toLocaleString(),
                  size: formatByteCount(source.file.size),
                })}
              </span>
            )}
          </div>

          {!source ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.base64.uploadHint")}
              </p>
            </div>
          ) : isEncoding ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
                <p className="font-label text-muted">{t("toolUi.base64.encoding")}</p>
              </div>
            </div>
          ) : (
            <>
              <label className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={includePrefix}
                  onChange={(event) => setIncludePrefix(event.target.checked)}
                  disabled={!dataUrl}
                  className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <span className="font-label text-muted">
                  {t("toolUi.base64.includePrefix")}
                </span>
                {includePrefix && (
                  <span className="font-mono text-[10px] text-accent">
                    data:image/…;base64,
                  </span>
                )}
              </label>

              <textarea
                readOnly
                value={output}
                rows={8}
                aria-label={t("toolUi.base64.output")}
                className="w-full resize-y rounded-sm border border-border bg-background p-4 font-mono text-[11px] leading-relaxed text-muted outline-none focus:border-muted"
              />

              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!output}
                className="min-h-11 w-full rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copied ? t("common.copied") : t("common.copyToClipboard")}
              </button>
            </>
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

        <div className="mt-4">
          <ToolProjectSaveButton />
        </div>

        {source && (
          <p className="mt-4 text-center font-mono text-[10px] text-muted">
            {source.width} × {source.height}px · {t("toolUi.base64.footer")}
          </p>
        )}

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}
      
    </ToolWorkspace>
  );
}
