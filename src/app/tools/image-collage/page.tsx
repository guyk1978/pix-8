import type { Metadata } from "next";
import { ImageCollageMaker } from "@/components/tools/ImageCollageMaker";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("image-collage")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ImageCollagePage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <ImageCollageMaker />
    </ToolShell>
  );
}
