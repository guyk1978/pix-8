import type { Metadata } from "next";
import { LensCorrector } from "@/components/tools/LensCorrector";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("lens-corrector")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function LensCorrectorPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <LensCorrector />
    </ToolShell>
  );
}
