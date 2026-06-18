export const COLOR_PICKER_TOOL_HREF = "/tools/dev-tools/color-picker";

export const COLOR_PICKER_LANDING_ACCENT = "#6B7F8E";

export const COLOR_PICKER_ARTICLE = {
  href: "/articles/precision-color-picking",
  title: "Precision Color Picking: Matching Your Brand Perfectly",
  excerpt:
    "Learn how to sample exact HEX and RGB values from any image to keep your design elements in perfect harmony.",
} as const;

/** What Color Picker actually supports — use for intent-accurate copy. */
export const COLOR_PICKER_CAPABILITIES = [
  "Load images locally from your device",
  "Sample any pixel with hover preview and click-to-lock",
  "Pixel magnifier loupe with coordinate readout",
  "Copy HEX, RGB, or HSL values with one click",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Color Picker SEO landing IDs here as union members.
 * Landing pages belong in this registry — not paletteextractorLandings,
 * imageAnnotatorLandings, or other tool families.
 */
export type ColorPickerLandingId = "image-color-picker-online";

export interface ColorPickerLandingEntry {
  id: ColorPickerLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const COLOR_PICKER_LANDINGS: Record<
  ColorPickerLandingId,
  ColorPickerLandingEntry
> = {
  "image-color-picker-online": {
    id: "image-color-picker-online",
    path: "/image-color-picker-online",
    linkTitle: "Image color picker online",
    linkExcerpt:
      "Image color picker online in your browser — pixel HEX, RGB, HSL, client-side, no upload.",
    seo: {
      title: "Image Color Picker Online",
      description:
        "Image color picker online in your browser. Sample any pixel for HEX, RGB, and HSL on-device — no upload, no server. Private client-side Color Picker by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this image color picker online upload my images to a server?",
        answer:
          "No. Pix-8 Color Picker runs entirely in your browser. Your image is read locally, drawn on a client-side canvas, and sampled on-device when you hover or click. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What color formats can I copy from the online picker?",
        answer:
          "Color Picker displays and copies HEX, RGB, and HSL values for the sampled pixel. Hover for a live preview, then click to lock the sample before copying. It does not auto-extract dominant palettes from the whole image — for ranked swatches, use Pix-8 Palette Extractor. It does not export CSS variables or JSON tokens.",
      },
      {
        question:
          "How is this different from a palette extractor or eyedropper in desktop apps?",
        answer:
          "Color Picker samples one pixel at a time with a magnifier loupe and coordinate readout — ideal for matching a logo shade or UI accent exactly. Palette Extractor ranks up to six dominant colors across the image automatically. Color Picker processes one image per session in the browser tab and does not batch-sample folders or integrate with design files.",
      },
    ],
  },
};

export function listColorPickerLandings(): ColorPickerLandingEntry[] {
  return Object.values(COLOR_PICKER_LANDINGS);
}

export function getColorPickerLandingByPath(
  path: string,
): ColorPickerLandingEntry | undefined {
  return listColorPickerLandings().find((entry) => entry.path === path);
}

export function getColorPickerLandingBySlug(
  slug: string,
): ColorPickerLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listColorPickerLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
