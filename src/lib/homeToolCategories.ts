import {
  getToolCategoryId,
  SIDEBAR_NAV_CATEGORIES,
  type SidebarNavCategory,
  type SidebarNavCategoryId,
} from "@/lib/sidebarNav";
import { tools, type Tool, type ToolId } from "@/lib/tools";

export type HomeToolCategoryId = SidebarNavCategoryId;

export interface HomeToolCategory extends SidebarNavCategory {
  id: HomeToolCategoryId;
}

/** Ordered homepage categories — each tool maps to exactly one entry. */
export const HOME_TOOL_CATEGORIES: HomeToolCategory[] = SIDEBAR_NAV_CATEGORIES;

/** Lookup map: tool id → homepage category id. */
export const TOOL_HOME_CATEGORY_MAP = Object.fromEntries(
  tools.map((tool) => [tool.id, getToolCategoryId(tool.id)]),
) as Record<ToolId, HomeToolCategoryId>;

export function getHomeCategoryTools(categoryId: HomeToolCategoryId): Tool[] {
  const category = HOME_TOOL_CATEGORIES.find((entry) => entry.id === categoryId);
  if (!category) return [];

  const order = new Map(category.toolIds.map((toolId, index) => [toolId, index]));

  return tools
    .filter((tool) => TOOL_HOME_CATEGORY_MAP[tool.id] === categoryId)
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export function groupToolsByHomeCategory(
  filteredTools: Tool[],
): { category: HomeToolCategory; tools: Tool[] }[] {
  const byCategory = new Map<HomeToolCategoryId, Tool[]>(
    HOME_TOOL_CATEGORIES.map((category) => [category.id, []]),
  );

  for (const tool of filteredTools) {
    const categoryId = TOOL_HOME_CATEGORY_MAP[tool.id];
    byCategory.get(categoryId)?.push(tool);
  }

  return HOME_TOOL_CATEGORIES.map((category) => {
    const order = new Map(category.toolIds.map((toolId, index) => [toolId, index]));
    const categoryTools = byCategory.get(category.id) ?? [];

    categoryTools.sort(
      (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0),
    );

    return { category, tools: categoryTools };
  }).filter((entry) => entry.tools.length > 0);
}

export function getHomeGridColumnsPerRow(isLg: boolean, isSm: boolean): number {
  if (isLg) return 3;
  if (isSm) return 2;
  return 1;
}
