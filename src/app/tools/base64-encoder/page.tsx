import type { Metadata } from "next";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("base64-encoder")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function Base64EncoderPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <Base64Encoder />
    </ToolShell>
  );
}
