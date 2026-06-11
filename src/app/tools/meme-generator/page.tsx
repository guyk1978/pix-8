import type { Metadata } from "next";
import { MemeGenerator } from "@/components/tools/MemeGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("meme-generator")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function MemeGeneratorPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <MemeGenerator />
    </ToolShell>
  );
}
