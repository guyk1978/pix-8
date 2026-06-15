import type { Language } from "@/lib/language";
import {
  IMAGE_ANNOTATOR_ARTICLE,
  IMAGE_ANNOTATOR_CAPABILITIES,
  IMAGE_ANNOTATOR_LANDINGS,
  type ImageAnnotatorLandingId,
} from "@/lib/imageAnnotatorLandings";
import {
  IMAGE_ANNOTATOR_LANDING_CHROME_EN,
  IMAGE_ANNOTATOR_LANDING_DISPLAY_EN,
} from "@/lib/imageAnnotatorLandingDisplay.en";
import {
  IMAGE_ANNOTATOR_ARTICLE_HE,
  IMAGE_ANNOTATOR_LANDING_CHROME_HE,
  IMAGE_ANNOTATOR_LANDINGS_HE,
} from "@/lib/imageAnnotatorLandings.he";
import type {
  ImageAnnotatorArticleLocale,
  ImageAnnotatorLandingChrome,
  ImageAnnotatorLandingLocaleEntry,
  ImageAnnotatorLandingsLocaleMap,
} from "@/lib/imageAnnotatorLandingTypes";

export function getImageAnnotatorLandings(
  language: Language,
): ImageAnnotatorLandingsLocaleMap {
  if (language === "he") {
    return IMAGE_ANNOTATOR_LANDINGS_HE;
  }

  const landings = {} as ImageAnnotatorLandingsLocaleMap;

  for (const id of Object.keys(
    IMAGE_ANNOTATOR_LANDINGS,
  ) as ImageAnnotatorLandingId[]) {
    landings[id] = {
      ...IMAGE_ANNOTATOR_LANDINGS[id],
      ...IMAGE_ANNOTATOR_LANDING_DISPLAY_EN[id],
      capabilities: [...IMAGE_ANNOTATOR_CAPABILITIES],
    };
  }

  return landings;
}

export function getImageAnnotatorArticle(
  language: Language,
): ImageAnnotatorArticleLocale {
  return language === "he" ? IMAGE_ANNOTATOR_ARTICLE_HE : IMAGE_ANNOTATOR_ARTICLE;
}

export function getImageAnnotatorLandingChrome(
  language: Language,
): ImageAnnotatorLandingChrome {
  return language === "he"
    ? IMAGE_ANNOTATOR_LANDING_CHROME_HE
    : IMAGE_ANNOTATOR_LANDING_CHROME_EN;
}

export function getRelatedLandingPages(
  currentId: ImageAnnotatorLandingId,
  language: Language = "en",
): Pick<ImageAnnotatorLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getImageAnnotatorLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}

export function getLandingLinkTitle(
  landingId: ImageAnnotatorLandingId,
  language: Language,
): string {
  return getImageAnnotatorLandings(language)[landingId].linkTitle;
}
