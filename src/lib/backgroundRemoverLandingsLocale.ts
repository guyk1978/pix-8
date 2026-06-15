import type { Language } from "@/lib/language";
import {
  BACKGROUND_REMOVER_ARTICLE,
  BACKGROUND_REMOVER_CAPABILITIES,
  BACKGROUND_REMOVER_LANDINGS,
  type BackgroundRemoverLandingId,
} from "@/lib/backgroundRemoverLandings";
import {
  BACKGROUND_REMOVER_LANDING_CHROME_EN,
  BACKGROUND_REMOVER_LANDING_DISPLAY_EN,
} from "@/lib/backgroundRemoverLandingDisplay.en";
import {
  BACKGROUND_REMOVER_ARTICLE_HE,
  BACKGROUND_REMOVER_LANDING_CHROME_HE,
  BACKGROUND_REMOVER_LANDINGS_HE,
} from "@/lib/backgroundRemoverLandings.he";
import type {
  BackgroundRemoverArticleLocale,
  BackgroundRemoverLandingChrome,
  BackgroundRemoverLandingLocaleEntry,
  BackgroundRemoverLandingsLocaleMap,
} from "@/lib/backgroundRemoverLandingTypes";

export function getBackgroundRemoverLandings(
  language: Language,
): BackgroundRemoverLandingsLocaleMap {
  if (language === "he") {
    return BACKGROUND_REMOVER_LANDINGS_HE;
  }

  const landings = {} as BackgroundRemoverLandingsLocaleMap;

  for (const id of Object.keys(
    BACKGROUND_REMOVER_LANDINGS,
  ) as BackgroundRemoverLandingId[]) {
    landings[id] = {
      ...BACKGROUND_REMOVER_LANDINGS[id],
      ...BACKGROUND_REMOVER_LANDING_DISPLAY_EN[id],
      capabilities: [...BACKGROUND_REMOVER_CAPABILITIES],
    };
  }

  return landings;
}

export function getBackgroundRemoverLandingEntry(
  language: Language,
  id: BackgroundRemoverLandingId,
): BackgroundRemoverLandingLocaleEntry {
  const entry = (
    getBackgroundRemoverLandings(language) as Record<
      string,
      BackgroundRemoverLandingLocaleEntry
    >
  )[id as string];

  if (!entry) {
    throw new Error(`Unknown Background Remover landing: ${String(id)}`);
  }

  return entry;
}

export function getBackgroundRemoverArticle(
  language: Language,
): BackgroundRemoverArticleLocale {
  return language === "he"
    ? BACKGROUND_REMOVER_ARTICLE_HE
    : BACKGROUND_REMOVER_ARTICLE;
}

export function getBackgroundRemoverLandingChrome(
  language: Language,
): BackgroundRemoverLandingChrome {
  return language === "he"
    ? BACKGROUND_REMOVER_LANDING_CHROME_HE
    : BACKGROUND_REMOVER_LANDING_CHROME_EN;
}

export function getRelatedBackgroundRemoverLandingPages(
  currentId: BackgroundRemoverLandingId,
  language: Language = "en",
): Pick<
  BackgroundRemoverLandingLocaleEntry,
  "path" | "linkTitle" | "linkExcerpt"
>[] {
  return Object.values(getBackgroundRemoverLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
