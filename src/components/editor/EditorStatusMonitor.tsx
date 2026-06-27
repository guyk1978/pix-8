"use client";

import { Activity } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";

export function EditorStatusMonitor() {
  const { t } = useLanguage();
  const { issueCount, composeError, isComposing } = useEditor();

  return (
    <div className="unified-editor-status" aria-live="polite">
      {issueCount > 0 ? (
        <div className="unified-editor-issue-badge" role="alert">
          <span className="unified-editor-issue-count">{issueCount}</span>
          <span>{t("editor.status.issue")}</span>
          {composeError ? (
            <span className="unified-editor-issue-detail">{composeError}</span>
          ) : null}
        </div>
      ) : null}

      <div
        className={`unified-editor-monitor ${isComposing ? "is-active" : ""}`}
        role="status"
      >
        <Activity className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        <span>{t("editor.status.monitor")}</span>
        {isComposing ? (
          <span className="unified-editor-monitor-pulse" aria-hidden />
        ) : null}
      </div>
    </div>
  );
}
