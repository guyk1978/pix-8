import { createLayerId } from "@/lib/editor/layerDefaults";
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
