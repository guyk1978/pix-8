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

const activeCardClassName =
  "border-accent/40 bg-accent-muted ring-1 ring-accent/30";

interface ImageGalleryProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  selectedId?: ExampleImageId | null;
}

export function ImageGallery({
  onFileSelect,
  disabled = false,
  selectedId = null,
}: ImageGalleryProps) {
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
    <section className="space-y-3" aria-label={t("upload.exampleGalleryTitle")}>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {t("upload.orChooseExample")}
        </span>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="font-label text-muted">
          {t("upload.exampleGalleryTitle")}
        </span>
        {loadingId ? (
          <span className="font-mono text-[10px] text-muted">
            {t("upload.loadingExample")}
          </span>
        ) : null}
      </div>

      <ExampleImageCarousel
        items={EXAMPLE_IMAGES}
        trackClassName="example-image-gallery-grid"
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
                onClick={() => void handleSelect(example.id)}
                aria-pressed={isActive}
                aria-busy={isLoading}
                aria-label={t("upload.exampleImageAria", {
                  number: globalIndex + 1,
                })}
                className={`group overflow-hidden rounded-none border border-border bg-card p-1 text-start transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 ${
                  isActive ? activeCardClassName : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-none border border-border bg-background">
                  <Image
                    src={example.src}
                    alt={t("upload.exampleImageAria", {
                      number: globalIndex + 1,
                    })}
                    fill
                    sizes="(max-width: 640px) 45vw, 160px"
                    className={`object-cover transition-opacity ${
                      isLoading ? "opacity-40" : "opacity-100"
                    } group-hover:opacity-90`}
                    unoptimized
                  />
                </div>
                <span className="mt-1 block px-0.5 font-mono text-[10px] leading-tight text-muted group-hover:text-foreground">
                  {t("upload.exampleImageAria", {
                    number: globalIndex + 1,
                  })}
                </span>
              </button>
            );
          })
        }
      </ExampleImageCarousel>

      <p className="font-mono text-[10px] leading-relaxed text-muted">
        {t("upload.exampleGalleryHint")}
      </p>

      {error ? (
        <p className="font-mono text-[10px] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
