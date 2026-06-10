import type { Metadata } from "next";
import { LightAdjuster } from "@/components/tools/LightAdjuster";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("light-adjuster")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function LightAdjusterPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <LightAdjuster />
    </ToolShell>
  );
}
