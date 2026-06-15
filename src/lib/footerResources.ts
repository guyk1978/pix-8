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
  IMAGE_ANNOTATOR_LANDINGS,
  type ImageAnnotatorLandingId,
} from "@/lib/imageAnnotatorLandings";
import {
  getImageAnnotatorArticle,
  getImageAnnotatorLandings,
} from "@/lib/imageAnnotatorLandingsLocale";
import { getToolIdFromPathname, normalizePathname } from "@/lib/routes";
import type { ToolId } from "@/lib/tools";

export const FOOTER_RESOURCE_MAX_LINKS = 5;

/** Resource groups shown in the footer — extend as you add landing page families. */
export type FooterResourceCategory = "annotator" | "compressor" | "remover";

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

export function buildFooterResourceRegistry(
  language: Language = "en",
): FooterResourceEntry[] {
  return [
    ...buildAnnotatorLandingResources(language),
    buildAnnotatorGuideResource(language),
    ...buildRemoverLandingResources(language),
    buildRemoverGuideResource(language),
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
]);

/** Maps a tool page to the footer resource category it should surface. */
export const TOOL_FOOTER_RESOURCE_CATEGORY: Partial<
  Record<ToolId, FooterResourceCategory>
> = {
  "image-annotator": "annotator",
  compressor: "compressor",
  "bg-remover": "remover",
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
