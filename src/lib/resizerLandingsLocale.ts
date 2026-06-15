import type { Language } from "@/lib/language";
import {
  RESIZER_ARTICLE,
  RESIZER_CAPABILITIES,
  RESIZER_LANDINGS,
  type ResizerLandingId,
} from "@/lib/resizerLandings";
import {
  RESIZER_LANDING_CHROME_EN,
  RESIZER_LANDING_DISPLAY_EN,
} from "@/lib/resizerLandingDisplay.en";
import {
  RESIZER_ARTICLE_HE,
  RESIZER_LANDING_CHROME_HE,
  RESIZER_LANDINGS_HE,
} from "@/lib/resizerLandings.he";
import type {
  ResizerArticleLocale,
  ResizerLandingChrome,
  ResizerLandingLocaleEntry,
} from "@/lib/resizerLandingTypes";

export function getResizerLandings(
  language: Language,
): Record<ResizerLandingId, ResizerLandingLocaleEntry> {
  if (language === "he") {
    return RESIZER_LANDINGS_HE;
  }

  const landings = {} as Record<ResizerLandingId, ResizerLandingLocaleEntry>;

  for (const id of Object.keys(RESIZER_LANDINGS) as ResizerLandingId[]) {
    landings[id] = {
      ...RESIZER_LANDINGS[id],
      ...RESIZER_LANDING_DISPLAY_EN[id],
      capabilities: [...RESIZER_CAPABILITIES],
    };
  }

  return landings;
}

export function getResizerLandingEntry(
  language: Language,
  id: ResizerLandingId,
): ResizerLandingLocaleEntry {
  const entry = getResizerLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Resizer landing: ${String(id)}`);
  }

  return entry;
}

export function getResizerArticle(
  language: Language,
): ResizerArticleLocale {
  return language === "he" ? RESIZER_ARTICLE_HE : RESIZER_ARTICLE;
}

export function getResizerLandingChrome(
  language: Language,
): ResizerLandingChrome {
  return language === "he"
    ? RESIZER_LANDING_CHROME_HE
    : RESIZER_LANDING_CHROME_EN;
}

export function getRelatedResizerLandingPages(
  currentId: ResizerLandingId,
  language: Language = "en",
): Pick<ResizerLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getResizerLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
