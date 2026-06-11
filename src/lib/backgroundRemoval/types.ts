export type BackgroundMode = "transparent" | "solid";

export type RemovalPhase = "loading-model" | "processing";

export interface RemovalProgress {
  phase: RemovalPhase;
  key?: string;
  current?: number;
  total?: number;
}

export interface BackgroundRemovalOptions {
  backgroundMode: BackgroundMode;
  backgroundColor?: string;
  canvas?: HTMLCanvasElement | null;
}
