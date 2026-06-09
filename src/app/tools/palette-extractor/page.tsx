import type { Metadata } from "next";
import { PaletteExtractor } from "@/components/tools/PaletteExtractor";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";

const tool = getToolById("palette-extractor")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function PaletteExtractorPage() {
  return (
    <ToolShell tool={tool}>
      <PaletteExtractor />
    </ToolShell>
  );
}
