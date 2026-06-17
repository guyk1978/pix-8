import type { Language } from "@/lib/language";
import {
  IMAGE_TO_SVG_ARTICLE,
  IMAGE_TO_SVG_CAPABILITIES,
  listImageToSvgLandings,
  type ImageToSvgLandingId,
} from "@/lib/imagetosvgLandings";
import {
  IMAGE_TO_SVG_LANDING_CHROME_EN,
  IMAGE_TO_SVG_LANDING_DISPLAY_EN,
} from "@/lib/imagetosvgLandingDisplay.en";
import {
  IMAGE_TO_SVG_ARTICLE_HE,
  IMAGE_TO_SVG_LANDING_CHROME_HE,
  IMAGE_TO_SVG_LANDINGS_HE,
} from "@/lib/imagetosvgLandings.he";
import type {
  ImageToSvgArticleLocale,
  ImageToSvgLandingChrome,
  ImageToSvgLandingLocaleEntry,
} from "@/lib/imagetosvgLandingTypes";

export function getImageToSvgLandings(
  language: Language,
): Record<ImageToSvgLandingId, ImageToSvgLandingLocaleEntry> {
  if (language === "he") {
    return IMAGE_TO_SVG_LANDINGS_HE;
  }

  const landings: Record<string, ImageToSvgLandingLocaleEntry> = {};

  for (const entry of listImageToSvgLandings()) {
    landings[entry.id] = {
      ...entry,
      ...IMAGE_TO_SVG_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...IMAGE_TO_SVG_CAPABILITIES],
    };
  }

  return landings as Record<ImageToSvgLandingId, ImageToSvgLandingLocaleEntry>;
}

export function getImageToSvgLandingEntry(
  language: Language,
  id: ImageToSvgLandingId,
): ImageToSvgLandingLocaleEntry {
  const entry = getImageToSvgLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Image to SVG Converter landing: ${String(id)}`);
  }

  return entry;
}

export function getImageToSvgArticle(
  language: Language,
): ImageToSvgArticleLocale {
  return language === "he" ? IMAGE_TO_SVG_ARTICLE_HE : IMAGE_TO_SVG_ARTICLE;
}

export function getImageToSvgLandingChrome(
  language: Language,
): ImageToSvgLandingChrome {
  return language === "he"
    ? IMAGE_TO_SVG_LANDING_CHROME_HE
    : IMAGE_TO_SVG_LANDING_CHROME_EN;
}

export function getRelatedImageToSvgLandingPages(
  currentId: ImageToSvgLandingId,
  language: Language = "en",
): Pick<ImageToSvgLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getImageToSvgLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
