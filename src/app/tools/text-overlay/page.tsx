import type { Metadata } from "next";
import { TextOverlay } from "@/components/tools/TextOverlay";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("text-overlay")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function TextOverlayPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <TextOverlay />
    </ToolShell>
  );
}
