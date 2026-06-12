"use client";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface ProcessingIndicatorProps {
  progress?: number;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ringMap = {
  sm: 108,
  md: 140,
  lg: 172,
};

const logoSizeMap = {
  sm: "sm" as const,
  md: "sm" as const,
  lg: "md" as const,
};

export function ProcessingIndicator({
  progress,
  active = false,
  size = "md",
  className = "",
}: ProcessingIndicatorProps) {
  const { t } = useLanguage();
  const ringSize = ringMap[size];
  const resolvedProgress = progress ?? (active ? 65 : 35);
  const circumference = 2 * Math.PI * 34;
  const strokeDashoffset =
    circumference - (resolvedProgress / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: ringSize, height: ringSize }}
      role={active ? "status" : "img"}
      aria-label={active ? t("common.processing") : undefined}
      aria-hidden={!active}
    >
      <svg
        className={`absolute inset-0 h-full w-full ${active ? "animate-processing-ring" : ""}`}
        viewBox="0 0 80 80"
        aria-hidden
      >
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="var(--glow-ring-track)"
          strokeWidth="3"
          strokeDasharray="6 8"
          className="opacity-60"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="url(#processing-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 40 40)"
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
        <defs>
          <linearGradient id="processing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--glow-teal)" />
            <stop offset="50%" stopColor="var(--glow-purple)" />
            <stop offset="100%" stopColor="var(--glow-blue)" />
          </linearGradient>
        </defs>
      </svg>

      <BrandLogo size={logoSizeMap[size]} className="relative z-[1]" />
    </div>
  );
}
