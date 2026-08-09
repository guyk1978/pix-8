"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { Language } from "@/lib/language";

const TARGET_LABELS: Record<Language, string> = {
  en: "EN",
  he: "HE",
};

interface LanguageSwitcherProps {
  className?: string;
}

function LanguageSwitcherInner({ className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const targetLanguage: Language = language === "en" ? "he" : "en";
  const targetLabel = TARGET_LABELS[targetLanguage];

  const switchLanguage = () => {
    setLanguage(targetLanguage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", targetLanguage);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className={
        className ||
        "flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background font-mono text-[10px] font-medium tracking-wider text-muted transition-colors hover:border-muted hover:text-foreground"
      }
      aria-label={t(`language.${targetLanguage}`)}
      title={t(`language.${targetLanguage}`)}
    >
      {targetLabel}
    </button>
  );
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  return (
    <Suspense
      fallback={
        <span
          className={
            className ||
            "inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background font-mono text-[10px] font-medium tracking-wider text-muted opacity-70"
          }
          aria-hidden
        >
          …
        </span>
      }
    >
      <LanguageSwitcherInner className={className} />
    </Suspense>
  );
}
