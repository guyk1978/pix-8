import { getToolCategoryId, getToolRoute } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import type { Tool } from "@/lib/tools";

export type ToolApplicationCategory = "Utility" | "DeveloperApplication";

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
}

export function getToolApplicationCategory(tool: Tool): ToolApplicationCategory {
  return getToolCategoryId(tool.id) === "dev-tools"
    ? "DeveloperApplication"
    : "Utility";
}

export function buildToolSoftwareApplicationSchema(
  tool: Tool,
): ToolSoftwareApplicationSchema {
  const canonicalPath = getToolRoute(tool.id);

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
  };
}
