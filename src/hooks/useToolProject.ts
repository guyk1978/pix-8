"use client";

import { useEffect, useRef, useState } from "react";
import {
  useToolProjectContext,
  type ToolProjectRestoreMeta,
} from "@/components/projects/ToolProjectContext";
import { MAIN_IMAGE_KEY } from "@/lib/projects/types";
import {
  buildToolProjectPayload,
  parseToolProjectPayload,
} from "@/lib/projects/toolState";
import type { ToolId } from "@/lib/tools";

interface ProjectImageInputLike {
  key: string;
  file: File;
}

export interface UseToolProjectResult {
  isResultMarked: boolean;
  setIsResultMarked: (value: boolean) => void;
}

interface UseToolProjectOptions {
  toolId: ToolId;
  canSave: boolean;
  getToolState: () => Record<string, unknown>;
  getImages: () => ProjectImageInputLike[];
  restore: (
    settings: Record<string, unknown>,
    files: Map<string, File>,
    meta: ToolProjectRestoreMeta,
  ) => void | Promise<void>;
  isResultMarked?: boolean;
  onIsResultMarkedChange?: (value: boolean) => void;
  resultMarkDisabled?: boolean;
  resultMarkHint?: string | null;
  resultMarkCheckboxId?: string;
}

export function useToolProject({
  canSave,
  getToolState,
  getImages,
  restore,
  isResultMarked: controlledIsResultMarked,
  onIsResultMarkedChange,
  resultMarkDisabled,
  resultMarkHint,
  resultMarkCheckboxId,
}: UseToolProjectOptions): UseToolProjectResult {
  const { registerHandlers, registerResultMark } = useToolProjectContext();

  const [internalIsResultMarked, setInternalIsResultMarked] = useState(false);
  const isResultMarked = controlledIsResultMarked ?? internalIsResultMarked;
  const setIsResultMarked = onIsResultMarkedChange ?? setInternalIsResultMarked;

  const getToolStateRef = useRef(getToolState);
  const getImagesRef = useRef(getImages);
  const restoreRef = useRef(restore);
  const setIsResultMarkedRef = useRef(setIsResultMarked);

  useEffect(() => {
    getToolStateRef.current = getToolState;
    getImagesRef.current = getImages;
    restoreRef.current = restore;
    setIsResultMarkedRef.current = setIsResultMarked;
  }, [getToolState, getImages, restore, setIsResultMarked]);

  useEffect(() => {
    const handlers = {
      canSave,
      isResultMarked,
      getSnapshot: () => {
        if (!canSave) return null;

        const images = getImagesRef.current();
        if (images.length === 0) return null;

        return {
          payload: buildToolProjectPayload(
            isResultMarked,
            getToolStateRef.current(),
          ),
          images: images.map((image) => ({
            key: image.key,
            file: image.file,
          })),
        };
      },
      restore: async (payload: Record<string, unknown>, files: Map<string, File>) => {
        const parsed = parseToolProjectPayload(payload);
        setIsResultMarkedRef.current(parsed.isResultMarked);
        await restoreRef.current(parsed.settings, files, {
          isResultMarked: parsed.isResultMarked,
        });
      },
    };

    registerHandlers(handlers);

    return () => registerHandlers(null);
  }, [canSave, isResultMarked, registerHandlers]);

  useEffect(() => {
    registerResultMark({
      isResultMarked,
      onChange: setIsResultMarked,
      disabled: resultMarkDisabled ?? !canSave,
      hint: resultMarkHint,
      checkboxId: resultMarkCheckboxId,
    });

    return () => registerResultMark(null);
  }, [
    canSave,
    isResultMarked,
    registerResultMark,
    resultMarkCheckboxId,
    resultMarkDisabled,
    resultMarkHint,
    setIsResultMarked,
  ]);

  return { isResultMarked, setIsResultMarked };
}

interface UseImageToolProjectOptions {
  toolId: ToolId;
  source: { file: File } | null;
  loadFile: (file: File) => void | Promise<void>;
  getToolState?: () => Record<string, unknown>;
  applyToolState?: (settings: Record<string, unknown>) => void;
  /** @deprecated Use getToolState */
  getExtraPayload?: () => Record<string, unknown>;
  /** @deprecated Use applyToolState */
  applyPayload?: (settings: Record<string, unknown>) => void;
  isResultMarked?: boolean;
  onIsResultMarkedChange?: (value: boolean) => void;
  resultMarkDisabled?: boolean;
  resultMarkHint?: string | null;
  resultMarkCheckboxId?: string;
}

