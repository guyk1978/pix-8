import { tools, type Tool, type ToolId } from "@/lib/tools";

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
  return getToolFromPathname(`/tools/${toolId}`)?.href ?? `/tools/${toolId}`;
}

export function getToolFromPathname(pathname: string): Tool | undefined {
  const normalized = normalizePathname(pathname);

  const direct = tools.find((tool) => tool.href === normalized);
  if (direct) return direct;

  const toolsPrefix = "/tools/";
  if (!normalized.startsWith(toolsPrefix)) return undefined;

  const segment = normalized.slice(toolsPrefix.length).split("/")[0];
  if (!segment || segment === "category") return undefined;

  return tools.find((tool) => tool.id === segment);
}

export function getToolIdFromPathname(pathname: string): ToolId | null {
  return getToolFromPathname(pathname)?.id ?? null;
}

export function isToolPage(pathname: string): boolean {
  return getToolFromPathname(pathname) !== undefined;
}
