import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { TEXT_OVERLAY_LANDING_ACCENT } from "@/lib/textOverlayLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getTextOverlayResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("text-overlay", { currentPath, limit, locale });
}

export { TEXT_OVERLAY_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
