import type { Metadata } from "next";
import { Denoiser } from "@/components/tools/Denoiser";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("denoiser")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function DenoiserPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <Denoiser />
    </ToolShell>
  );
}
