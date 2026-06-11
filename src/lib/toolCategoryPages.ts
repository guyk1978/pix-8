import {
  SIDEBAR_CATEGORY_IDS,
  type SidebarNavCategoryId,
} from "@/lib/sidebarNav";

export function getToolCategoryHref(
  categoryId: SidebarNavCategoryId,
): string {
  return `/tools/category/${categoryId}`;
}

export function isToolCategoryId(
  value: string,
): value is SidebarNavCategoryId {
  return SIDEBAR_CATEGORY_IDS.includes(value as SidebarNavCategoryId);
}

/** English metadata for static SEO (title template adds site suffix). */
export const TOOL_CATEGORY_SEO: Record<
  SidebarNavCategoryId,
  { title: string; description: string }
> = {
  "editor-studio": {
    title: "Editor Studio — Online Image Editing Tools",
    description:
      "Crop, resize, rotate, add text, memes, collages, watermarks, and filters in your browser. Free client-side image editing with Pix-8.",
  },
  optimization: {
    title: "Image Optimization Tools — Compress, Convert & Clean",
    description:
      "Compress images, convert formats, strip metadata, and remove backgrounds locally. Fast privacy-first optimization tools by Pix-8.",
  },
  "dev-tools": {
    title: "Developer Image Tools — Base64, SVG, Palettes & Icons",
    description:
      "Base64 encode images, trace SVG vectors, extract palettes, sample colors, and generate favicons — all client-side for developers.",
  },
  enhancement: {
    title: "Image Enhancement Tools — Sharpen, Light & Effects",
    description:
      "Sharpen, adjust light, denoise, add grain, borders, grayscale, invert, and fix lens distortion — professional enhancement in the browser.",
  },
};

export const TOOL_CATEGORY_FAQ_COUNT = 4;

/** English FAQ copy for JSON-LD structured data. */
export const TOOL_CATEGORY_FAQ_LD: Record<
  SidebarNavCategoryId,
  { question: string; answer: string }[]
> = {
  "editor-studio": [
    {
      question: "Do I need an account for Editor Studio tools?",
      answer:
        "No. Open any tool, upload an image, and download the result immediately.",
    },
    {
      question: "Can I combine multiple Editor Studio tools on one image?",
      answer:
        "Yes. Export from one tool and open the file in another — crop first, then add text or a meme caption.",
    },
    {
      question: "Are meme templates included?",
      answer:
        "The Meme Generator includes a built-in gallery with classic layouts plus support for your own uploads.",
    },
    {
      question: "Will social platforms re-compress my exports?",
      answer:
        "Platforms re-encode uploads. Start with a well-cropped source and use the Compressor if you need a smaller file.",
    },
  ],
  optimization: [
    {
      question: "Does compression reduce visible quality?",
      answer:
        "Lossy compression trades bytes for detail. Pix-8 exposes quality sliders so you can preview before export.",
    },
    {
      question: "Which format should I choose for the web?",
      answer:
        "WebP and AVIF offer excellent compression for photos. PNG remains best for transparency.",
    },
    {
      question: "Is the Background Remover really local?",
      answer:
        "Yes. Models run via WebAssembly and ONNX in your browser without cloud uploads.",
    },
    {
      question: "When should I strip metadata?",
      answer:
        "Before publishing client work or any image that may contain GPS or device identifiers.",
    },
  ],
  "dev-tools": [
    {
      question: "Can I use Base64 output in production?",
      answer:
        "Yes for small icons. Large Base64 blobs inflate HTML — prefer external files for big images.",
    },
    {
      question: "How accurate is SVG tracing?",
      answer:
        "Tracing works best on logos and flat illustrations. Detailed photos produce large paths.",
    },
    {
      question: "Do CSS palette exports include Tailwind config?",
      answer:
        "The CSS Palette Generator exports CSS custom properties, JSON, and Tailwind-friendly tokens.",
    },
    {
      question: "What favicon sizes are generated?",
      answer:
        "The Favicon Generator produces common browser and PWA sizes from a single source image.",
    },
  ],
  enhancement: [
    {
      question: "Will sharpening fix a blurry photo?",
      answer:
        "Sharpening enhances edges but cannot recover true motion blur or missed focus.",
    },
    {
      question: "Is denoising destructive?",
      answer:
        "Denoising smooths grain but may soften fine detail. Preview at full zoom before export.",
    },
    {
      question: "Can I add borders for Instagram aspect ratios?",
      answer:
        "Yes. The Border Generator adds padding when your source is too small for wide ratios.",
    },
    {
      question: "Does grayscale conversion support contrast tweaks?",
      answer:
        "The Grayscale Converter includes brightness and contrast sliders beyond simple desaturate.",
    },
  ],
};
