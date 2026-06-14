import seedData from "@/data/toolRatingsSeed.json";
import type { ToolId } from "@/lib/tools";

export interface ToolRatingSeed {
  ratingValue: number;
  ratingCount: number;
}

export interface ToolAggregateRating extends ToolRatingSeed {
  bestRating: number;
  worstRating: number;
}

export interface ToolRatingsSeedFile {
  default?: ToolRatingSeed;
  [toolId: string]: ToolRatingSeed | undefined;
}

const STORAGE_PREFIX = "pix-8-tool-rating-";
const PUBLIC_RATINGS_URL = "/tool-ratings.json";

const DEFAULT_SEED: ToolRatingSeed = {
  ratingValue: 4.6,
  ratingCount: 38,
};

export function getSeedRating(toolId: ToolId): ToolRatingSeed {
  const file = seedData as ToolRatingsSeedFile;
  return file[toolId] ?? file.default ?? DEFAULT_SEED;
}

export function mergeSeedOverride(
  base: ToolRatingSeed,
  override?: Partial<ToolRatingSeed> | null,
): ToolRatingSeed {
  if (!override) return base;

  return {
    ratingValue:
      typeof override.ratingValue === "number"
        ? override.ratingValue
        : base.ratingValue,
    ratingCount:
      typeof override.ratingCount === "number"
        ? override.ratingCount
        : base.ratingCount,
  };
}

export function getUserVote(toolId: ToolId): number | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(`${STORAGE_PREFIX}${toolId}`);
  if (!raw) return null;

  const value = Number(raw);
  if (!Number.isFinite(value) || value < 1 || value > 5) return null;

  return Math.round(value);
}

export function saveUserVote(toolId: ToolId, rating: number): void {
  if (typeof window === "undefined") return;

  const normalized = Math.min(5, Math.max(1, Math.round(rating)));
  localStorage.setItem(`${STORAGE_PREFIX}${toolId}`, String(normalized));
}

export function computeAggregateRating(
  seed: ToolRatingSeed,
  userVote: number | null,
): ToolAggregateRating {
  if (userVote === null) {
    return toAggregateRating(seed);
  }

  const ratingCount = seed.ratingCount + 1;
  const ratingValue =
    Math.round(
      ((seed.ratingValue * seed.ratingCount + userVote) / ratingCount) * 10,
    ) / 10;

  return toAggregateRating({ ratingValue, ratingCount });
}

export function toAggregateRating(
  seed: ToolRatingSeed,
): ToolAggregateRating {
  return {
    ratingValue: seed.ratingValue,
    ratingCount: seed.ratingCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function formatRatingValue(value: number): string {
  return value.toFixed(1);
}

export async function fetchPublicRatingOverrides(): Promise<ToolRatingsSeedFile | null> {
  if (typeof window === "undefined") return null;

  try {
    const response = await fetch(PUBLIC_RATINGS_URL, { cache: "no-store" });
    if (!response.ok) return null;

    const data = (await response.json()) as ToolRatingsSeedFile;
    return data;
  } catch {
    return null;
  }
}

export function getResolvedSeed(
  toolId: ToolId,
  overrides?: ToolRatingsSeedFile | null,
): ToolRatingSeed {
  const base = getSeedRating(toolId);
  const override = overrides?.[toolId] ?? overrides?.default;
  return mergeSeedOverride(base, override ?? null);
}

export function getToolJsonLdScriptId(toolId: ToolId): string {
  return `tool-json-ld-${toolId}`;
}

export function updateToolJsonLdScript(
  toolId: ToolId,
  aggregate: ToolAggregateRating,
): void {
  if (typeof document === "undefined") return;

  const script = document.getElementById(getToolJsonLdScriptId(toolId));
  if (!script?.textContent) return;

  try {
    const schema = JSON.parse(script.textContent) as Record<string, unknown>;
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: formatRatingValue(aggregate.ratingValue),
      ratingCount: aggregate.ratingCount,
      bestRating: aggregate.bestRating,
      worstRating: aggregate.worstRating,
    };
    script.textContent = JSON.stringify(schema);
  } catch {
    // Ignore malformed JSON-LD payloads.
  }
}
