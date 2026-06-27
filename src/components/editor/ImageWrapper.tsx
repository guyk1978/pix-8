"use client";

import type { ReactNode, RefObject } from "react";

interface ImageWrapperProps {
  viewportRef: RefObject<HTMLDivElement | null>;
  contentWidth: number;
  contentHeight: number;
  stageWidth: number;
  stageHeight: number;
  stageTransform: string;
  className?: string;
  ariaLabel?: string;
  onWheel?: (event: React.WheelEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

export function ImageWrapper({
  viewportRef,
  contentWidth,
  contentHeight,
  stageWidth,
  stageHeight,
  stageTransform,
  className = "",
  ariaLabel,
  onWheel,
  children,
}: ImageWrapperProps) {
  if (contentWidth <= 0 || contentHeight <= 0) {
    return null;
  }

  return (
    <div
      ref={viewportRef}
      className={`image-wrapper ${className}`.trim()}
      style={{ width: contentWidth, height: contentHeight }}
      onWheel={onWheel}
      aria-label={ariaLabel}
    >
      <div
        className="image-wrapper__stage"
        style={{
          width: stageWidth,
          height: stageHeight,
          transform: stageTransform,
        }}
      >
        {children}
      </div>
    </div>
  );
}
