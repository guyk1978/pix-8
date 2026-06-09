import type { Metadata } from "next";
import { Watermark } from "@/components/tools/Watermark";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";

const tool = getToolById("watermark")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function WatermarkPage() {
  return (
    <ToolShell tool={tool}>
      <Watermark />
    </ToolShell>
  );
}
