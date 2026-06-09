import type { Metadata } from "next";
import { Cropper } from "@/components/tools/Cropper";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById } from "@/lib/tools";

const tool = getToolById("cropper")!;

export const metadata: Metadata = {
  title: tool.name,
};

export default function CropperPage() {
  return (
    <ToolShell tool={tool}>
      <Cropper />
    </ToolShell>
  );
}
