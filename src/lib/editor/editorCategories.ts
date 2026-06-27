import type { EditorCategoryId, EditorToolAction } from "@/lib/editor/layerTypes";
import type { ToolId } from "@/lib/tools";

export interface EditorCategory {
  id: EditorCategoryId;
  labelKey: string;
  tools: EditorCategoryTool[];
}

export interface EditorCategoryTool {
  action: EditorToolAction;
  labelKey: string;
}

const tool = (id: ToolId): EditorCategoryTool => ({
  action: id,
  labelKey: `tools.${id}.name`,
});

export const EDITOR_CATEGORIES: EditorCategory[] = [
  {
    id: "ai-assist",
    labelKey: "editor.nav.aiAssist",
    tools: [
      tool("bg-remover"),
      tool("sharpener"),
      tool("denoiser"),
      tool("image-to-svg"),
    ],
  },
  {
    id: "optimization",
    labelKey: "editor.nav.optimization",
    tools: [
      tool("compressor"),
      tool("converter"),
      tool("grayscale-converter"),
      tool("favicon-generator"),
      tool("base64-encoder"),
    ],
  },
  {
    id: "metadata",
    labelKey: "editor.nav.metadata",
    tools: [
      tool("metadata-remover"),
      tool("palette-extractor"),
      tool("color-picker"),
      tool("css-palette-gen"),
    ],
  },
  {
    id: "design",
    labelKey: "editor.nav.design",
    tools: [
      tool("cropper"),
      tool("rotate-flip"),
      tool("resizer"),
      tool("text-overlay"),
      tool("watermark"),
      tool("image-filters"),
      tool("border-generator"),
      tool("light-adjuster"),
      tool("image-inverter"),
      tool("lens-corrector"),
      tool("grain-generator"),
      tool("image-overlay"),
      tool("meme-generator"),
      tool("custom-cutter"),
      tool("image-collage"),
      tool("magnifier"),
      tool("image-annotator"),
    ],
  },
];

export const BOTTOM_BAR_ACTIONS = [
  "cropper",
  "rotate-flip",
  "resizer",
  "text-overlay",
  "watermark",
] as const satisfies readonly EditorToolAction[];

export type BottomBarAction = (typeof BOTTOM_BAR_ACTIONS)[number];
