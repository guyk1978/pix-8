import type { Language } from "@/lib/language";
import {
  ROTATE_FLIP_ARTICLE,
  ROTATE_FLIP_CAPABILITIES,
  ROTATE_FLIP_LANDINGS,
  type RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";
import {
  ROTATE_FLIP_LANDING_CHROME_EN,
  ROTATE_FLIP_LANDING_DISPLAY_EN,
} from "@/lib/rotateFlipLandingDisplay.en";
import {
  ROTATE_FLIP_ARTICLE_HE,
  ROTATE_FLIP_LANDING_CHROME_HE,
  ROTATE_FLIP_LANDINGS_HE,
} from "@/lib/rotateFlipLandings.he";
import type {
  RotateFlipArticleLocale,
  RotateFlipLandingChrome,
  RotateFlipLandingLocaleEntry,
} from "@/lib/rotateFlipLandingTypes";

export function getRotateFlipLandings(
  language: Language,
): Record<RotateFlipLandingId, RotateFlipLandingLocaleEntry> {
  if (language === "he") {
    return ROTATE_FLIP_LANDINGS_HE as Record<
      RotateFlipLandingId,
      RotateFlipLandingLocaleEntry
    >;
  }

  const landings: Record<string, RotateFlipLandingLocaleEntry> = {};

  for (const id of Object.keys(ROTATE_FLIP_LANDINGS) as RotateFlipLandingId[]) {
    landings[id] = {
      ...ROTATE_FLIP_LANDINGS[id],
      ...ROTATE_FLIP_LANDING_DISPLAY_EN[id],
      capabilities: [...ROTATE_FLIP_CAPABILITIES],
    };
  }

  return landings as Record<RotateFlipLandingId, RotateFlipLandingLocaleEntry>;
}

export function getRotateFlipLandingEntry(
  language: Language,
  id: RotateFlipLandingId,
): RotateFlipLandingLocaleEntry {
  const entry = getRotateFlipLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Rotate & Flip landing: ${String(id)}`);
  }

  return entry;
}

export function getRotateFlipArticle(
  language: Language,
): RotateFlipArticleLocale {
  return language === "he" ? ROTATE_FLIP_ARTICLE_HE : ROTATE_FLIP_ARTICLE;
}

export function getRotateFlipLandingChrome(
  language: Language,
): RotateFlipLandingChrome {
  return language === "he"
    ? ROTATE_FLIP_LANDING_CHROME_HE
    : ROTATE_FLIP_LANDING_CHROME_EN;
}

export function getRelatedRotateFlipLandingPages(
  currentId: RotateFlipLandingId,
  language: Language = "en",
): Pick<RotateFlipLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getRotateFlipLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
