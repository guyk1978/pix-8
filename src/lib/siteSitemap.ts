import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";
import { listAllLandingPages } from "@/lib/landingPages";
import { SIDEBAR_CATEGORY_IDS } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import { tools } from "@/lib/tools";

export interface SiteSitemapEntry {
  path: string;
  label: string;
  group: string;
  lastModified?: Date;
}

function toLastModified(value?: string): Date {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function toSitemapUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Canonical list of public URLs — shared by sitemap.xml and local inventory. */
export function buildSiteSitemapEntries(): SiteSitemapEntry[] {
  const now = new Date();
  const entries: SiteSitemapEntry[] = [
    { path: "/", label: "Home", group: "Core", lastModified: now },
    { path: "/blog", label: "Blog", group: "Core", lastModified: now },
    {
      path: "/settings",
      label: "Settings",
      group: "Core",
      lastModified: now,
    },
    {
      path: "/projects",
      label: "Projects",
      group: "Core",
      lastModified: now,
    },
    {
      path: "/privacy",
      label: "Privacy Policy",
      group: "Legal",
      lastModified: now,
    },
    {
      path: "/terms",
      label: "Terms of Use",
      group: "Legal",
      lastModified: now,
    },
  ];

  for (const landing of listAllLandingPages()) {
    entries.push({
      path: landing.path,
      label: landing.linkTitle,
      group: "SEO landings",
      lastModified: now,
    });
  }

  for (const categoryId of SIDEBAR_CATEGORY_IDS) {
    entries.push({
      path: `/tools/category/${categoryId}`,
      label: `Category: ${categoryId}`,
      group: "Tool categories",
      lastModified: now,
    });
  }

  for (const tool of tools) {
    entries.push({
      path: tool.href,
      label: tool.name,
      group: "Tools",
      lastModified: now,
    });
  }

  for (const article of getAllArticles("en")) {
    entries.push({
      path: `/articles/${article.slug}`,
      label: article.title,
      group: "Articles",
      lastModified: toLastModified(article.date),
    });
  }

  return entries;
}

export function buildMetadataSitemap(): MetadataRoute.Sitemap {
  return buildSiteSitemapEntries().map((entry) => ({
    url: toSitemapUrl(entry.path),
    lastModified: entry.lastModified ?? new Date(),
  }));
}
