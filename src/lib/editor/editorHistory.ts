import type { EditorLayer } from "@/lib/editor/layerTypes";

export interface EditorHistoryEntry {
  layers: EditorLayer[];
  activeLayerId: string | null;
  manualMasks: Map<string, Float32Array>;
}

export const EDITOR_HISTORY_LIMIT = 60;

export function cloneLayersForHistory(layers: EditorLayer[]): EditorLayer[] {
  return layers.map((layer) => {
    if (layer.type === "collage") {
      return {
        ...layer,
        images: layer.images.map((image) => ({ ...image })),
      };
    }
    return { ...layer };
  });
}

export function cloneManualMaskCache(
  cache: Map<string, Float32Array>,
): Map<string, Float32Array> {
  const next = new Map<string, Float32Array>();
  for (const [layerId, mask] of cache) {
    next.set(layerId, mask.slice());
  }
  return next;
}

export function captureEditorHistoryEntry(
  layers: EditorLayer[],
  activeLayerId: string | null,
  manualMaskCache: Map<string, Float32Array>,
): EditorHistoryEntry {
  return {
    layers: cloneLayersForHistory(layers),
    activeLayerId,
    manualMasks: cloneManualMaskCache(manualMaskCache),
  };
}

export function pushEditorHistoryEntry(
  past: EditorHistoryEntry[],
  entry: EditorHistoryEntry,
): EditorHistoryEntry[] {
  const next = [...past, entry];
  if (next.length > EDITOR_HISTORY_LIMIT) {
    next.shift();
  }
  return next;
}
