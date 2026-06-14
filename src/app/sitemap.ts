import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";
import { SIDEBAR_CATEGORY_IDS } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

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
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
    },
  ];

  for (const categoryId of SIDEBAR_CATEGORY_IDS) {
    entries.push({
      url: `${SITE_URL}/tools/category/${categoryId}`,
      lastModified: now,
    });
  }

  for (const tool of tools) {
    entries.push({
      url: `${SITE_URL}${tool.href}`,
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
