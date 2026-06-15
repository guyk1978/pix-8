import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { BACKGROUND_REMOVER_LANDING_ACCENT } from "@/lib/backgroundRemoverLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getBackgroundRemoverResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("remover", { currentPath, limit, locale });
}

export { BACKGROUND_REMOVER_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
