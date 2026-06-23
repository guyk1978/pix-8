import { getToolById, tools, type Tool, type ToolId } from "@/lib/tools";

export const DEFAULT_HOME_TOOL_ID: ToolId = "resizer";

const HOME_TOOL_IDS = new Set<ToolId>(tools.map((tool) => tool.id));

export function isHomeToolId(value: string | null | undefined): value is ToolId {
  return !!value && HOME_TOOL_IDS.has(value as ToolId);
}

export function resolveHomeToolId(
  value: string | null | undefined,
): ToolId {
  return isHomeToolId(value) ? value : DEFAULT_HOME_TOOL_ID;
}

export function buildHomeToolHref(
  toolId: ToolId,
  extra?: Record<string, string>,
): string {
  const params = new URLSearchParams({ tool: toolId });
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      params.set(key, value);
    }
  }
  return `/?${params.toString()}`;
}

export function getHomeToolHref(toolId: ToolId): string {
  return buildHomeToolHref(toolId);
}

export function getHomeToolFromSearchParam(
  value: string | null | undefined,
): Tool | undefined {
  return getToolById(resolveHomeToolId(value));
}
