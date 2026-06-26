"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CORNER_RADIUS,
  DEFAULT_STRIP_METADATA,
  type DownloadOptions,
} from "@/hooks/useImageProcessor";

export { DEFAULT_CORNER_RADIUS, DEFAULT_STRIP_METADATA };

interface ToolExportOptionsContextValue {
  stripMetadata: boolean;
  setStripMetadata: (value: boolean) => void;
  cornerRadius: number;
  setCornerRadius: (value: number) => void;
  downloadOptions: Pick<DownloadOptions, "stripMetadata" | "cornerRadius">;
}

const ToolExportOptionsContext =
  createContext<ToolExportOptionsContextValue | null>(null);

export function ToolExportOptionsProvider({ children }: { children: ReactNode }) {
  const [stripMetadata, setStripMetadata] = useState(DEFAULT_STRIP_METADATA);
  const [cornerRadius, setCornerRadius] = useState(DEFAULT_CORNER_RADIUS);

  const downloadOptions = useMemo(
    () => ({ stripMetadata, cornerRadius }),
    [stripMetadata, cornerRadius],
  );

  const value = useMemo<ToolExportOptionsContextValue>(
    () => ({
      stripMetadata,
      setStripMetadata,
      cornerRadius,
      setCornerRadius,
      downloadOptions,
    }),
    [stripMetadata, cornerRadius, downloadOptions],
  );

  return (
    <ToolExportOptionsContext.Provider value={value}>
      {children}
    </ToolExportOptionsContext.Provider>
  );
}

export function useToolExportSettings(): ToolExportOptionsContextValue {
  const context = useContext(ToolExportOptionsContext);
  if (!context) {
    throw new Error(
      "useToolExportSettings must be used within ToolExportOptionsProvider",
    );
  }
  return context;
}

export function useOptionalToolExportSettings() {
  return useContext(ToolExportOptionsContext);
}
