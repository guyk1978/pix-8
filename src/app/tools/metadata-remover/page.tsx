import type { Metadata } from "next";
import { MetadataRemover } from "@/components/tools/MetadataRemover";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("metadata-remover")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function MetadataRemoverPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <MetadataRemover />
    </ToolShell>
  );
}
