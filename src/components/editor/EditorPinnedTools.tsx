"use client";

import { Pin } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { usePinnedTools } from "@/components/editor/PinnedToolsProvider";
import { useEditor } from "@/hooks/useEditorState";
import { getToolTranslationKey } from "@/i18n";

export function EditorPinnedTools() {
  const { t } = useLanguage();
  const { pinnedTools } = usePinnedTools();
  const { source, addToolAction } = useEditor();

  if (!source || pinnedTools.length === 0) return null;

  return (
    <div className="unified-editor-pinned shrink-0 border-b border-[var(--editor-border)] px-3 py-2.5">
      <p className="unified-editor-pinned-label font-label text-[10px] uppercase tracking-wide text-muted">
        {t("editor.pinned.title")}
      </p>
      <div className="unified-editor-pinned-list">
        {pinnedTools.map((toolId) => (
          <button
            key={toolId}
            type="button"
            className="unified-editor-pinned-btn"
            onClick={() => addToolAction(toolId)}
          >
            <Pin className="h-3 w-3 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
            <span className="truncate">{t(getToolTranslationKey(toolId, "name"))}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
