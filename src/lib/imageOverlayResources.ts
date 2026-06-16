import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { IMAGE_OVERLAY_LANDING_ACCENT } from "@/lib/imageOverlayLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getImageOverlayResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("image-overlay", { currentPath, limit, locale });
}

export { IMAGE_OVERLAY_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
