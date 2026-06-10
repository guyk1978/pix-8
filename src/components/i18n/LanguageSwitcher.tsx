"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { Language } from "@/lib/language";

const options: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "he", label: "HE" },
];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className="glow-panel flex h-9 items-center rounded-sm border border-border bg-background p-0.5"
    >
      {options.map((option) => {
        const active = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            aria-label={t(`language.${option.code}`)}
            title={t(`language.${option.code}`)}
            className={`min-w-9 rounded-sm px-2 font-label text-[10px] tracking-wider transition-colors ${
              active
                ? "bg-accent-muted text-accent shadow-[0_0_12px_color-mix(in_srgb,var(--glow-teal)_35%,transparent)]"
                : "text-muted hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
