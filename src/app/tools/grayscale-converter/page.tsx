import type { Metadata } from "next";
import { GrayscaleConverter } from "@/components/tools/GrayscaleConverter";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("grayscale-converter")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function GrayscaleConverterPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <GrayscaleConverter />
    </ToolShell>
  );
}
