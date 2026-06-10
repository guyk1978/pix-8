import type { Metadata } from "next";
import { GrainGenerator } from "@/components/tools/GrainGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("grain-generator")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function GrainGeneratorPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <GrainGenerator />
    </ToolShell>
  );
}
