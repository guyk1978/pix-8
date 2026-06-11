import type { AnchorRect } from "@/components/tools/workflow/WorkflowContext";
import type { ToolId } from "@/lib/tools";
import type { WorkflowAnchorId, WorkflowStepId } from "@/lib/toolWorkflows";

export type WorkflowPoint = { x: number; y: number };

export interface WorkflowPathSegment {
  id: string;
  d: string;
  active: boolean;
  loop?: boolean;
}

const RESIZER_RING_ORDER: WorkflowAnchorId[] = [
  "start",
  "upload",
  "fieldHeight",
  "fieldWidth",
  "startBrush",
];

function cubicPath(
  from: WorkflowPoint,
  c1: WorkflowPoint,
  c2: WorkflowPoint,
  to: WorkflowPoint,
): string {
  return `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}

function centroid(points: WorkflowPoint[]): WorkflowPoint {
  if (points.length === 0) return { x: 0, y: 0 };
  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 },
  );
  return { x: sum.x / points.length, y: sum.y / points.length };
}

function anchorCenter(rect: AnchorRect): WorkflowPoint {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

/** Push connection point outward so the ring travels behind panels, not over them */
function outerRingPoint(
  rect: AnchorRect,
  hub: WorkflowPoint,
  margin = 56,
): WorkflowPoint {
  const center = anchorCenter(rect);
  const angle = Math.atan2(center.y - hub.y, center.x - hub.x);
  const radius =
    Math.hypot(rect.width, rect.height) / 2 + margin;
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
  };
}

function segmentActive(
  activeStep: WorkflowStepId,
  fromId: WorkflowAnchorId,
  toId: WorkflowAnchorId,
): boolean {
  const stepForAnchor = (id: WorkflowAnchorId): WorkflowStepId => {
    if (id === "fieldHeight" || id === "fieldWidth") return "configure";
    if (id === "startBrush") return "start";
    return id as WorkflowStepId;
  };

  const fromStep = stepForAnchor(fromId);
  const toStep = stepForAnchor(toId);
  return activeStep === fromStep || activeStep === toStep;
}

function buildCircularRing(
  order: WorkflowAnchorId[],
  anchors: Partial<Record<WorkflowAnchorId, AnchorRect>>,
  activeStep: WorkflowStepId,
  margin: number,
): WorkflowPathSegment[] {
  const nodes = order
    .map((id) => ({ id, rect: anchors[id] }))
    .filter((node): node is { id: WorkflowAnchorId; rect: AnchorRect } =>
      Boolean(node.rect),
    );

  if (nodes.length < 3) return [];

  const hubs = nodes.map((node) => anchorCenter(node.rect));
  const hub = centroid(hubs);
  const ring = nodes.map((node) => outerRingPoint(node.rect, hub, margin));

  const paths: WorkflowPathSegment[] = [];

  for (let i = 0; i < ring.length; i++) {
    const from = ring[i];
    const to = ring[(i + 1) % ring.length];
    const fromId = nodes[i].id;
    const toId = nodes[(i + 1) % nodes.length].id;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const c1 = {
      x: from.x + dx * 0.28 + (from.x - hub.x) * 0.18,
      y: from.y + dy * 0.28 + (from.y - hub.y) * 0.18,
    };
    const c2 = {
      x: from.x + dx * 0.72 + (to.x - hub.x) * 0.18,
      y: from.y + dy * 0.72 + (to.y - hub.y) * 0.18,
    };

    paths.push({
      id: `${fromId}-${toId}`,
      d: cubicPath(from, c1, c2, to),
      active: segmentActive(activeStep, fromId, toId),
      loop: i === ring.length - 1,
    });
  }

  return paths;
}

function buildGenericPaths(
  stepOrder: WorkflowStepId[],
  anchors: Partial<Record<WorkflowAnchorId, AnchorRect>>,
  activeStep: WorkflowStepId,
): WorkflowPathSegment[] {
  return buildCircularRing(stepOrder, anchors, activeStep, 48);
}

export function buildWorkflowPaths(
  toolId: ToolId,
  stepOrder: WorkflowStepId[],
  anchors: Partial<Record<WorkflowAnchorId, AnchorRect>>,
  activeStep: WorkflowStepId,
  _isRtl: boolean,
): WorkflowPathSegment[] {
  if (toolId === "resizer") {
    return buildCircularRing(RESIZER_RING_ORDER, anchors, activeStep, 80);
  }

  return buildGenericPaths(stepOrder, anchors, activeStep);
}
