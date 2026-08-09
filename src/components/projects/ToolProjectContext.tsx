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
import { MarkFinalResultPrompt } from "@/components/projects/MarkFinalResultPrompt";
import { SaveProjectModal } from "@/components/projects/SaveProjectModal";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useProjects } from "@/components/projects/ProjectsContext";
import { getProject, loadProjectImages, saveProject } from "@/lib/projects/save";
import type { ProjectImageInput } from "@/lib/projects/types";
import type { ToolId } from "@/lib/tools";

export interface ToolProjectSnapshot {
  payload: Record<string, unknown>;
  images: ProjectImageInput[];
}

export interface ToolProjectRestoreMeta {
  isResultMarked: boolean;
}

export interface ToolResultMarkRegistration {
  isResultMarked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  hint?: string | null;
  checkboxId?: string;
}

export interface ToolProjectHandlers {
  canSave: boolean;
  isResultMarked: boolean;
  getSnapshot: () => ToolProjectSnapshot | null;
  restore: (
    payload: Record<string, unknown>,
    files: Map<string, File>,
  ) => void | Promise<void>;
}

interface ToolProjectContextValue {
  toolId: ToolId;
  canSave: boolean;
  isResultMarked: boolean;
  resultMark: ToolResultMarkRegistration | null;
  openSaveModal: () => void;
  registerHandlers: (handlers: ToolProjectHandlers | null) => void;
  registerResultMark: (registration: ToolResultMarkRegistration | null) => void;
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
  const { t } = useLanguage();

  const handlersRef = useRef<ToolProjectHandlers | null>(null);
  const restoredIdRef = useRef<string | null>(null);
  const [canSave, setCanSave] = useState(false);
  const [isResultMarked, setIsResultMarked] = useState(false);
  const [resultMark, setResultMark] = useState<ToolResultMarkRegistration | null>(
    null,
  );
  const [handlersReady, setHandlersReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMarkPromptOpen, setIsMarkPromptOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [defaultName, setDefaultName] = useState("");
  const [restoreError, setRestoreError] = useState<string | null>(null);

  const registerHandlers = useCallback((handlers: ToolProjectHandlers | null) => {
    handlersRef.current = handlers;
    setCanSave(handlers?.canSave ?? false);
    setIsResultMarked(handlers?.isResultMarked ?? false);
    setHandlersReady(handlers !== null);
  }, []);

  const registerResultMark = useCallback(
    (registration: ToolResultMarkRegistration | null) => {
      setResultMark(registration);
      if (registration) {
        setIsResultMarked(registration.isResultMarked);
      }
    },
    [],
  );

  const openSaveModal = useCallback(() => {
    const handlers = handlersRef.current;
    if (!handlers?.canSave) return;

    if (!handlers.isResultMarked) {
      setIsMarkPromptOpen(true);
      return;
    }

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
          throw new Error(t("projects.restoreNotFound"));
        }

        if (record.toolId !== toolId) {
          throw new Error(t("projects.restoreToolMismatch"));
        }

        const files = await loadProjectImages(record);
        await handlers.restore(record.payload, files);
      } catch (cause) {
        setRestoreError(
          cause instanceof Error ? cause.message : t("projects.restoreFailed"),
        );
        restoredIdRef.current = null;
      } finally {
        setIsRestoring(false);
        const params = new URLSearchParams(searchParams.toString());
        if (params.has("project")) {
          params.delete("project");
          const qs = params.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname);
        } else {
          router.replace(pathname);
        }
      }
    },
    [pathname, router, searchParams, t, toolId],
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
      if (!handlers || !snapshot || !handlers.isResultMarked) return;

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
      toolId,
      canSave,
      isResultMarked,
      resultMark,
      openSaveModal,
      registerHandlers,
      registerResultMark,
    }),
    [
      toolId,
      canSave,
      isResultMarked,
      openSaveModal,
      registerHandlers,
      registerResultMark,
      resultMark,
    ],
  );

  return (
    <ToolProjectContext.Provider value={value}>
      {children}
      {restoreError ? (
        <p className="mt-3 text-center font-mono text-[10px] text-red-400">
          {restoreError}
        </p>
      ) : null}
      <MarkFinalResultPrompt
        open={isMarkPromptOpen}
        onClose={() => setIsMarkPromptOpen(false)}
      />
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
