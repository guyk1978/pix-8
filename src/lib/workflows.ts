import type { WorkflowLink } from "@/components/WorkflowSuggestions";
import { getToolById, type ToolId } from "@/lib/tools";

const WORKFLOW_MAP: Record<ToolId, ToolId[]> = {
  resizer: ["compressor", "converter", "metadata-remover"],
  converter: ["compressor", "resizer", "base64-encoder"],
  compressor: ["metadata-remover", "converter", "favicon-generator"],
  cropper: ["resizer", "compressor", "border-generator"],
  "rotate-flip": ["cropper", "resizer", "lens-corrector"],
  watermark: ["compressor", "metadata-remover", "border-generator"],
  "bg-remover": ["resizer", "compressor", "border-generator"],
  "palette-extractor": ["css-palette-gen", "color-picker", "base64-encoder"],
  "metadata-remover": ["compressor", "resizer", "watermark"],
  "color-picker": ["css-palette-gen", "palette-extractor", "text-overlay"],
  "text-overlay": ["border-generator", "watermark", "compressor"],
  "border-generator": ["compressor", "grain-generator", "watermark"],
  "grayscale-converter": ["grain-generator", "sharpener", "compressor"],
  "favicon-generator": ["base64-encoder", "compressor", "metadata-remover"],
  sharpener: ["compressor", "light-adjuster", "cropper"],
  "light-adjuster": ["sharpener", "compressor", "cropper"],
  "image-inverter": ["grayscale-converter", "border-generator", "text-overlay"],
  denoiser: ["sharpener", "light-adjuster", "compressor"],
  "css-palette-gen": ["base64-encoder", "color-picker", "favicon-generator"],
  "lens-corrector": ["cropper", "resizer", "sharpener"],
  "grain-generator": ["grayscale-converter", "compressor", "border-generator"],
  "base64-encoder": ["favicon-generator", "css-palette-gen", "compressor"],
};

export function getWorkflowSuggestions(toolId: ToolId): WorkflowLink[] {
  return (WORKFLOW_MAP[toolId] ?? [])
    .map((id) => getToolById(id))
    .filter((tool): tool is NonNullable<ReturnType<typeof getToolById>> => !!tool)
    .map((tool) => ({ name: tool.name, href: tool.href }));
}
