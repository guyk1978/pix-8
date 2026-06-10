import type { Metadata } from "next";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("color-picker")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ColorPickerPage() {
  const relatedArticles = getArticlesByToolId(tool.id);

  return (
    <ToolShell tool={tool} relatedArticles={relatedArticles}>
      <ColorPicker />
    </ToolShell>
  );
}
