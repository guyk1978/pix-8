import type { Language } from "@/lib/language";
import {
  FAVICON_GENERATOR_ARTICLE,
  FAVICON_GENERATOR_CAPABILITIES,
  listFaviconGeneratorLandings,
  type FaviconGeneratorLandingId,
} from "@/lib/favicongeneratorLandings";
import {
  FAVICON_GENERATOR_LANDING_CHROME_EN,
  FAVICON_GENERATOR_LANDING_DISPLAY_EN,
} from "@/lib/favicongeneratorLandingDisplay.en";
import {
  FAVICON_GENERATOR_ARTICLE_HE,
  FAVICON_GENERATOR_LANDING_CHROME_HE,
  FAVICON_GENERATOR_LANDINGS_HE,
} from "@/lib/favicongeneratorLandings.he";
import type {
  FaviconGeneratorArticleLocale,
  FaviconGeneratorLandingChrome,
  FaviconGeneratorLandingLocaleEntry,
} from "@/lib/favicongeneratorLandingTypes";

export function getFaviconGeneratorLandings(
  language: Language,
): Record<FaviconGeneratorLandingId, FaviconGeneratorLandingLocaleEntry> {
  if (language === "he") {
    return FAVICON_GENERATOR_LANDINGS_HE;
  }

  const landings: Record<string, FaviconGeneratorLandingLocaleEntry> = {};

  for (const entry of listFaviconGeneratorLandings()) {
    landings[entry.id] = {
      ...entry,
      ...FAVICON_GENERATOR_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...FAVICON_GENERATOR_CAPABILITIES],
    };
  }

  return landings as Record<
    FaviconGeneratorLandingId,
    FaviconGeneratorLandingLocaleEntry
  >;
}

export function getFaviconGeneratorLandingEntry(
  language: Language,
  id: FaviconGeneratorLandingId,
): FaviconGeneratorLandingLocaleEntry {
  const entry = getFaviconGeneratorLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Favicon Generator landing: ${String(id)}`);
  }

  return entry;
}

export function getFaviconGeneratorArticle(
  language: Language,
): FaviconGeneratorArticleLocale {
  return language === "he"
    ? FAVICON_GENERATOR_ARTICLE_HE
    : FAVICON_GENERATOR_ARTICLE;
}

export function getFaviconGeneratorLandingChrome(
  language: Language,
): FaviconGeneratorLandingChrome {
  return language === "he"
    ? FAVICON_GENERATOR_LANDING_CHROME_HE
    : FAVICON_GENERATOR_LANDING_CHROME_EN;
}

export function getRelatedFaviconGeneratorLandingPages(
  currentId: FaviconGeneratorLandingId,
  language: Language = "en",
): Pick<
  FaviconGeneratorLandingLocaleEntry,
  "path" | "linkTitle" | "linkExcerpt"
>[] {
  return Object.values(getFaviconGeneratorLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
