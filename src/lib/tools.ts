export type ToolCategory = "basic-editing" | "optimization" | "advanced";

export type ToolId =
  | "resizer"
  | "converter"
  | "compressor"
  | "cropper"
  | "rotate-flip"
  | "watermark"
  | "bg-remover"
  | "palette-extractor";

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
