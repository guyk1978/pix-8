"use client";

import { useEffect, useState } from "react";
import { SliderControl } from "@/components/ui/SliderControl";
import { SkeletonOverlay } from "@/components/ui/animations";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import type { BgRemoveLayer } from "@/lib/editor/layerTypes";

interface BgRemoveRefinementSlidersProps {
  layer: BgRemoveLayer;
  locked: boolean;
  onPatch: (
    values: Pick<BgRemoveLayer, "advancedEdges" | "subjectMasking" | "depthEstimation">,
  ) => void;
  labels: {
    refineEdge: string;
    smartMaskingStrength: string;
    decontaminateColor: string;
  };
}

export function BgRemoveRefinementSliders({
  layer,
  locked,
  onPatch,
  labels,
}: BgRemoveRefinementSlidersProps) {
  const [advancedEdges, setAdvancedEdges] = useState(layer.advancedEdges);
  const [subjectMasking, setSubjectMasking] = useState(layer.subjectMasking);
  const [depthEstimation, setDepthEstimation] = useState(layer.depthEstimation);

  useEffect(() => {
    setAdvancedEdges(layer.advancedEdges);
    setSubjectMasking(layer.subjectMasking);
    setDepthEstimation(layer.depthEstimation);
  }, [layer.id, layer.advancedEdges, layer.subjectMasking, layer.depthEstimation]);

  useDebouncedEffect(
    () => {
      if (
        advancedEdges === layer.advancedEdges &&
        subjectMasking === layer.subjectMasking &&
        depthEstimation === layer.depthEstimation
      ) {
        return;
      }
      onPatch({ advancedEdges, subjectMasking, depthEstimation });
    },
    [advancedEdges, subjectMasking, depthEstimation, layer.id, layer.advancedEdges, layer.subjectMasking, layer.depthEstimation],
    150,
  );

  return (
    <SkeletonOverlay active={locked}>
      <div className={`live-feedback-params-block ${locked ? "is-readonly" : ""}`}>
        <SliderControl
          label={labels.refineEdge}
          value={advancedEdges}
          min={0}
          max={100}
          step={1}
          suffix="%"
          disabled={locked}
          onChange={setAdvancedEdges}
        />
        <SliderControl
          label={labels.smartMaskingStrength}
          value={subjectMasking}
          min={0}
          max={100}
          step={1}
          suffix="%"
          disabled={locked}
          onChange={setSubjectMasking}
        />
        <SliderControl
          label={labels.decontaminateColor}
          value={depthEstimation}
          min={0}
          max={100}
          step={1}
          suffix="%"
          disabled={locked}
          onChange={setDepthEstimation}
        />
      </div>
    </SkeletonOverlay>
  );
}
