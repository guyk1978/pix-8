import type { Metadata } from "next";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("base64-encoder")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function Base64EncoderPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <Base64Encoder />
    </ToolShell>
  );
}
