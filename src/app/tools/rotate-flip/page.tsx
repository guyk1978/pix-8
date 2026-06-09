import type { Metadata } from "next";
import { RotateFlip } from "@/components/tools/RotateFlip";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";

const tool = getToolById("rotate-flip")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function RotateFlipPage() {
  return (
    <ToolShell tool={tool}>
      <RotateFlip />
    </ToolShell>
  );
}
