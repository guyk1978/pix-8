import type { Metadata } from "next";
import { LightAdjuster } from "@/components/tools/LightAdjuster";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("light-adjuster")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function LightAdjusterPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <LightAdjuster />
    </ToolShell>
  );
}
