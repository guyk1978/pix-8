import type { Language } from "@/lib/language";
import {
  IMAGE_COLLAGE_ARTICLE,
  IMAGE_COLLAGE_CAPABILITIES,
  listImageCollageLandings,
  type ImageCollageLandingId,
} from "@/lib/imageCollageLandings";
import {
  IMAGE_COLLAGE_LANDING_CHROME_EN,
  IMAGE_COLLAGE_LANDING_DISPLAY_EN,
} from "@/lib/imageCollageLandingDisplay.en";
import {
  IMAGE_COLLAGE_ARTICLE_HE,
  IMAGE_COLLAGE_LANDING_CHROME_HE,
  IMAGE_COLLAGE_LANDINGS_HE,
} from "@/lib/imageCollageLandings.he";
import type {
  ImageCollageArticleLocale,
  ImageCollageLandingChrome,
  ImageCollageLandingLocaleEntry,
} from "@/lib/imageCollageLandingTypes";

export function getImageCollageLandings(
  language: Language,
): Record<ImageCollageLandingId, ImageCollageLandingLocaleEntry> {
  if (language === "he") {
    return IMAGE_COLLAGE_LANDINGS_HE;
  }

  const landings: Record<string, ImageCollageLandingLocaleEntry> = {};

  for (const entry of listImageCollageLandings()) {
    const display = IMAGE_COLLAGE_LANDING_DISPLAY_EN[entry.id];
    if (!display) {
      throw new Error(
        `Missing EN display fields for Image Collage landing: ${entry.id}`,
      );
    }

    landings[entry.id] = {
      ...entry,
      ...display,
      capabilities: [...IMAGE_COLLAGE_CAPABILITIES],
    };
  }

  return landings as Record<
    ImageCollageLandingId,
    ImageCollageLandingLocaleEntry
  >;
}

export function getImageCollageLandingEntry(
  language: Language,
  id: ImageCollageLandingId,
): ImageCollageLandingLocaleEntry {
  const entry = getImageCollageLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Image Collage landing: ${String(id)}`);
  }

  return entry;
}

export function getImageCollageArticle(
  language: Language,
): ImageCollageArticleLocale {
  return language === "he" ? IMAGE_COLLAGE_ARTICLE_HE : IMAGE_COLLAGE_ARTICLE;
}

export function getImageCollageLandingChrome(
  language: Language,
): ImageCollageLandingChrome {
  return language === "he"
    ? IMAGE_COLLAGE_LANDING_CHROME_HE
    : IMAGE_COLLAGE_LANDING_CHROME_EN;
}

export function getRelatedImageCollageLandingPages(
  currentId: ImageCollageLandingId,
  language: Language = "en",
): Pick<ImageCollageLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return listImageCollageLandings()
    .filter((entry) => entry.id !== currentId)
    .map((entry) => ({
      path: entry.path,
      linkTitle: entry.linkTitle,
      linkExcerpt: entry.linkExcerpt,
    }));
}
