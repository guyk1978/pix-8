"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getToolWorkflowSteps,
  resolveActiveWorkflowStep,
  type WorkflowAnchorId,
  type WorkflowState,
  type WorkflowStepId,
} from "@/lib/toolWorkflows";
import type { ToolId } from "@/lib/tools";

export interface AnchorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function rectsEqual(a: AnchorRect, b: AnchorRect) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height
  );
}

interface WorkflowContextValue {
  toolId: ToolId;
  state: WorkflowState;
  setState: (state: WorkflowState) => void;
  activeStep: WorkflowStepId;
  steps: ReturnType<typeof getToolWorkflowSteps>;
  registerAnchor: (step: WorkflowAnchorId, rect: AnchorRect | null) => void;
  getAnchors: () => Partial<Record<WorkflowAnchorId, AnchorRect>>;
  layoutTick: number;
  containerRect: AnchorRect | null;
  setContainerRect: (rect: AnchorRect | null) => void;
}

const defaultState: WorkflowState = {
  hasSource: false,
  hasConfigured: true,
  isProcessing: false,
  isReady: false,
};

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export function WorkflowProvider({
  toolId,
  children,
}: {
  toolId: ToolId;
  children: ReactNode;
}) {
  const [state, setStateInternal] = useState<WorkflowState>(defaultState);

  const setState = useCallback((next: WorkflowState) => {
    setStateInternal((prev) => {
      if (
        prev.hasSource === next.hasSource &&
        prev.hasConfigured === next.hasConfigured &&
        prev.isProcessing === next.isProcessing &&
        prev.isReady === next.isReady
      ) {
        return prev;
      }
      return next;
    });
  }, []);
  const [layoutTick, setLayoutTick] = useState(0);
  const [containerRect, setContainerRectState] = useState<AnchorRect | null>(
    null,
  );
  const anchorsRef = useRef<Partial<Record<WorkflowAnchorId, AnchorRect>>>({});
  const containerRectRef = useRef<AnchorRect | null>(null);

  const steps = useMemo(() => getToolWorkflowSteps(toolId), [toolId]);
  const activeStep = useMemo(
    () => resolveActiveWorkflowStep(toolId, state),
    [toolId, state],
  );

  const bumpLayout = useCallback(() => {
    setLayoutTick((tick) => tick + 1);
  }, []);

  const registerAnchor = useCallback(
    (step: WorkflowAnchorId, rect: AnchorRect | null) => {
      if (!rect) {
        if (!(step in anchorsRef.current)) return;
        delete anchorsRef.current[step];
        bumpLayout();
        return;
      }

      const existing = anchorsRef.current[step];
      if (existing && rectsEqual(existing, rect)) return;

      anchorsRef.current[step] = rect;
      bumpLayout();
    },
    [bumpLayout],
  );

  const getAnchors = useCallback(
    () => anchorsRef.current,
    [],
  );

  const setContainerRect = useCallback(
    (rect: AnchorRect | null) => {
      if (!rect && !containerRectRef.current) return;
      if (rect && containerRectRef.current && rectsEqual(rect, containerRectRef.current)) {
        return;
      }
      containerRectRef.current = rect;
      setContainerRectState(rect);
    },
    [bumpLayout],
  );

  const value = useMemo(
    () => ({
      toolId,
      state,
      setState,
      activeStep,
      steps,
      registerAnchor,
      getAnchors,
      layoutTick,
      containerRect,
      setContainerRect,
    }),
    [
      toolId,
      state,
      activeStep,
      steps,
      registerAnchor,
      getAnchors,
      layoutTick,
      containerRect,
      setContainerRect,
    ],
  );

  return (
    <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within WorkflowProvider");
  }
  return context;
}

export function useWorkflowOptional() {
  return useContext(WorkflowContext);
}
