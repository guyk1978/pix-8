import {
  getLegacyToolRoute,
  getToolCategoryId,
  getToolRoute,
  isSidebarNavCategoryId,
} from "@/lib/sidebarNav";
import { getToolById, tools, type Tool, type ToolId } from "@/lib/tools";

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function isActiveHref(pathname: string, href: string): boolean {
  return normalizePathname(pathname) === normalizePathname(href);
}

export function getToolHref(toolId: ToolId): string {
  return getToolRoute(toolId);
}

function resolveToolFromNestedPath(pathname: string): Tool | undefined {
  const match = pathname.match(/^\/tools\/([^/]+)\/([^/]+)$/);
  if (!match) return undefined;

  const [, categoryId, toolId] = match;
  if (!isSidebarNavCategoryId(categoryId)) return undefined;

  const tool = getToolById(toolId as ToolId);
  if (!tool) return undefined;

  if (getToolCategoryId(tool.id) !== categoryId) return undefined;

  return tool;
}

function resolveToolFromLegacyPath(pathname: string): Tool | undefined {
  const match = pathname.match(/^\/tools\/([^/]+)$/);
  if (!match) return undefined;

  const [, toolId] = match;
  if (toolId === "category") return undefined;

  return getToolById(toolId as ToolId);
}

export function getToolFromPathname(pathname: string): Tool | undefined {
  const normalized = normalizePathname(pathname);

  const direct = tools.find((tool) => tool.href === normalized);
  if (direct) return direct;

  return (
    resolveToolFromNestedPath(normalized) ??
    resolveToolFromLegacyPath(normalized)
  );
}

export function getToolIdFromPathname(pathname: string): ToolId | null {
  return getToolFromPathname(pathname)?.id ?? null;
}

export function isToolPage(pathname: string): boolean {
  return getToolFromPathname(pathname) !== undefined;
}

export function getLegacyToolHref(toolId: ToolId): string {
  return getLegacyToolRoute(toolId);
}
