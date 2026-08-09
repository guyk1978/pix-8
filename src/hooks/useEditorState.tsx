"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildDownloadFilename,
  handleDownload,
  loadImageFromFile,
  type ImageFormat,
} from "@/hooks/useImageProcessor";
import { resolveEditorDownloadFormat } from "@/lib/editor/resolveExportFormat";
import {
  composeLayers,
  invalidateBgRemoveCache,
  invalidateCollageCache,
  invalidateCollageLayerCache,
  invalidateManualMaskCache,
  invalidateOverlayCache,
} from "@/lib/editor/compositor";
import {
  buildSmartCleanContext,
  createManualMaskBuffer,
  paintMaskBrush,
  paintMaskBrushStroke,
  resolveMaskBrushRadius,
  type MaskBrushTool,
  type SmartCleanContext,
} from "@/lib/backgroundRemoval/maskBrush";
import {
  mergeClickMaskIntoAdjustments,
} from "@/lib/backgroundRemoval/clickSegmentation";
import {
  encodeClickSegmentationImage,
  segmentAtClick,
  type ClickSegmentationEmbedding,
} from "@/lib/backgroundRemoval/clickSegmentationEngine";
import {
  captureEditorHistoryEntry,
  cloneManualMaskCache,
  pushEditorHistoryEntry,
  type EditorHistoryEntry,
} from "@/lib/editor/editorHistory";
import { EDITOR_CATEGORIES } from "@/lib/editor/editorCategories";
import {
  createLayerForTool,
  createLayerId,
  createSourceLayer,
  findLayerById,
} from "@/lib/editor/layerDefaults";
import type {
  EditorLayer,
  EditorSource,
  EditorToolAction,
} from "@/lib/editor/layerTypes";
import {
  buildEditorProjectPayload,
  collectCollageProjectImages,
  EDITOR_FAVORITE_PROJECT_ID,
  EDITOR_PROJECT_TOOL_ID,
  hydrateCollageLayersFromFiles,
  deserializeEditorLayers,
  isEditorProjectPayload,
  layersFromEditorPayload,
  revokeBgReplaceObjectUrls,
  revokeCollageObjectUrls,
  serializeEditorLayers,
  type SerializableEditorLayer,
} from "@/lib/editor/editorProject";
import {
  revokeWorkspaceImageUrls,
  restoreLayerCachesFromSession,
  serializeWorkspaceImages,
  snapshotWorkspaceSession,
  workspaceImageFromParsed,
  workspaceImageKey,
  workspaceImageToSource,
  type EditorWorkspaceImage,
  type WorkspaceSessionStore,
} from "@/lib/editor/workspaceImages";
import {
  deleteProject,
  getProject,
  loadProjectImages,
  saveProject as persistProject,
} from "@/lib/projects/save";
import { MAIN_IMAGE_KEY } from "@/lib/projects/types";
import { useToast } from "@/components/ui/ToastProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useProjects } from "@/components/projects/ProjectsContext";

