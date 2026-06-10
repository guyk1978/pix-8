import type { Metadata } from "next";
import { BorderGenerator } from "@/components/tools/BorderGenerator";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("border-generator")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function BorderGeneratorPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <BorderGenerator />
    </ToolShell>
  );
}
