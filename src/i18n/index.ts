import type { Language } from "@/lib/language";
import { en, type TranslationDictionary } from "@/i18n/locales/en";
import { he } from "@/i18n/locales/he";

export const dictionaries: Record<Language, TranslationDictionary> = {
  en,
  he,
};

export type TranslationParams = Record<string, string | number>;

function resolvePath(
  dictionary: TranslationDictionary,
  key: string,
): string | undefined {
  const parts = key.split(".");
  let current: unknown = dictionary;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
}

export function translate(
  language: Language,
  key: string,
  params?: TranslationParams,
): string {
  const dictionary = dictionaries[language];
  const value =
    resolvePath(dictionary, key) ?? resolvePath(dictionaries.en, key) ?? key;

  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) =>
      result.replaceAll(`{${paramKey}}`, String(paramValue)),
    value,
  );
}

export function getToolTranslationKey(
  toolId: string,
  field: "name" | "description",
): string {
  return `tools.${toolId}.${field}`;
}

const ERROR_MESSAGE_KEYS: Record<string, string> = {
  "Could not load the selected image.": "errors.loadImageFailed",
  "Processing failed.": "errors.processingFailed",
  "Download failed.": "errors.downloadFailed",
  "Could not copy image.": "errors.copyImageFailed",
  "Please select a valid image file.": "errors.invalidImageFile",
  "Canvas context unavailable.": "errors.canvasUnavailable",
  "Failed to encode image.": "errors.encodeFailed",
  "Failed to decode image": "errors.decodeFailed",
  "Metadata detected in output — export rejected.": "errors.metadataRejected",
  "Clipboard is not supported in this browser.": "errors.clipboardUnsupported",
  "Batch resize failed.": "errors.batchResizeFailed",
  "Batch conversion failed.": "errors.batchConvertFailed",
  "Batch compression failed.": "errors.batchCompressFailed",
  "Could not encode image.": "errors.encodeImageFailed",
  "Background removal failed.": "errors.backgroundRemovalFailed",
  "Denoising failed.": "errors.denoisingFailed",
  "Grain application failed.": "errors.grainFailed",
  "Correction failed.": "errors.correctionFailed",
  "Export failed.": "errors.exportFailed",
  "Could not extract palette.": "errors.extractPaletteFailed",
  "Failed to load image.": "errors.loadImage",
  "Failed to load image for sampling.": "toolUi.colorPicker.loadFailed",
  "Failed to load image for sharpening.": "toolUi.sharpener.loadFailed",
  "Adjustment failed.": "toolUi.lightAdjuster.adjustmentFailed",
  "Sharpening failed.": "toolUi.sharpener.sharpeningFailed",
  "Could not sample color.": "toolUi.colorPicker.sampleFailed",
  "Could not load the watermark image.": "toolUi.watermark.couldNotLoad",
  "Metadata could not be verified as removed.": "toolUi.metadataRemover.verifyFailed",
  "Failed to remove metadata.": "toolUi.metadataRemover.removeFailed",
  "Please select valid image files.": "errors.invalidImageFiles",
  "Could not load one or more images.": "errors.bulkLoadFailed",
};

export function translateErrorMessage(
  language: Language,
  message: string,
): string {
  const key = ERROR_MESSAGE_KEYS[message];
  if (!key) return message;
  return translate(language, key);
}

export function resolveErrorMessage(
  language: Language,
  cause: unknown,
  fallbackKey: string,
): string {
  if (cause instanceof Error) {
    return translateErrorMessage(language, cause.message);
  }
  return translate(language, fallbackKey);
}
