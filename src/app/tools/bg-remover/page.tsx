import type { Metadata } from "next";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("bg-remover")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function BackgroundRemoverPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <BackgroundRemover />
    </ToolShell>
  );
}
