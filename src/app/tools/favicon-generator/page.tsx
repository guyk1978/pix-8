import type { Metadata } from "next";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("favicon-generator")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function FaviconGeneratorPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <FaviconGenerator />
    </ToolShell>
  );
}
