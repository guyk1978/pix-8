export type ToolCategory = "basic-editing" | "optimization" | "advanced";

export type ToolId =
  | "resizer"
  | "converter"
  | "compressor"
  | "cropper"
  | "rotate-flip"
  | "watermark"
  | "bg-remover"
  | "palette-extractor"
  | "metadata-remover"
  | "color-picker"
  | "text-overlay"
  | "border-generator"
  | "grayscale-converter"
  | "favicon-generator"
  | "sharpener"
  | "light-adjuster"
  | "image-inverter"
  | "denoiser"
  | "css-palette-gen"
  | "lens-corrector"
  | "grain-generator"
  | "base64-encoder";

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  href: string;
  tag: string;
  category: ToolCategory;
  status?: "ready" | "pending";
}

export const tools: Tool[] = [
  {
    id: "resizer",
    name: "Resizer",
    description: "Scale images to exact dimensions or percentage. No upload, no server.",
    href: "/tools/resizer",
    tag: "DIMENSIONS",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "converter",
    name: "Converter",
    description: "Convert between PNG, JPEG, WebP, and AVIF formats in the browser.",
    href: "/tools/converter",
    tag: "FORMAT",
    category: "optimization",
    status: "ready",
  },
  {
    id: "compressor",
    name: "Compressor",
    description: "Reduce file size with quality controls while keeping images local.",
    href: "/tools/compressor",
    tag: "OPTIMIZE",
    category: "optimization",
    status: "ready",
  },
  {
    id: "cropper",
    name: "Cropper",
    description: "Crop and frame images with pixel-precise selection controls.",
    href: "/tools/cropper",
    tag: "CROP",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "rotate-flip",
    name: "Rotate & Flip",
    description: "Rotate or mirror images with live preview. All transforms stay local.",
    href: "/tools/rotate-flip",
    tag: "ORIENT",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "watermark",
    name: "Watermark",
    description: "Overlay a logo or image watermark with opacity and position controls.",
    href: "/tools/watermark",
    tag: "BRAND",
    category: "advanced",
    status: "ready",
  },
  {
    id: "bg-remover",
    name: "Background Remover",
    description: "Remove backgrounds locally with TensorFlow.js — no uploads, no cloud.",
    href: "/tools/bg-remover",
    tag: "AI",
    category: "advanced",
    status: "ready",
  },
  {
    id: "palette-extractor",
    name: "Palette Extractor",
    description: "Extract dominant colors from any image and copy hex codes instantly.",
    href: "/tools/palette-extractor",
    tag: "COLOR",
    category: "advanced",
    status: "ready",
  },
  {
    id: "metadata-remover",
    name: "Metadata Remover",
    description: "Strip EXIF, GPS, and device info from images before sharing online.",
    href: "/tools/metadata-remover",
    tag: "PRIVACY",
    category: "optimization",
    status: "ready",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Sample any pixel from an image and copy exact HEX, RGB, or HSL values.",
    href: "/tools/color-picker",
    tag: "SAMPLE",
    category: "advanced",
    status: "ready",
  },
  {
    id: "text-overlay",
    name: "Text Overlay",
    description: "Add quotes, labels, and captions to images with draggable text and live preview.",
    href: "/tools/text-overlay",
    tag: "TYPE",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "border-generator",
    name: "Border Generator",
    description: "Add clean borders and rounded frames for gallery-ready, feed-polished images.",
    href: "/tools/border-generator",
    tag: "FRAME",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "grayscale-converter",
    name: "Grayscale Converter",
    description: "Convert images to black and white with adjustable contrast and brightness.",
    href: "/tools/grayscale-converter",
    tag: "MONO",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "favicon-generator",
    name: "Favicon Generator",
    description: "Turn any logo into browser-ready favicon.ico or PNG icons in seconds.",
    href: "/tools/favicon-generator",
    tag: "ICON",
    category: "optimization",
    status: "ready",
  },
  {
    id: "sharpener",
    name: "Sharpener",
    description: "Recover edge clarity and detail with adjustable convolution sharpening.",
    href: "/tools/sharpener",
    tag: "SHARP",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "light-adjuster",
    name: "Light Adjuster",
    description: "Fix exposure with live brightness and contrast controls on full-color images.",
    href: "/tools/light-adjuster",
    tag: "LIGHT",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "image-inverter",
    name: "Image Inverter",
    description: "Flip RGB values to create negative effects, masks, and high-contrast visuals.",
    href: "/tools/image-inverter",
    tag: "INVERT",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "denoiser",
    name: "Denoiser",
    description: "Reduce digital grain with median filtering and edge-preserving smoothing.",
    href: "/tools/denoiser",
    tag: "CLEAN",
    category: "advanced",
    status: "ready",
  },
  {
    id: "css-palette-gen",
    name: "CSS Palette Generator",
    description: "Extract colors from images and export CSS variables, JSON, or Tailwind config.",
    href: "/tools/css-palette-gen",
    tag: "CODE",
    category: "advanced",
    status: "ready",
  },
  {
    id: "lens-corrector",
    name: "Lens Corrector",
    description: "Fix barrel and pincushion distortion with radial warp and grid alignment.",
    href: "/tools/lens-corrector",
    tag: "GEOMETRY",
    category: "basic-editing",
    status: "ready",
  },
  {
    id: "grain-generator",
    name: "Grain Generator",
    description: "Add cinematic film grain with adjustable Gaussian noise intensity.",
    href: "/tools/grain-generator",
    tag: "GRAIN",
    category: "advanced",
    status: "ready",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Convert images to Base64 data URLs for embedding in CSS or HTML.",
    href: "/tools/base64-encoder",
    tag: "ENCODE",
    category: "optimization",
    status: "ready",
  },
];

export function getToolById(id: ToolId): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export const dashboardSections = [
  {
    id: "tools" as const,
    label: "Tools",
    categories: ["basic-editing", "optimization"] as ToolCategory[],
  },
  {
    id: "advanced" as const,
    label: "Advanced",
    categories: ["advanced"] as ToolCategory[],
  },
];
