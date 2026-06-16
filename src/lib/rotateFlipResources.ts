import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { ROTATE_FLIP_LANDING_ACCENT } from "@/lib/rotateFlipLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getRotateFlipResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("rotate-flip", { currentPath, limit, locale });
}

export { ROTATE_FLIP_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
