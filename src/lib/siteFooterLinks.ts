import type { ToolId } from "@/lib/tools";

export const SITE_FOOTER_ACCENT = "#8E977D";

export interface SiteFooterLink {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Curated utility tools for the footer. Uses tool IDs so labels stay in sync
 * with i18n via getToolTranslationKey in the component.
 */
export const SITE_FOOTER_RELATED_TOOL_IDS = [
  "image-annotator",
  "text-overlay",
  "metadata-remover",
  "cropper",
  "compressor",
  "bg-remover",
] as const satisfies readonly ToolId[];

export const SITE_FOOTER_LEGAL_LINKS: SiteFooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "mailto:hello@pix-8.com", label: "Contact", external: true },
];

export const SITE_FOOTER_UTILITY_LINKS: SiteFooterLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/settings", label: "Settings" },
];
