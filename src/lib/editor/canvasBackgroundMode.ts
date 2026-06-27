export type CanvasBackgroundMode = "grid" | "clean" | "contrast";

const CANVAS_BACKGROUND_MODES: CanvasBackgroundMode[] = [
  "grid",
  "clean",
  "contrast",
];

export function cycleCanvasBackgroundMode(
  current: CanvasBackgroundMode,
): CanvasBackgroundMode {
  const index = CANVAS_BACKGROUND_MODES.indexOf(current);
  const next = index < 0 ? 0 : (index + 1) % CANVAS_BACKGROUND_MODES.length;
  return CANVAS_BACKGROUND_MODES[next]!;
}

export function isCanvasBackgroundMode(
  value: string,
): value is CanvasBackgroundMode {
  return CANVAS_BACKGROUND_MODES.includes(value as CanvasBackgroundMode);
}
