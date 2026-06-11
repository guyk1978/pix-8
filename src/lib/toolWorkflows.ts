import type { CharacterKey } from "@/lib/characters";
import type { ToolId } from "@/lib/tools";

export type WorkflowStepId =
  | "start"
  | "upload"
  | "configure"
  | "process"
  | "download";

/** Extra anchor points for guide lines (e.g. dual title mascots, split fields) */
export type WorkflowExtraAnchorId = "startBrush" | "fieldWidth" | "fieldHeight";

export type WorkflowAnchorId = WorkflowStepId | WorkflowExtraAnchorId;

export interface WorkflowState {
  hasSource: boolean;
  hasConfigured?: boolean;
  isProcessing: boolean;
  isReady: boolean;
}

export interface WorkflowStepMeta {
  id: WorkflowStepId;
  character: CharacterKey;
  labelKey: string;
  hintKey: string;
  order: number;
}

const STEP_META: Record<WorkflowStepId, Omit<WorkflowStepMeta, "id" | "order">> = {
  start: {
    character: "base",
    labelKey: "workflow.steps.start.label",
    hintKey: "workflow.steps.start.hint",
  },
  upload: {
    character: "uploadSmile",
    labelKey: "workflow.steps.upload.label",
    hintKey: "workflow.steps.upload.hint",
  },
  configure: {
    character: "processingAlt",
    labelKey: "workflow.steps.configure.label",
    hintKey: "workflow.steps.configure.hint",
  },
  process: {
    character: "processing",
    labelKey: "workflow.steps.process.label",
    hintKey: "workflow.steps.process.hint",
  },
  download: {
    character: "download",
    labelKey: "workflow.steps.download.label",
    hintKey: "workflow.steps.download.hint",
  },
};

const TOOL_START_CHARACTERS: Partial<Record<ToolId, CharacterKey>> = {
  resizer: "resizer",
};

const TOOL_UPLOAD_CHARACTERS: Partial<Record<ToolId, CharacterKey>> = {
  resizer: "uploadSmile",
};

const TOOL_CONFIGURE_CHARACTERS: Partial<Record<ToolId, CharacterKey>> = {
  resizer: "robot",
};

/** Tools with a dedicated settings step between upload and output */
const TOOLS_WITH_CONFIGURE: Set<ToolId> = new Set([
  "resizer",
  "converter",
  "compressor",
  "cropper",
  "rotate-flip",
  "watermark",
  "text-overlay",
  "border-generator",
  "light-adjuster",
  "sharpener",
  "denoiser",
  "grain-generator",
  "grayscale-converter",
  "image-inverter",
  "lens-corrector",
  "color-picker",
  "palette-extractor",
  "css-palette-gen",
  "favicon-generator",
  "bg-remover",
]);

function buildSteps(toolId: ToolId): WorkflowStepId[] {
  const steps: WorkflowStepId[] = ["start", "upload"];
  if (TOOLS_WITH_CONFIGURE.has(toolId)) {
    steps.push("configure");
  }
  steps.push("process", "download");
  return steps;
}

export function getToolWorkflowSteps(toolId: ToolId): WorkflowStepMeta[] {
  return buildSteps(toolId).map((id, index) => ({
    id,
    order: index + 1,
    ...STEP_META[id],
    character:
      (id === "start" && TOOL_START_CHARACTERS[toolId]) ||
      (id === "upload" && TOOL_UPLOAD_CHARACTERS[toolId]) ||
      (id === "configure" && TOOL_CONFIGURE_CHARACTERS[toolId]) ||
      STEP_META[id].character,
  }));
}

export function resolveActiveWorkflowStep(
  toolId: ToolId,
  state: WorkflowState,
): WorkflowStepId {
  const steps = buildSteps(toolId);

  if (!state.hasSource && steps.includes("upload")) {
    return "upload";
  }

  if (
    steps.includes("configure") &&
    state.hasConfigured === false
  ) {
    return "configure";
  }

  if (state.isProcessing && steps.includes("process")) {
    return "process";
  }

  if (state.isReady && steps.includes("download")) {
    return "download";
  }

  if (state.hasSource && steps.includes("process")) {
    return "process";
  }

  return steps[0] ?? "upload";
}
