"use client";

import { useState } from "react";
import { ExternalLink, FilePlus2 } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { useToast } from "@/components/ui/ToastProvider";
import { sendCanvasToJoinMyPdf } from "@/lib/ecosystem/bridge";
import { resolveJoinMyPdfBaseUrl } from "@/lib/ecosystem/protocol";

const ACTIONS = [
  { intent: "jpg-to-pdf", labelKey: "ecosystem.convertToPdf" },
  { intent: "png-to-pdf", labelKey: "ecosystem.sendPngToPdf" },
  { intent: "sign-pdf", labelKey: "ecosystem.signInJoinMyPdf" },
  { intent: "merge-pdf", labelKey: "ecosystem.addToJoinMyPdf" },
] as const;

export function SendToJoinMyPdfButton() {
  const { t, language } = useLanguage();
  const { source, previewCanvasRef } = useEditor();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const locale = language === "he" ? "he" : "en";
  const homeUrl = `${resolveJoinMyPdfBaseUrl()}/${locale}/home/`;

  const handleSend = async (intent: string) => {
    if (!source || !previewCanvasRef.current) {
      showToast(t("editor.uploadFirst"));
      return;
    }
    setBusy(true);
    setOpen(false);
    try {
      await sendCanvasToJoinMyPdf({
        canvas: previewCanvasRef.current,
        filename: source.name,
        mimeType: intent === "jpg-to-pdf" ? "image/jpeg" : "image/png",
        intent,
        locale,
      });
      showToast(t("ecosystem.sentToJoinMyPdf"));
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : t("ecosystem.sendFailed"),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex">
      <button
        type="button"
        className="unified-editor-pill-btn"
        disabled={!source || busy}
        aria-expanded={open}
        aria-haspopup="menu"
        title={t("ecosystem.sendToJoinMyPdf")}
        onClick={() => setOpen((current) => !current)}
      >
        <FilePlus2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        <span>{t("ecosystem.sendToJoinMyPdfShort")}</span>
      </button>

      {open ? (
        <div className="unified-editor-download-menu" role="menu">
          {ACTIONS.map((action) => (
            <button
              key={action.intent}
              type="button"
              role="menuitem"
              className="unified-editor-dropdown-item"
              disabled={busy}
              onClick={() => void handleSend(action.intent)}
            >
              {t(action.labelKey)}
            </button>
          ))}
          <a
            href={homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className="unified-editor-dropdown-item inline-flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {t("ecosystem.openJoinMyPdf")}
          </a>
        </div>
      ) : null}
    </div>
  );
}
