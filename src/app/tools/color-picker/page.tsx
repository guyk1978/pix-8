import type { Metadata } from "next";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { ToolShell } from "@/components/tools/ToolShell";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

const tool = getToolById("color-picker")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function ColorPickerPage() {
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <ToolShell
      tool={tool}
      relatedArticlesEn={relatedArticlesEn}
      relatedArticlesHe={relatedArticlesHe}
    >
      <ColorPicker />
    </ToolShell>
  );
}
