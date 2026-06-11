"use client";

import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_ROSTER, CHARACTER_SIZES } from "@/lib/characters";

const ROSTER_ALT_KEYS: Record<(typeof CHARACTER_ROSTER)[number], string> = {
  base: "characters.guideAlt",
  resizer: "characters.resizerAlt",
  blue: "characters.blueAlt",
  robot: "characters.robotAlt",
  uploadSmile: "characters.uploadSmileAlt",
  width: "characters.widthAlt",
  height: "characters.heightAlt",
  processing: "characters.processingAlt",
  download: "characters.downloadAlt",
  error: "characters.errorAlt",
};

export function CharacterRoster() {
  const { t, dir } = useLanguage();
  const flip = dir === "rtl" ? "-scale-x-100" : "";

  return (
    <div
      className="flex flex-wrap items-end justify-center gap-2 sm:gap-3"
      aria-label={t("characters.rosterAria")}
    >
      {CHARACTER_ROSTER.map((key, index) => (
        <HelperCharacter
          key={key}
          character={key}
          alt={t(ROSTER_ALT_KEYS[key])}
          size={CHARACTER_SIZES.roster}
          glow
          className={flip}
          animate={index % 2 === 0 ? "float" : "wave"}
        />
      ))}
    </div>
  );
}
