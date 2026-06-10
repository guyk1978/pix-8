import type { Metadata } from "next";
import { Denoiser } from "@/components/tools/Denoiser";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("denoiser")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function DenoiserPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <Denoiser />
    </ToolShell>
  );
}
