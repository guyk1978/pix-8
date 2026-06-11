import type { Metadata } from "next";
import { PaletteExtractor } from "@/components/tools/PaletteExtractor";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("palette-extractor")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function PaletteExtractorPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <PaletteExtractor />
    </ToolShell>
  );
}
