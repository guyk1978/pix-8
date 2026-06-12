"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface HelperSuccessHintProps {
  message?: string;
  className?: string;
}

export function HelperSuccessHint({ message, className = "" }: HelperSuccessHintProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-elevated)] ${className}`}
      role="status"
      style={{
        background: "color-mix(in srgb, var(--glow-teal) 6%, var(--card))",
      }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--glow-teal)_14%,transparent)] text-[var(--glow-teal)]">
        <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
      </span>
      <p className="text-sm font-medium leading-relaxed text-[var(--glow-teal)]">
        {message ?? t("characters.readyToDownload")}
      </p>
    </div>
  );
}
