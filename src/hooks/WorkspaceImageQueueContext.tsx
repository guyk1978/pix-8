"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface WorkspaceQueueItem {
  id: string;
  file: File;
  thumbUrl: string;
  name: string;
  width: number;
  height: number;
}

export interface WorkspaceImageQueueState {
  items: WorkspaceQueueItem[];
  activeId: string | null;
  isLoading: boolean;
  selectItem: (id: string) => void;
  addFiles: (files: FileList | File[]) => void;
}

interface WorkspaceImageQueueContextValue {
  state: WorkspaceImageQueueState | null;
  setState: (state: WorkspaceImageQueueState | null) => void;
}

const WorkspaceImageQueueContext =
  createContext<WorkspaceImageQueueContextValue | null>(null);

export function WorkspaceImageQueueProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceImageQueueState | null>(null);

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  );

  return (
    <WorkspaceImageQueueContext.Provider value={value}>
      {children}
    </WorkspaceImageQueueContext.Provider>
  );
}

export function useOptionalWorkspaceImageQueuePublisher():
  | ((state: WorkspaceImageQueueState | null) => void)
  | null {
  return useContext(WorkspaceImageQueueContext)?.setState ?? null;
}

export function useOptionalWorkspaceImageQueue(): WorkspaceImageQueueState | null {
  return useContext(WorkspaceImageQueueContext)?.state ?? null;
}
