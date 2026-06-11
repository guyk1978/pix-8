import { tools, type ToolId } from "@/lib/tools";

export const FAVORITES_STORAGE_KEY = "pix-8-favorites";

const VALID_TOOL_IDS = new Set<ToolId>(tools.map((tool) => tool.id));

export function isValidToolSlug(value: string): value is ToolId {
  return VALID_TOOL_IDS.has(value as ToolId);
}

export function normalizeFavoriteSlugs(values: unknown): ToolId[] {
  if (!Array.isArray(values)) return [];

  const seen = new Set<ToolId>();

  return values.filter((value): value is ToolId => {
    if (typeof value !== "string" || !isValidToolSlug(value) || seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
}

export function loadFavoriteSlugs(): ToolId[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    return normalizeFavoriteSlugs(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveFavoriteSlugs(slugs: ToolId[]): void {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(slugs));
}
