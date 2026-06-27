"use client";

interface EditorMaskBrushCursorProps {
  x: number;
  y: number;
  radius: number;
  mode: "clean" | "default";
}

export function EditorMaskBrushCursor({
  x,
  y,
  radius,
  mode,
}: EditorMaskBrushCursorProps) {
  if (radius <= 0) return null;

  return (
    <div
      className={`unified-editor-mask-brush-cursor ${
        mode === "clean" ? "unified-editor-mask-brush-cursor--clean" : ""
      }`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: x - radius,
        top: y - radius,
      }}
      aria-hidden
    />
  );
}
