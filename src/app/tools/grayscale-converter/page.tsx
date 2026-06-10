import type { Metadata } from "next";
import { GrayscaleConverter } from "@/components/tools/GrayscaleConverter";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("grayscale-converter")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function GrayscaleConverterPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <GrayscaleConverter />
    </ToolShell>
  );
}
