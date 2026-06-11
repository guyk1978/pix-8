"use client";

import Image from "next/image";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  MEME_TEMPLATES,
  type MemeTemplateId,
} from "@/lib/memeTemplates";

const activeTemplateClassName =
  "border-accent/50 bg-accent-muted shadow-[0_0_14px_color-mix(in_srgb,var(--glow-teal)_18%,transparent)]";

interface MemeTemplateGalleryProps {
  selectedTemplateId: MemeTemplateId | null;
  disabled?: boolean;
  isLoading?: boolean;
  onSelect: (templateId: MemeTemplateId) => void;
}

export function MemeTemplateGallery({
  selectedTemplateId,
  disabled = false,
  isLoading = false,
  onSelect,
}: MemeTemplateGalleryProps) {
  const { t } = useLanguage();
  const busy = disabled || isLoading;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-label text-muted">
          {t("toolUi.meme.chooseTemplate")}
        </span>
        {selectedTemplateId ? (
          <span className="font-mono text-[10px] text-accent">
            {t("toolUi.meme.templateActive")}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MEME_TEMPLATES.map((template) => {
          const isActive = selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              disabled={busy}
              onClick={() => onSelect(template.id)}
              aria-pressed={isActive}
              className={`group overflow-hidden rounded-sm border border-border bg-card p-1.5 text-start transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive ? activeTemplateClassName : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-background">
                <Image
                  src={template.thumbnailSrc}
                  alt={t(`toolUi.meme.templates.${template.id}.title`)}
                  fill
                  sizes="(max-width: 640px) 45vw, 160px"
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  unoptimized
                />
              </div>
              <span className="mt-1.5 block px-0.5 font-mono text-[10px] leading-tight text-muted group-hover:text-foreground">
                {t(`toolUi.meme.templates.${template.id}.title`)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="font-mono text-[10px] leading-relaxed text-muted">
        {t("toolUi.meme.templateHint")}
      </p>
    </section>
  );
}
