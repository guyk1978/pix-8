"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/hooks/useEditorState";

export function EditorProjectLoader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const projectId = searchParams.get("project");
  const { loadFromProjectId } = useEditor();
  const loadedRef = useRef<string | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!projectId || loadedRef.current === projectId || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    let cancelled = false;

    void (async () => {
      try {
        const ok = await loadFromProjectId(projectId);
        if (cancelled) return;
        if (ok) {
          loadedRef.current = projectId;
        }
      } finally {
        loadingRef.current = false;
        if (cancelled) return;

        const params = new URLSearchParams(searchParams.toString());
        if (!params.has("project")) return;
        params.delete("project");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname || "/");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId, loadFromProjectId, pathname, router, searchParams]);

  return null;
}
