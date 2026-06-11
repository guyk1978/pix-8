"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { Language } from "@/lib/language";

const TARGET_LABELS: Record<Language, string> = {
  en: "EN",
  he: "HE",
};

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const targetLanguage: Language = language === "en" ? "he" : "en";
  const targetLabel = TARGET_LABELS[targetLanguage];

  return (
    <button
      type="button"
      onClick={() => setLanguage(targetLanguage)}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background font-mono text-[10px] font-medium tracking-wider text-muted transition-colors hover:border-muted hover:text-foreground"
      aria-label={t(`language.${targetLanguage}`)}
      title={t(`language.${targetLanguage}`)}
    >
      {targetLabel}
    </button>
  );
}
