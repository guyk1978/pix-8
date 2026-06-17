import type { Language } from "@/lib/language";
import {
  listBackgroundRemoverLandings,
  type BackgroundRemoverLandingId,
} from "@/lib/backgroundRemoverLandings";
import {
  getBackgroundRemoverArticle,
  getBackgroundRemoverLandings,
} from "@/lib/backgroundRemoverLandingsLocale";
import {
  getImageAnnotatorArticle,
  getImageAnnotatorLandings,
} from "@/lib/imageAnnotatorLandingsLocale";
import {
  IMAGE_ANNOTATOR_LANDINGS,
  type ImageAnnotatorLandingId,
} from "@/lib/imageAnnotatorLandings";
import {
  getCropperArticle,
  getCropperLandings,
} from "@/lib/cropperLandingsLocale";
import {
  getCustomCutterArticle,
  getCustomCutterLandings,
} from "@/lib/customCutterLandingsLocale";
import {
  getRotateFlipArticle,
  getRotateFlipLandings,
} from "@/lib/rotateFlipLandingsLocale";
import {
  getTextOverlayArticle,
  getTextOverlayLandings,
} from "@/lib/textOverlayLandingsLocale";
import {
  getImageOverlayArticle,
  getImageOverlayLandings,
} from "@/lib/imageOverlayLandingsLocale";
import {
  getWatermarkArticle,
  getWatermarkLandings,
} from "@/lib/watermarkLandingsLocale";
import {
  getMemeGeneratorArticle,
  getMemeGeneratorLandings,
} from "@/lib/memeGeneratorLandingsLocale";
import {
  getImageCollageArticle,
  getImageCollageLandings,
} from "@/lib/imageCollageLandingsLocale";
import {
  getImageFiltersArticle,
  getImageFiltersLandings,
} from "@/lib/imagefiltersLandingsLocale";
import {
  listCustomCutterLandings,
  type CustomCutterLandingId,
} from "@/lib/customCutterLandings";
import {
  listRotateFlipLandings,
  type RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";
import {
  listTextOverlayLandings,
  type TextOverlayLandingId,
} from "@/lib/textOverlayLandings";
import {
  listImageOverlayLandings,
  type ImageOverlayLandingId,
} from "@/lib/imageOverlayLandings";
import {
  listWatermarkLandings,
  type WatermarkLandingId,
} from "@/lib/watermarkLandings";
import {
  listMemeGeneratorLandings,
  type MemeGeneratorLandingId,
} from "@/lib/memeGeneratorLandings";
import {
  listImageCollageLandings,
  type ImageCollageLandingId,
} from "@/lib/imageCollageLandings";
import {
  listImageFiltersLandings,
  type ImageFiltersLandingId,
} from "@/lib/imagefiltersLandings";
import {
  getMagnifierArticle,
  getMagnifierLandings,
} from "@/lib/magnifierLandingsLocale";
import {
  listMagnifierLandings,
  type MagnifierLandingId,
} from "@/lib/magnifierLandings";
import {
  listCropperLandings,
  type CropperLandingId,
} from "@/lib/cropperLandings";
import {
  getResizerArticle,
  getResizerLandings,
} from "@/lib/resizerLandingsLocale";
import {
  listResizerLandings,
  type ResizerLandingId,
} from "@/lib/resizerLandings";
import {
  getBase64EncoderArticle,
  getBase64EncoderLandings,
} from "@/lib/base64encoderLandingsLocale";
import {
  listBase64EncoderLandings,
  type Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";
import { getToolIdFromPathname, normalizePathname } from "@/lib/routes";
import type { ToolId } from "@/lib/tools";

export const FOOTER_RESOURCE_MAX_LINKS = 5;

/** Resource groups shown in the footer — extend as you add landing page families. */
export type FooterResourceCategory =
  | "annotator"
  | "compressor"
  | "cropper"
  | "custom-cutter"
  | "remover"
  | "resizer"
  | "rotate-flip"
  | "text-overlay"
  | "image-overlay"
  | "watermark"
  | "meme-generator"
  | "image-collage"
  | "image-filters"
  | "image-magnifier"
  | "base64-encoder";

export interface FooterResourceEntry {
  href: string;
  label: string;
  category: FooterResourceCategory;
  /** Lower number = higher priority in the footer list. */
  priority: number;
}

/** Optional ordering overrides — new landings appear automatically at the end. */
const ANNOTATOR_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<ImageAnnotatorLandingId, number>
> = {
  "annotate-images-online-free": 1,
  "image-annotator-for-web-developers": 2,
  "add-text-to-image-online": 3,
  "draw-arrows-on-images-online": 4,
  "highlight-part-of-image-online": 5,
  "annotate-images-for-documentation": 6,
  "image-markup-for-remote-teams": 7,
  "screenshot-annotation-tool-for-designers": 8,
  "fast-image-editor-for-marketing-teams": 9,
  "browser-based-image-annotator": 11,
  "client-side-image-editor": 12,
  "privacy-focused-image-editor": 13,
  "no-install-image-annotation-tool": 14,
  "lightweight-image-markup-tool": 15,
};

const REMOVER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<BackgroundRemoverLandingId, number>
> = {
  "remove-background-from-image-online": 1,
  "transparent-background-maker": 2,
  "remove-image-background-free": 3,
  "erase-background-online": 4,
  "background-remover-for-ecommerce": 5,
  "remove-background-for-marketing-graphics": 6,
  "background-eraser-for-social-media-photos": 7,
  "professional-background-removal-for-photographers": 8,
  "client-side-background-remover": 9,
  "browser-based-background-eraser": 10,
  "no-upload-image-background-remover": 11,
  "privacy-first-background-removal-tool": 12,
};

const CUSTOM_CUTTER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<CustomCutterLandingId, number>
> = {
  "custom-image-cutter": 1,
  "freeform-image-cropping": 2,
  "cut-out-shapes-from-images": 3,
  "custom-shape-photo-cutter": 4,
  "precision-image-cutter-tool": 5,
  "client-side-custom-image-cutter": 6,
  "browser-based-custom-cropper": 7,
  "no-upload-custom-shape-cutter": 8,
  "cut-image-to-custom-size": 9,
  "custom-crop-for-digital-design": 10,
  "easy-custom-photo-cutter": 11,
  "creative-image-cutting-tool": 12,
};

const ROTATE_FLIP_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<RotateFlipLandingId, number>
> = {
  "rotate-image-online": 1,
  "flip-image-online": 2,
  "mirror-image-online": 3,
  "free-photo-rotator-and-flipper": 4,
  "flip-photo-horizontally-and-vertically": 5,
  "rotate-image-90-degrees": 6,
  "fix-upside-down-pictures-online": 7,
  "mirror-selfie-online": 8,
  "batch-rotate-images-online": 9,
  "lossless-image-rotation-tool": 10,
  "batch-flip-photos-tool": 11,
  "client-side-image-rotator": 12,
  "no-upload-photo-flip-tool": 13,
  "private-browser-image-mirror": 14,
  "secure-image-rotation-online": 15,
};

const TEXT_OVERLAY_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<TextOverlayLandingId, number>
> = {
  "add-text-on-image-online": 1,
  "write-on-photo-online": 2,
  "add-watermark-to-image-online": 3,
  "free-text-over-image-tool": 4,
  "image-text-adder": 5,
  "add-text-to-photos-for-instagram": 6,
  "add-captions-to-images-online": 7,
  "add-logo-or-text-to-images": 8,
  "client-side-text-overlay-tool": 9,
  "add-text-to-image-with-fonts": 10,
  "custom-text-placement-on-image": 11,
  "professional-text-overlay-editor": 12,
};

const IMAGE_OVERLAY_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<ImageOverlayLandingId, number>
> = {
  "add-image-overlay-online": 1,
  "overlay-images-online": 2,
  "put-one-image-over-another": 3,
  "image-merger-tool": 4,
  "add-transparent-image-overlay": 5,
  "client-side-image-overlay-tool": 6,
  "browser-based-image-overlay": 7,
  "privacy-focused-image-compositor": 8,
  "combine-two-images-online": 9,
  "overlay-images-with-transparency": 10,
  "image-layer-editor-online": 11,
};

const WATERMARK_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<WatermarkLandingId, number>
> = {
  "add-logo-to-image-online": 1,
  "add-watermark-to-photos-online": 2,
  "brand-photos-with-logo": 3,
  "no-upload-watermark-maker": 4,
  "professional-image-watermarking-tool": 5,
};

const MEME_GENERATOR_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<MemeGeneratorLandingId, number>
> = {
  "meme-generator-online": 1,
  "make-a-meme-online": 2,
  "free-meme-maker": 3,
  "create-memes-from-photos": 4,
  "add-text-to-memes-online": 5,
  "make-memes-for-social-media": 6,
  "fast-meme-creator": 7,
  "custom-meme-maker": 8,
  "client-side-meme-generator": 9,
  "privacy-first-meme-maker": 10,
  "browser-based-meme-generator": 11,
  "no-upload-meme-creator": 12,
  "upload-and-meme-your-photos": 13,
  "easy-meme-editor-for-images": 14,
  "professional-meme-creation-tool": 15,
  "funny-meme-generator-online": 16,
};

const IMAGE_FILTERS_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<ImageFiltersLandingId, number>
> = {
  "add-image-filters-online": 1,
  "photo-effects-online": 2,
  "free-image-filter-tool": 3,
  "apply-filters-to-photos": 4,
  "vintage-photo-filters-online": 5,
  "black-and-white-photo-effect": 6,
  "apply-artistic-effects-to-photos": 7,
  "enhance-photo-colors-online": 8,
  "client-side-image-filters": 9,
  "no-upload-photo-effects-editor": 10,
  "privacy-first-photo-filter-tool": 11,
  "browser-based-image-processor": 12,
  "professional-photo-filters-for-social-media": 13,
  "apply-stunning-effects-to-images": 14,
  "quick-photo-styler-online": 15,
};

const IMAGE_COLLAGE_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<ImageCollageLandingId, number>
> = {
  "image-collage-maker-online": 1,
  "photo-collage-creator": 2,
  "make-a-photo-collage-free": 3,
  "online-collage-tool": 4,
  "create-photo-collage-for-instagram": 5,
  "combine-photos-into-one-image": 6,
  "layout-photo-collage-tool": 7,
  "grid-photo-collage-maker": 8,
  "client-side-photo-collage-maker": 9,
  "no-upload-collage-maker": 10,
  "browser-based-photo-layout-tool": 11,
  "privacy-focused-image-combiner": 12,
  "custom-photo-collage-layout": 13,
  "professional-collage-maker-online": 14,
  "high-resolution-photo-collage-creator": 15,
  "easy-image-grid-maker": 16,
};

const CROPPER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<CropperLandingId, number>
> = {
  "crop-image-online": 1,
  "free-image-cropper": 2,
  "crop-photos-to-size": 3,
  "image-cutter-online": 4,
  "crop-image-to-square": 5,
  "crop-image-to-16-9": 6,
  "crop-image-to-4-3": 7,
  "free-aspect-ratio-image-cropper": 8,
  "crop-image-without-quality-loss": 9,
  "precision-image-cropper": 10,
  "crop-image-for-ecommerce-product-photos": 11,
  "professional-photo-cropper": 12,
  "client-side-image-cropper": 13,
  "privacy-focused-image-cutter": 14,
  "no-upload-image-cropper": 15,
  "browser-based-image-cropper-tool": 16,
};

const MAGNIFIER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<MagnifierLandingId, number>
> = {
  "free-image-magnifier": 1,
  "photo-zoom-tool": 2,
  "inspect-image-details-online": 3,
  "high-resolution-image-inspector": 4,
  "pixel-perfect-image-viewer": 5,
  "examine-photo-details-online": 6,
  "magnify-image-for-design-review": 7,
  "client-side-image-magnifier": 8,
  "privacy-first-photo-zoom-tool": 9,
  "no-upload-image-inspector": 10,
  "browser-magnifying-glass-for-photos": 11,
  "zoom-into-photo-online": 12,
  "detailed-image-viewer-tool": 13,
  "magnify-small-text-on-images": 14,
};

const BASE64_ENCODER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<Base64EncoderLandingId, number>
> = {
  "base64-encoder-online": 1,
  "base64-decoder-online": 2,
  "convert-text-to-base64": 3,
  "decode-base64-to-text": 4,
  "base64-encode-image": 5,
  "base64-file-encoder": 6,
  "online-base64-tool-for-developers": 7,
  "instant-base64-conversion": 8,
  "client-side-base64-encoder": 9,
  "secure-base64-decoder": 10,
  "no-upload-base64-tool": 11,
  "private-base64-converter": 12,
  "base64-string-to-image-converter": 13,
  "batch-base64-encoder": 14,
  "human-readable-to-base64-converter": 15,
  "base64-url-safe-encoder": 16,
};

const RESIZER_LANDING_PRIORITY_OVERRIDES: Partial<
  Record<ResizerLandingId, number>
> = {
  "resize-image-online": 1,
  "change-image-dimensions": 2,
  "image-resizer-free": 3,
  "batch-image-resizer": 4,
  "resize-image-for-instagram": 5,
  "image-resizer-for-linkedin-profile": 6,
  "resize-photos-for-facebook-covers": 7,
  "image-dimensions-for-social-media": 8,
  "resize-image-to-pixels": 9,
  "maintain-aspect-ratio-image-resizer": 10,
  "resize-image-without-quality-loss": 11,
  "image-resizer-for-web-developers": 12,
  "client-side-image-resizer": 13,
  "privacy-focused-photo-resizer": 14,
  "no-upload-image-resizer": 15,
  "browser-based-photo-resizer": 16,
};

function buildAnnotatorLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const landings = getImageAnnotatorLandings(language);

  return Object.values(landings).map((entry, index) => ({
    href: entry.path,
    label: entry.linkTitle,
    category: "annotator" as const,
    priority:
      ANNOTATOR_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildRemoverLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const landings = getBackgroundRemoverLandings(language);

  return Object.values(landings).map((entry, index) => ({
    href: entry.path,
    label: entry.linkTitle,
    category: "remover" as const,
    priority: REMOVER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildCustomCutterLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getCustomCutterLandings(language);

  return listCustomCutterLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "custom-cutter" as const,
    priority:
      CUSTOM_CUTTER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildRotateFlipLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getRotateFlipLandings(language);

  return listRotateFlipLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "rotate-flip" as const,
    priority:
      ROTATE_FLIP_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildTextOverlayLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getTextOverlayLandings(language);

  return listTextOverlayLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "text-overlay" as const,
    priority:
      TEXT_OVERLAY_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildImageOverlayLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getImageOverlayLandings(language);

  return listImageOverlayLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "image-overlay" as const,
    priority:
      IMAGE_OVERLAY_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildWatermarkLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getWatermarkLandings(language);

  return listWatermarkLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "watermark" as const,
    priority:
      WATERMARK_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildMemeGeneratorLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getMemeGeneratorLandings(language);

  return listMemeGeneratorLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "meme-generator" as const,
    priority:
      MEME_GENERATOR_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildImageFiltersLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getImageFiltersLandings(language);

  return listImageFiltersLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "image-filters" as const,
    priority:
      IMAGE_FILTERS_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildImageCollageLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getImageCollageLandings(language);

  return listImageCollageLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "image-collage" as const,
    priority:
      IMAGE_COLLAGE_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildCropperLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getCropperLandings(language);

  return listCropperLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "cropper" as const,
    priority: CROPPER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildMagnifierLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getMagnifierLandings(language);

  return listMagnifierLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "image-magnifier" as const,
    priority:
      MAGNIFIER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildBase64EncoderLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getBase64EncoderLandings(language);

  return listBase64EncoderLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "base64-encoder" as const,
    priority:
      BASE64_ENCODER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildResizerLandingResources(
  language: Language,
): FooterResourceEntry[] {
  const localeLandings = getResizerLandings(language);

  return listResizerLandings().map((entry, index) => ({
    href: entry.path,
    label: localeLandings[entry.id]?.linkTitle ?? entry.linkTitle,
    category: "resizer" as const,
    priority: RESIZER_LANDING_PRIORITY_OVERRIDES[entry.id] ?? 50 + index,
  }));
}

function buildAnnotatorGuideResource(language: Language): FooterResourceEntry {
  const article = getImageAnnotatorArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "annotator",
    priority: 10,
  };
}

function buildRemoverGuideResource(language: Language): FooterResourceEntry {
  const article = getBackgroundRemoverArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "remover",
    priority: 10,
  };
}

function buildCustomCutterGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getCustomCutterArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "custom-cutter",
    priority: 13,
  };
}

function buildRotateFlipGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getRotateFlipArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "rotate-flip",
    priority: 16,
  };
}

function buildTextOverlayGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getTextOverlayArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "text-overlay",
    priority: 11,
  };
}

function buildImageOverlayGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getImageOverlayArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "image-overlay",
    priority: 11,
  };
}

function buildWatermarkGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getWatermarkArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "watermark",
    priority: 11,
  };
}

function buildMemeGeneratorGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getMemeGeneratorArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "meme-generator",
    priority: 17,
  };
}

function buildImageCollageGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getImageCollageArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "image-collage",
    priority: 17,
  };
}

function buildImageFiltersGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getImageFiltersArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "image-filters",
    priority: 17,
  };
}

function buildCropperGuideResource(language: Language): FooterResourceEntry {
  const article = getCropperArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "cropper",
    priority: 17,
  };
}

function buildResizerGuideResource(language: Language): FooterResourceEntry {
  const article = getResizerArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "resizer",
    priority: 17,
  };
}

function buildMagnifierGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getMagnifierArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "image-magnifier",
    priority: 17,
  };
}

function buildBase64EncoderGuideResource(
  language: Language,
): FooterResourceEntry {
  const article = getBase64EncoderArticle(language);

  return {
    href: article.href,
    label: article.title,
    category: "base64-encoder",
    priority: 17,
  };
}

export function buildFooterResourceRegistry(
  language: Language = "en",
): FooterResourceEntry[] {
  return [
    ...buildAnnotatorLandingResources(language),
    buildAnnotatorGuideResource(language),
    ...buildRemoverLandingResources(language),
    buildRemoverGuideResource(language),
    ...buildResizerLandingResources(language),
    buildResizerGuideResource(language),
    ...buildCropperLandingResources(language),
    buildCropperGuideResource(language),
    ...buildCustomCutterLandingResources(language),
    buildCustomCutterGuideResource(language),
    ...buildRotateFlipLandingResources(language),
    buildRotateFlipGuideResource(language),
    ...buildTextOverlayLandingResources(language),
    buildTextOverlayGuideResource(language),
    ...buildImageOverlayLandingResources(language),
    buildImageOverlayGuideResource(language),
    ...buildWatermarkLandingResources(language),
    buildWatermarkGuideResource(language),
    ...buildMemeGeneratorLandingResources(language),
    buildMemeGeneratorGuideResource(language),
    ...buildImageCollageLandingResources(language),
    buildImageCollageGuideResource(language),
    ...buildImageFiltersLandingResources(language),
    buildImageFiltersGuideResource(language),
    ...buildMagnifierLandingResources(language),
    buildMagnifierGuideResource(language),
    ...buildBase64EncoderLandingResources(language),
    buildBase64EncoderGuideResource(language),
  ];
}

