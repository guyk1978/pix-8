"use client";

import Image from "next/image";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  OVERLAY_PRESETS,
  type OverlayPresetId,
} from "@/lib/overlayAssets";

const activePresetClassName =
  "border-accent/50 bg-accent-muted shadow-[0_0_14px_color-mix(in_srgb,var(--glow-teal)_18%,transparent)]";

interface OverlayPresetGalleryProps {
  selectedPresetId: OverlayPresetId | null;
  disabled?: boolean;
  onSelect: (presetId: OverlayPresetId) => void;
}

export function OverlayPresetGallery({
  selectedPresetId,
  disabled = false,
  onSelect,
}: OverlayPresetGalleryProps) {
  const { t } = useLanguage();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-label text-muted">
          {t("toolUi.imageOverlay.chooseOverlay")}
        </span>
        {selectedPresetId ? (
          <span className="font-mono text-[10px] text-accent">
            {t("toolUi.imageOverlay.overlayActive")}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {OVERLAY_PRESETS.map((preset) => {
          const isActive = selectedPresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(preset.id)}
              aria-pressed={isActive}
              className={`group overflow-hidden rounded-sm border border-border bg-card p-1.5 text-start transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive ? activePresetClassName : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-[#1a1a2e]">
                <Image
                  src={preset.src}
                  alt={t(`toolUi.imageOverlay.presets.${preset.id}.title`)}
                  fill
                  sizes="(max-width: 640px) 45vw, 120px"
                  className="object-contain p-2 transition-transform group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              <span className="mt-1.5 block px-0.5 font-mono text-[10px] leading-tight text-muted group-hover:text-foreground">
                {t(`toolUi.imageOverlay.presets.${preset.id}.title`)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="font-mono text-[10px] leading-relaxed text-muted">
        {t("toolUi.imageOverlay.overlayHint")}
      </p>
    </section>
  );
}
