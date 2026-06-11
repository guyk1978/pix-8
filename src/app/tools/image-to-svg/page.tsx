import type { Metadata } from "next";
import { ImageToSvgConverter } from "@/components/tools/ImageToSvgConverter";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("image-to-svg")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ImageToSvgPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <ImageToSvgConverter />
    </ToolShell>
  );
}
