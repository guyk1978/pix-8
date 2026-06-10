import type { Metadata } from "next";
import { CssPaletteGenerator } from "@/components/tools/CssPaletteGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("css-palette-gen")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function CssPaletteGeneratorPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <CssPaletteGenerator />
    </ToolShell>
  );
}
