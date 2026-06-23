"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ToolWorkspaceActionsContextValue {
  container: HTMLDivElement | null;
  setContainer: (element: HTMLDivElement | null) => void;
}

const ToolWorkspaceActionsContext =
  createContext<ToolWorkspaceActionsContextValue | null>(null);

export function ToolWorkspaceActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <ToolWorkspaceActionsContext.Provider value={{ container, setContainer }}>
      {children}
    </ToolWorkspaceActionsContext.Provider>
  );
}

export function ToolWorkspaceActionsTarget() {
  const context = useContext(ToolWorkspaceActionsContext);
  if (!context) return null;

  return (
    <div
      ref={context.setContainer}
      className="tool-workspace-actions-target empty:hidden"
    />
  );
}

export function useToolWorkspaceActionsContainer() {
  return useContext(ToolWorkspaceActionsContext)?.container ?? null;
}
