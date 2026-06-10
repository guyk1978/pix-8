"use client";

import type { ReactNode } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES, type CharacterKey } from "@/lib/characters";

interface HelperFieldGuideProps {
  character: CharacterKey;
  label: string;
  englishLabel?: string;
  htmlFor: string;
  children: ReactNode;
  characterAlt?: string;
  characterSide?: "start" | "end";
}

export function HelperFieldGuide({
  character,
  label,
  englishLabel,
  htmlFor,
  children,
  characterAlt,
  characterSide = "end",
}: HelperFieldGuideProps) {
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";
  const showCharacterAtStart =
    characterSide === "start" ? !isRtl : isRtl;

  const characterEl = (
    <HelperCharacter
      character={character}
      alt={characterAlt ?? label}
      size={CHARACTER_SIZES.field}
      glow
      className={`shrink-0 self-center ${isRtl ? "-scale-x-100" : ""}`}
      animate="float"
    />
  );

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="flex items-baseline gap-2 font-label text-muted">
        <span>{label}</span>
        {englishLabel ? (
          <span className="font-mono text-[10px] normal-case tracking-normal text-muted/70">
            {englishLabel}
          </span>
        ) : null}
      </label>

      <div className="flex items-center gap-3">
        {showCharacterAtStart ? characterEl : null}
        <div className="min-w-0 flex-1">{children}</div>
        {!showCharacterAtStart ? characterEl : null}
      </div>
    </div>
  );
}
