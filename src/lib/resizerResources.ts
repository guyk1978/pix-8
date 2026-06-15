import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { RESIZER_LANDING_ACCENT } from "@/lib/resizerLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getResizerResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("resizer", { currentPath, limit, locale });
}

export { RESIZER_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
