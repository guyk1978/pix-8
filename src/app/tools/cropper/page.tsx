import type { Metadata } from "next";
import { Cropper } from "@/components/tools/Cropper";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("cropper")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function CropperPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <Cropper />
    </ToolShell>
  );
}
