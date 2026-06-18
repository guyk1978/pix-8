import type { Language } from "@/lib/language";
import {
  CSS_PALETTE_GEN_ARTICLE,
  CSS_PALETTE_GEN_CAPABILITIES,
  listCssPaletteGenLandings,
  type CssPaletteGenLandingId,
} from "@/lib/csspalettegenLandings";
import {
  CSS_PALETTE_GEN_LANDING_CHROME_EN,
  CSS_PALETTE_GEN_LANDING_DISPLAY_EN,
} from "@/lib/csspalettegenLandingDisplay.en";
import {
  CSS_PALETTE_GEN_ARTICLE_HE,
  CSS_PALETTE_GEN_LANDING_CHROME_HE,
  CSS_PALETTE_GEN_LANDINGS_HE,
} from "@/lib/csspalettegenLandings.he";
import type {
  CssPaletteGenArticleLocale,
  CssPaletteGenLandingChrome,
  CssPaletteGenLandingLocaleEntry,
} from "@/lib/csspalettegenLandingTypes";

export function getCssPaletteGenLandings(
  language: Language,
): Record<CssPaletteGenLandingId, CssPaletteGenLandingLocaleEntry> {
  if (language === "he") {
    return CSS_PALETTE_GEN_LANDINGS_HE;
  }

  const landings: Record<string, CssPaletteGenLandingLocaleEntry> = {};

  for (const entry of listCssPaletteGenLandings()) {
    landings[entry.id] = {
      ...entry,
      ...CSS_PALETTE_GEN_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...CSS_PALETTE_GEN_CAPABILITIES],
    };
  }

  return landings as Record<
    CssPaletteGenLandingId,
    CssPaletteGenLandingLocaleEntry
  >;
}

export function getCssPaletteGenLandingEntry(
  language: Language,
  id: CssPaletteGenLandingId,
): CssPaletteGenLandingLocaleEntry {
  const entry = getCssPaletteGenLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown CSS Palette Generator landing: ${String(id)}`);
  }

  return entry;
}

export function getCssPaletteGenArticle(
  language: Language,
): CssPaletteGenArticleLocale {
  return language === "he"
    ? CSS_PALETTE_GEN_ARTICLE_HE
    : CSS_PALETTE_GEN_ARTICLE;
}

export function getCssPaletteGenLandingChrome(
  language: Language,
): CssPaletteGenLandingChrome {
  return language === "he"
    ? CSS_PALETTE_GEN_LANDING_CHROME_HE
    : CSS_PALETTE_GEN_LANDING_CHROME_EN;
}

export function getRelatedCssPaletteGenLandingPages(
  currentId: CssPaletteGenLandingId,
  language: Language = "en",
): Pick<
  CssPaletteGenLandingLocaleEntry,
  "path" | "linkTitle" | "linkExcerpt"
>[] {
  return Object.values(getCssPaletteGenLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
