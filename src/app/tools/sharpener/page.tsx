import type { Metadata } from "next";
import { Sharpener } from "@/components/tools/Sharpener";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("sharpener")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function SharpenerPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <Sharpener />
    </ToolShell>
  );
}
