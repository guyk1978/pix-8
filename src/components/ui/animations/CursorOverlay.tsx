"use client";

interface CursorOverlayProps {
  active: boolean;
  x: number;
  y: number;
}

export function CursorOverlay({ active, x, y }: CursorOverlayProps) {
  if (!active) return null;

  return (
    <div
      className="live-feedback-cursor-overlay"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      aria-hidden
    >
      <span className="live-feedback-cursor-overlay__ring" />
      <span className="live-feedback-cursor-overlay__h" />
      <span className="live-feedback-cursor-overlay__v" />
    </div>
  );
}
