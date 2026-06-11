import type { Metadata } from "next";
import { ImageFilters } from "@/components/tools/ImageFilters";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("image-filters")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ImageFiltersPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <ImageFilters />
    </ToolShell>
  );
}