export function useImageToolProject({
  toolId,
  source,
  loadFile,
  getToolState,
  applyToolState,
  getExtraPayload,
  applyPayload,
  isResultMarked,
  onIsResultMarkedChange,
  resultMarkDisabled,
  resultMarkHint,
  resultMarkCheckboxId,
}: UseImageToolProjectOptions): UseToolProjectResult {
  const resolveToolState = getToolState ?? getExtraPayload ?? (() => ({}));
  const resolveApplyToolState = applyToolState ?? applyPayload;

  return useToolProject({
    toolId,
    canSave: !!source,
    isResultMarked,
    onIsResultMarkedChange,
    resultMarkDisabled: resultMarkDisabled ?? !source,
    resultMarkHint,
    resultMarkCheckboxId,
    getToolState: resolveToolState,
    getImages: () =>
      source ? [{ key: MAIN_IMAGE_KEY, file: source.file }] : [],
    restore: async (settings, files) => {
      const file = files.get(MAIN_IMAGE_KEY);
      if (file) {
        await loadFile(file);
        // Let source-driven reset effects (crop/transform centering) flush first.
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0);
        });
      }
      resolveApplyToolState?.(settings);
    },
  });
}

export function applyBooleanPayload(
  settings: Record<string, unknown>,
  key: string,
  setter: (value: boolean) => void,
): void {
  if (typeof settings[key] === "boolean") {
    setter(settings[key] as boolean);
  }
}

export function applyNumberPayload(
  settings: Record<string, unknown>,
  key: string,
  setter: (value: number) => void,
): void {
  if (typeof settings[key] === "number") {
    setter(settings[key] as number);
  }
}

export function applyStringPayload(
  settings: Record<string, unknown>,
  key: string,
  setter: (value: string) => void,
): void {
  if (typeof settings[key] === "string") {
    setter(settings[key] as string);
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
  getToolState?: () => Record<string, unknown>;
  applyToolState?: (settings: Record<string, unknown>) => void;
  onModeRestore?: (mode: "single" | "batch") => void;
  /** @deprecated Use getToolState */
  getExtraPayload?: () => Record<string, unknown>;
  /** @deprecated Use applyToolState */
  applyExtraPayload?: (settings: Record<string, unknown>) => void;
  isResultMarked?: boolean;
  onIsResultMarkedChange?: (value: boolean) => void;
  resultMarkDisabled?: boolean;
  resultMarkHint?: string | null;
}

export function useBulkToolProject({
  toolId,
  mode,
  source,
  bulk,
  canSave,
  loadFile,
  getToolState,
  applyToolState,
  getExtraPayload,
  applyExtraPayload,
  onModeRestore,
  isResultMarked,
  onIsResultMarkedChange,
  resultMarkDisabled,
  resultMarkHint,
}: UseBulkToolProjectOptions): UseToolProjectResult {
  const resolveToolState = getToolState ?? getExtraPayload ?? (() => ({}));
  const resolveApplyToolState = applyToolState ?? applyExtraPayload ?? (() => {});

  return useToolProject({
    toolId,
    canSave,
    isResultMarked,
    onIsResultMarkedChange,
    resultMarkDisabled,
    resultMarkHint,
    getToolState: () => ({
      mode,
      ...resolveToolState(),
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
    restore: async (settings, files) => {
      const restoredMode = settings.mode === "batch" ? "batch" : "single";
      onModeRestore?.(restoredMode);

      if (restoredMode === "batch") {
        const orderedFiles = [...files.entries()]
          .filter(([key]) => key.startsWith("image-"))
          .sort(
            ([left], [right]) =>
              Number(left.split("-")[1] ?? 0) - Number(right.split("-")[1] ?? 0),
          )
          .map(([, file]) => file);

        await bulk.loadFromFiles(orderedFiles);
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0);
        });
        resolveApplyToolState(settings);
        return;
      }

      const file = files.get(MAIN_IMAGE_KEY);
      if (file) {
        await loadFile(file);
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0);
        });
      }
      resolveApplyToolState(settings);
    },
  });
}
