"use client";

import { useEffect } from "react";
import {
  PIX8_HANDOFF_EVENT,
  consumeStoredHandoffFiles,
} from "@/lib/ecosystem/bridge";
import { useOptionalEditor } from "@/hooks/useEditorState";

/**
 * Loads staged ecosystem handoff files into the unified editor.
 * Bridge listening is owned by EcosystemHandoffReceiver in AppShell.
 */
export function EcosystemHandoffListener() {
  const editor = useOptionalEditor();

  useEffect(() => {
    if (!editor) return;

    const apply = () => {
      const files = consumeStoredHandoffFiles();
      if (!files?.length) return;
      const image =
        files.find((file) => file.type.startsWith("image/")) ?? files[0];
      void editor.loadFile(image);
    };

    apply();
    window.addEventListener(PIX8_HANDOFF_EVENT, apply);
    return () => window.removeEventListener(PIX8_HANDOFF_EVENT, apply);
  }, [editor]);

  return null;
}
