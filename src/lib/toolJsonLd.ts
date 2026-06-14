import { getToolCategoryId, getToolRoute } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import {
  formatRatingValue,
  getSeedRating,
  toAggregateRating,
  type ToolAggregateRating,
} from "@/lib/toolRatings";
import type { Tool } from "@/lib/tools";

export type ToolApplicationCategory = "Utility" | "DeveloperApplication";

export interface SchemaAggregateRating {
  "@type": "AggregateRating";
  ratingValue: string;
  ratingCount: number;
  bestRating: number;
  worstRating: number;
}

export interface ToolSoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory: ToolApplicationCategory;
  operatingSystem: "Web Browser";
  url: string;
  offers: {
    "@type": "Offer";
    price: "0";
    priceCurrency: "USD";
  };
  aggregateRating?: SchemaAggregateRating;
}

export function getToolApplicationCategory(tool: Tool): ToolApplicationCategory {
  return getToolCategoryId(tool.id) === "dev-tools"
    ? "DeveloperApplication"
    : "Utility";
}

export function buildAggregateRatingSchema(
  aggregate: ToolAggregateRating,
): SchemaAggregateRating {
  return {
    "@type": "AggregateRating",
    ratingValue: formatRatingValue(aggregate.ratingValue),
    ratingCount: aggregate.ratingCount,
    bestRating: aggregate.bestRating,
    worstRating: aggregate.worstRating,
  };
}

export function buildToolSoftwareApplicationSchema(
  tool: Tool,
  aggregate?: ToolAggregateRating,
): ToolSoftwareApplicationSchema {
  const canonicalPath = getToolRoute(tool.id);
  const resolvedAggregate = aggregate ?? toAggregateRating(getSeedRating(tool.id));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: getToolApplicationCategory(tool),
    operatingSystem: "Web Browser",
    url: `${SITE_URL}${canonicalPath}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: buildAggregateRatingSchema(resolvedAggregate),
  };
}
