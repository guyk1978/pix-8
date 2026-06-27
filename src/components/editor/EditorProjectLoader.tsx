"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEditor } from "@/hooks/useEditorState";

export function EditorProjectLoader() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const { loadFromProjectId } = useEditor();
  const loadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!projectId || loadedRef.current === projectId) return;
    loadedRef.current = projectId;
    void loadFromProjectId(projectId);
  }, [projectId, loadFromProjectId]);

  return null;
}
