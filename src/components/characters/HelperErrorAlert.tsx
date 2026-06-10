"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";

interface HelperErrorAlertProps {
  message: string;
  className?: string;
}

export function HelperErrorAlert({ message, className = "" }: HelperErrorAlertProps) {
  const { t } = useLanguage();

  return (
    <div
      role="alert"
      className={`flex items-start gap-4 rounded-sm border border-[color-mix(in_srgb,#f87171_35%,var(--border))] bg-[color-mix(in_srgb,#f87171_5%,var(--card))] p-4 ${className}`}
    >
      <HelperCharacter
        character="error"
        alt={t("characters.errorAlt")}
        size={CHARACTER_SIZES.error}
        glow
        className="shrink-0"
      />
      <p className="min-w-0 flex-1 pt-3 font-mono text-xs leading-relaxed text-red-300">
        {message}
      </p>
    </div>
  );
}
