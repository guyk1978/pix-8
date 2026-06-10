import type { Metadata } from "next";
import { TextOverlay } from "@/components/tools/TextOverlay";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("text-overlay")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function TextOverlayPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <TextOverlay />
    </ToolShell>
  );
}
