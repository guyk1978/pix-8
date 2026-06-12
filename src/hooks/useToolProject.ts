"use client";

import { useEffect, useRef } from "react";
import {
  useToolProjectContext,
  type ToolProjectHandlers,
  type ToolProjectSnapshot,
} from "@/components/projects/ToolProjectContext";
import { MAIN_IMAGE_KEY } from "@/lib/projects/types";
import type { ToolId } from "@/lib/tools";

interface UseToolProjectOptions {
  toolId: ToolId;
  canSave: boolean;
  getPayload: () => Record<string, unknown>;
  getImages: () => ProjectImageInputLike[];
  restore: (
    payload: Record<string, unknown>,
    files: Map<string, File>,
  ) => void | Promise<void>;
}

interface ProjectImageInputLike {
  key: string;
  file: File;
}

export function useToolProject({
  canSave,
  getPayload,
  getImages,
  restore,
}: UseToolProjectOptions): void {
  const { registerHandlers } = useToolProjectContext();

  const getPayloadRef = useRef(getPayload);
  const getImagesRef = useRef(getImages);
  const restoreRef = useRef(restore);

  getPayloadRef.current = getPayload;
  getImagesRef.current = getImages;
  restoreRef.current = restore;

  useEffect(() => {
    const handlers: ToolProjectHandlers = {
      canSave,
      getSnapshot: (): ToolProjectSnapshot | null => {
        if (!canSave) return null;

        const images = getImagesRef.current();
        if (images.length === 0) return null;

        return {
          payload: getPayloadRef.current(),
          images: images.map((image) => ({
            key: image.key,
            file: image.file,
          })),
        };
      },
      restore: (payload, files) => restoreRef.current(payload, files),
    };

    registerHandlers(handlers);

    return () => registerHandlers(null);
  }, [canSave, registerHandlers]);
}

interface UseImageToolProjectOptions {
  toolId: ToolId;
  source: { file: File } | null;
  loadFile: (file: File) => void | Promise<void>;
  getExtraPayload?: () => Record<string, unknown>;
  applyPayload?: (payload: Record<string, unknown>) => void;
}

export function useImageToolProject({
  toolId,
  source,
  loadFile,
  getExtraPayload,
  applyPayload,
}: UseImageToolProjectOptions): void {
  useToolProject({
    toolId,
    canSave: !!source,
    getPayload: () => getExtraPayload?.() ?? {},
    getImages: () =>
      source ? [{ key: MAIN_IMAGE_KEY, file: source.file }] : [],
    restore: async (payload, files) => {
      const file = files.get(MAIN_IMAGE_KEY);
      if (!file) return;

      applyPayload?.(payload);
      await loadFile(file);
    },
  });
}

export function applyBooleanPayload(
  payload: Record<string, unknown>,
  key: string,
  setter: (value: boolean) => void,
): void {
  if (typeof payload[key] === "boolean") {
    setter(payload[key] as boolean);
  }
}

export function applyNumberPayload(
  payload: Record<string, unknown>,
  key: string,
  setter: (value: number) => void,
): void {
  if (typeof payload[key] === "number") {
    setter(payload[key] as number);
  }
}

export function applyStringPayload(
  payload: Record<string, unknown>,
  key: string,
  setter: (value: string) => void,
): void {
  if (typeof payload[key] === "string") {
    setter(payload[key] as string);
  }
}

interface UseBulkToolProjectOptions {
  toolId: ToolId;
  mode: "single" | "batch";
  source: { file: File } | null;
  bulk: {
    items: { file: File }[];
    loadFromFiles: (files: File[]) => Promise<void>;
  };
  canSave: boolean;
  loadFile: (file: File) => void | Promise<void>;
  getExtraPayload: () => Record<string, unknown>;
  applyExtraPayload: (payload: Record<string, unknown>) => void;
  onModeRestore?: (mode: "single" | "batch") => void;
}

export function useBulkToolProject({
  toolId,
  mode,
  source,
  bulk,
  canSave,
  loadFile,
  getExtraPayload,
  applyExtraPayload,
  onModeRestore,
}: UseBulkToolProjectOptions): void {
  useToolProject({
    toolId,
    canSave,
    getPayload: () => ({
      mode,
      ...getExtraPayload(),
    }),
    getImages: () => {
      if (mode === "single" && source) {
        return [{ key: MAIN_IMAGE_KEY, file: source.file }];
      }

      return bulk.items.map((item, index) => ({
        key: `image-${index}`,
        file: item.file,
      }));
    },
    restore: async (payload, files) => {
      const restoredMode = payload.mode === "batch" ? "batch" : "single";
      onModeRestore?.(restoredMode);
      applyExtraPayload(payload);

      if (restoredMode === "batch") {
        const orderedFiles = [...files.entries()]
          .filter(([key]) => key.startsWith("image-"))
          .sort(
            ([left], [right]) =>
              Number(left.split("-")[1] ?? 0) - Number(right.split("-")[1] ?? 0),
          )
          .map(([, file]) => file);

        await bulk.loadFromFiles(orderedFiles);
        return;
      }

      const file = files.get(MAIN_IMAGE_KEY);
      if (file) {
        await loadFile(file);
      }
    },
  });
}
