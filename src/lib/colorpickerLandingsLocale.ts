import type { Language } from "@/lib/language";
import {
  COLOR_PICKER_ARTICLE,
  COLOR_PICKER_CAPABILITIES,
  listColorPickerLandings,
  type ColorPickerLandingId,
} from "@/lib/colorpickerLandings";
import {
  COLOR_PICKER_LANDING_CHROME_EN,
  COLOR_PICKER_LANDING_DISPLAY_EN,
} from "@/lib/colorpickerLandingDisplay.en";
import {
  COLOR_PICKER_ARTICLE_HE,
  COLOR_PICKER_LANDING_CHROME_HE,
  COLOR_PICKER_LANDINGS_HE,
} from "@/lib/colorpickerLandings.he";
import type {
  ColorPickerArticleLocale,
  ColorPickerLandingChrome,
  ColorPickerLandingLocaleEntry,
} from "@/lib/colorpickerLandingTypes";

export function getColorPickerLandings(
  language: Language,
): Record<ColorPickerLandingId, ColorPickerLandingLocaleEntry> {
  if (language === "he") {
    return COLOR_PICKER_LANDINGS_HE;
  }

  const landings: Record<string, ColorPickerLandingLocaleEntry> = {};

  for (const entry of listColorPickerLandings()) {
    landings[entry.id] = {
      ...entry,
      ...COLOR_PICKER_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...COLOR_PICKER_CAPABILITIES],
    };
  }

  return landings as Record<ColorPickerLandingId, ColorPickerLandingLocaleEntry>;
}

export function getColorPickerLandingEntry(
  language: Language,
  id: ColorPickerLandingId,
): ColorPickerLandingLocaleEntry {
  const entry = getColorPickerLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Color Picker landing: ${String(id)}`);
  }

  return entry;
}

export function getColorPickerArticle(
  language: Language,
): ColorPickerArticleLocale {
  return language === "he" ? COLOR_PICKER_ARTICLE_HE : COLOR_PICKER_ARTICLE;
}

export function getColorPickerLandingChrome(
  language: Language,
): ColorPickerLandingChrome {
  return language === "he"
    ? COLOR_PICKER_LANDING_CHROME_HE
    : COLOR_PICKER_LANDING_CHROME_EN;
}

export function getRelatedColorPickerLandingPages(
  currentId: ColorPickerLandingId,
  language: Language = "en",
): Pick<ColorPickerLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getColorPickerLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
