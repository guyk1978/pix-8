import type { Metadata } from "next";
import { CssPaletteGenerator } from "@/components/tools/CssPaletteGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("css-palette-gen")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function CssPaletteGeneratorPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <CssPaletteGenerator />
    </ToolShell>
  );
}
