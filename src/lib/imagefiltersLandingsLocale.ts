import type { Language } from "@/lib/language";
import {
  IMAGE_FILTERS_ARTICLE,
  IMAGE_FILTERS_CAPABILITIES,
  listImageFiltersLandings,
  type ImageFiltersLandingId,
} from "@/lib/imagefiltersLandings";
import {
  IMAGE_FILTERS_LANDING_CHROME_EN,
  IMAGE_FILTERS_LANDING_DISPLAY_EN,
} from "@/lib/imagefiltersLandingDisplay.en";
import {
  IMAGE_FILTERS_ARTICLE_HE,
  IMAGE_FILTERS_LANDING_CHROME_HE,
  IMAGE_FILTERS_LANDINGS_HE,
} from "@/lib/imagefiltersLandings.he";
import type {
  ImageFiltersArticleLocale,
  ImageFiltersLandingChrome,
  ImageFiltersLandingLocaleEntry,
} from "@/lib/imagefiltersLandingTypes";

export function getImageFiltersLandings(
  language: Language,
): Record<ImageFiltersLandingId, ImageFiltersLandingLocaleEntry> {
  if (language === "he") {
    return IMAGE_FILTERS_LANDINGS_HE;
  }

  const landings: Record<string, ImageFiltersLandingLocaleEntry> = {};

  for (const entry of listImageFiltersLandings()) {
    const display = IMAGE_FILTERS_LANDING_DISPLAY_EN[entry.id];
    if (!display) {
      throw new Error(
        `Missing EN display fields for Image Filters landing: ${entry.id}`,
      );
    }

    landings[entry.id] = {
      ...entry,
      ...display,
      capabilities: [...IMAGE_FILTERS_CAPABILITIES],
    };
  }

  return landings as Record<
    ImageFiltersLandingId,
    ImageFiltersLandingLocaleEntry
  >;
}

export function getImageFiltersLandingEntry(
  language: Language,
  id: ImageFiltersLandingId,
): ImageFiltersLandingLocaleEntry {
  const entry = getImageFiltersLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Image Filters landing: ${String(id)}`);
  }

  return entry;
}

export function getImageFiltersArticle(
  language: Language,
): ImageFiltersArticleLocale {
  return language === "he" ? IMAGE_FILTERS_ARTICLE_HE : IMAGE_FILTERS_ARTICLE;
}

export function getImageFiltersLandingChrome(
  language: Language,
): ImageFiltersLandingChrome {
  return language === "he"
    ? IMAGE_FILTERS_LANDING_CHROME_HE
    : IMAGE_FILTERS_LANDING_CHROME_EN;
}

export function getRelatedImageFiltersLandingPages(
  currentId: ImageFiltersLandingId,
  language: Language = "en",
): Pick<ImageFiltersLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getImageFiltersLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
