import { normalizePathname } from "@/lib/routes";
import {
  getAppsMenuCategories,
  getUncategorizedTools,
  SIDEBAR_NAV_CATEGORIES,
  type SidebarNavCategoryId,
} from "@/lib/sidebarNav";
import { getToolById, tools, type Tool, type ToolId } from "@/lib/tools";

/** Primary app pages (non-tool routes). */
export const APP_ROUTES = {
  home: "/",
  blog: "/blog",
  favorites: "/favorites",
  projects: "/projects",
  settings: "/settings",
} as const;

export type AppRouteKey = keyof typeof APP_ROUTES;

export interface PrimaryNavItem {
  href: string;
  labelKey: string;
  isActive: (pathname: string) => boolean;
}

export function getToolRoute(toolId: ToolId): string {
  const tool = getToolById(toolId);
  return tool?.href ?? `/tools/${toolId}`;
}

export function getCategoryRoute(categoryId: SidebarNavCategoryId): string {
  return `/tools/category/${categoryId}`;
}

/** Sidebar / header primary navigation items. */
export function getPrimaryNavItems(): PrimaryNavItem[] {
  return [
    {
      href: APP_ROUTES.home,
      labelKey: "nav.dashboard",
      isActive: (pathname) => normalizePathname(pathname) === APP_ROUTES.home,
    },
    {
      href: APP_ROUTES.blog,
      labelKey: "nav.blog",
      isActive: (pathname) =>
        normalizePathname(pathname) === APP_ROUTES.blog ||
        normalizePathname(pathname).startsWith("/articles/"),
    },
    {
      href: APP_ROUTES.favorites,
      labelKey: "nav.favorites",
      isActive: (pathname) => normalizePathname(pathname) === APP_ROUTES.favorites,
    },
    {
      href: APP_ROUTES.projects,
      labelKey: "nav.projects",
      isActive: (pathname) => normalizePathname(pathname) === APP_ROUTES.projects,
    },
    {
      href: APP_ROUTES.settings,
      labelKey: "nav.settings",
      isActive: (pathname) => normalizePathname(pathname) === APP_ROUTES.settings,
    },
  ];
}

export interface AppsMenuCategoryEntry {
  id: SidebarNavCategoryId;
  href: string;
  tools: Array<Tool & { href: string }>;
}

/** All tools grouped for the Apps menu with verified routes. */
export function getAppsMenuEntries(): AppsMenuCategoryEntry[] {
  return getAppsMenuCategories().map((category) => ({
    id: category.id,
    href: getCategoryRoute(category.id),
    tools: category.tools.map((tool) => ({
      ...tool,
      href: getToolRoute(tool.id),
    })),
  }));
}

export function getAppsMenuUncategorized(): Array<Tool & { href: string }> {
  return getUncategorizedTools().map((tool) => ({
    ...tool,
    href: getToolRoute(tool.id),
  }));
}

/** Map of every tool id → canonical route (for validation & links). */
export function getToolRouteMap(): Record<ToolId, string> {
  return tools.reduce(
    (map, tool) => {
      map[tool.id] = getToolRoute(tool.id);
      return map;
    },
    {} as Record<ToolId, string>,
  );
}

/** Dev-only sanity check: every tool appears in Apps menu categories. */
export function validateNavigationConfig(): string[] {
  const issues: string[] = [];
  const uncategorized = getUncategorizedTools();

  if (uncategorized.length > 0) {
    issues.push(
      `Uncategorized tools: ${uncategorized.map((tool) => tool.id).join(", ")}`,
    );
  }

  for (const tool of tools) {
    const expected = `/tools/${tool.id}`;
    if (tool.href !== expected) {
      issues.push(`Tool ${tool.id} href mismatch: ${tool.href} !== ${expected}`);
    }
    if (!getToolById(tool.id)) {
      issues.push(`Tool ${tool.id} missing from tools registry`);
    }
  }

  const assignedCount = SIDEBAR_NAV_CATEGORIES.reduce(
    (sum, category) => sum + category.toolIds.length,
    0,
  );
  if (assignedCount !== tools.length) {
    issues.push(
      `Category tool count (${assignedCount}) !== tools.length (${tools.length})`,
    );
  }

  return issues;
}
