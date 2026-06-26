import { getToolTranslationKey } from "@/i18n";
import type { ToolId } from "@/lib/tools";

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

const TOOL_ID_TO_UI_KEY: Record<ToolId, string> = {
  resizer: "resizer",
  converter: "converter",
  compressor: "compressor",
  cropper: "cropper",
  "custom-cutter": "customCutter",
  "rotate-flip": "rotateFlip",
  watermark: "watermark",
  "bg-remover": "bgRemover",
  "palette-extractor": "paletteExtractor",
  "metadata-remover": "metadataRemover",
  "color-picker": "colorPicker",
  "text-overlay": "textOverlay",
  "image-overlay": "imageOverlay",
  "border-generator": "border",
  "grayscale-converter": "grayscale",
  "favicon-generator": "favicon",
  sharpener: "sharpener",
  "light-adjuster": "lightAdjuster",
  "image-inverter": "imageInverter",
  denoiser: "denoiser",
  "css-palette-gen": "cssPalette",
  "lens-corrector": "lensCorrector",
  "grain-generator": "grain",
  "base64-encoder": "base64",
  "image-filters": "imageFilters",
  "image-to-svg": "imageToSvg",
  "image-collage": "collage",
  "meme-generator": "meme",
  magnifier: "magnifier",
  "image-annotator": "imageAnnotator",
};

function tryToolUiString(t: TranslateFn, key: string): string | null {
  const value = t(key);
  return value === key ? null : value;
}

export function resolveUploadHeadline(
  t: TranslateFn,
  options: {
    headline?: string;
    toolId?: ToolId;
    multiple?: boolean;
  },
): string {
  if (options.headline) return options.headline;

  if (options.multiple) {
    return t("upload.dropMultipleHint");
  }

  if (options.toolId) {
    const uiKey = TOOL_ID_TO_UI_KEY[options.toolId];
    const headline =
      tryToolUiString(t, `toolUi.${uiKey}.uploadHeadline`) ??
      tryToolUiString(t, `toolUi.${uiKey}.previewHint`) ??
      tryToolUiString(t, `toolUi.${uiKey}.uploadHintLong`);

    if (headline) return headline;

    return t("upload.compactHeadlineWithTool", {
      tool: t(getToolTranslationKey(options.toolId, "name")),
    });
  }

  return t("upload.compactHeadline");
}
