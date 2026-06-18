import type { MetadataRoute } from "next";
import { buildMetadataSitemap } from "@/lib/siteSitemap";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildMetadataSitemap();
}
