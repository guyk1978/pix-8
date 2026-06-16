import type { Language } from "@/lib/language";
import {
  IMAGE_OVERLAY_ARTICLE,
  IMAGE_OVERLAY_CAPABILITIES,
  listImageOverlayLandings,
  type ImageOverlayLandingId,
} from "@/lib/imageOverlayLandings";
import {
  IMAGE_OVERLAY_LANDING_CHROME_EN,
  IMAGE_OVERLAY_LANDING_DISPLAY_EN,
} from "@/lib/imageOverlayLandingDisplay.en";
import {
  IMAGE_OVERLAY_ARTICLE_HE,
  IMAGE_OVERLAY_LANDING_CHROME_HE,
  IMAGE_OVERLAY_LANDINGS_HE,
} from "@/lib/imageOverlayLandings.he";
import type {
  ImageOverlayArticleLocale,
  ImageOverlayLandingChrome,
  ImageOverlayLandingLocaleEntry,
} from "@/lib/imageOverlayLandingTypes";

export function getImageOverlayLandings(
  language: Language,
): Record<ImageOverlayLandingId, ImageOverlayLandingLocaleEntry> {
  if (language === "he") {
    return IMAGE_OVERLAY_LANDINGS_HE;
  }

  const landings: Record<string, ImageOverlayLandingLocaleEntry> = {};

  for (const entry of listImageOverlayLandings()) {
    landings[entry.id] = {
      ...entry,
      ...IMAGE_OVERLAY_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...IMAGE_OVERLAY_CAPABILITIES],
    };
  }

  return landings as Record<ImageOverlayLandingId, ImageOverlayLandingLocaleEntry>;
}

export function getImageOverlayLandingEntry(
  language: Language,
  id: ImageOverlayLandingId,
): ImageOverlayLandingLocaleEntry {
  const entry = getImageOverlayLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Image Overlay landing: ${String(id)}`);
  }

  return entry;
}

export function getImageOverlayArticle(
  language: Language,
): ImageOverlayArticleLocale {
  return language === "he" ? IMAGE_OVERLAY_ARTICLE_HE : IMAGE_OVERLAY_ARTICLE;
}

export function getImageOverlayLandingChrome(
  language: Language,
): ImageOverlayLandingChrome {
  return language === "he"
    ? IMAGE_OVERLAY_LANDING_CHROME_HE
    : IMAGE_OVERLAY_LANDING_CHROME_EN;
}

export function getRelatedImageOverlayLandingPages(
  currentId: ImageOverlayLandingId,
  language: Language = "en",
): Pick<ImageOverlayLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getImageOverlayLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
