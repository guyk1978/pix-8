import type { EditorLayer } from "@/lib/editor/layerTypes";
import { DEFAULT_COLLAGE_SETTINGS } from "@/lib/collageRender";
import { DEFAULT_SVG_TRACE_SETTINGS } from "@/lib/svgTraceRender";
import { createLayerId, createSourceLayer } from "@/lib/editor/layerDefaults";

export const EDITOR_PROJECT_TOOL_ID = "cropper" as const;
export const EDITOR_PROJECT_KIND = "unified-editor";
export const EDITOR_PROJECT_VERSION = 1;
export const EDITOR_FAVORITE_PROJECT_ID = "pix-8-editor-favorite-workspace";

export type SerializableEditorLayer = Omit<
  EditorLayer,
  "resultImage" | "loadedImage" | "processing"
> & {
  type: EditorLayer["type"];
};

export function collageImageKey(layerId: string, slotId: string): string {
  return `collage-${layerId}-${slotId}`;
}

export function serializeEditorLayers(layers: EditorLayer[]): SerializableEditorLayer[] {
  return layers.map((layer) => {
    if (layer.type === "bg-remove") {
      const { resultImage: _r, processing: _p, ...rest } = layer;
      return rest;
    }
    if (layer.type === "image-overlay") {
      const { loadedImage: _l, ...rest } = layer;
      return rest;
    }
    if (layer.type === "collage") {
      return {
        ...layer,
        images: layer.images.map(({ id, fileName }) => ({ id, fileName })),
      } as SerializableEditorLayer;
    }
    if (layer.type === "export-svg") {
      const { svgOutput: _s, processing: _p, ...rest } = layer;
      return rest;
    }
    return { ...layer };
  });
}

export function deserializeEditorLayers(
  layers: SerializableEditorLayer[],
): EditorLayer[] {
  return layers.map((layer) => {
    if (layer.type === "bg-remove") {
      return {
        ...layer,
        id: layer.id || createLayerId(),
        resultImage: null,
        processing: false,
      } as EditorLayer;
    }
    if (layer.type === "image-overlay") {
      return {
        ...layer,
        id: layer.id || createLayerId(),
        loadedImage: null,
      } as EditorLayer;
    }
    if (layer.type === "export-svg") {
      const svgData = layer as {
        id?: string;
        type: "export-svg";
        visible?: boolean;
        locked?: boolean;
        nameKey?: string;
        settings?: typeof DEFAULT_SVG_TRACE_SETTINGS;
      };
      return {
        id: svgData.id || createLayerId(),
        type: "export-svg",
        visible: svgData.visible ?? true,
        locked: svgData.locked ?? false,
        nameKey: svgData.nameKey ?? "editor.layers.exportSvg",
        settings: svgData.settings ?? { ...DEFAULT_SVG_TRACE_SETTINGS },
        svgOutput: null,
        processing: false,
      } as EditorLayer;
    }
    if (layer.type === "collage") {
      const collageData = layer as {
        id?: string;
        type: "collage";
        visible?: boolean;
        locked?: boolean;
        nameKey?: string;
        settings?: typeof DEFAULT_COLLAGE_SETTINGS;
        includeSource?: boolean;
        images?: { id: string; fileName: string }[];
      };
      return {
        id: collageData.id || createLayerId(),
        type: "collage",
        visible: collageData.visible ?? true,
        locked: collageData.locked ?? false,
        nameKey: collageData.nameKey ?? "editor.layers.collage",
        settings: collageData.settings ?? { ...DEFAULT_COLLAGE_SETTINGS },
        includeSource: collageData.includeSource ?? true,
        images: (collageData.images ?? []).map((slot) => ({
          id: slot.id || createLayerId(),
          fileName: slot.fileName ?? "image.png",
          file: null,
          objectUrl: null,
          loadedImage: null,
        })),
      } as EditorLayer;
    }
    if (layer.type === "source") {
      return { ...layer, id: layer.id || createLayerId() } as EditorLayer;
    }
    return { ...layer, id: layer.id || createLayerId() } as EditorLayer;
  });
}

export function buildEditorProjectPayload(
  layers: EditorLayer[],
  workspace?: {
    images: { id: string; fileName: string }[];
    activeId: string | null;
  },
) {
  return {
    kind: EDITOR_PROJECT_KIND,
    version: EDITOR_PROJECT_VERSION,
    layers: serializeEditorLayers(layers),
    workspaceImages: workspace?.images ?? [],
    activeWorkspaceImageId: workspace?.activeId ?? null,
  };
}

export function isEditorProjectPayload(payload: Record<string, unknown>): boolean {
  return payload.kind === EDITOR_PROJECT_KIND && Array.isArray(payload.layers);
}

export function layersFromEditorPayload(
  payload: Record<string, unknown>,
): EditorLayer[] {
  if (!isEditorProjectPayload(payload)) {
    return [createSourceLayer()];
  }
  const layers = deserializeEditorLayers(
    payload.layers as SerializableEditorLayer[],
  );
  return layers.some((l) => l.type === "source") ? layers : [createSourceLayer(), ...layers];
}

export function hydrateCollageLayersFromFiles(
  layers: EditorLayer[],
  files: Map<string, File>,
): EditorLayer[] {
  return layers.map((layer) => {
    if (layer.type !== "collage") return layer;

    return {
      ...layer,
      images: layer.images.map((slot) => {
        const file = files.get(collageImageKey(layer.id, slot.id));
        if (!file) return slot;

        return {
          ...slot,
          file,
          fileName: file.name,
          objectUrl: URL.createObjectURL(file),
          loadedImage: null,
        };
      }),
    };
  });
}

export function collectCollageProjectImages(
  layers: EditorLayer[],
): { key: string; file: File }[] {
  const images: { key: string; file: File }[] = [];

  for (const layer of layers) {
    if (layer.type !== "collage") continue;
    for (const slot of layer.images) {
      if (!slot.file) continue;
      images.push({
        key: collageImageKey(layer.id, slot.id),
        file: slot.file,
      });
    }
  }

  return images;
}

export function revokeCollageObjectUrls(layers: EditorLayer[]): void {
  for (const layer of layers) {
    if (layer.type !== "collage") continue;
    for (const slot of layer.images) {
      if (slot.objectUrl) URL.revokeObjectURL(slot.objectUrl);
    }
  }
}
export function isDraggableLayerType(
  type: EditorLayer["type"],
): type is "text-overlay" | "watermark" | "image-overlay" {
  return type === "text-overlay" || type === "watermark" || type === "image-overlay";
}
