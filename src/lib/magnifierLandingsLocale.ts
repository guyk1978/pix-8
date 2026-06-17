import type { Language } from "@/lib/language";
import {
  MAGNIFIER_ARTICLE,
  MAGNIFIER_CAPABILITIES,
  listMagnifierLandings,
  type MagnifierLandingId,
} from "@/lib/magnifierLandings";
import {
  MAGNIFIER_LANDING_CHROME_EN,
  MAGNIFIER_LANDING_DISPLAY_EN,
} from "@/lib/magnifierLandingDisplay.en";
import {
  MAGNIFIER_ARTICLE_HE,
  MAGNIFIER_LANDING_CHROME_HE,
  MAGNIFIER_LANDINGS_HE,
} from "@/lib/magnifierLandings.he";
import type {
  MagnifierArticleLocale,
  MagnifierLandingChrome,
  MagnifierLandingLocaleEntry,
} from "@/lib/magnifierLandingTypes";

export function getMagnifierLandings(
  language: Language,
): Record<MagnifierLandingId, MagnifierLandingLocaleEntry> {
  if (language === "he") {
    return MAGNIFIER_LANDINGS_HE;
  }

  const landings: Record<string, MagnifierLandingLocaleEntry> = {};

  for (const entry of listMagnifierLandings()) {
    landings[entry.id] = {
      ...entry,
      ...MAGNIFIER_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...MAGNIFIER_CAPABILITIES],
    };
  }

  return landings as Record<MagnifierLandingId, MagnifierLandingLocaleEntry>;
}

export function getMagnifierLandingEntry(
  language: Language,
  id: MagnifierLandingId,
): MagnifierLandingLocaleEntry {
  const entry = getMagnifierLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Image Magnifier landing: ${String(id)}`);
  }

  return entry;
}

export function getMagnifierArticle(
  language: Language,
): MagnifierArticleLocale {
  return language === "he" ? MAGNIFIER_ARTICLE_HE : MAGNIFIER_ARTICLE;
}

export function getMagnifierLandingChrome(
  language: Language,
): MagnifierLandingChrome {
  return language === "he"
    ? MAGNIFIER_LANDING_CHROME_HE
    : MAGNIFIER_LANDING_CHROME_EN;
}

export function getRelatedMagnifierLandingPages(
  currentId: MagnifierLandingId,
  language: Language = "en",
): Pick<MagnifierLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getMagnifierLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
