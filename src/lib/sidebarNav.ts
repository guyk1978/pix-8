import { normalizePathname } from "@/lib/routes";
import { getToolById, tools, type Tool, type ToolId } from "@/lib/tools";

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
  const normalized = normalizePathname(pathname);
  const categoryPrefix = "/tools/category/";
  if (normalized.startsWith(categoryPrefix)) {
    const categoryId = normalized.slice(categoryPrefix.length);
    if (
      SIDEBAR_CATEGORY_IDS.includes(categoryId as SidebarNavCategoryId)
    ) {
      return categoryId as SidebarNavCategoryId;
    }
  }

  for (const category of SIDEBAR_NAV_CATEGORIES) {
    const hasActiveTool = category.toolIds.some((toolId) => {
      const tool = getToolById(toolId);
      return tool?.href === normalized;
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

export interface AppsMenuCategory {
  id: SidebarNavCategoryId;
  tools: Tool[];
}

/** Categories + tools for the header Apps menu (all platform tools). */
export function getAppsMenuCategories(): AppsMenuCategory[] {
  return SIDEBAR_NAV_CATEGORIES.map((category) => ({
    id: category.id,
    tools: getSidebarCategoryTools(category),
  }));
}

/** Tools not assigned to any Apps category (should stay empty). */
export function getUncategorizedTools(): Tool[] {
  const assigned = new Set(
    SIDEBAR_NAV_CATEGORIES.flatMap((category) => category.toolIds),
  );
  return tools.filter((tool) => !assigned.has(tool.id));
}
