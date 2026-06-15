import type { Language } from "@/lib/language";
import {
  FOOTER_RESOURCE_MAX_LINKS,
  getFooterResources,
} from "@/lib/footerResources";
import { CROPPER_LANDING_ACCENT } from "@/lib/cropperLandings";

export interface ResourceLink {
  href: string;
  label: string;
}

export function getCropperResourceLinks(
  currentPath?: string,
  limit = FOOTER_RESOURCE_MAX_LINKS,
  locale?: Language,
): ResourceLink[] {
  return getFooterResources("cropper", { currentPath, limit, locale });
}

export { CROPPER_LANDING_ACCENT as RESOURCE_LINK_ACCENT };
