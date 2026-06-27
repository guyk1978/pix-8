"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@/hooks/useEditorState";
import {
  clampPanTranslate,
  computeFixedViewportLayout,
  getCenteredTranslate,
  panTranslate,
  type CanvasViewportMetrics,
} from "@/lib/editor/canvasViewport";

const ZOOM_STEP = 0.25;
const MIN_CANVAS_ZOOM = 0.5;
const MAX_CANVAS_ZOOM = 4;

export function useEditorCanvasViewport(
  imageWidth: number,
  imageHeight: number,
  contentWidth = 0,
  contentHeight = 0,
) {
  const { canvasZoom, magnifierZoom, setCanvasZoom } = useEditor();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const isPanningRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const prevZoomRef = useRef(canvasZoom * magnifierZoom);

  const combinedZoom = canvasZoom * magnifierZoom;

  const effectiveViewportWidth = viewportSize.width || contentWidth;
  const effectiveViewportHeight = viewportSize.height || contentHeight;

  const metrics = useMemo<CanvasViewportMetrics>(
    () => ({
      viewportWidth: effectiveViewportWidth,
      viewportHeight: effectiveViewportHeight,
      imageWidth,
      imageHeight,
      zoom: combinedZoom,
    }),
    [
      effectiveViewportWidth,
      effectiveViewportHeight,
      imageWidth,
      imageHeight,
      combinedZoom,
    ],
  );

  const layout = useMemo(
    () => computeFixedViewportLayout(metrics),
    [metrics],
  );

  const canPan = combinedZoom > 1 && layout.canPan;

  const applyTranslate = useCallback(
    (translateX: number, translateY: number) => {
      if (effectiveViewportWidth <= 0 || effectiveViewportHeight <= 0) {
        setTranslate({ x: translateX, y: translateY });
        return { translateX, translateY };
      }

      const clamped = clampPanTranslate(
        translateX,
        translateY,
        effectiveViewportWidth,
        effectiveViewportHeight,
        layout.scaledWidth,
        layout.scaledHeight,
      );
      setTranslate({ x: clamped.translateX, y: clamped.translateY });
      return clamped;
    },
    [
      effectiveViewportHeight,
      effectiveViewportWidth,
      layout.scaledHeight,
      layout.scaledWidth,
    ],
  );

  const centerImage = useCallback(() => {
    if (effectiveViewportWidth <= 0 || effectiveViewportHeight <= 0) return;
    const centered = getCenteredTranslate(
      effectiveViewportWidth,
      effectiveViewportHeight,
      layout.scaledWidth,
      layout.scaledHeight,
    );
    applyTranslate(centered.translateX, centered.translateY);
  }, [
    applyTranslate,
    effectiveViewportHeight,
    effectiveViewportWidth,
    layout.scaledHeight,
    layout.scaledWidth,
  ]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncSize = () => {
      setViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight,
      });
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [contentWidth, contentHeight]);

  useEffect(() => {
    if (imageWidth <= 0 || imageHeight <= 0) return;
    centerImage();
    prevZoomRef.current = combinedZoom;
  }, [imageWidth, imageHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (effectiveViewportWidth <= 0 || effectiveViewportHeight <= 0) return;
    if (prevZoomRef.current === combinedZoom) return;
    centerImage();
    prevZoomRef.current = combinedZoom;
  }, [
    combinedZoom,
    centerImage,
    effectiveViewportWidth,
    effectiveViewportHeight,
  ]);

  useEffect(() => {
    if (effectiveViewportWidth <= 0 || effectiveViewportHeight <= 0) return;
    setTranslate((current) => {
      const clamped = clampPanTranslate(
        current.x,
        current.y,
        effectiveViewportWidth,
        effectiveViewportHeight,
        layout.scaledWidth,
        layout.scaledHeight,
      );
      if (
        clamped.translateX === current.x &&
        clamped.translateY === current.y
      ) {
        return current;
      }
      return { x: clamped.translateX, y: clamped.translateY };
    });
  }, [
    layout.scaledWidth,
    layout.scaledHeight,
    effectiveViewportWidth,
    effectiveViewportHeight,
  ]);

  const setZoomAtPoint = useCallback(
    (nextCanvasZoom: number) => {
      const clampedZoom = Math.min(
        MAX_CANVAS_ZOOM,
        Math.max(MIN_CANVAS_ZOOM, Math.round(nextCanvasZoom * 100) / 100),
      );
      if (clampedZoom === canvasZoom) return;
      setCanvasZoom(clampedZoom);
    },
    [canvasZoom, setCanvasZoom],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();

      const direction = event.deltaY < 0 ? 1 : -1;
      const nextCanvasZoom =
        direction > 0
          ? Math.min(MAX_CANVAS_ZOOM, canvasZoom + ZOOM_STEP)
          : Math.max(MIN_CANVAS_ZOOM, canvasZoom - ZOOM_STEP);

      setZoomAtPoint(nextCanvasZoom);
    },
    [canvasZoom, setZoomAtPoint],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleNativeWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
    };

    viewport.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleNativeWheel);
  }, []);

  const handlePanPointerDown = useCallback(
    (event: React.PointerEvent<Element>) => {
      if (!canPan || event.button !== 0) return;

      isPanningRef.current = true;
      setIsPanning(true);
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [canPan],
  );

  const handlePanPointerMove = useCallback(
    (event: React.PointerEvent<Element>) => {
      if (!isPanningRef.current) return;

      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      const next = panTranslate(
        translate.x,
        translate.y,
        deltaX,
        deltaY,
        effectiveViewportWidth,
        effectiveViewportHeight,
        layout.scaledWidth,
        layout.scaledHeight,
      );
      setTranslate({ x: next.translateX, y: next.translateY });
    },
    [
      effectiveViewportHeight,
      effectiveViewportWidth,
      layout.scaledHeight,
      layout.scaledWidth,
      translate.x,
      translate.y,
    ],
  );

  const endPan = useCallback((event: React.PointerEvent<Element>) => {
    if (!isPanningRef.current) return;
    isPanningRef.current = false;
    setIsPanning(false);
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const stageTransform = `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${layout.displayScale})`;

  return {
    viewportRef,
    layout,
    combinedZoom,
    canPan,
    isPanning,
    stageTransform,
    handleWheel,
    handlePanPointerDown,
    handlePanPointerMove,
    endPan,
  };
}
