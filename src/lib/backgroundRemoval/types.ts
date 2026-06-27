export type BackgroundMode = "transparent" | "solid" | "image";

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
  backgroundOpacity?: number;
  subjectOpacity?: number;
  backgroundImage?: HTMLImageElement | null;
  canvas?: HTMLCanvasElement | null;
}
