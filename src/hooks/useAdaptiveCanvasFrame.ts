"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeAdaptiveFrameLayout } from "@/lib/editor/adaptiveCanvasFrame";

function readWorkspaceSize(element: HTMLElement | null) {
  if (!element) {
    return { width: 0, height: 0 };
  }

  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

export function useAdaptiveCanvasFrame(imageWidth: number, imageHeight: number) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [workspaceSize, setWorkspaceSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const syncSize = () => {
      setWorkspaceSize(readWorkspaceSize(workspace));
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(workspace);
    return () => observer.disconnect();
  }, []);

  const frame = useMemo(() => {
    const measured = readWorkspaceSize(workspaceRef.current);
    const workspaceWidth = workspaceSize.width || measured.width;
    const workspaceHeight = workspaceSize.height || measured.height;

    return computeAdaptiveFrameLayout(
      imageWidth,
      imageHeight,
      workspaceWidth,
      workspaceHeight,
    );
  }, [imageWidth, imageHeight, workspaceSize.width, workspaceSize.height]);

  const hasFrame =
    imageWidth > 0 &&
    imageHeight > 0 &&
    frame.frameWidth > 0 &&
    frame.frameHeight > 0;

  return {
    workspaceRef,
    frame,
    hasFrame,
  };
}
