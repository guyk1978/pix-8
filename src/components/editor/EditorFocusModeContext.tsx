"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface EditorFocusModeContextValue {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
  toggleHeaderVisible: () => void;
}

const EditorFocusModeContext =
  createContext<EditorFocusModeContextValue | null>(null);

export function EditorFocusModeProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const toggleHeaderVisible = useCallback(() => {
    setIsHeaderVisible((current) => !current);
  }, []);

  const value = useMemo(
    () => ({
      isHeaderVisible,
      setIsHeaderVisible,
      toggleHeaderVisible,
    }),
    [isHeaderVisible, toggleHeaderVisible],
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
