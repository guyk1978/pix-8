import type { Language } from "@/lib/language";
import {
  CROPPER_ARTICLE,
  CROPPER_CAPABILITIES,
  CROPPER_LANDINGS,
  type CropperLandingId,
} from "@/lib/cropperLandings";
import {
  CROPPER_LANDING_CHROME_EN,
  CROPPER_LANDING_DISPLAY_EN,
} from "@/lib/cropperLandingDisplay.en";
import {
  CROPPER_ARTICLE_HE,
  CROPPER_LANDING_CHROME_HE,
  CROPPER_LANDINGS_HE,
} from "@/lib/cropperLandings.he";
import type {
  CropperArticleLocale,
  CropperLandingChrome,
  CropperLandingLocaleEntry,
} from "@/lib/cropperLandingTypes";

export function getCropperLandings(
  language: Language,
): Record<CropperLandingId, CropperLandingLocaleEntry> {
  if (language === "he") {
    return CROPPER_LANDINGS_HE;
  }

  const landings = {} as Record<CropperLandingId, CropperLandingLocaleEntry>;

  for (const id of Object.keys(CROPPER_LANDINGS) as CropperLandingId[]) {
    landings[id] = {
      ...CROPPER_LANDINGS[id],
      ...CROPPER_LANDING_DISPLAY_EN[id],
      capabilities: [...CROPPER_CAPABILITIES],
    };
  }

  return landings;
}

export function getCropperLandingEntry(
  language: Language,
  id: CropperLandingId,
): CropperLandingLocaleEntry {
  const entry = getCropperLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Cropper landing: ${String(id)}`);
  }

  return entry;
}

export function getCropperArticle(language: Language): CropperArticleLocale {
  return language === "he" ? CROPPER_ARTICLE_HE : CROPPER_ARTICLE;
}

export function getCropperLandingChrome(
  language: Language,
): CropperLandingChrome {
  return language === "he"
    ? CROPPER_LANDING_CHROME_HE
    : CROPPER_LANDING_CHROME_EN;
}

export function getRelatedCropperLandingPages(
  currentId: CropperLandingId,
  language: Language = "en",
): Pick<CropperLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getCropperLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
