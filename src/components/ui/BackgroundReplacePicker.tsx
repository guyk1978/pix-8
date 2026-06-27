"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ExampleImageCarousel } from "@/components/ui/ExampleImageCarousel";
import { resolveErrorMessage } from "@/i18n";
import {
  BACKGROUND_COLOR_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
  createGradientBackgroundImage,
  gradientPresetCss,
  loadExampleBackgroundImage,
  type BackgroundImageLoaded,
} from "@/lib/backgroundPresets";
import { EXAMPLE_IMAGES, type ExampleImageId } from "@/lib/exampleImages";

interface BackgroundReplacePickerProps {
  disabled?: boolean;
  selectedColor?: string | null;
  selectedImageKey?: string | null;
  dimensions: { width: number; height: number };
  onSelectColor: (color: string) => void;
  onSelectImage: (payload: BackgroundImageLoaded) => void;
  className?: string;
}

export function BackgroundReplacePicker({
  disabled = false,
  selectedColor = null,
  selectedImageKey = null,
  dimensions,
  onSelectColor,
  onSelectImage,
  className = "",
}: BackgroundReplacePickerProps) {
  const { t, language } = useLanguage();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = disabled || loadingKey !== null;

  const handleGradientSelect = useCallback(
    async (presetId: string) => {
      const preset = BACKGROUND_GRADIENT_PRESETS.find((entry) => entry.id === presetId);
      if (!preset || busy) return;

      const key = `gradient:${presetId}`;
      setLoadingKey(key);

      try {
        const payload = await createGradientBackgroundImage(
          preset,
          dimensions.width,
          dimensions.height,
        );
        setError(null);
        onSelectImage(payload);
      } catch (cause) {
        setError(resolveErrorMessage(language, cause, "errors.loadImageFailed"));
      } finally {
        setLoadingKey(null);
      }
    },
    [busy, dimensions.height, dimensions.width, language, onSelectImage],
  );

  const handleExampleSelect = useCallback(
    async (exampleId: ExampleImageId) => {
      const key = `example:${exampleId}`;
      if (busy) return;

      setLoadingKey(key);

      try {
        const payload = await loadExampleBackgroundImage(exampleId);
        setError(null);
        onSelectImage(payload);
      } catch (cause) {
        setError(resolveErrorMessage(language, cause, "errors.loadImageFailed"));
      } finally {
        setLoadingKey(null);
      }
    },
    [busy, language, onSelectImage],
  );

  return (
    <div className={`bg-replace-picker ${className}`.trim()}>
      <p className="bg-replace-picker-label font-label text-xs text-muted">
        {t("toolUi.bgRemover.colorPresets")}
      </p>
      <div className="bg-replace-picker-colors">
        {BACKGROUND_COLOR_PRESETS.map((preset) => {
          const isActive =
            selectedColor?.toLowerCase() === preset.color.toLowerCase();

          return (
            <button
              key={preset.id}
              type="button"
              disabled={busy}
              title={t(preset.nameKey)}
              aria-label={t(preset.nameKey)}
              aria-pressed={isActive}
              className={`bg-replace-picker-swatch ${isActive ? "is-active" : ""}`}
              style={{ backgroundColor: preset.color }}
              onClick={() => onSelectColor(preset.color)}
            />
          );
        })}
      </div>

      <p className="bg-replace-picker-label font-label text-xs text-muted">
        {t("toolUi.bgRemover.gradientPresets")}
      </p>
      <div className="bg-replace-picker-gradients">
        {BACKGROUND_GRADIENT_PRESETS.map((preset) => {
          const key = `gradient:${preset.id}`;
          const isActive = selectedImageKey === key;
          const isLoading = loadingKey === key;

          return (
            <button
              key={preset.id}
              type="button"
              disabled={busy}
              title={t(preset.nameKey)}
              aria-label={t(preset.nameKey)}
              aria-pressed={isActive}
              aria-busy={isLoading}
              className={`bg-replace-picker-gradient ${isActive ? "is-active" : ""}`}
              style={{ background: gradientPresetCss(preset) }}
              onClick={() => void handleGradientSelect(preset.id)}
            />
          );
        })}
      </div>

      <p className="bg-replace-picker-label font-label text-xs text-muted">
        {t("toolUi.bgRemover.exampleBackgrounds")}
      </p>

      <ExampleImageCarousel items={EXAMPLE_IMAGES} trackClassName="bg-replace-picker-examples">
        {(visibleImages, startIndex) =>
          visibleImages.map((example, index) => {
            const key = `example:${example.id}`;
            const isActive = selectedImageKey === key;
            const isLoading = loadingKey === key;

            return (
              <button
                key={example.id}
                type="button"
                disabled={busy}
                onClick={() => void handleExampleSelect(example.id)}
                aria-pressed={isActive}
                aria-busy={isLoading}
                aria-label={t("upload.exampleImageAria", {
                  number: startIndex + index + 1,
                })}
                className={`bg-replace-picker-example ${isActive ? "is-active" : ""}`}
              >
                <Image
                  src={example.src}
                  alt=""
                  fill
                  sizes="48px"
                  className={`object-cover transition-opacity ${
                    isLoading ? "opacity-40" : "opacity-100"
                  }`}
                  unoptimized
                />
              </button>
            );
          })
        }
      </ExampleImageCarousel>

      {loadingKey ? (
        <p className="font-mono text-[10px] text-muted">{t("upload.loadingExample")}</p>
      ) : null}

      {error ? (
        <p className="font-mono text-[10px] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
