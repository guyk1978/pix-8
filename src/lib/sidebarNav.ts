import { getToolById, type Tool, type ToolId } from "@/lib/tools";

export type SidebarNavCategoryId =
  | "editor-studio"
  | "optimization"
  | "dev-tools"
  | "enhancement";

export interface SidebarNavCategory {
  id: SidebarNavCategoryId;
  toolIds: ToolId[];
}

export const SIDEBAR_NAV_CATEGORIES: SidebarNavCategory[] = [
  {
    id: "editor-studio",
    toolIds: [
      "resizer",
      "cropper",
      "rotate-flip",
      "text-overlay",
      "meme-generator",
      "image-collage",
      "watermark",
      "image-filters",
    ],
  },
  {
    id: "optimization",
    toolIds: [
      "compressor",
      "converter",
      "metadata-remover",
      "bg-remover",
    ],
  },
  {
    id: "dev-tools",
    toolIds: [
      "base64-encoder",
      "image-to-svg",
      "palette-extractor",
      "color-picker",
      "css-palette-gen",
      "favicon-generator",
    ],
  },
  {
    id: "enhancement",
    toolIds: [
      "sharpener",
      "light-adjuster",
      "image-inverter",
      "lens-corrector",
      "denoiser",
      "grain-generator",
      "border-generator",
      "grayscale-converter",
    ],
  },
];

export function getSidebarCategoryTools(
  category: SidebarNavCategory,
): Tool[] {
  return category.toolIds
    .map((toolId) => getToolById(toolId))
    .filter((tool): tool is Tool => !!tool);
}

export function findSidebarCategoryForPath(
  pathname: string,
): SidebarNavCategoryId | null {
  const categoryPrefix = "/tools/category/";
  if (pathname.startsWith(categoryPrefix)) {
    const categoryId = pathname.slice(categoryPrefix.length);
    if (
      SIDEBAR_CATEGORY_IDS.includes(categoryId as SidebarNavCategoryId)
    ) {
      return categoryId as SidebarNavCategoryId;
    }
  }

  for (const category of SIDEBAR_NAV_CATEGORIES) {
    const hasActiveTool = category.toolIds.some((toolId) => {
      const tool = getToolById(toolId);
      return tool?.href === pathname;
    });

    if (hasActiveTool) {
      return category.id;
    }
  }

  return null;
}

export const SIDEBAR_CATEGORY_IDS = SIDEBAR_NAV_CATEGORIES.map(
  (category) => category.id,
);
