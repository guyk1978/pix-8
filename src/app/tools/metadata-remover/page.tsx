import type { Metadata } from "next";
import { MetadataRemover } from "@/components/tools/MetadataRemover";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("metadata-remover")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function MetadataRemoverPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <MetadataRemover />
    </ToolShell>
  );
}