/** @deprecated Use buildFooterResourceRegistry(language) for locale-aware labels. */
export const FOOTER_RESOURCE_REGISTRY: FooterResourceEntry[] =
  buildFooterResourceRegistry("en");

const LANDING_PATH_TO_CATEGORY = new Map<string, FooterResourceCategory>([
  ...Object.values(IMAGE_ANNOTATOR_LANDINGS).map(
    (entry) => [entry.path, "annotator"] as const,
  ),
  ...listBackgroundRemoverLandings().map(
    (entry) => [entry.path, "remover"] as const,
  ),
  ...listResizerLandings().map((entry) => [entry.path, "resizer"] as const),
  ...listCropperLandings().map((entry) => [entry.path, "cropper"] as const),
  ...listCustomCutterLandings().map(
    (entry) => [entry.path, "custom-cutter"] as const,
  ),
  ...listRotateFlipLandings().map(
    (entry) => [entry.path, "rotate-flip"] as const,
  ),
  ...listTextOverlayLandings().map(
    (entry) => [entry.path, "text-overlay"] as const,
  ),
  ...listImageOverlayLandings().map(
    (entry) => [entry.path, "image-overlay"] as const,
  ),
  ...listWatermarkLandings().map(
    (entry) => [entry.path, "watermark"] as const,
  ),
  ...listMemeGeneratorLandings().map(
    (entry) => [entry.path, "meme-generator"] as const,
  ),
  ...listImageCollageLandings().map(
    (entry) => [entry.path, "image-collage"] as const,
  ),
  ...listImageFiltersLandings().map(
    (entry) => [entry.path, "image-filters"] as const,
  ),
  ...listMagnifierLandings().map(
    (entry) => [entry.path, "image-magnifier"] as const,
  ),
  ...listBase64EncoderLandings().map(
    (entry) => [entry.path, "base64-encoder"] as const,
  ),
]);

