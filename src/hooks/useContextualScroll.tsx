"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

const SCROLL_DURATION_MS = 420;
const SCROLL_EASE = { x1: 0.4, y1: 0, x2: 0.2, y2: 1 };

export interface ContextualScrollContextValue {
  scrollRef: RefObject<HTMLDivElement | null>;
  registerLayerRef: (layerId: string, element: HTMLElement | null) => void;
  scrollLayerIntoFocus: (layerId: string) => void;
  scrollHeight: number;
}

const ContextualScrollContext = createContext<ContextualScrollContextValue | null>(
  null,
);

function cubicBezier(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  let start = 0;
  let end = 1;

  for (let i = 0; i < 12; i += 1) {
    const mid = (start + end) / 2;
    const x =
      3 * (1 - mid) * (1 - mid) * mid * x1 +
      3 * (1 - mid) * mid * mid * x2 +
      mid * mid * mid;
    if (x < t) start = mid;
    else end = mid;
  }

  const u = (start + end) / 2;
  return (
    3 * (1 - u) * (1 - u) * u * y1 +
    3 * (1 - u) * u * u * y2 +
    u * u * u
  );
}

function isElementVisibleInContainer(
  element: HTMLElement,
  container: HTMLElement,
): boolean {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const padding = 4;

  return (
    elementRect.top >= containerRect.top + padding &&
    elementRect.bottom <= containerRect.bottom - padding
  );
}

function animateScrollTop(container: HTMLElement, targetTop: number) {
  const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
  const clampedTarget = Math.max(0, Math.min(targetTop, maxScroll));
  const from = container.scrollTop;
  const distance = clampedTarget - from;

  if (Math.abs(distance) < 1) return;

  const start = performance.now();

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / SCROLL_DURATION_MS);
    const eased = cubicBezier(
      progress,
      SCROLL_EASE.x1,
      SCROLL_EASE.y1,
      SCROLL_EASE.x2,
      SCROLL_EASE.y2,
    );
    container.scrollTop = from + distance * eased;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function useContextualScroll(activeLayerId: string | null) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef(new Map<string, HTMLElement>());
  const scrollFrame = useRef<number | null>(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  const registerLayerRef = useCallback((layerId: string, element: HTMLElement | null) => {
    if (element) layerRefs.current.set(layerId, element);
    else layerRefs.current.delete(layerId);
  }, []);

  const scrollLayerIntoFocus = useCallback((layerId: string) => {
    const container = scrollRef.current;
    const element = layerRefs.current.get(layerId);
    if (!container || !element) return;

    if (isElementVisibleInContainer(element, container)) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const targetTop =
      container.scrollTop +
      (elementRect.top - containerRect.top) -
      containerRect.height / 2 +
      elementRect.height / 2;

    animateScrollTop(container, targetTop);
  }, []);

  const syncScrollContainer = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setScrollHeight(container.clientHeight);
  }, []);

  useEffect(() => {
    if (!activeLayerId) return;

    if (scrollFrame.current !== null) {
      cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = requestAnimationFrame(() => {
      scrollFrame.current = null;
      scrollLayerIntoFocus(activeLayerId);
    });
  }, [activeLayerId, scrollLayerIntoFocus]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    syncScrollContainer();

    const resizeObserver = new ResizeObserver(() => {
      syncScrollContainer();
    });

    resizeObserver.observe(container);

    const parent = container.parentElement;
    if (parent) resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, [syncScrollContainer]);

  return {
    scrollRef,
    registerLayerRef,
    scrollLayerIntoFocus,
    scrollHeight,
  };
}

export function ContextualScrollProvider({
  activeLayerId,
  children,
}: {
  activeLayerId: string | null;
  children: ReactNode;
}) {
  const value = useContextualScroll(activeLayerId);

  return (
    <ContextualScrollContext.Provider value={value}>
      {children}
    </ContextualScrollContext.Provider>
  );
}

export function useContextualScrollContext(): ContextualScrollContextValue {
  const context = useContext(ContextualScrollContext);
  if (!context) {
    throw new Error("useContextualScrollContext must be used within ContextualScrollProvider");
  }
  return context;
}
