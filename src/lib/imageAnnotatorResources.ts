import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { LANDING_ACCENT } from "@/lib/imageAnnotatorLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

/** Annotator resource links for legacy consumers (e.g. ResourceLinks). */
export function getImageAnnotatorResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
): ResourceLink[] {
  return getFooterResources("annotator", { currentPath, limit });
}

export const IMAGE_ANNOTATOR_RESOURCE_LINKS: ResourceLink[] =
  getImageAnnotatorResourceLinks();

export { LANDING_ACCENT as RESOURCE_LINK_ACCENT };
