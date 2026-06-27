"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ExampleImageCarousel } from "@/components/ui/ExampleImageCarousel";
import {
  EXAMPLE_IMAGES,
  loadExampleImageAsFile,
  type ExampleImageId,
} from "@/lib/exampleImages";

interface ExampleImageStripProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  selectedId?: ExampleImageId | null;
  className?: string;
}

export function ExampleImageStrip({
  onFileSelect,
  disabled = false,
  selectedId = null,
  className = "",
}: ExampleImageStripProps) {
  const { t, language } = useLanguage();
  const [loadingId, setLoadingId] = useState<ExampleImageId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = useCallback(
    async (id: ExampleImageId) => {
      const example = EXAMPLE_IMAGES.find((entry) => entry.id === id);
      if (!example || disabled || loadingId) return;

      setLoadingId(id);

      try {
        const file = await loadExampleImageAsFile(example);
        setError(null);
        onFileSelect(file);
      } catch (cause) {
        setError(
          resolveErrorMessage(language, cause, "errors.loadImageFailed"),
        );
      } finally {
        setLoadingId(null);
      }
    },
    [disabled, language, loadingId, onFileSelect],
  );

  const busy = disabled || loadingId !== null;

  return (
    <div className={`example-image-strip-wrap ${className}`.trim()}>
      <p className="example-image-strip-label font-label text-sm font-semibold text-foreground">
        {t("upload.noImageTryThese")}
      </p>

      <ExampleImageCarousel
        items={EXAMPLE_IMAGES}
        trackClassName="example-image-strip"
      >
        {(visibleImages, startIndex) =>
          visibleImages.map((example, index) => {
            const globalIndex = startIndex + index;
            const isActive = selectedId === example.id;
            const isLoading = loadingId === example.id;

            return (
              <button
                key={example.id}
                type="button"
                disabled={busy}
                onClick={(event) => {
                  event.stopPropagation();
                  void handleSelect(example.id);
                }}
                aria-pressed={isActive}
                aria-busy={isLoading}
                aria-label={t("upload.exampleImageAria", {
                  number: globalIndex + 1,
                })}
                className={`example-image-strip-thumb group ${
                  isActive ? "example-image-strip-thumb--active" : ""
                }`}
              >
                <Image
                  src={example.src}
                  alt=""
                  fill
                  sizes="48px"
                  className={`object-cover transition-opacity ${
                    isLoading
                      ? "opacity-40"
                      : "opacity-100 group-hover:opacity-90"
                  }`}
                  unoptimized
                />
              </button>
            );
          })
        }
      </ExampleImageCarousel>

      {loadingId ? (
        <p className="example-image-strip-status font-mono text-[10px] text-muted">
          {t("upload.loadingExample")}
        </p>
      ) : null}

      {error ? (
        <p className="font-mono text-[10px] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
