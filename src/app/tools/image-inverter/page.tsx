import type { Metadata } from "next";
import { ImageInverter } from "@/components/tools/ImageInverter";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("image-inverter")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ImageInverterPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <ImageInverter />
    </ToolShell>
  );
}
