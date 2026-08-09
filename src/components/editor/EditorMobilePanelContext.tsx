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

interface EditorMobilePanelContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const EditorMobilePanelContext =
  createContext<EditorMobilePanelContextValue | null>(null);

export function EditorMobilePanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <EditorMobilePanelContext.Provider value={value}>
      {children}
    </EditorMobilePanelContext.Provider>
  );
}

export function useEditorMobilePanel() {
  const context = useContext(EditorMobilePanelContext);
  if (!context) {
    throw new Error(
      "useEditorMobilePanel must be used within EditorMobilePanelProvider",
    );
  }
  return context;
}

export function useOptionalEditorMobilePanel() {
  return useContext(EditorMobilePanelContext);
}
