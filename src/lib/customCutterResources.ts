import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { CUSTOM_CUTTER_LANDING_ACCENT } from "@/lib/customCutterLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getCustomCutterResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("custom-cutter", { currentPath, limit, locale });
}

export { CUSTOM_CUTTER_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
