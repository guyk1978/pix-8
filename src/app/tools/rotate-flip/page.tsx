import type { Metadata } from "next";
import { RotateFlip } from "@/components/tools/RotateFlip";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("rotate-flip")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function RotateFlipPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <RotateFlip />
    </ToolShell>
  );
}
