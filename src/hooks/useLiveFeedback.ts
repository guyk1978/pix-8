"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@/hooks/useEditorState";
import type { EditorLayer } from "@/lib/editor/layerTypes";

export type LiveFeedbackPhase = "idle" | "processing" | "success" | "failed" | "correction";

export interface LayerLiveFeedback {
  layerId: string;
  phase: LiveFeedbackPhase;
  /** 0–100 for determinate bars; null uses indeterminate animation while processing. */
  progress: number | null;
  isAiLayer: boolean;
}

export interface LiveFeedbackState {
  layerFeedback: Map<string, LayerLiveFeedback>;
  activeLayerFeedback: LayerLiveFeedback | null;
  isScanningGridVisible: boolean;
  isCanvasUpdating: boolean;
  canvasOpacity: number;
  isCorrectionActive: boolean;
  isParamsLocked: boolean;
  processingLayerIds: string[];
  pulseActive: boolean;
}

const AI_LAYER_TYPES = new Set<EditorLayer["type"]>(["bg-remove", "export-svg"]);

function isAiLayer(layer: EditorLayer): boolean {
  return AI_LAYER_TYPES.has(layer.type);
}

function resolveLayerPhase(
  layer: EditorLayer,
  options: {
    isComposing: boolean;
    hasComposeError: boolean;
    isCorrectionTarget: boolean;
    isActiveLayer: boolean;
  },
): LiveFeedbackPhase {
  if (options.isCorrectionTarget) {
    return "correction";
  }

  if (layer.type === "bg-remove") {
    if (layer.processing) return "processing";
    if (options.hasComposeError && options.isActiveLayer) return "failed";
    if (layer.enabled && layer.resultImage) return "success";
    if (layer.enabled && options.isComposing) return "processing";
    return "idle";
  }

  if (layer.type === "export-svg") {
    if (layer.processing) return "processing";
    if (options.hasComposeError && options.isActiveLayer) return "failed";
    if (layer.svgOutput) return "success";
    return layer.visible ? "idle" : "idle";
  }

  return "idle";
}

function useSimulatedProgress(active: boolean): number | null {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      startedAtRef.current = 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      return;
    }

    startedAtRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAtRef.current;
      const next = Math.min(92, 12 + elapsed / 35);
      setProgress(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [active]);

  return active ? progress : null;
}

export function useLiveFeedback(): LiveFeedbackState {
  const {
    layers,
    activeLayerId,
    isComposing,
    composeError,
    isClickSegmentationLoading,
    maskClickMode,
    maskBrushTool,
  } = useEditor();

  const hasComposeError = Boolean(composeError);
  const isCorrectionActive = Boolean(maskClickMode || maskBrushTool);

  const processingLayerIds = useMemo(() => {
    const ids: string[] = [];
    for (const layer of layers) {
      if (
        (layer.type === "bg-remove" || layer.type === "export-svg") &&
        layer.processing
      ) {
        ids.push(layer.id);
      }
    }
    return ids;
  }, [layers]);

  const anyAiProcessing =
    processingLayerIds.length > 0 || isComposing || isClickSegmentationLoading;

  const simulatedProgress = useSimulatedProgress(anyAiProcessing);

  const layerFeedback = useMemo(() => {
    const map = new Map<string, LayerLiveFeedback>();

    for (const layer of layers) {
      if (layer.type === "source") continue;

      const ai = isAiLayer(layer);
      const isCorrectionTarget =
        layer.id === activeLayerId &&
        layer.type === "bg-remove" &&
        isCorrectionActive;

      const phase = resolveLayerPhase(layer, {
        isComposing,
        hasComposeError,
        isCorrectionTarget,
        isActiveLayer: layer.id === activeLayerId,
      });

      const progress =
        phase === "processing"
          ? simulatedProgress
          : phase === "success"
            ? 100
            : null;

      map.set(layer.id, {
        layerId: layer.id,
        phase,
        progress,
        isAiLayer: ai,
      });
    }

    return map;
  }, [
    activeLayerId,
    hasComposeError,
    isComposing,
    isCorrectionActive,
    layers,
    simulatedProgress,
  ]);

  const activeLayerFeedback = activeLayerId
    ? (layerFeedback.get(activeLayerId) ?? null)
    : null;

  const isParamsLocked = Boolean(
    activeLayerFeedback &&
      (activeLayerFeedback.phase === "processing" ||
        isComposing ||
        isClickSegmentationLoading),
  );

  return {
    layerFeedback,
    activeLayerFeedback,
    isScanningGridVisible: anyAiProcessing,
    isCanvasUpdating: isComposing || isClickSegmentationLoading,
    canvasOpacity: isComposing || isClickSegmentationLoading ? 0.8 : 1,
    isCorrectionActive,
    isParamsLocked,
    processingLayerIds,
    pulseActive: isClickSegmentationLoading,
  };
}
