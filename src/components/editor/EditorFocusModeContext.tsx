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

const STORAGE_KEY = "pix8.editor.focusHeaderVisible";

interface EditorFocusModeContextValue {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
  toggleHeaderVisible: () => void;
}

const EditorFocusModeContext =
  createContext<EditorFocusModeContextValue | null>(null);

function readStoredHeaderVisible(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "0") return false;
    if (raw === "1") return true;
  } catch {
    /* ignore */
  }
  return true;
}

export function EditorFocusModeProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisibleState] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIsHeaderVisibleState(readStoredHeaderVisible());
    setHydrated(true);
  }, []);

  const setIsHeaderVisible = useCallback((visible: boolean) => {
    setIsHeaderVisibleState(visible);
    try {
      window.localStorage.setItem(STORAGE_KEY, visible ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleHeaderVisible = useCallback(() => {
    setIsHeaderVisibleState((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isHeaderVisible: hydrated ? isHeaderVisible : true,
      setIsHeaderVisible,
      toggleHeaderVisible,
    }),
    [hydrated, isHeaderVisible, setIsHeaderVisible, toggleHeaderVisible],
  );

  return (
    <EditorFocusModeContext.Provider value={value}>
      {children}
    </EditorFocusModeContext.Provider>
  );
}

export function useEditorFocusMode() {
  const context = useContext(EditorFocusModeContext);
  if (!context) {
    throw new Error("useEditorFocusMode must be used within EditorFocusModeProvider");
  }
  return context;
}

export function useOptionalEditorFocusMode() {
  return useContext(EditorFocusModeContext);
}
