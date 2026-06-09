import type { Metadata } from "next";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";

const tool = getToolById("bg-remover")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function BackgroundRemoverPage() {
  return (
    <ToolShell tool={tool}>
      <BackgroundRemover />
    </ToolShell>
  );
}
