import type { Language } from "@/lib/language";
import {
  MEME_GENERATOR_ARTICLE,
  MEME_GENERATOR_CAPABILITIES,
  listMemeGeneratorLandings,
  type MemeGeneratorLandingId,
} from "@/lib/memeGeneratorLandings";
import {
  MEME_GENERATOR_LANDING_CHROME_EN,
  MEME_GENERATOR_LANDING_DISPLAY_EN,
} from "@/lib/memeGeneratorLandingDisplay.en";
import {
  MEME_GENERATOR_ARTICLE_HE,
  MEME_GENERATOR_LANDING_CHROME_HE,
  MEME_GENERATOR_LANDINGS_HE,
} from "@/lib/memeGeneratorLandings.he";
import type {
  MemeGeneratorArticleLocale,
  MemeGeneratorLandingChrome,
  MemeGeneratorLandingLocaleEntry,
} from "@/lib/memeGeneratorLandingTypes";

export function getMemeGeneratorLandings(
  language: Language,
): Record<MemeGeneratorLandingId, MemeGeneratorLandingLocaleEntry> {
  if (language === "he") {
    return MEME_GENERATOR_LANDINGS_HE;
  }

  const landings: Record<string, MemeGeneratorLandingLocaleEntry> = {};

  for (const entry of listMemeGeneratorLandings()) {
    landings[entry.id] = {
      ...entry,
      ...MEME_GENERATOR_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...MEME_GENERATOR_CAPABILITIES],
    };
  }

  return landings as Record<
    MemeGeneratorLandingId,
    MemeGeneratorLandingLocaleEntry
  >;
}

export function getMemeGeneratorLandingEntry(
  language: Language,
  id: MemeGeneratorLandingId,
): MemeGeneratorLandingLocaleEntry {
  const entry = getMemeGeneratorLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Meme Generator landing: ${String(id)}`);
  }

  return entry;
}

export function getMemeGeneratorArticle(
  language: Language,
): MemeGeneratorArticleLocale {
  return language === "he" ? MEME_GENERATOR_ARTICLE_HE : MEME_GENERATOR_ARTICLE;
}

export function getMemeGeneratorLandingChrome(
  language: Language,
): MemeGeneratorLandingChrome {
  return language === "he"
    ? MEME_GENERATOR_LANDING_CHROME_HE
    : MEME_GENERATOR_LANDING_CHROME_EN;
}

export function getRelatedMemeGeneratorLandingPages(
  currentId: MemeGeneratorLandingId,
  language: Language = "en",
): Pick<MemeGeneratorLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getMemeGeneratorLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map((entry) => ({
      path: entry.path,
      linkTitle: entry.linkTitle,
      linkExcerpt: entry.linkExcerpt,
    }));
}
