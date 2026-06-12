"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ToolId } from "@/lib/tools";

interface ToolSidebarContextValue {
  toolId: ToolId | null;
  toolName: string | null;
  toolTag: string | null;
  hasActiveImage: boolean;
  setToolMeta: (meta: { toolId: ToolId; toolName: string; toolTag: string } | null) => void;
  setHasActiveImage: (active: boolean) => void;
  controlsContainer: HTMLDivElement | null;
  setControlsContainer: (element: HTMLDivElement | null) => void;
  activeSlotCount: number;
  registerSlotPresence: (id: string, present: boolean) => void;
  footerActions: ReactNode | null;
  setFooterActions: (actions: ReactNode | null) => void;
}

const ToolSidebarContext = createContext<ToolSidebarContextValue | null>(null);

export function ToolSidebarProvider({ children }: { children: ReactNode }) {
  const [toolMeta, setToolMetaState] = useState<{
    toolId: ToolId;
    toolName: string;
    toolTag: string;
  } | null>(null);
  const [hasActiveImage, setHasActiveImageState] = useState(false);
  const [controlsContainer, setControlsContainerState] = useState<HTMLDivElement | null>(
    null,
  );
  const [activeSlotIds, setActiveSlotIds] = useState<Set<string>>(() => new Set());
  const [footerActions, setFooterActionsState] = useState<ReactNode | null>(null);

  const setToolMeta = useCallback(
    (meta: { toolId: ToolId; toolName: string; toolTag: string } | null) => {
      setToolMetaState((current) => {
        if (!meta) {
          return current === null ? current : null;
        }
        if (
          current?.toolId === meta.toolId &&
          current.toolName === meta.toolName &&
          current.toolTag === meta.toolTag
        ) {
          return current;
        }
        return meta;
      });

      if (!meta) {
        setActiveSlotIds((current) => (current.size === 0 ? current : new Set()));
        setFooterActionsState((current) => (current === null ? current : null));
      }
    },
    [],
  );

  const setHasActiveImage = useCallback((active: boolean) => {
    setHasActiveImageState((current) => (current === active ? current : active));
    if (!active) {
      setActiveSlotIds((current) => (current.size === 0 ? current : new Set()));
    }
  }, []);

  const setControlsContainer = useCallback((element: HTMLDivElement | null) => {
    setControlsContainerState((current) => (current === element ? current : element));
  }, []);

  const registerSlotPresence = useCallback((id: string, present: boolean) => {
    setActiveSlotIds((current) => {
      const has = current.has(id);
      if (present && has) return current;
      if (!present && !has) return current;

      const next = new Set(current);
      if (present) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const setFooterActions = useCallback((actions: ReactNode | null) => {
    setFooterActionsState((current) => (current === actions ? current : actions));
  }, []);

  const value = useMemo<ToolSidebarContextValue>(
    () => ({
      toolId: toolMeta?.toolId ?? null,
      toolName: toolMeta?.toolName ?? null,
      toolTag: toolMeta?.toolTag ?? null,
      hasActiveImage,
      setToolMeta,
      setHasActiveImage,
      controlsContainer,
      setControlsContainer,
      activeSlotCount: activeSlotIds.size,
      registerSlotPresence,
      footerActions,
      setFooterActions,
    }),
    [
      toolMeta,
      hasActiveImage,
      setToolMeta,
      setHasActiveImage,
      controlsContainer,
      setControlsContainer,
      activeSlotIds,
      registerSlotPresence,
      footerActions,
      setFooterActions,
    ],
  );

  return (
    <ToolSidebarContext.Provider value={value}>{children}</ToolSidebarContext.Provider>
  );
}

export function useToolSidebar() {
  const context = useContext(ToolSidebarContext);
  if (!context) {
    throw new Error("useToolSidebar must be used within ToolSidebarProvider");
  }
  return context;
}

export function useOptionalToolSidebar() {
  return useContext(ToolSidebarContext);
}
