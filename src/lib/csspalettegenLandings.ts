export const CSS_PALETTE_GEN_TOOL_HREF = "/tools/dev-tools/css-palette-gen";

export const CSS_PALETTE_GEN_LANDING_ACCENT = "#6B7FA6";

export const CSS_PALETTE_GEN_ARTICLE = {
  href: "/articles/image-to-css-palette",
  title: "From Pixel to Code: Generating CSS Palettes from Images",
  excerpt:
    "Stop guessing hex codes. Learn how to extract professional CSS color palettes from any image instantly for your web projects.",
} as const;

/** What CSS Palette Generator actually supports — use for intent-accurate copy. */
export const CSS_PALETTE_GEN_CAPABILITIES = [
  "Load images locally from your device",
  "Extract up to five dominant colors with semantic roles",
  "Export CSS variables, SCSS, JSON, or Tailwind config snippets",
  "Copy code-ready palette output with one click",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new CSS Palette Generator SEO landing IDs here as union members.
 * Landing pages belong in this registry — not paletteextractorLandings,
 * colorpickerLandings, or other tool families.
 */
export type CssPaletteGenLandingId = "css-color-palette-from-photo";

export interface CssPaletteGenLandingEntry {
  id: CssPaletteGenLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const CSS_PALETTE_GEN_LANDINGS: Record<
  CssPaletteGenLandingId,
  CssPaletteGenLandingEntry
> = {
  "css-color-palette-from-photo": {
    id: "css-color-palette-from-photo",
    path: "/css-color-palette-from-photo",
    linkTitle: "CSS palette from photo",
    linkExcerpt:
      "CSS color palette from photo in your browser — variables, SCSS, JSON, Tailwind, client-side.",
    seo: {
      title: "CSS Color Palette from Photo",
      description:
        "CSS color palette from photo in your browser. Generate CSS variables, SCSS, JSON, or Tailwind tokens from five dominant colors on-device — no upload, no server. Private client-side CSS Palette Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I generate a CSS color palette from a photo without uploading it to a server?",
        answer:
          "Yes. Pix-8 CSS Palette Generator runs entirely in your browser. Your photo is read locally, analyzed on a client-side canvas, and converted into up to five dominant colors with semantic roles on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What code formats does the CSS palette export support?",
        answer:
          "CSS Palette Generator exports copy-ready snippets as CSS custom properties (:root variables), SCSS variables, JSON palette objects, or a Tailwind theme.extend colors block. Each swatch is labeled with a semantic role — dominant, secondary, accent, muted, or surface. It does not export Figma tokens, design-system documentation, or batch-process folders.",
      },
      {
        question:
          "How is this different from Palette Extractor or Color Picker?",
        answer:
          "CSS Palette Generator turns a photo into code-ready palette tokens — CSS, SCSS, JSON, or Tailwind — with semantic role labels. Palette Extractor surfaces up to six dominant HEX swatches without code export. Color Picker samples individual pixels with a magnifier loupe. CSS Palette Generator processes one photo per session in the browser tab.",
      },
    ],
  },
};

export function listCssPaletteGenLandings(): CssPaletteGenLandingEntry[] {
  return Object.values(CSS_PALETTE_GEN_LANDINGS);
}

export function getCssPaletteGenLandingByPath(
  path: string,
): CssPaletteGenLandingEntry | undefined {
  return listCssPaletteGenLandings().find((entry) => entry.path === path);
}

export function getCssPaletteGenLandingBySlug(
  slug: string,
): CssPaletteGenLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listCssPaletteGenLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
