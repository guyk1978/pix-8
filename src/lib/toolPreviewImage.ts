import { EXAMPLE_IMAGES } from "@/lib/exampleImages";
import { tools, type ToolId } from "@/lib/tools";

const TOOL_PREVIEW_INDEX = new Map<ToolId, number>(
  tools.map((tool, index) => [tool.id, index]),
);

/** Deterministic preview image from `public/examples/` for each tool. */
export function getToolPreviewImageSrc(toolId: ToolId): string {
  const index = TOOL_PREVIEW_INDEX.get(toolId) ?? 0;
  return EXAMPLE_IMAGES[index % EXAMPLE_IMAGES.length].src;
}
