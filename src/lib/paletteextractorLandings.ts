export const PALETTE_EXTRACTOR_TOOL_HREF = "/tools/dev-tools/palette-extractor";

export const PALETTE_EXTRACTOR_LANDING_ACCENT = "#A67B5B";

export const PALETTE_EXTRACTOR_ARTICLE = {
  href: "/articles/extracting-color-palettes",
  title: "From Photo to Design: How to Extract Professional Color Palettes",
  excerpt:
    "Learn how to turn any image into a cohesive color scheme. Master color extraction for branding and design projects.",
} as const;

/** What Palette Extractor actually supports — use for intent-accurate copy. */
export const PALETTE_EXTRACTOR_CAPABILITIES = [
  "Load images locally from your device",
  "Extract up to six dominant colors with deduplication",
  "Copy HEX values with one click",
  "Optional EXIF metadata stripping before export workflows",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Palette Extractor SEO landing IDs here as union members.
 * Landing pages belong in this registry — not imagefiltersLandings,
 * cssPaletteGen landings, color-picker landings, or other tool families.
 */
export type PaletteExtractorLandingId =
  | "palette-extractor-online"
  | "client-side-color-palette-extractor"
  | "extract-color-palette-from-image"
  | "extract-dominant-colors-from-image"
  | "color-palette-generator-from-image"
  | "free-image-color-extractor"
  | "private-image-color-extractor"
  | "no-upload-color-scheme-generator"
  | "browser-based-palette-builder"
  | "get-hex-codes-from-image"
  | "extract-brand-colors-from-image"
  | "auto-color-palette-generator"
  | "find-color-palette-for-design-project"
  | "generate-color-scheme-from-image";

export interface PaletteExtractorLandingEntry {
  id: PaletteExtractorLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const PALETTE_EXTRACTOR_LANDINGS: Record<
  PaletteExtractorLandingId,
  PaletteExtractorLandingEntry
> = {
  "palette-extractor-online": {
    id: "palette-extractor-online",
    path: "/palette-extractor-online",
    linkTitle: "Palette extractor online",
    linkExcerpt:
      "Palette extractor online in your browser — dominant HEX colors, client-side, no upload.",
    seo: {
      title: "Palette Extractor Online",
      description:
        "Palette extractor online in your browser. Pull up to six dominant HEX colors from any image on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this palette extractor online upload my images to a server?",
        answer:
          "No. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and reduced to dominant HEX values on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What color output does the online palette extractor provide?",
        answer:
          "Palette Extractor identifies up to six dominant colors from your image, removes near-duplicates, and displays each swatch with a copy-ready HEX code. Click a swatch to copy. It does not export CSS variables, JSON tokens, or Tailwind config — for code-ready palette output, use Pix-8 CSS Palette Generator. It does not sample individual pixels — for pixel-level picking, use Pix-8 Color Picker.",
      },
      {
        question:
          "How is this different from cloud palette generators or mood-board tools?",
        answer:
          "Cloud palette tools typically require uploading your image before analysis. Pix-8 Palette Extractor processes one image per session locally in the browser tab, then lets you copy HEX values immediately. It does not batch-process folders, name colors with AI, or build shareable mood-board galleries.",
      },
    ],
  },
  "client-side-color-palette-extractor": {
    id: "client-side-color-palette-extractor",
    path: "/client-side-color-palette-extractor",
    linkTitle: "Client-side palette extractor",
    linkExcerpt:
      "Client-side color palette extractor in your browser — dominant HEX, no upload, no server.",
    seo: {
      title: "Client-Side Color Palette Extractor",
      description:
        "Client-side color palette extractor in your browser. Extract up to six dominant HEX colors on a local canvas — no upload, no server, no account. Private Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "What does client-side mean for this color palette extractor?",
        answer:
          "Client-side means all image decoding, color sampling, and palette ranking happen in your browser tab on a local canvas. Your file is never uploaded to Pix-8 or any third-party server. Dominant colors are computed on-device and presented as copy-ready HEX swatches.",
      },
      {
        question:
          "Does a client-side palette extractor still need an internet connection?",
        answer:
          "You need a connection to load the Pix-8 web app initially. Once open, palette extraction runs locally in the browser — your image data stays on your device during analysis and copy. It does not sync palettes to a cloud account or store images on remote servers.",
      },
      {
        question:
          "How is this different from cloud palette tools or CSS Palette Generator?",
        answer:
          "Cloud palette extractors typically upload your image before analysis. Pix-8 Palette Extractor ranks up to six deduplicated dominant colors locally and outputs HEX swatches — not CSS variables, JSON tokens, or Tailwind config. For code-ready palette export, use Pix-8 CSS Palette Generator. For single-pixel sampling, use Pix-8 Color Picker. It processes one image per session.",
      },
    ],
  },
  "extract-dominant-colors-from-image": {
    id: "extract-dominant-colors-from-image",
    path: "/extract-dominant-colors-from-image",
    linkTitle: "Dominant colors from image",
    linkExcerpt:
      "Extract dominant colors from any image in your browser — HEX swatches, client-side, no upload.",
    seo: {
      title: "Extract Dominant Colors from Image",
      description:
        "Extract dominant colors from any image in your browser. Rank up to six deduplicated HEX swatches by pixel coverage on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I extract dominant colors from an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and ranked by pixel coverage to surface dominant HEX values on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does the tool determine which colors are dominant?",
        answer:
          "Palette Extractor analyzes color coverage across a downsampled client-side canvas and ranks the hues that appear most frequently in your image. Near-duplicate shades are filtered so you receive up to six distinct swatches, each with a copy-ready HEX code. It does not name colors with AI, assign semantic roles, or export CSS variables — for code-ready tokens, use Pix-8 CSS Palette Generator.",
      },
      {
        question:
          "How is extracting dominant colors different from pixel-level color picking?",
        answer:
          "Dominant color extraction ranks colors by how much of the image they cover — surfacing multiple HEX swatches at once. Pix-8 Color Picker samples individual pixels on click with a magnifier loupe. Palette Extractor processes one image per session locally and does not batch-extract from folders or export design-token files.",
      },
    ],
  },
  "extract-color-palette-from-image": {
    id: "extract-color-palette-from-image",
    path: "/extract-color-palette-from-image",
    linkTitle: "Extract palette from image",
    linkExcerpt:
      "Extract a color palette from any image in your browser — HEX swatches, client-side, no upload.",
    seo: {
      title: "Extract Color Palette from Image",
      description:
        "Extract a color palette from any image in your browser. Identify up to six dominant HEX colors on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I extract a color palette from an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and reduced to dominant HEX values on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "How many colors can I extract from a single image?",
        answer:
          "Palette Extractor surfaces up to six dominant colors per image, with near-duplicate shades filtered out so the palette stays distinct. Each swatch shows a copy-ready HEX code. It does not label colors by name, export RGB or CMYK readouts, or generate CSS variables — for code-ready tokens, use Pix-8 CSS Palette Generator.",
      },
      {
        question:
          "What types of images work best for palette extraction?",
        answer:
          "Palette Extractor accepts standard image files loaded from your device — typically PNG, JPEG, or WebP. Photos, brand mockups, and reference stills all work; the tool ranks colors by pixel coverage on a downsampled canvas. It processes one image per session and does not batch-extract palettes from folders or PDF pages.",
      },
    ],
  },
  "color-palette-generator-from-image": {
    id: "color-palette-generator-from-image",
    path: "/color-palette-generator-from-image",
    linkTitle: "Palette generator from image",
    linkExcerpt:
      "Generate a color palette from any image in your browser — HEX swatches, client-side, no upload.",
    seo: {
      title: "Color Palette Generator from Image",
      description:
        "Generate a color palette from any image in your browser. Build up to six dominant HEX swatches on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this color palette generator from image upload my files to a server?",
        answer:
          "No. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, analyzed on a client-side canvas, and converted into up to six dominant HEX swatches on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does this generator output CSS variables or design tokens?",
        answer:
          "Palette Extractor generates a visual palette of up to six dominant colors from your image — each with a copy-ready HEX code. It does not export CSS custom properties, JSON palettes, SCSS maps, or Tailwind config snippets. For code-ready output, use Pix-8 CSS Palette Generator after you have your reference image.",
      },
      {
        question:
          "How is this different from a color picker or stock palette library?",
        answer:
          "Palette Extractor derives its palette from pixel coverage in your uploaded image — not from preset swatch books or manual pixel sampling. It ranks dominant colors, filters near-duplicates, and presents copy-ready HEX swatches. It does not pick individual pixels on click — for that, use Pix-8 Color Picker. It processes one image per session and does not batch-generate palettes from folders.",
      },
    ],
  },
  "free-image-color-extractor": {
    id: "free-image-color-extractor",
    path: "/free-image-color-extractor",
    linkTitle: "Free image color extractor",
    linkExcerpt:
      "Free image color extractor in your browser — dominant HEX swatches, client-side, no upload.",
    seo: {
      title: "Free Image Color Extractor",
      description:
        "Free image color extractor in your browser. Pull up to six dominant HEX colors from any image on-device — no upload, no server, no paywall. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question: "Is this image color extractor really free to use?",
        answer:
          "Yes. Pix-8 Palette Extractor is free to open and use in your browser — no subscription, no credit card, and no per-export fee. Load an image locally, extract up to six dominant HEX colors, and copy swatches without paying or creating an account.",
      },
      {
        question:
          "Does free mean my images get uploaded to a server?",
        answer:
          "No. Free does not mean cloud-hosted. Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and reduced to dominant HEX values on-device. Pix-8 does not receive your pixel data, and there is no server upload step.",
      },
      {
        question:
          "What does the free color extractor include — and what does it not do?",
        answer:
          "Palette Extractor includes local image loading, up to six deduplicated dominant colors, one-click HEX copy, and optional EXIF metadata stripping toggle. It does not export CSS variables or JSON tokens — use Pix-8 CSS Palette Generator for code output. It does not sample individual pixels on click — use Pix-8 Color Picker. It processes one image per session and does not batch-extract from folders.",
      },
    ],
  },
  "private-image-color-extractor": {
    id: "private-image-color-extractor",
    path: "/private-image-color-extractor",
    linkTitle: "Private color extractor",
    linkExcerpt:
      "Private image color extractor in your browser — dominant HEX, client-side, no upload.",
    seo: {
      title: "Private Image Color Extractor",
      description:
        "Private image color extractor in your browser. Extract up to six dominant HEX colors on-device — no upload, no account, no server. Confidential client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "How is this image color extractor private if it runs in a browser?",
        answer:
          "Private here means your image data stays on your device. Pix-8 Palette Extractor decodes your file locally, samples colors on a client-side canvas, and presents HEX swatches without uploading pixels to Pix-8 or any third-party server. No account is required, and there is no cloud storage step for your source image.",
      },
      {
        question:
          "Can I strip metadata before extracting colors from a private photo?",
        answer:
          "Yes. Palette Extractor includes an optional EXIF metadata stripping toggle — useful when your source image carries location, device, or timestamp data you do not want retained in downstream workflows. Color extraction itself still runs client-side on the decoded image in your browser tab.",
      },
      {
        question:
          "What does the private color extractor not do?",
        answer:
          "Palette Extractor extracts up to six deduplicated dominant HEX swatches from one image per session. It does not export CSS variables or JSON tokens — use Pix-8 CSS Palette Generator for code output. It does not sample individual pixels on click — use Pix-8 Color Picker. It does not batch-process folders, sync palettes to a cloud account, or train on your images.",
      },
    ],
  },
  "no-upload-color-scheme-generator": {
    id: "no-upload-color-scheme-generator",
    path: "/no-upload-color-scheme-generator",
    linkTitle: "No-upload scheme generator",
    linkExcerpt:
      "No-upload color scheme generator in your browser — HEX swatches, client-side, on-device.",
    seo: {
      title: "No-Upload Color Scheme Generator",
      description:
        "No-upload color scheme generator in your browser. Build up to six dominant HEX colors from any image on-device — no server, no account. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Does this color scheme generator require uploading my image?",
        answer:
          "No. Pix-8 Palette Extractor never uploads your image. You load a file from your device, the browser decodes it locally, and a client-side canvas ranks up to six dominant HEX colors for your scheme. Your pixel data is not transmitted to Pix-8 or any third-party server during generation or copy.",
      },
      {
        question:
          "What does the no-upload scheme generator output?",
        answer:
          "Palette Extractor presents up to six deduplicated dominant colors ranked by pixel coverage — each with a copy-ready HEX code you can use together as a color scheme. It does not assign semantic roles like primary or accent, export CSS custom properties, or produce JSON design tokens — for code-ready output, use Pix-8 CSS Palette Generator.",
      },
      {
        question:
          "How is a no-upload generator different from cloud mood-board tools?",
        answer:
          "Cloud scheme tools typically require an upload step before any colors appear. Pix-8 processes one image per session entirely in the browser tab — no upload queue, no remote storage, and no account. It does not batch-generate schemes from folders, name colors with AI, or build shareable cloud galleries.",
      },
    ],
  },
  "browser-based-palette-builder": {
    id: "browser-based-palette-builder",
    path: "/browser-based-palette-builder",
    linkTitle: "Browser palette builder",
    linkExcerpt:
      "Browser-based palette builder — dominant HEX swatches from any image, client-side, no upload.",
    seo: {
      title: "Browser-Based Palette Builder",
      description:
        "Browser-based palette builder in your browser. Build up to six dominant HEX swatches from any image on-device — no install, no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Do I need to install software to use this browser-based palette builder?",
        answer:
          "No. Pix-8 Palette Extractor runs entirely in your web browser — no desktop app, no plugin, and no browser extension required. Open the tool, load an image from your device, and build a palette of up to six dominant HEX colors on a client-side canvas without installing anything.",
      },
      {
        question:
          "Does the browser palette builder upload my images to a server?",
        answer:
          "No. Your image is read locally, analyzed on a client-side canvas in the browser tab, and reduced to dominant HEX swatches on-device. It is never uploaded to Pix-8 or any third-party server during palette building, sampling, or copy.",
      },
      {
        question:
          "Can I manually add or rearrange swatches in the palette builder?",
        answer:
          "Palette Extractor builds your palette from dominant colors ranked by pixel coverage in your image — up to six deduplicated swatches with copy-ready HEX codes. It does not provide a drag-and-drop swatch editor, manual color wheel, or blank-canvas palette construction. For individual pixel sampling, use Pix-8 Color Picker. For CSS variable export, use Pix-8 CSS Palette Generator.",
      },
    ],
  },
  "get-hex-codes-from-image": {
    id: "get-hex-codes-from-image",
    path: "/get-hex-codes-from-image",
    linkTitle: "HEX codes from image",
    linkExcerpt:
      "Get HEX codes from any image in your browser — dominant swatches, client-side, no upload.",
    seo: {
      title: "Get HEX Codes from Image",
      description:
        "Get HEX codes from any image in your browser. Extract up to six dominant colors with one-click copy on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I get HEX codes from an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and reduced to up to six dominant HEX values on-device. Your pixel data is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How many HEX codes can I get from one image?",
        answer:
          "Palette Extractor surfaces up to six dominant HEX codes per image, with near-duplicate shades filtered out so each swatch is distinct. Click any swatch to copy its HEX value to the clipboard. It does not export RGB, HSL, CSS variables, or JSON tokens — for pixel-level HEX with RGB and HSL readouts, use Pix-8 Color Picker.",
      },
      {
        question:
          "How is getting HEX codes different from picking a single pixel color?",
        answer:
          "Palette Extractor ranks dominant colors by pixel coverage and presents multiple HEX codes at once — ideal when you need a set of colors from a photo or mockup. Pix-8 Color Picker samples individual pixels on click with a magnifier loupe and copies HEX, RGB, or HSL for one value at a time. Palette Extractor processes one image per session locally.",
      },
    ],
  },
  "extract-brand-colors-from-image": {
    id: "extract-brand-colors-from-image",
    path: "/extract-brand-colors-from-image",
    linkTitle: "Brand colors from image",
    linkExcerpt:
      "Extract brand colors from any image in your browser — dominant HEX swatches, client-side, no upload.",
    seo: {
      title: "Extract Brand Colors from Image",
      description:
        "Extract brand colors from any image in your browser. Surface up to six dominant HEX swatches from logos and mockups on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I extract brand colors from an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, sampled on a client-side canvas, and reduced to dominant HEX values on-device. Brand assets like logos and mockups stay on your device — they are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does the tool automatically identify official brand colors or color names?",
        answer:
          "Palette Extractor ranks up to six dominant colors by pixel coverage in your image and presents copy-ready HEX swatches — it does not match against trademark databases, name colors with AI, or verify against a brand style guide. Use the extracted HEX codes as a starting reference from your logo, packaging photo, or brand mockup, then validate against your official guidelines.",
      },
      {
        question:
          "What types of brand images work best for color extraction?",
        answer:
          "Palette Extractor accepts standard image files from your device — logos, social graphics, product photos, and presentation slides all work. Dominant colors surface by coverage with near-duplicates filtered. For a single exact brand HEX from one pixel, use Pix-8 Color Picker. For CSS variable export, use Pix-8 CSS Palette Generator. It processes one image per session and does not batch-extract from folders.",
      },
    ],
  },
  "auto-color-palette-generator": {
    id: "auto-color-palette-generator",
    path: "/auto-color-palette-generator",
    linkTitle: "Auto palette generator",
    linkExcerpt:
      "Auto color palette generator in your browser — dominant HEX swatches, client-side, no upload.",
    seo: {
      title: "Auto Color Palette Generator",
      description:
        "Auto color palette generator in your browser. Automatically extract up to six dominant HEX swatches from any image on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "What does automatic mean in this color palette generator?",
        answer:
          "Automatic means Palette Extractor ranks dominant colors from your image as soon as it loads — by pixel coverage on a client-side canvas, with near-duplicates filtered. You do not manually pick swatches, drag colors onto a tray, or sample pixels one by one. It does not use generative AI to invent colors from a text prompt or build palettes without a source image.",
      },
      {
        question:
          "Does the auto palette generator upload my image to a server?",
        answer:
          "No. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, analyzed on a client-side canvas, and converted into up to six dominant HEX swatches on-device. It is never transmitted to Pix-8 or any third-party server during automatic extraction or copy.",
      },
      {
        question:
          "How is this different from CSS Palette Generator or Color Picker?",
        answer:
          "Palette Extractor automatically surfaces up to six deduplicated dominant HEX swatches from your image — not code-ready CSS variables or JSON tokens. For CSS, SCSS, JSON, or Tailwind export with semantic role labels, use Pix-8 CSS Palette Generator. For manual pixel-level sampling with a magnifier loupe, use Pix-8 Color Picker. It processes one image per session and does not batch-generate palettes from folders.",
      },
    ],
  },
  "find-color-palette-for-design-project": {
    id: "find-color-palette-for-design-project",
    path: "/find-color-palette-for-design-project",
    linkTitle: "Palette for design project",
    linkExcerpt:
      "Find a color palette for your design project in the browser — HEX swatches, client-side, no upload.",
    seo: {
      title: "Find Color Palette for Design Project",
      description:
        "Find a color palette for your design project in the browser. Extract up to six dominant HEX swatches from any reference image on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I find a color palette for a design project without uploading reference images?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Load a reference image from your device — a mood photo, mockup, or inspiration still — and dominant colors rank on a client-side canvas into up to six HEX swatches on-device. Your file is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does this tool build a full design system or component library?",
        answer:
          "Palette Extractor surfaces up to six deduplicated dominant HEX codes from your reference image — copy-ready swatches for comps, mood boards, or handoff notes. It does not generate typography scales, spacing tokens, component documentation, or Figma libraries. For CSS variable export with semantic role labels, use Pix-8 CSS Palette Generator after you have your reference image.",
      },
      {
        question:
          "What should I use if I need one exact color instead of a full palette?",
        answer:
          "Palette Extractor finds multiple dominant colors ranked by pixel coverage — useful when starting a design project from a reference image. For a single exact HEX from one pixel, use Pix-8 Color Picker with its magnifier loupe. Palette Extractor processes one image per session locally and does not batch-extract from project folders.",
      },
    ],
  },
  "generate-color-scheme-from-image": {
    id: "generate-color-scheme-from-image",
    path: "/generate-color-scheme-from-image",
    linkTitle: "Color scheme from image",
    linkExcerpt:
      "Generate a color scheme from any image in your browser — HEX swatches, client-side, no upload.",
    seo: {
      title: "Generate Color Scheme from Image",
      description:
        "Generate a color scheme from any image in your browser. Build up to six dominant HEX colors on-device — no upload, no server. Private client-side Palette Extractor by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I generate a color scheme from an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Palette Extractor runs entirely in your browser. Your image is read locally, analyzed on a client-side canvas, and reduced to up to six dominant HEX colors on-device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "How many colors does the generated scheme include?",
        answer:
          "Palette Extractor surfaces up to six dominant colors ranked by pixel coverage, with near-duplicate shades filtered out so the scheme stays distinct. Each swatch includes a copy-ready HEX code. It does not assign semantic roles like primary or accent automatically, export CSS custom properties, or produce full design-system documentation — for code-ready tokens, use Pix-8 CSS Palette Generator.",
      },
      {
        question:
          "What is the difference between a color scheme and a single swatch pick?",
        answer:
          "A color scheme here means a set of dominant colors derived from your image — not one pixel sampled on click. Palette Extractor ranks colors by coverage across the file and presents multiple HEX swatches you can copy together. For individual pixel sampling, use Pix-8 Color Picker. It processes one image per session and does not batch-generate schemes from folders.",
      },
    ],
  },
};

export function listPaletteExtractorLandings(): PaletteExtractorLandingEntry[] {
  return Object.values(PALETTE_EXTRACTOR_LANDINGS);
}

export function getPaletteExtractorLandingByPath(
  path: string,
): PaletteExtractorLandingEntry | undefined {
  return listPaletteExtractorLandings().find((entry) => entry.path === path);
}

export function getPaletteExtractorLandingBySlug(
  slug: string,
): PaletteExtractorLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listPaletteExtractorLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
