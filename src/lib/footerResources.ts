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
  listCustomCutterLandings,
  type CustomCutterLandingId,
} from "@/lib/customCutterLandings";
import {
  listRotateFlipLandings,
  type RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";
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
  | "rotate-flip";

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
