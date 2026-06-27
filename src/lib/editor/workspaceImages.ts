import { createLayerId } from "@/lib/editor/layerDefaults";
import type { EditorLayer } from "@/lib/editor/layerTypes";
import type { EditorSource } from "@/lib/editor/layerTypes";
import type { loadImageFromFile } from "@/hooks/useImageProcessor";

export interface EditorWorkspaceImage {
  id: string;
  file: File;
  url: string;
  name: string;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export interface WorkspaceImageSession {
  layers: EditorLayer[];
  activeLayerId: string | null;
}

export type WorkspaceSessionStore = Map<string, WorkspaceImageSession>;

export function workspaceImageKey(id: string): string {
  return `workspace-${id}`;
}

export function workspaceImageFromParsed(
  parsed: Awaited<ReturnType<typeof loadImageFromFile>>,
  id = createLayerId(),
): EditorWorkspaceImage {
  return {
    id,
    file: parsed.file,
    url: parsed.objectUrl,
    name: parsed.name,
    width: parsed.width,
    height: parsed.height,
    image: parsed.image,
  };
}

export function workspaceImageToSource(image: EditorWorkspaceImage): EditorSource {
  return {
    file: image.file,
    url: image.url,
    width: image.width,
    height: image.height,
    name: image.name,
    image: image.image,
  };
}

export function revokeWorkspaceImageUrls(images: EditorWorkspaceImage[]): void {
  for (const image of images) {
    URL.revokeObjectURL(image.url);
  }
}

export type SerializableWorkspaceImage = {
  id: string;
  fileName: string;
};

export function serializeWorkspaceImages(
  images: EditorWorkspaceImage[],
): SerializableWorkspaceImage[] {
  return images.map(({ id, name }) => ({ id, fileName: name }));
}

export function collectWorkspaceProjectImages(
  images: EditorWorkspaceImage[],
): { key: string; file: File }[] {
  return images.map((image) => ({
    key: workspaceImageKey(image.id),
    file: image.file,
  }));
}

export function snapshotWorkspaceSession(
  layers: EditorLayer[],
  activeLayerId: string | null,
  bgRemoveCache: Map<string, HTMLImageElement>,
): WorkspaceImageSession {
  const snapshottedLayers = layers.map((layer) => {
    if (layer.type !== "bg-remove") return layer;
    const cached = bgRemoveCache.get(layer.id);
    if (cached && layer.resultImage !== cached) {
      return { ...layer, resultImage: cached, processing: false };
    }
    return layer;
  });

  return { layers: snapshottedLayers, activeLayerId };
}

export function restoreLayerCachesFromSession(
  layers: EditorLayer[],
  bgRemoveCache: Map<string, HTMLImageElement>,
  overlayCache: Map<string, HTMLImageElement>,
  collageCache: Map<string, HTMLImageElement>,
): void {
  for (const layer of layers) {
    if (layer.type === "bg-remove" && layer.resultImage) {
      bgRemoveCache.set(layer.id, layer.resultImage);
    }
    if (layer.type === "image-overlay" && layer.loadedImage) {
      overlayCache.set(layer.id, layer.loadedImage);
    }
    if (layer.type === "collage") {
      for (const slot of layer.images) {
        if (slot.loadedImage) {
          collageCache.set(slot.id, slot.loadedImage);
        }
      }
    }
  }
}
