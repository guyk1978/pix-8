"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function ToolGuideLines() {
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible opacity-40"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="guide-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--glow-teal)" />
          <stop offset="50%" stopColor="var(--glow-purple)" />
          <stop offset="100%" stopColor="var(--glow-blue)" />
        </linearGradient>
      </defs>
      <path
        d={
          isRtl
            ? "M 85% 18% Q 60% 35%, 50% 52% T 25% 78%"
            : "M 15% 18% Q 40% 35%, 50% 52% T 75% 78%"
        }
        fill="none"
        stroke="url(#guide-line-gradient)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <path
        d={
          isRtl
            ? "M 20% 55% Q 35% 62%, 48% 68%"
            : "M 80% 55% Q 65% 62%, 52% 68%"
        }
        fill="none"
        stroke="url(#guide-line-gradient)"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.6"
      />
    </svg>
  );
}