interface EditorContextValue {
  source: EditorSource | null;
  layers: EditorLayer[];
  activeLayerId: string | null;
  activeLayer: EditorLayer | undefined;
  isComposing: boolean;
  composeError: string | null;
  openCategory: string | null;
  issueCount: number;
  magnifierZoom: number;
  canvasZoom: number;
  zoomCanvasIn: () => void;
  zoomCanvasOut: () => void;
  resetCanvasZoom: () => void;
  setCanvasZoom: (zoom: number) => void;
  loadFile: (file: File) => Promise<void>;
  clear: () => void;
  setOpenCategory: (id: string | null) => void;
  selectLayer: (id: string | null) => void;
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;
  deleteLayer: (id: string) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  updateLayer: (id: string, updater: (layer: EditorLayer) => EditorLayer) => void;
  addToolAction: (action: EditorToolAction) => void;
  download: (format?: ImageFormat) => Promise<void>;
  previewCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  projectId: string | null;
  projectName: string | null;
  isFavorited: boolean;
  isSavingProject: boolean;
  saveProject: (name: string) => Promise<void>;
  loadFromProjectId: (id: string) => Promise<boolean>;
  toggleFavorite: () => Promise<void>;
  addCollageImages: (layerId: string, files: FileList | File[]) => void;
  removeCollageImage: (layerId: string, slotId: string) => void;
  addWorkspaceImagesToCollage: (layerId: string) => void;
  workspaceImages: EditorWorkspaceImage[];
  activeWorkspaceImageId: string | null;
  addWorkspaceImage: (files: FileList | File[]) => Promise<void>;
  activateWorkspaceImage: (id: string) => void;
  removeWorkspaceImage: (id: string) => void;
  maskBrushTool: MaskBrushTool | null;
  setMaskBrushTool: (tool: MaskBrushTool | null) => void;
  maskBrushSize: number;
  setMaskBrushSize: (size: number) => void;
  maskBrushReady: boolean;
  paintMaskBrushAt: (x: number, y: number) => void;
  paintMaskBrushStrokeAt: (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) => void;
  commitMaskBrushRevision: () => void;
  maskClickMode: "add" | "remove" | null;
  setMaskClickMode: (mode: "add" | "remove" | null) => void;
  maskClickReady: boolean;
  isClickSegmentationLoading: boolean;
  applyMaskClickAt: (x: number, y: number) => Promise<void>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  recordHistoryBeforeGesture: () => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { refreshProjects } = useProjects();
  const [source, setSource] = useState<EditorSource | null>(null);
  const [layers, setLayers] = useState<EditorLayer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeError, setComposeError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [workspaceImages, setWorkspaceImages] = useState<EditorWorkspaceImage[]>([]);
  const [activeWorkspaceImageId, setActiveWorkspaceImageId] = useState<string | null>(
    null,
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [maskBrushTool, setMaskBrushTool] = useState<MaskBrushTool | null>(null);
  const [maskBrushSize, setMaskBrushSize] = useState(52);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [maskClickMode, setMaskClickMode] = useState<"add" | "remove" | null>(null);
  const [isClickSegmentationLoading, setIsClickSegmentationLoading] = useState(false);
  const [maskRevision, setMaskRevision] = useState(0);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgRemoveCache = useRef(new Map<string, HTMLImageElement>());
  const manualMaskCache = useRef(new Map<string, Float32Array>());
  const clickSamCache = useRef(new Map<string, ClickSegmentationEmbedding>());
  const smartCleanContextRef = useRef<SmartCleanContext | null>(null);
  const maskRevisionRaf = useRef<number | null>(null);
  const overlayCache = useRef(new Map<string, HTMLImageElement>());
  const collageCache = useRef(new Map<string, HTMLImageElement>());
  const composeQueueRef = useRef<Promise<void>>(Promise.resolve());
  const composeRunId = useRef(0);
  const layersRef = useRef(layers);
  layersRef.current = layers;
  const activeLayerIdRef = useRef(activeLayerId);
  activeLayerIdRef.current = activeLayerId;
  const workspaceImagesRef = useRef(workspaceImages);
  workspaceImagesRef.current = workspaceImages;
  const activeWorkspaceImageIdRef = useRef(activeWorkspaceImageId);
  activeWorkspaceImageIdRef.current = activeWorkspaceImageId;
  const sourceRef = useRef(source);
  sourceRef.current = source;
  const workspaceSessionsRef = useRef<WorkspaceSessionStore>(new Map());
  const historyPastRef = useRef<EditorHistoryEntry[]>([]);
  const historyFutureRef = useRef<EditorHistoryEntry[]>([]);
  const isRestoringHistoryRef = useRef(false);
  const historyDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const historyBurstActiveRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const syncHistoryFlags = useCallback(() => {
    setCanUndo(historyPastRef.current.length > 0);
    setCanRedo(historyFutureRef.current.length > 0);
  }, []);

  const clearEditorHistory = useCallback(() => {
    historyPastRef.current = [];
    historyFutureRef.current = [];
    historyBurstActiveRef.current = false;
    if (historyDebounceRef.current) {
      clearTimeout(historyDebounceRef.current);
      historyDebounceRef.current = null;
    }
    syncHistoryFlags();
  }, [syncHistoryFlags]);

  const applyHistoryEntry = useCallback(
    (entry: EditorHistoryEntry) => {
      isRestoringHistoryRef.current = true;
      manualMaskCache.current = cloneManualMaskCache(entry.manualMasks);
      setLayers(entry.layers);
      setActiveLayerId(entry.activeLayerId);
      setMaskRevision((value) => value + 1);
      isRestoringHistoryRef.current = false;
    },
    [],
  );

  const recordHistoryImmediate = useCallback(() => {
    if (isRestoringHistoryRef.current) return;
    const entry = captureEditorHistoryEntry(
      layersRef.current,
      activeLayerIdRef.current,
      manualMaskCache.current,
    );
    historyPastRef.current = pushEditorHistoryEntry(historyPastRef.current, entry);
    historyFutureRef.current = [];
    syncHistoryFlags();
  }, [syncHistoryFlags]);

  const beginHistoryBurst = useCallback(() => {
    if (isRestoringHistoryRef.current) return;
    if (!historyBurstActiveRef.current) {
      recordHistoryImmediate();
      historyBurstActiveRef.current = true;
    }
    if (historyDebounceRef.current) {
      clearTimeout(historyDebounceRef.current);
    }
    historyDebounceRef.current = setTimeout(() => {
      historyBurstActiveRef.current = false;
      historyDebounceRef.current = null;
    }, 750);
  }, [recordHistoryImmediate]);

  const recordHistoryBeforeGesture = useCallback(() => {
    historyBurstActiveRef.current = false;
    if (historyDebounceRef.current) {
      clearTimeout(historyDebounceRef.current);
      historyDebounceRef.current = null;
    }
    recordHistoryImmediate();
  }, [recordHistoryImmediate]);

  const undo = useCallback(() => {
    if (historyPastRef.current.length === 0) return;
    const current = captureEditorHistoryEntry(
      layersRef.current,
      activeLayerIdRef.current,
      manualMaskCache.current,
    );
    historyFutureRef.current = pushEditorHistoryEntry(historyFutureRef.current, current);
    const entry = historyPastRef.current[historyPastRef.current.length - 1]!;
    historyPastRef.current = historyPastRef.current.slice(0, -1);
    applyHistoryEntry(entry);
    syncHistoryFlags();
  }, [applyHistoryEntry, syncHistoryFlags]);

  const redo = useCallback(() => {
    if (historyFutureRef.current.length === 0) return;
    const current = captureEditorHistoryEntry(
      layersRef.current,
      activeLayerIdRef.current,
      manualMaskCache.current,
    );
    historyPastRef.current = pushEditorHistoryEntry(historyPastRef.current, current);
    const entry = historyFutureRef.current[historyFutureRef.current.length - 1]!;
    historyFutureRef.current = historyFutureRef.current.slice(0, -1);
    applyHistoryEntry(entry);
    syncHistoryFlags();
  }, [applyHistoryEntry, syncHistoryFlags]);

  const activeLayer = useMemo(
    () => findLayerById(layers, activeLayerId),
    [layers, activeLayerId],
  );

  const magnifierZoom = useMemo(() => {
    const magnifierLayers = layers.filter(
      (l) => l.type === "magnifier" && l.visible,
    );
    const top = magnifierLayers[magnifierLayers.length - 1];
    return top?.type === "magnifier" ? top.zoom : 1;
  }, [layers]);

  const issueCount = composeError ? 1 : 0;

  const maskBrushReady = useMemo(() => {
    if (!activeLayer || activeLayer.type !== "bg-remove" || !activeLayer.enabled) {
      return false;
    }
    return (
      bgRemoveCache.current.has(activeLayer.id) ||
      Boolean(activeLayer.resultImage)
    );
  }, [activeLayer, layers, isComposing]);

  const maskClickReady = maskBrushReady;

  useEffect(() => {
    void getProject(EDITOR_FAVORITE_PROJECT_ID).then((record) => {
      setIsFavorited(!!record);
    });
  }, []);

  const applyEditorSession = useCallback(
    async (
      file: File,
      restoredLayers: EditorLayer[],
      session?: {
        projectId?: string | null;
        projectName?: string | null;
        activeLayerId?: string | null;
      },
    ) => {
      const parsed = await loadImageFromFile(file);
      if (source?.url && source.url !== parsed.objectUrl) {
        const stillInWorkspace = workspaceImagesRef.current.some(
          (image) => image.url === source.url,
        );
        if (!stillInWorkspace) {
          URL.revokeObjectURL(source.url);
        }
      }
      bgRemoveCache.current.clear();
      manualMaskCache.current.clear();
      clickSamCache.current.clear();
      smartCleanContextRef.current = null;
      overlayCache.current.clear();
      collageCache.current.clear();
      revokeCollageObjectUrls(layersRef.current);
      revokeBgReplaceObjectUrls(layersRef.current);
      setSource({
        file: parsed.file,
        url: parsed.objectUrl,
        width: parsed.width,
        height: parsed.height,
        name: parsed.name,
        image: parsed.image,
      });
      setLayers(restoredLayers);
      setActiveLayerId(
        session?.activeLayerId ??
          restoredLayers[restoredLayers.length - 1]?.id ??
          null,
      );
      setProjectId(session?.projectId ?? null);
      setProjectName(session?.projectName ?? null);
      setComposeError(null);
      clearEditorHistory();
    },
    [source, clearEditorHistory],
  );

  const loadFromProjectId = useCallback(
    async (id: string) => {
      try {
        const record = await getProject(id);
        if (!record) {
          showToast(t("editor.project.notFound"));
          return false;
        }

        const images = await loadProjectImages(record);
        const mainFile = images.get(MAIN_IMAGE_KEY);
        if (!mainFile) {
          showToast(t("editor.project.loadFailed"));
          return false;
        }

        if (!isEditorProjectPayload(record.payload)) {
          showToast(t("editor.project.loadFailed"));
          return false;
        }

        const restoredLayers = hydrateCollageLayersFromFiles(
          layersFromEditorPayload(record.payload),
          images,
        );

        const workspaceMeta = Array.isArray(record.payload.workspaceImages)
          ? (record.payload.workspaceImages as { id: string; fileName: string }[])
          : [];
        const savedActiveId =
          typeof record.payload.activeWorkspaceImageId === "string"
            ? record.payload.activeWorkspaceImageId
            : null;

        let hydratedWorkspace: EditorWorkspaceImage[] = [];
        if (workspaceMeta.length > 0) {
          for (const entry of workspaceMeta) {
            const file =
              images.get(workspaceImageKey(entry.id)) ??
              (savedActiveId === entry.id ? mainFile : undefined);
            if (!file) continue;
            const parsed = await loadImageFromFile(file);
            hydratedWorkspace.push(workspaceImageFromParsed(parsed, entry.id));
          }
        }

        if (hydratedWorkspace.length === 0) {
          const parsed = await loadImageFromFile(mainFile);
          hydratedWorkspace = [workspaceImageFromParsed(parsed)];
        }

        const activeId =
          savedActiveId && hydratedWorkspace.some((image) => image.id === savedActiveId)
            ? savedActiveId
            : hydratedWorkspace[0]!.id;
        const activeImage =
          hydratedWorkspace.find((image) => image.id === activeId) ??
          hydratedWorkspace[0]!;

        workspaceSessionsRef.current.clear();
        const rawStacks = record.payload.workspaceLayerStacks;
        if (rawStacks && typeof rawStacks === "object" && !Array.isArray(rawStacks)) {
          for (const [workspaceId, entry] of Object.entries(
            rawStacks as Record<
              string,
              { layers?: unknown; activeLayerId?: string | null }
            >,
          )) {
            if (!Array.isArray(entry?.layers)) continue;
            const hydrated = hydrateCollageLayersFromFiles(
              deserializeEditorLayers(entry.layers as SerializableEditorLayer[]),
              images,
            );
            workspaceSessionsRef.current.set(workspaceId, {
              layers: hydrated,
              activeLayerId: entry.activeLayerId ?? null,
            });
          }
        }

        const activeSession = workspaceSessionsRef.current.get(activeId);
        const layersToRestore = activeSession?.layers ?? restoredLayers;

        setWorkspaceImages(hydratedWorkspace);
        setActiveWorkspaceImageId(activeId);
        await applyEditorSession(activeImage.file, layersToRestore, {
          projectId: record.id,
          projectName: record.name,
          activeLayerId: activeSession?.activeLayerId ?? null,
        });
        return true;
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : t("editor.project.loadFailed"),
        );
        return false;
      }
    },
    [applyEditorSession, showToast, t],
  );

