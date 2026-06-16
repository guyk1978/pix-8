import type { Language } from "@/lib/language";
import {
  TEXT_OVERLAY_ARTICLE,
  TEXT_OVERLAY_CAPABILITIES,
  TEXT_OVERLAY_LANDINGS,
  type TextOverlayLandingId,
} from "@/lib/textOverlayLandings";
import {
  TEXT_OVERLAY_LANDING_CHROME_EN,
  TEXT_OVERLAY_LANDING_DISPLAY_EN,
} from "@/lib/textOverlayLandingDisplay.en";
import {
  TEXT_OVERLAY_ARTICLE_HE,
  TEXT_OVERLAY_LANDING_CHROME_HE,
  TEXT_OVERLAY_LANDINGS_HE,
} from "@/lib/textOverlayLandings.he";
import type {
  TextOverlayArticleLocale,
  TextOverlayLandingChrome,
  TextOverlayLandingLocaleEntry,
} from "@/lib/textOverlayLandingTypes";

export function getTextOverlayLandings(
  language: Language,
): Record<TextOverlayLandingId, TextOverlayLandingLocaleEntry> {
  if (language === "he") {
    return TEXT_OVERLAY_LANDINGS_HE as Record<
      TextOverlayLandingId,
      TextOverlayLandingLocaleEntry
    >;
  }

  const landings: Record<string, TextOverlayLandingLocaleEntry> = {};

  for (const id of Object.keys(
    TEXT_OVERLAY_LANDINGS,
  ) as TextOverlayLandingId[]) {
    landings[id] = {
      ...TEXT_OVERLAY_LANDINGS[id],
      ...TEXT_OVERLAY_LANDING_DISPLAY_EN[id],
      capabilities: [...TEXT_OVERLAY_CAPABILITIES],
    };
  }

  return landings as Record<TextOverlayLandingId, TextOverlayLandingLocaleEntry>;
}

export function getTextOverlayLandingEntry(
  language: Language,
  id: TextOverlayLandingId,
): TextOverlayLandingLocaleEntry {
  const entry = getTextOverlayLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Text Overlay landing: ${String(id)}`);
  }

  return entry;
}

export function getTextOverlayArticle(
  language: Language,
): TextOverlayArticleLocale {
  return language === "he" ? TEXT_OVERLAY_ARTICLE_HE : TEXT_OVERLAY_ARTICLE;
}

export function getTextOverlayLandingChrome(
  language: Language,
): TextOverlayLandingChrome {
  return language === "he"
    ? TEXT_OVERLAY_LANDING_CHROME_HE
    : TEXT_OVERLAY_LANDING_CHROME_EN;
}

export function getRelatedTextOverlayLandingPages(
  currentId: TextOverlayLandingId,
  language: Language = "en",
): Pick<TextOverlayLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getTextOverlayLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
