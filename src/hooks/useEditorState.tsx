"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import {
  composeLayers,
  invalidateBgRemoveCache,
  invalidateCollageCache,
  invalidateCollageLayerCache,
  invalidateOverlayCache,
} from "@/lib/editor/compositor";
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
  layersFromEditorPayload,
  revokeCollageObjectUrls,
} from "@/lib/editor/editorProject";
import {
  revokeWorkspaceImageUrls,
  serializeWorkspaceImages,
  workspaceImageFromParsed,
  workspaceImageKey,
  workspaceImageToSource,
  type EditorWorkspaceImage,
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
  activateWorkspaceImage: (id: string) => Promise<void>;
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
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgRemoveCache = useRef(new Map<string, HTMLImageElement>());
  const overlayCache = useRef(new Map<string, HTMLImageElement>());
  const collageCache = useRef(new Map<string, HTMLImageElement>());
  const composeVersion = useRef(0);
  const layersRef = useRef(layers);
  layersRef.current = layers;
  const workspaceImagesRef = useRef(workspaceImages);
  workspaceImagesRef.current = workspaceImages;

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

  useEffect(() => {
    void getProject(EDITOR_FAVORITE_PROJECT_ID).then((record) => {
      setIsFavorited(!!record);
    });
  }, []);

  const applyEditorSession = useCallback(
    async (
      file: File,
      restoredLayers: EditorLayer[],
      session?: { projectId?: string | null; projectName?: string | null },
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
      overlayCache.current.clear();
      collageCache.current.clear();
      revokeCollageObjectUrls(layersRef.current);
      setSource({
        file: parsed.file,
        url: parsed.objectUrl,
        width: parsed.width,
        height: parsed.height,
        name: parsed.name,
        image: parsed.image,
      });
      setLayers(restoredLayers);
      setActiveLayerId(restoredLayers[restoredLayers.length - 1]?.id ?? null);
      setProjectId(session?.projectId ?? null);
      setProjectName(session?.projectName ?? null);
      setComposeError(null);
    },
    [source],
  );

  const loadFromProjectId = useCallback(
    async (id: string) => {
      const record = await getProject(id);
      if (!record) return false;

      const images = await loadProjectImages(record);
      const mainFile = images.get(MAIN_IMAGE_KEY);
      if (!mainFile) return false;

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
        hydratedWorkspace.find((image) => image.id === activeId) ?? hydratedWorkspace[0]!;

      setWorkspaceImages(hydratedWorkspace);
      setActiveWorkspaceImageId(activeId);
      await applyEditorSession(activeImage.file, restoredLayers, {
        projectId: record.id,
        projectName: record.name,
      });
      return true;
    },
    [applyEditorSession],
  );

  const runCompose = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const version = ++composeVersion.current;
    setIsComposing(true);
    setComposeError(null);

    try {
      await composeLayers(source, layersRef.current, previewCanvasRef.current, {
        bgRemoveCache: bgRemoveCache.current,
        overlayCache: overlayCache.current,
        collageCache: collageCache.current,
        onBgRemoveProgress: (layerId, processing) => {
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
        shouldCancelCompose: () => version !== composeVersion.current,
        onSvgTraceStart: (layerId) => {
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
          if (version !== composeVersion.current) return;
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
          if (version !== composeVersion.current) return;
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
      });

      if (version !== composeVersion.current) return;

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
      if (version !== composeVersion.current) return;
      setComposeError(
        error instanceof Error ? error.message : "Composition failed.",
      );
    } finally {
      if (version === composeVersion.current) {
        setIsComposing(false);
      }
    }
  }, [source, t]);

  useEffect(() => {
    if (!source) return;
    const frame = requestAnimationFrame(() => {
      void runCompose();
    });
    return () => cancelAnimationFrame(frame);
  }, [source, layers, runCompose]);

  const loadFile = useCallback(
    async (file: File) => {
      revokeWorkspaceImageUrls(workspaceImagesRef.current);
      const parsed = await loadImageFromFile(file);
      const workspaceEntry = workspaceImageFromParsed(parsed);
      setWorkspaceImages([workspaceEntry]);
      setActiveWorkspaceImageId(workspaceEntry.id);
      await applyEditorSession(file, [createSourceLayer()], {
        projectId: null,
        projectName: null,
      });
    },
    [applyEditorSession],
  );

  const buildProjectImages = useCallback(() => {
    if (!source || !activeWorkspaceImageId) {
      return [{ key: MAIN_IMAGE_KEY, file: source!.file }];
    }

    return [
      { key: MAIN_IMAGE_KEY, file: source.file },
      ...collectCollageProjectImages(layers),
      ...workspaceImages
        .filter((image) => image.id !== activeWorkspaceImageId)
        .map((image) => ({
          key: workspaceImageKey(image.id),
          file: image.file,
        })),
    ];
  }, [activeWorkspaceImageId, layers, source, workspaceImages]);

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
    [source, layers, projectId, showToast, t, refreshProjects, workspaceImages, activeWorkspaceImageId, buildProjectImages],
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
  }, [source, layers, isFavorited, showToast, t, refreshProjects, workspaceImages, activeWorkspaceImageId, buildProjectImages]);

  const clear = useCallback(() => {
    revokeWorkspaceImageUrls(workspaceImagesRef.current);
    revokeCollageObjectUrls(layersRef.current);
    bgRemoveCache.current.clear();
    overlayCache.current.clear();
    collageCache.current.clear();
    setSource(null);
    setLayers([]);
    setActiveLayerId(null);
    setWorkspaceImages([]);
    setActiveWorkspaceImageId(null);
    setProjectId(null);
    setProjectName(null);
    setComposeError(null);
  }, [source]);

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
    async (id: string) => {
      if (id === activeWorkspaceImageId) return;

      const target = workspaceImagesRef.current.find((image) => image.id === id);
      if (!target) return;

      bgRemoveCache.current.clear();
      overlayCache.current.clear();
      collageCache.current.clear();
      revokeCollageObjectUrls(layersRef.current);

      setSource(workspaceImageToSource(target));
      setLayers([createSourceLayer()]);
      setActiveLayerId(null);
      setActiveWorkspaceImageId(id);
      setComposeError(null);
      showToast(t("editor.workspace.switched"));
    },
    [activeWorkspaceImageId, showToast, t],
  );

  const selectLayer = useCallback((id: string | null) => {
    setActiveLayerId(id);
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id && layer.type !== "source"
          ? { ...layer, visible: !layer.visible }
          : layer,
      ),
    );
  }, []);

  const toggleLayerLock = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id && layer.type !== "source"
          ? { ...layer, locked: !layer.locked }
          : layer,
      ),
    );
  }, []);

  const deleteLayer = useCallback(
    (id: string) => {
      setLayers((prev) => {
        const target = prev.find((l) => l.id === id);
        if (!target || target.type === "source" || target.locked) return prev;
        invalidateBgRemoveCache(bgRemoveCache.current, id);
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
    [activeLayerId],
  );

  const reorderLayers = useCallback((fromIndex: number, toIndex: number) => {
    setLayers((prev) => {
      if (fromIndex < 1 || toIndex < 1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved || moved.type === "source") return prev;
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const updateLayer = useCallback(
    (id: string, updater: (layer: EditorLayer) => EditorLayer) => {
      setLayers((prev) =>
        prev.map((layer) => {
          if (layer.id !== id) return layer;
          if (layer.locked && layer.type !== "source") return layer;
          const updated = updater(layer);
          if (layer.type === "bg-remove" && updated.type === "bg-remove") {
            if (
              layer.advancedEdges !== updated.advancedEdges ||
              layer.subjectMasking !== updated.subjectMasking ||
              layer.depthEstimation !== updated.depthEstimation ||
              layer.enabled !== updated.enabled
            ) {
              invalidateBgRemoveCache(bgRemoveCache.current, id);
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
    [],
  );

  const addCollageImages = useCallback((layerId: string, files: FileList | File[]) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

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
  }, []);

  const addWorkspaceImagesToCollage = useCallback(
    (layerId: string) => {
      let addedCount = 0;

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
    [activeWorkspaceImageId, showToast, t],
  );

  const removeCollageImage = useCallback((layerId: string, slotId: string) => {
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
  }, []);

  const addToolAction = useCallback(
    (action: EditorToolAction) => {
      if (!source) return;

      const newLayer = createLayerForTool(action, source.width, source.height);
      if (!newLayer) {
        showToast(t("editor.toolUnavailable"));
        return;
      }

      setLayers((prev) => [...prev, newLayer]);
      setActiveLayerId(newLayer.id);
      setOpenCategory(null);
    },
    [source, showToast, t],
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
      const resolvedFormat =
        format ??
        (convertLayer?.type === "convert" ? convertLayer.format : "png");

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
