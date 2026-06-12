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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SaveProjectModal } from "@/components/projects/SaveProjectModal";
import { getProject, loadProjectImages, saveProject } from "@/lib/projects/save";
import type { ProjectImageInput } from "@/lib/projects/types";
import type { ToolId } from "@/lib/tools";
import { useProjects } from "@/components/projects/ProjectsContext";

export interface ToolProjectSnapshot {
  payload: Record<string, unknown>;
  images: ProjectImageInput[];
}

export interface ToolProjectHandlers {
  canSave: boolean;
  getSnapshot: () => ToolProjectSnapshot | null;
  restore: (
    payload: Record<string, unknown>,
    files: Map<string, File>,
  ) => void | Promise<void>;
}

interface ToolProjectContextValue {
  canSave: boolean;
  openSaveModal: () => void;
  registerHandlers: (handlers: ToolProjectHandlers | null) => void;
}

const ToolProjectContext = createContext<ToolProjectContextValue | null>(null);

interface ToolProjectProviderProps {
  toolId: ToolId;
  children: ReactNode;
}

export function ToolProjectProvider({
  toolId,
  children,
}: ToolProjectProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { refreshProjects } = useProjects();

  const handlersRef = useRef<ToolProjectHandlers | null>(null);
  const restoredIdRef = useRef<string | null>(null);
  const [canSave, setCanSave] = useState(false);
  const [handlersReady, setHandlersReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [defaultName, setDefaultName] = useState("");
  const [restoreError, setRestoreError] = useState<string | null>(null);

  const registerHandlers = useCallback((handlers: ToolProjectHandlers | null) => {
    handlersRef.current = handlers;
    setCanSave(handlers?.canSave ?? false);
    setHandlersReady(handlers !== null);
  }, []);

  const openSaveModal = useCallback(() => {
    setEditingProjectId(null);
    setDefaultName("");
    setIsModalOpen(true);
  }, []);

  const runRestore = useCallback(
    async (projectId: string) => {
      const handlers = handlersRef.current;
      if (!handlers) return;

      setIsRestoring(true);
      setRestoreError(null);

      try {
        const record = await getProject(projectId);
        if (!record) {
          throw new Error("Project not found.");
        }

        if (record.toolId !== toolId) {
          throw new Error("Project tool mismatch.");
        }

        const files = await loadProjectImages(record);
        await handlers.restore(record.payload, files);
      } catch (cause) {
        setRestoreError(
          cause instanceof Error ? cause.message : "Failed to restore project.",
        );
      } finally {
        setIsRestoring(false);
        router.replace(pathname);
      }
    },
    [pathname, router, toolId],
  );

  useEffect(() => {
    const projectId = searchParams.get("project");
    if (!projectId || !handlersReady || isRestoring) return;
    if (restoredIdRef.current === projectId) return;

    restoredIdRef.current = projectId;
    void runRestore(projectId);
  }, [searchParams, handlersReady, isRestoring, runRestore]);

  const handleSave = useCallback(
    async (name: string) => {
      const handlers = handlersRef.current;
      const snapshot = handlers?.getSnapshot();
      if (!handlers || !snapshot) return;

      setIsSaving(true);

      try {
        await saveProject({
          id: editingProjectId ?? undefined,
          name,
          toolId,
          payload: snapshot.payload,
          images: snapshot.images,
        });
        await refreshProjects();
        setIsModalOpen(false);
        setEditingProjectId(null);
      } finally {
        setIsSaving(false);
      }
    },
    [editingProjectId, refreshProjects, toolId],
  );

  const value = useMemo(
    () => ({
      canSave,
      openSaveModal,
      registerHandlers,
    }),
    [canSave, openSaveModal, registerHandlers],
  );

  return (
    <ToolProjectContext.Provider value={value}>
      {children}
      {restoreError ? (
        <p className="mt-3 text-center font-mono text-[10px] text-red-400">
          {restoreError}
        </p>
      ) : null}
      <SaveProjectModal
        open={isModalOpen}
        defaultName={defaultName}
        isSaving={isSaving}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </ToolProjectContext.Provider>
  );
}

export function useToolProjectContext(): ToolProjectContextValue {
  const context = useContext(ToolProjectContext);

  if (!context) {
    throw new Error("useToolProjectContext must be used within ToolProjectProvider");
  }

  return context;
}

export function useOptionalToolProjectContext(): ToolProjectContextValue | null {
  return useContext(ToolProjectContext);
}