  const scheduleCompose = useCallback(() => {
    composeQueueRef.current = composeQueueRef.current
      .then(async () => {
        const currentSource = sourceRef.current;
        if (!currentSource || !previewCanvasRef.current) return;

        const runId = ++composeRunId.current;
        setIsComposing(true);
        setComposeError(null);

        try {
          await composeLayers(
            currentSource,
            layersRef.current,
            previewCanvasRef.current,
            {
              bgRemoveCache: bgRemoveCache.current,
              manualMaskCache: manualMaskCache.current,
              overlayCache: overlayCache.current,
              collageCache: collageCache.current,
              onBgRemoveProgress: (layerId, processing) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id === layerId && layer.type === "bg-remove") {
                      if (layer.processing === processing) return layer;
                      changed = true;
                      return { ...layer, processing };
                    }
                    return layer;
                  });
                  return changed ? next : prev;
                });
              },
              onOverlayLoaded: (layerId, image) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id === layerId && layer.type === "image-overlay") {
                      if (layer.loadedImage === image) return layer;
                      changed = true;
                      return { ...layer, loadedImage: image };
                    }
                    return layer;
                  });
                  return changed ? next : prev;
                });
              },
              onCollageImageLoaded: (layerId, slotId, image) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id !== layerId || layer.type !== "collage") return layer;
                    const images = layer.images.map((slot) => {
                      if (slot.id !== slotId) return slot;
                      if (slot.loadedImage === image) return slot;
                      changed = true;
                      return { ...slot, loadedImage: image };
                    });
                    return changed ? { ...layer, images } : layer;
                  });
                  return changed ? next : prev;
                });
              },
              onBgReplaceImageLoaded: (layerId, image) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id !== layerId || layer.type !== "bg-remove") return layer;
                    if (layer.replaceImage === image) return layer;
                    changed = true;
                    return { ...layer, replaceImage: image };
                  });
                  return changed ? next : prev;
                });
              },
              onSvgTraceStart: (layerId) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id === layerId && layer.type === "export-svg") {
                      if (layer.processing) return layer;
                      changed = true;
                      return { ...layer, processing: true, svgOutput: null };
                    }
                    return layer;
                  });
                  return changed ? next : prev;
                });
              },
              onSvgTraced: (layerId, svg) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id === layerId && layer.type === "export-svg") {
                      if (layer.svgOutput === svg && !layer.processing) return layer;
                      changed = true;
                      return { ...layer, svgOutput: svg, processing: false };
                    }
                    return layer;
                  });
                  return changed ? next : prev;
                });
              },
              onSvgTraceError: (layerId, error) => {
                if (runId !== composeRunId.current) return;
                setLayers((prev) => {
                  let changed = false;
                  const next = prev.map((layer) => {
                    if (layer.id === layerId && layer.type === "export-svg" && layer.processing) {
                      changed = true;
                      return { ...layer, processing: false };
                    }
                    return layer;
                  });
                  return changed ? next : prev;
                });
                setComposeError(
                  error instanceof Error ? error.message : t("toolUi.imageToSvg.traceFailed"),
                );
              },
            },
          );

          if (runId !== composeRunId.current) return;

          setLayers((prev) => {
            let changed = false;
            const next = prev.map((layer) => {
              if (layer.type === "bg-remove") {
                const cached = bgRemoveCache.current.get(layer.id);
                if (cached && layer.resultImage !== cached) {
                  changed = true;
                  return { ...layer, resultImage: cached, processing: false };
                }
                if (layer.processing) {
                  changed = true;
                  return { ...layer, processing: false };
                }
                return layer;
              }
              if (layer.type === "image-overlay") {
                const cached = overlayCache.current.get(layer.id);
                if (cached && layer.loadedImage !== cached) {
                  changed = true;
                  return { ...layer, loadedImage: cached };
                }
                return layer;
              }
              if (layer.type === "export-svg" && layer.processing) {
                changed = true;
                return { ...layer, processing: false };
              }
              return layer;
            });
            return changed ? next : prev;
          });
        } catch (error) {
          if (runId !== composeRunId.current) return;
          setComposeError(
            error instanceof Error ? error.message : "Composition failed.",
          );
        } finally {
          if (runId === composeRunId.current) {
            setIsComposing(false);
          }
        }
      })
      .catch(() => {
        setIsComposing(false);
      });
  }, [t]);

  useLayoutEffect(() => {
    if (!source) return;
    scheduleCompose();
  }, [source, layers, maskRevision, scheduleCompose]);

  const scheduleMaskRevision = useCallback(() => {
    if (maskRevisionRaf.current !== null) return;
    maskRevisionRaf.current = requestAnimationFrame(() => {
      maskRevisionRaf.current = null;
      setMaskRevision((value) => value + 1);
    });
  }, []);

  const commitMaskBrushRevision = useCallback(() => {
    if (maskRevisionRaf.current !== null) {
      cancelAnimationFrame(maskRevisionRaf.current);
      maskRevisionRaf.current = null;
    }
    setMaskRevision((value) => value + 1);
  }, []);

  const getSmartCleanContext = useCallback((): SmartCleanContext | null => {
    const sourceImage = sourceRef.current?.image;
    if (!sourceImage) return null;

    const width = sourceRef.current!.width;
    const height = sourceRef.current!.height;
    const cacheKey = `${width}x${height}`;

    const cached = smartCleanContextRef.current;
    if (cached && cached.width === width && cached.height === height) {
      return cached;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(sourceImage, 0, 0, width, height);
    const referenceData = ctx.getImageData(0, 0, width, height).data;
    const context = buildSmartCleanContext(referenceData, width, height);
    smartCleanContextRef.current = context;
    void cacheKey;
    return context;
  }, []);

  const applyMaskBrush = useCallback(
    (
      x: number,
      y: number,
      from?: { x: number; y: number },
    ) => {
      if (!maskBrushTool || !activeLayerIdRef.current) return;

      const layer = findLayerById(layersRef.current, activeLayerIdRef.current);
      if (!layer || layer.type !== "bg-remove" || !layer.enabled) return;

      const raw =
        bgRemoveCache.current.get(layer.id) ?? layer.resultImage ?? null;
      if (!raw) return;

      const width = raw.naturalWidth || raw.width;
      const height = raw.naturalHeight || raw.height;
      let buffer = manualMaskCache.current.get(layer.id);
      if (!buffer) {
        buffer = createManualMaskBuffer(width, height);
        manualMaskCache.current.set(layer.id, buffer);
      }

      const radius = resolveMaskBrushRadius(
        maskBrushTool,
        width,
        height,
        maskBrushSize,
      );
      const smartClean =
        maskBrushTool === "clean" ? getSmartCleanContext() : undefined;

      if (from) {
        paintMaskBrushStroke(
          buffer,
          width,
          height,
          from.x,
          from.y,
          x,
          y,
          radius,
          maskBrushTool,
          1,
          smartClean ?? undefined,
        );
      } else {
        paintMaskBrush(
          buffer,
          width,
          height,
          x,
          y,
          radius,
          maskBrushTool,
          1,
          smartClean ?? undefined,
        );
      }

      scheduleMaskRevision();
    },
    [getSmartCleanContext, maskBrushSize, maskBrushTool, scheduleMaskRevision],
  );

  const paintMaskBrushAt = useCallback(
    (x: number, y: number) => {
      applyMaskBrush(x, y);
    },
    [applyMaskBrush],
  );

  const paintMaskBrushStrokeAt = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number) => {
      applyMaskBrush(toX, toY, { x: fromX, y: fromY });
    },
    [applyMaskBrush],
  );

  const zoomCanvasIn = useCallback(() => {
    setCanvasZoom((value) => Math.min(4, Math.round((value + 0.25) * 100) / 100));
  }, []);

  const zoomCanvasOut = useCallback(() => {
    setCanvasZoom((value) => Math.max(0.5, Math.round((value - 0.25) * 100) / 100));
  }, []);

  const resetCanvasZoom = useCallback(() => {
    setCanvasZoom(1);
  }, []);

  const applyMaskClickAt = useCallback(
    async (x: number, y: number) => {
      if (!maskClickMode || !activeLayerIdRef.current || !sourceRef.current) return;

      const layer = findLayerById(layersRef.current, activeLayerIdRef.current);
      if (!layer || layer.type !== "bg-remove" || !layer.enabled) return;

      const raw =
        bgRemoveCache.current.get(layer.id) ?? layer.resultImage ?? null;
      if (!raw) return;

      const width = raw.naturalWidth || raw.width;
      const height = raw.naturalHeight || raw.height;

      recordHistoryBeforeGesture();
      setIsClickSegmentationLoading(true);
      try {
        let embedding = clickSamCache.current.get(layer.id);
        if (!embedding) {
          embedding = await encodeClickSegmentationImage(sourceRef.current.file);
          clickSamCache.current.set(layer.id, embedding);
        }

        const clickMask = await segmentAtClick(
          embedding,
          x,
          y,
          maskClickMode === "add" ? 1 : 0,
        );

        let buffer = manualMaskCache.current.get(layer.id);
        if (!buffer) {
          buffer = createManualMaskBuffer(width, height);
          manualMaskCache.current.set(layer.id, buffer);
        }

        mergeClickMaskIntoAdjustments(
          buffer,
          clickMask,
          maskClickMode === "add" ? 1 : 0,
        );
        setMaskRevision((value) => value + 1);
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : t("editor.params.maskClickFailed"),
          { title: t("editor.params.maskClickTitle") },
        );
      } finally {
        setIsClickSegmentationLoading(false);
      }
    },
    [maskClickMode, recordHistoryBeforeGesture, showToast, t],
  );

  const loadFile = useCallback(
    async (file: File) => {
      revokeWorkspaceImageUrls(workspaceImagesRef.current);
      workspaceSessionsRef.current.clear();
      composeRunId.current += 1;

      const parsed = await loadImageFromFile(file);
      const workspaceEntry = workspaceImageFromParsed(parsed);

      bgRemoveCache.current.clear();
      manualMaskCache.current.clear();
      clickSamCache.current.clear();
      smartCleanContextRef.current = null;
      overlayCache.current.clear();
      collageCache.current.clear();
      revokeCollageObjectUrls(layersRef.current);
      revokeBgReplaceObjectUrls(layersRef.current);

      setWorkspaceImages([workspaceEntry]);
      setActiveWorkspaceImageId(workspaceEntry.id);
      setSource(workspaceImageToSource(workspaceEntry));
      setLayers([createSourceLayer()]);
      setActiveLayerId(null);
      setMaskBrushTool(null);
      setMaskClickMode(null);
      setCanvasZoom(1);
      setProjectId(null);
      setProjectName(null);
      setComposeError(null);
      clearEditorHistory();
    },
    [clearEditorHistory],
  );

  const buildWorkspaceLayerStacksForSave = useCallback(() => {
    const sessions = new Map(workspaceSessionsRef.current);
    if (activeWorkspaceImageId) {
      sessions.set(
        activeWorkspaceImageId,
        snapshotWorkspaceSession(
          layersRef.current,
          activeLayerIdRef.current,
          bgRemoveCache.current,
        ),
      );
    }

    return Object.fromEntries(
      [...sessions.entries()].map(([id, session]) => [
        id,
        {
          layers: serializeEditorLayers(session.layers),
          activeLayerId: session.activeLayerId,
        },
      ]),
    );
  }, [activeWorkspaceImageId]);

  const buildProjectImages = useCallback(() => {
    if (!source) return [];

    const sessions = new Map(workspaceSessionsRef.current);
    if (activeWorkspaceImageId) {
      sessions.set(activeWorkspaceImageId, {
        layers: layersRef.current,
        activeLayerId: activeLayerIdRef.current,
      });
    }

    const byKey = new Map<string, File>();
    byKey.set(MAIN_IMAGE_KEY, source.file);

    for (const session of sessions.values()) {
      for (const image of collectCollageProjectImages(session.layers)) {
        byKey.set(image.key, image.file);
      }
    }

    for (const image of workspaceImages) {
      if (image.id === activeWorkspaceImageId) continue;
      byKey.set(workspaceImageKey(image.id), image.file);
    }

    return [...byKey.entries()].map(([key, file]) => ({ key, file }));
  }, [activeWorkspaceImageId, source, workspaceImages]);

  const saveProject = useCallback(
    async (name: string) => {
      if (!source) return;
      setIsSavingProject(true);
      try {
        const id = projectId ?? crypto.randomUUID();
        const record = await persistProject({
          id,
          name,
          toolId: EDITOR_PROJECT_TOOL_ID,
          payload: buildEditorProjectPayload(layers, {
            images: serializeWorkspaceImages(workspaceImages),
            activeId: activeWorkspaceImageId,
            layerStacks: buildWorkspaceLayerStacksForSave(),
          }),
          images: buildProjectImages(),
        });
        setProjectId(record.id);
        setProjectName(record.name);
        await refreshProjects();
        showToast(t("editor.project.saved"));
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : t("editor.project.saveFailed"),
        );
      } finally {
        setIsSavingProject(false);
      }
    },
    [source, layers, projectId, showToast, t, refreshProjects, workspaceImages, activeWorkspaceImageId, buildProjectImages, buildWorkspaceLayerStacksForSave],
  );

  const toggleFavorite = useCallback(async () => {
    if (!source) return;

    if (isFavorited) {
      await deleteProject(EDITOR_FAVORITE_PROJECT_ID);
      setIsFavorited(false);
      await refreshProjects();
      showToast(t("editor.favorite.removed"));
      return;
    }

    setIsSavingProject(true);
    try {
      await persistProject({
        id: EDITOR_FAVORITE_PROJECT_ID,
        name: t("editor.favorite.defaultName"),
        toolId: EDITOR_PROJECT_TOOL_ID,
        payload: buildEditorProjectPayload(layers, {
          images: serializeWorkspaceImages(workspaceImages),
          activeId: activeWorkspaceImageId,
          layerStacks: buildWorkspaceLayerStacksForSave(),
        }),
        images: buildProjectImages(),
      });
      setIsFavorited(true);
      await refreshProjects();
      showToast(t("editor.favorite.saved"));
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : t("editor.favorite.saveFailed"),
      );
    } finally {
      setIsSavingProject(false);
    }
  }, [source, layers, isFavorited, showToast, t, refreshProjects, workspaceImages, activeWorkspaceImageId, buildProjectImages, buildWorkspaceLayerStacksForSave]);

  const clear = useCallback(() => {
    revokeWorkspaceImageUrls(workspaceImagesRef.current);
    revokeCollageObjectUrls(layersRef.current);
    revokeBgReplaceObjectUrls(layersRef.current);
    workspaceSessionsRef.current.clear();
    bgRemoveCache.current.clear();
    manualMaskCache.current.clear();
    clickSamCache.current.clear();
    smartCleanContextRef.current = null;
    overlayCache.current.clear();
    collageCache.current.clear();
    setSource(null);
    setLayers([]);
    setActiveLayerId(null);
    setMaskBrushTool(null);
    setMaskClickMode(null);
    setCanvasZoom(1);
    setWorkspaceImages([]);
    setActiveWorkspaceImageId(null);
    setProjectId(null);
    setProjectName(null);
    setComposeError(null);
    clearEditorHistory();
  }, [clearEditorHistory]);

  const addWorkspaceImage = useCallback(
    async (files: FileList | File[]) => {
      const fileList = Array.from(files);
      if (fileList.length === 0) return;

      const added: EditorWorkspaceImage[] = [];
      for (const file of fileList) {
        const parsed = await loadImageFromFile(file);
        added.push(workspaceImageFromParsed(parsed));
      }

      setWorkspaceImages((prev) => [...prev, ...added]);
      showToast(
        added.length === 1
          ? t("editor.workspace.addedOne")
          : t("editor.workspace.addedMany", { count: added.length }),
      );
    },
    [showToast, t],
  );

  const activateWorkspaceImage = useCallback(
    (id: string) => {
      if (id === activeWorkspaceImageIdRef.current) return;

      const target = workspaceImagesRef.current.find((image) => image.id === id);
      if (!target) return;

      const previousId = activeWorkspaceImageIdRef.current;
      if (previousId) {
        workspaceSessionsRef.current.set(
          previousId,
          snapshotWorkspaceSession(
            layersRef.current,
            activeLayerIdRef.current,
            bgRemoveCache.current,
          ),
        );
      }

      const saved = workspaceSessionsRef.current.get(id);
      const restoredLayers = saved?.layers ?? [createSourceLayer()];
      const restoredActiveLayerId = saved?.activeLayerId ?? null;

      composeRunId.current += 1;
      bgRemoveCache.current.clear();
      manualMaskCache.current.clear();
      clickSamCache.current.clear();
      smartCleanContextRef.current = null;
      overlayCache.current.clear();
      collageCache.current.clear();
      restoreLayerCachesFromSession(
        restoredLayers,
        bgRemoveCache.current,
        overlayCache.current,
        collageCache.current,
      );

      setSource(workspaceImageToSource(target));
      setLayers(restoredLayers);
      setActiveLayerId(restoredActiveLayerId);
      setActiveWorkspaceImageId(id);
      setComposeError(null);
      clearEditorHistory();
      showToast(t("editor.workspace.switched"));
    },
    [clearEditorHistory, showToast, t],
  );

  const removeWorkspaceImage = useCallback(
    (id: string) => {
      const images = workspaceImagesRef.current;
      if (images.length <= 1) {
        showToast(t("editor.workspace.cannotRemoveLast"));
        return;
      }

      const target = images.find((image) => image.id === id);
      if (!target) return;

      const currentId = activeWorkspaceImageIdRef.current;
      const isActive = currentId === id;
      const fallback = images.find((image) => image.id !== id);
      if (!fallback) return;

      if (currentId && !isActive) {
        workspaceSessionsRef.current.set(
          currentId,
          snapshotWorkspaceSession(
            layersRef.current,
            activeLayerIdRef.current,
            bgRemoveCache.current,
          ),
        );
      }

      workspaceSessionsRef.current.delete(id);
      URL.revokeObjectURL(target.url);

      setWorkspaceImages((prev) => prev.filter((image) => image.id !== id));

      if (!isActive) {
        showToast(t("editor.workspace.removed"));
        return;
      }

      const saved = workspaceSessionsRef.current.get(fallback.id);
      const restoredLayers = saved?.layers ?? [createSourceLayer()];
      const restoredActiveLayerId = saved?.activeLayerId ?? null;

      composeRunId.current += 1;
      bgRemoveCache.current.clear();
      manualMaskCache.current.clear();
      clickSamCache.current.clear();
      smartCleanContextRef.current = null;
      overlayCache.current.clear();
      collageCache.current.clear();
      restoreLayerCachesFromSession(
        restoredLayers,
        bgRemoveCache.current,
        overlayCache.current,
        collageCache.current,
      );

      setSource(workspaceImageToSource(fallback));
      setLayers(restoredLayers);
      setActiveLayerId(restoredActiveLayerId);
      setActiveWorkspaceImageId(fallback.id);
      setComposeError(null);
      clearEditorHistory();
      showToast(t("editor.workspace.removed"));
    },
    [clearEditorHistory, showToast, t],
  );

  const selectLayer = useCallback((id: string | null) => {
    setActiveLayerId(id);
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    recordHistoryImmediate();
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id && layer.type !== "source"
          ? { ...layer, visible: !layer.visible }
          : layer,
      ),
    );
  }, [recordHistoryImmediate]);

  const toggleLayerLock = useCallback((id: string) => {
    recordHistoryImmediate();
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id && layer.type !== "source"
          ? { ...layer, locked: !layer.locked }
          : layer,
      ),
    );
  }, [recordHistoryImmediate]);

  const deleteLayer = useCallback(
    (id: string) => {
      recordHistoryImmediate();
      setLayers((prev) => {
        const target = prev.find((l) => l.id === id);
        if (!target || target.type === "source" || target.locked) return prev;
        invalidateBgRemoveCache(bgRemoveCache.current, id);
        invalidateManualMaskCache(manualMaskCache.current, id);
        clickSamCache.current.delete(id);
        invalidateOverlayCache(overlayCache.current, id);
        if (target.type === "collage") {
          invalidateCollageLayerCache(collageCache.current, target);
          for (const slot of target.images) {
            if (slot.objectUrl) URL.revokeObjectURL(slot.objectUrl);
          }
        }
        const next = prev.filter((l) => l.id !== id);
        if (activeLayerId === id) {
          setActiveLayerId(next[next.length - 1]?.id ?? null);
        }
        return next;
      });
    },
    [activeLayerId, recordHistoryImmediate],
  );

  const reorderLayers = useCallback((fromIndex: number, toIndex: number) => {
    recordHistoryImmediate();
    setLayers((prev) => {
      if (fromIndex < 1 || toIndex < 1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved || moved.type === "source") return prev;
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, [recordHistoryImmediate]);

  const updateLayer = useCallback(
    (id: string, updater: (layer: EditorLayer) => EditorLayer) => {
      beginHistoryBurst();
      setLayers((prev) =>
        prev.map((layer) => {
          if (layer.id !== id) return layer;
          if (layer.locked && layer.type !== "source") return layer;
          const updated = updater(layer);
          if (layer.type === "bg-remove" && updated.type === "bg-remove") {
            if (layer.enabled !== updated.enabled) {
              invalidateBgRemoveCache(bgRemoveCache.current, id);
              invalidateManualMaskCache(manualMaskCache.current, id);
              clickSamCache.current.delete(id);
              return { ...updated, resultImage: null };
            }
          }
          if (layer.type === "image-overlay" && updated.type === "image-overlay") {
            if (layer.presetId !== updated.presetId) {
              invalidateOverlayCache(overlayCache.current, id);
              return { ...updated, loadedImage: null };
            }
          }
          if (layer.type === "export-svg" && updated.type === "export-svg") {
            if (
              layer.settings.complexity !== updated.settings.complexity ||
              layer.settings.colorMode !== updated.settings.colorMode ||
              layer.settings.simplifyPaths !== updated.settings.simplifyPaths
            ) {
              return { ...updated, svgOutput: null, processing: false };
            }
          }
          return updated;
        }),
      );
    },
    [beginHistoryBurst],
  );

  const addCollageImages = useCallback((layerId: string, files: FileList | File[]) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    recordHistoryImmediate();
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId || layer.type !== "collage") return layer;

        const newSlots = fileList.map((file) => ({
          id: createLayerId(),
          fileName: file.name,
          file,
          objectUrl: URL.createObjectURL(file),
          loadedImage: null,
        }));

        return { ...layer, images: [...layer.images, ...newSlots] };
      }),
    );
  }, [recordHistoryImmediate]);

  const addWorkspaceImagesToCollage = useCallback(
    (layerId: string) => {
      let addedCount = 0;

      recordHistoryImmediate();
      setLayers((prev) =>
        prev.map((layer) => {
          if (layer.id !== layerId || layer.type !== "collage") return layer;

          const existingFiles = new Set(layer.images.map((slot) => slot.file));
          const candidates = workspaceImagesRef.current.filter((image) => {
            if (existingFiles.has(image.file)) return false;
            if (layer.includeSource && image.id === activeWorkspaceImageId) {
              return false;
            }
            return true;
          });

          if (candidates.length === 0) return layer;

          addedCount = candidates.length;
          const newSlots = candidates.map((image) => ({
            id: createLayerId(),
            fileName: image.name,
            file: image.file,
            objectUrl: URL.createObjectURL(image.file),
            loadedImage: null,
          }));

          return { ...layer, images: [...layer.images, ...newSlots] };
        }),
      );

      if (addedCount === 0) {
        showToast(t("editor.params.collageNoWorkspaceImages"));
        return;
      }

      showToast(
        addedCount === 1
          ? t("editor.params.collageAddedFromWorkspaceOne")
          : t("editor.params.collageAddedFromWorkspaceMany", { count: addedCount }),
      );
    },
    [activeWorkspaceImageId, recordHistoryImmediate, showToast, t],
  );

  const removeCollageImage = useCallback((layerId: string, slotId: string) => {
    recordHistoryImmediate();
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId || layer.type !== "collage") return layer;

        const slot = layer.images.find((item) => item.id === slotId);
        if (slot?.objectUrl) URL.revokeObjectURL(slot.objectUrl);
        invalidateCollageCache(collageCache.current, slotId);

        return {
          ...layer,
          images: layer.images.filter((item) => item.id !== slotId),
        };
      }),
    );
  }, [recordHistoryImmediate]);

  const addToolAction = useCallback(
    (action: EditorToolAction) => {
      if (!source) return;

      const newLayer = createLayerForTool(action, source.width, source.height);
      if (!newLayer) {
        showToast(t("editor.toolUnavailable"));
        return;
      }

      recordHistoryImmediate();
      setLayers((prev) => [...prev, newLayer]);
      setActiveLayerId(newLayer.id);
      setOpenCategory(null);
    },
    [recordHistoryImmediate, source, showToast, t],
  );

  const download = useCallback(
    async (format?: ImageFormat) => {
      if (!source || !previewCanvasRef.current) return;

      const metadataLayer = layers.find(
        (l) => l.type === "metadata" && l.visible,
      );
      const compressLayer = layers.find(
        (l) => l.type === "compress" && l.visible,
      );
      const convertLayer = layers.find(
        (l) => l.type === "convert" && l.visible,
      );

      const stripMetadata =
        metadataLayer?.type === "metadata" ? metadataLayer.stripMetadata : true;
      const quality =
        compressLayer?.type === "compress" ? compressLayer.quality / 100 : 0.92;
      const resolvedFormat = resolveEditorDownloadFormat(source.file.type, {
        explicitFormat: format,
        compressLayerVisible: compressLayer?.type === "compress",
        convertLayer:
          convertLayer?.type === "convert" ? convertLayer : undefined,
      });

      await handleDownload(
        previewCanvasRef.current,
        buildDownloadFilename(source.name, resolvedFormat),
        {
          format: resolvedFormat,
          quality,
          stripMetadata,
        },
      );
    },
    [source, layers],
  );

  const value = useMemo<EditorContextValue>(
    () => ({
      source,
      layers,
      activeLayerId,
      activeLayer,
      isComposing,
      composeError,
      openCategory,
      issueCount,
      magnifierZoom,
      canvasZoom,
      zoomCanvasIn,
      zoomCanvasOut,
      resetCanvasZoom,
      setCanvasZoom,
      loadFile,
      clear,
      setOpenCategory,
      selectLayer,
      toggleLayerVisibility,
      toggleLayerLock,
      deleteLayer,
      reorderLayers,
      updateLayer,
      addToolAction,
      download,
      previewCanvasRef,
      projectId,
      projectName,
      isFavorited,
      isSavingProject,
      saveProject,
      loadFromProjectId,
      toggleFavorite,
      addCollageImages,
      removeCollageImage,
      addWorkspaceImagesToCollage,
      workspaceImages,
      activeWorkspaceImageId,
      addWorkspaceImage,
      activateWorkspaceImage,
      removeWorkspaceImage,
      maskBrushTool,
      setMaskBrushTool,
      maskBrushSize,
      setMaskBrushSize,
      maskBrushReady,
      paintMaskBrushAt,
      paintMaskBrushStrokeAt,
      commitMaskBrushRevision,
      maskClickMode,
      setMaskClickMode,
      maskClickReady,
      isClickSegmentationLoading,
      applyMaskClickAt,
      canUndo,
      canRedo,
      undo,
      redo,
      recordHistoryBeforeGesture,
    }),
    [
      source,
      layers,
      activeLayerId,
      activeLayer,
      isComposing,
      composeError,
      openCategory,
      issueCount,
      magnifierZoom,
      canvasZoom,
      zoomCanvasIn,
      zoomCanvasOut,
      resetCanvasZoom,
      loadFile,
      clear,
      selectLayer,
      toggleLayerVisibility,
      toggleLayerLock,
      deleteLayer,
      reorderLayers,
      updateLayer,
      addToolAction,
      download,
      projectId,
      projectName,
      isFavorited,
      isSavingProject,
      saveProject,
      loadFromProjectId,
      toggleFavorite,
      addCollageImages,
      removeCollageImage,
      addWorkspaceImagesToCollage,
      workspaceImages,
      activeWorkspaceImageId,
      addWorkspaceImage,
      activateWorkspaceImage,
      removeWorkspaceImage,
      maskBrushTool,
      maskBrushSize,
      maskBrushReady,
      paintMaskBrushAt,
      paintMaskBrushStrokeAt,
      commitMaskBrushRevision,
      maskClickMode,
      maskClickReady,
      isClickSegmentationLoading,
      applyMaskClickAt,
      canUndo,
      canRedo,
      undo,
      redo,
      recordHistoryBeforeGesture,
    ],
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor must be used within EditorProvider");
  }
  return ctx;
}

export function useOptionalEditor(): EditorContextValue | null {
  return useContext(EditorContext);
}

export { EDITOR_CATEGORIES };
