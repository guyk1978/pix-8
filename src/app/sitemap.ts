import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";
import { SIDEBAR_CATEGORY_IDS } from "@/lib/sidebarNav";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://pix-8.com";

/** Tool slugs from dedicated folders under src/app/tools (excludes [toolId]). */
function getToolSlugsFromDirectory(): string[] {
  const toolsDir = join(process.cwd(), "src/app/tools");
  if (!existsSync(toolsDir)) return [];

  return readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("["))
    .filter((entry) => existsSync(join(toolsDir, entry.name, "page.tsx")))
    .map((entry) => entry.name);
}

/** Union directory scan + tools registry (covers /tools/[toolId] only routes). */
function getAllToolSlugs(): string[] {
  const fromDirectory = getToolSlugsFromDirectory();
  const fromRegistry = tools.map((tool) => tool.id);
  return [...new Set([...fromDirectory, ...fromRegistry])].sort();
}

function toLastModified(value?: string): Date {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/settings`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/favorites`,
      lastModified: now,
    },
  ];

  for (const categoryId of SIDEBAR_CATEGORY_IDS) {
    entries.push({
      url: `${SITE_URL}/tools/category/${categoryId}`,
      lastModified: now,
    });
  }

  for (const slug of getAllToolSlugs()) {
    entries.push({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: now,
    });
  }

  for (const article of getAllArticles()) {
    entries.push({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: toLastModified(article.date),
    });
  }

  return entries;
}
