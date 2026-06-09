import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { Compressor } from "@/components/tools/Compressor";
import { Converter } from "@/components/tools/Converter";
import { Cropper } from "@/components/tools/Cropper";
import { PaletteExtractor } from "@/components/tools/PaletteExtractor";
import { Resizer } from "@/components/tools/Resizer";
import { RotateFlip } from "@/components/tools/RotateFlip";
import { Watermark } from "@/components/tools/Watermark";
import { ToolShell } from "@/components/tools/ToolShell";
import { getToolById, tools, type ToolId } from "@/lib/tools";
import type { ComponentType } from "react";

const TOOL_COMPONENTS: Partial<Record<ToolId, ComponentType>> = {
  resizer: Resizer,
  converter: Converter,
  compressor: Compressor,
  cropper: Cropper,
  "rotate-flip": RotateFlip,
  watermark: Watermark,
  "bg-remover": BackgroundRemover,
  "palette-extractor": PaletteExtractor,
};

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ toolId: tool.id }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolById(toolId as ToolId);

  if (!tool) {
    return { title: "Tool not found" };
  }

  return { title: tool.name };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId as ToolId);

  if (!tool) {
    notFound();
  }

  const ToolComponent = TOOL_COMPONENTS[tool.id];

  return (
    <ToolShell tool={tool}>
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
          <span className="font-label text-muted">Status</span>
          <p className="font-mono text-sm text-muted">
            Tool workspace — implementation pending
          </p>
        </div>
      )}
    </ToolShell>
  );
}