/** Maps a tool page to the footer resource category it should surface. */
export const TOOL_FOOTER_RESOURCE_CATEGORY: Partial<
  Record<ToolId, FooterResourceCategory>
> = {
  "image-annotator": "annotator",
  compressor: "compressor",
  "bg-remover": "remover",
  resizer: "resizer",
  cropper: "cropper",
  "custom-cutter": "custom-cutter",
  "rotate-flip": "rotate-flip",
  "text-overlay": "text-overlay",
  "image-overlay": "image-overlay",
  watermark: "watermark",
  "meme-generator": "meme-generator",
  "image-collage": "image-collage",
  "image-filters": "image-filters",
  magnifier: "image-magnifier",
  "base64-encoder": "base64-encoder",
};

export interface GetFooterResourcesOptions {
  currentPath?: string;
  limit?: number;
  locale?: Language;
}

export function resolveFooterResourceCategory(
  pathname: string,
): FooterResourceCategory | null {
  const path = normalizePathname(pathname);

  if (LANDING_PATH_TO_CATEGORY.has(path)) {
    return LANDING_PATH_TO_CATEGORY.get(path)!;
  }

  const toolId = getToolIdFromPathname(path);
  if (toolId && TOOL_FOOTER_RESOURCE_CATEGORY[toolId]) {
    return TOOL_FOOTER_RESOURCE_CATEGORY[toolId]!;
  }

  return null;
}

export function getFooterResources(
  category: FooterResourceCategory,
  options: GetFooterResourcesOptions = {},
): Pick<FooterResourceEntry, "href" | "label">[] {
  const locale = options.locale ?? "en";
  const registry = buildFooterResourceRegistry(locale);
  const currentPath = options.currentPath
    ? normalizePathname(options.currentPath)
    : null;

  const sorted = registry
    .filter((entry) => entry.category === category)
    .filter((entry) => normalizePathname(entry.href) !== currentPath)
    .sort((a, b) => a.priority - b.priority);

  const results = sorted.map(({ href, label }) => ({ href, label }));

  if (options.limit === undefined) {
    return results;
  }

  return results.slice(0, options.limit);
}
