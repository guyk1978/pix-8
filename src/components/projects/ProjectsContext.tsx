"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { deleteProject, listProjects } from "@/lib/projects/save";
import type { SavedProjectRecord } from "@/lib/projects/types";

interface ProjectsContextValue {
  projects: SavedProjectRecord[];
  isLoading: boolean;
  refreshProjects: () => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<SavedProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      setProjects(await listProjects());
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeProject = useCallback(
    async (id: string) => {
      await deleteProject(id);
      await refreshProjects();
    },
    [refreshProjects],
  );

  useEffect(() => {
    void refreshProjects();
  }, [refreshProjects]);

  const value = useMemo(
    () => ({
      projects,
      isLoading,
      refreshProjects,
      removeProject,
    }),
    [projects, isLoading, refreshProjects, removeProject],
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextValue {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }

  return context;
}
