import { tools, type ToolId } from "@/lib/tools";

export const PINNED_TOOLS_STORAGE_KEY = "pix-8-pinned-tools";
const LEGACY_FAVORITES_STORAGE_KEY = "pix-8-favorites";

const VALID_TOOL_IDS = new Set<ToolId>(tools.map((tool) => tool.id));

export function isValidToolSlug(value: string): value is ToolId {
  return VALID_TOOL_IDS.has(value as ToolId);
}

export function normalizePinnedToolSlugs(values: unknown): ToolId[] {
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

function readStorageKey(key: string): ToolId[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    return normalizePinnedToolSlugs(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function loadPinnedTools(): ToolId[] {
  const pinned = readStorageKey(PINNED_TOOLS_STORAGE_KEY);
  if (pinned.length > 0) return pinned;

  const legacy = readStorageKey(LEGACY_FAVORITES_STORAGE_KEY);
  if (legacy.length === 0) return [];

  savePinnedTools(legacy);
  localStorage.removeItem(LEGACY_FAVORITES_STORAGE_KEY);
  return legacy;
}

export function savePinnedTools(slugs: ToolId[]): void {
  localStorage.setItem(PINNED_TOOLS_STORAGE_KEY, JSON.stringify(slugs));
}
