import type { Language } from "@/lib/language";
import {
  WATERMARK_ARTICLE,
  WATERMARK_CAPABILITIES,
  listWatermarkLandings,
  type WatermarkLandingId,
} from "@/lib/watermarkLandings";
import {
  WATERMARK_LANDING_CHROME_EN,
  WATERMARK_LANDING_DISPLAY_EN,
} from "@/lib/watermarkLandingDisplay.en";
import {
  WATERMARK_ARTICLE_HE,
  WATERMARK_LANDING_CHROME_HE,
  WATERMARK_LANDINGS_HE,
} from "@/lib/watermarkLandings.he";
import type {
  WatermarkArticleLocale,
  WatermarkLandingChrome,
  WatermarkLandingLocaleEntry,
} from "@/lib/watermarkLandingTypes";

export function getWatermarkLandings(
  language: Language,
): Record<WatermarkLandingId, WatermarkLandingLocaleEntry> {
  if (language === "he") {
    return WATERMARK_LANDINGS_HE;
  }

  const landings: Record<string, WatermarkLandingLocaleEntry> = {};

  for (const entry of listWatermarkLandings()) {
    landings[entry.id] = {
      ...entry,
      ...WATERMARK_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...WATERMARK_CAPABILITIES],
    };
  }

  return landings as Record<WatermarkLandingId, WatermarkLandingLocaleEntry>;
}

export function getWatermarkLandingEntry(
  language: Language,
  id: WatermarkLandingId,
): WatermarkLandingLocaleEntry {
  const entry = getWatermarkLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Watermark landing: ${String(id)}`);
  }

  return entry;
}

export function getWatermarkArticle(
  language: Language,
): WatermarkArticleLocale {
  return language === "he" ? WATERMARK_ARTICLE_HE : WATERMARK_ARTICLE;
}

export function getWatermarkLandingChrome(
  language: Language,
): WatermarkLandingChrome {
  return language === "he"
    ? WATERMARK_LANDING_CHROME_HE
    : WATERMARK_LANDING_CHROME_EN;
}

export function getRelatedWatermarkLandingPages(
  currentId: WatermarkLandingId,
  language: Language = "en",
): Pick<WatermarkLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getWatermarkLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
