import type { Language } from "@/lib/language";
import {
  PALETTE_EXTRACTOR_ARTICLE,
  PALETTE_EXTRACTOR_CAPABILITIES,
  listPaletteExtractorLandings,
  type PaletteExtractorLandingId,
} from "@/lib/paletteextractorLandings";
import {
  PALETTE_EXTRACTOR_LANDING_CHROME_EN,
  PALETTE_EXTRACTOR_LANDING_DISPLAY_EN,
} from "@/lib/paletteextractorLandingDisplay.en";
import {
  PALETTE_EXTRACTOR_ARTICLE_HE,
  PALETTE_EXTRACTOR_LANDING_CHROME_HE,
  PALETTE_EXTRACTOR_LANDINGS_HE,
} from "@/lib/paletteextractorLandings.he";
import type {
  PaletteExtractorArticleLocale,
  PaletteExtractorLandingChrome,
  PaletteExtractorLandingLocaleEntry,
} from "@/lib/paletteextractorLandingTypes";

export function getPaletteExtractorLandings(
  language: Language,
): Record<PaletteExtractorLandingId, PaletteExtractorLandingLocaleEntry> {
  if (language === "he") {
    return PALETTE_EXTRACTOR_LANDINGS_HE;
  }

  const landings: Record<string, PaletteExtractorLandingLocaleEntry> = {};

  for (const entry of listPaletteExtractorLandings()) {
    landings[entry.id] = {
      ...entry,
      ...PALETTE_EXTRACTOR_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...PALETTE_EXTRACTOR_CAPABILITIES],
    };
  }

  return landings as Record<
    PaletteExtractorLandingId,
    PaletteExtractorLandingLocaleEntry
  >;
}

export function getPaletteExtractorLandingEntry(
  language: Language,
  id: PaletteExtractorLandingId,
): PaletteExtractorLandingLocaleEntry {
  const entry = getPaletteExtractorLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Palette Extractor landing: ${String(id)}`);
  }

  return entry;
}

export function getPaletteExtractorArticle(
  language: Language,
): PaletteExtractorArticleLocale {
  return language === "he"
    ? PALETTE_EXTRACTOR_ARTICLE_HE
    : PALETTE_EXTRACTOR_ARTICLE;
}

export function getPaletteExtractorLandingChrome(
  language: Language,
): PaletteExtractorLandingChrome {
  return language === "he"
    ? PALETTE_EXTRACTOR_LANDING_CHROME_HE
    : PALETTE_EXTRACTOR_LANDING_CHROME_EN;
}

export function getRelatedPaletteExtractorLandingPages(
  currentId: PaletteExtractorLandingId,
  language: Language = "en",
): Pick<
  PaletteExtractorLandingLocaleEntry,
  "path" | "linkTitle" | "linkExcerpt"
>[] {
  return Object.values(getPaletteExtractorLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
