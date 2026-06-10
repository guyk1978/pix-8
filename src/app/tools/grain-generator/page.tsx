import type { Metadata } from "next";
import { GrainGenerator } from "@/components/tools/GrainGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("grain-generator")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function GrainGeneratorPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <GrainGenerator />
    </ToolShell>
  );
}
