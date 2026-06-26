"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export type BrandLogoSize = "sm" | "md" | "lg" | "hero";

interface BrandLogoProps {
  size?: BrandLogoSize;
  showTagline?: boolean;
  className?: string;
}

function BrandWordmark({ size }: { size: BrandLogoSize }) {
  return (
    <span
      className={`brand-logo-wordmark brand-logo-wordmark--${size}`}
      aria-hidden
    >
      <span className="brand-logo-pix">PIX</span>
      <span className="brand-logo-divider" aria-hidden>
        -
      </span>
      <span className="brand-logo-eight">
        <span className="brand-logo-eight-grid" aria-hidden />
        <span className="brand-logo-eight-inner">8</span>
      </span>
    </span>
  );
}

export function BrandLogo({
  size = "md",
  showTagline = false,
  className = "",
}: BrandLogoProps) {
  const { t } = useLanguage();
  const wordmark = <BrandWordmark size={size} />;

  if (size === "hero") {
    return (
      <div className={`brand-logo-hero ${className}`.trim()}>
        <div className="brand-logo-hero-glass">
          {wordmark}
          {showTagline ? (
            <p className="brand-logo-tagline">
              <span className="text-foreground">{t("home.title")}</span>{" "}
              <span className="text-muted">{t("home.titleMuted")}</span>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className={`brand-logo ${className}`.trim()}>{wordmark}</div>;
}

/** Accessible label for links wrapping the logo */
export function brandLogoAriaLabel(t: (key: string) => string): string {
  return `${t("nav.dashboard")} · Pix-8`;
}
