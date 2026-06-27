"use client";

import type { ReactNode } from "react";

interface SkeletonOverlayProps {
  active: boolean;
  children: ReactNode;
}

export function SkeletonOverlay({ active, children }: SkeletonOverlayProps) {
  return (
    <div
      className={`live-feedback-skeleton-host ${active ? "is-locked" : ""}`}
      aria-busy={active}
    >
      {children}
      {active ? <div className="live-feedback-skeleton-overlay" aria-hidden /> : null}
    </div>
  );
}
