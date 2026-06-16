import type { Language } from "@/lib/language";
import {
  CUSTOM_CUTTER_ARTICLE,
  CUSTOM_CUTTER_CAPABILITIES,
  CUSTOM_CUTTER_LANDINGS,
  type CustomCutterLandingId,
} from "@/lib/customCutterLandings";
import {
  CUSTOM_CUTTER_LANDING_CHROME_EN,
  CUSTOM_CUTTER_LANDING_DISPLAY_EN,
} from "@/lib/customCutterLandingDisplay.en";
import {
  CUSTOM_CUTTER_ARTICLE_HE,
  CUSTOM_CUTTER_LANDING_CHROME_HE,
  CUSTOM_CUTTER_LANDINGS_HE,
} from "@/lib/customCutterLandings.he";
import type {
  CustomCutterArticleLocale,
  CustomCutterLandingChrome,
  CustomCutterLandingLocaleEntry,
} from "@/lib/customCutterLandingTypes";

export function getCustomCutterLandings(
  language: Language,
): Record<CustomCutterLandingId, CustomCutterLandingLocaleEntry> {
  if (language === "he") {
    return CUSTOM_CUTTER_LANDINGS_HE;
  }

  const landings: Record<string, CustomCutterLandingLocaleEntry> = {};

  for (const id of Object.keys(
    CUSTOM_CUTTER_LANDINGS,
  ) as CustomCutterLandingId[]) {
    landings[id] = {
      ...CUSTOM_CUTTER_LANDINGS[id],
      ...CUSTOM_CUTTER_LANDING_DISPLAY_EN[id],
      capabilities: [...CUSTOM_CUTTER_CAPABILITIES],
    };
  }

  return landings as Record<
    CustomCutterLandingId,
    CustomCutterLandingLocaleEntry
  >;
}

export function getCustomCutterLandingEntry(
  language: Language,
  id: CustomCutterLandingId,
): CustomCutterLandingLocaleEntry {
  const entry = getCustomCutterLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Custom Cutter landing: ${String(id)}`);
  }

  return entry;
}

export function getCustomCutterArticle(
  language: Language,
): CustomCutterArticleLocale {
  return language === "he" ? CUSTOM_CUTTER_ARTICLE_HE : CUSTOM_CUTTER_ARTICLE;
}

export function getCustomCutterLandingChrome(
  language: Language,
): CustomCutterLandingChrome {
  return language === "he"
    ? CUSTOM_CUTTER_LANDING_CHROME_HE
    : CUSTOM_CUTTER_LANDING_CHROME_EN;
}

export function getRelatedCustomCutterLandingPages(
  currentId: CustomCutterLandingId,
  language: Language = "en",
): Pick<CustomCutterLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getCustomCutterLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
