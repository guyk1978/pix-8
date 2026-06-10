"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";

interface ToolHeaderHeroProps {
  title: string;
  description: string;
}

export function ToolHeaderHero({ title, description }: ToolHeaderHeroProps) {
  const { t, dir } = useLanguage();
  const flip = dir === "rtl" ? "-scale-x-100" : "";

  return (
    <div className="mb-8">
      <div className="tool-title-hero relative flex items-center gap-4 overflow-visible rounded-md px-4 py-5 sm:gap-6 sm:px-6 sm:py-6">
        <HelperCharacter
          character="base"
          alt={t("characters.guideAlt")}
          size={CHARACTER_SIZES.hero}
          glow
          className={`hidden shrink-0 sm:block ${flip}`}
          animate="wave"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
            <span className="tool-speech-bubble hidden font-label text-[10px] text-[var(--glow-teal)] sm:inline">
              {title}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>

        <HelperCharacter
          character="base"
          alt=""
          size={CHARACTER_SIZES.heroMobile}
          glow
          className={`shrink-0 sm:hidden ${flip}`}
          animate="float"
        />
      </div>
    </div>
  );
}
