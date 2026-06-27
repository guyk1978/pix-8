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
import { loadPinnedTools, savePinnedTools } from "@/lib/pinnedTools";
import type { ToolId } from "@/lib/tools";

interface PinnedToolsContextValue {
  pinnedTools: ToolId[];
  isPinned: (toolId: ToolId) => boolean;
  togglePinned: (toolId: ToolId) => void;
}

const PinnedToolsContext = createContext<PinnedToolsContextValue | null>(null);

export function PinnedToolsProvider({ children }: { children: ReactNode }) {
  const [pinnedTools, setPinnedTools] = useState<ToolId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPinnedTools(loadPinnedTools());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePinnedTools(pinnedTools);
  }, [pinnedTools, hydrated]);

  const isPinned = useCallback(
    (toolId: ToolId) => pinnedTools.includes(toolId),
    [pinnedTools],
  );

  const togglePinned = useCallback((toolId: ToolId) => {
    setPinnedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  }, []);

  const value = useMemo(
    () => ({ pinnedTools, isPinned, togglePinned }),
    [pinnedTools, isPinned, togglePinned],
  );

  return (
    <PinnedToolsContext.Provider value={value}>{children}</PinnedToolsContext.Provider>
  );
}

export function usePinnedTools(): PinnedToolsContextValue {
  const ctx = useContext(PinnedToolsContext);
  if (!ctx) {
    throw new Error("usePinnedTools must be used within PinnedToolsProvider");
  }
  return ctx;
}
