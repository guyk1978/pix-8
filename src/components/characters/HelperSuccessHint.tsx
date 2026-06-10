"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";

interface HelperSuccessHintProps {
  message?: string;
  className?: string;
}

export function HelperSuccessHint({ message, className = "" }: HelperSuccessHintProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`flex items-center gap-4 rounded-sm border border-[color-mix(in_srgb,var(--glow-teal)_35%,var(--border))] bg-[color-mix(in_srgb,var(--glow-teal)_6%,var(--card))] px-4 py-3 ${className}`}
      role="status"
    >
      <HelperCharacter
        character="download"
        alt={t("characters.downloadAlt")}
        size={CHARACTER_SIZES.download}
        glow
        animate="wave"
      />
      <p className="font-label text-[11px] leading-relaxed text-[var(--glow-teal)]">
        {message ?? t("characters.readyToDownload")}
      </p>
    </div>
  );
}
