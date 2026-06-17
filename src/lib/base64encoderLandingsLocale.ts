import type { Language } from "@/lib/language";
import {
  BASE64_ENCODER_ARTICLE,
  BASE64_ENCODER_CAPABILITIES,
  listBase64EncoderLandings,
  type Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";
import {
  BASE64_ENCODER_LANDING_CHROME_EN,
  BASE64_ENCODER_LANDING_DISPLAY_EN,
} from "@/lib/base64encoderLandingDisplay.en";
import {
  BASE64_ENCODER_ARTICLE_HE,
  BASE64_ENCODER_LANDING_CHROME_HE,
  BASE64_ENCODER_LANDINGS_HE,
} from "@/lib/base64encoderLandings.he";
import type {
  Base64EncoderArticleLocale,
  Base64EncoderLandingChrome,
  Base64EncoderLandingLocaleEntry,
} from "@/lib/base64encoderLandingTypes";

export function getBase64EncoderLandings(
  language: Language,
): Record<Base64EncoderLandingId, Base64EncoderLandingLocaleEntry> {
  if (language === "he") {
    return BASE64_ENCODER_LANDINGS_HE;
  }

  const landings: Record<string, Base64EncoderLandingLocaleEntry> = {};

  for (const entry of listBase64EncoderLandings()) {
    landings[entry.id] = {
      ...entry,
      ...BASE64_ENCODER_LANDING_DISPLAY_EN[entry.id],
      capabilities: [...BASE64_ENCODER_CAPABILITIES],
    };
  }

  return landings as Record<Base64EncoderLandingId, Base64EncoderLandingLocaleEntry>;
}

export function getBase64EncoderLandingEntry(
  language: Language,
  id: Base64EncoderLandingId,
): Base64EncoderLandingLocaleEntry {
  const entry = getBase64EncoderLandings(language)[id];

  if (!entry) {
    throw new Error(`Unknown Base64 Encoder landing: ${String(id)}`);
  }

  return entry;
}

export function getBase64EncoderArticle(
  language: Language,
): Base64EncoderArticleLocale {
  return language === "he" ? BASE64_ENCODER_ARTICLE_HE : BASE64_ENCODER_ARTICLE;
}

export function getBase64EncoderLandingChrome(
  language: Language,
): Base64EncoderLandingChrome {
  return language === "he"
    ? BASE64_ENCODER_LANDING_CHROME_HE
    : BASE64_ENCODER_LANDING_CHROME_EN;
}

export function getRelatedBase64EncoderLandingPages(
  currentId: Base64EncoderLandingId,
  language: Language = "en",
): Pick<Base64EncoderLandingLocaleEntry, "path" | "linkTitle" | "linkExcerpt">[] {
  return Object.values(getBase64EncoderLandings(language))
    .filter((entry) => entry.id !== currentId)
    .map(({ path, linkTitle, linkExcerpt }) => ({
      path,
      linkTitle,
      linkExcerpt,
    }));
}
