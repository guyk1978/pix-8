"use client";

import { useEffect, type DependencyList } from "react";

export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: DependencyList,
  delayMs: number,
): void {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      effect();
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller supplies full dependency list
  }, [delayMs, ...deps]);
}
