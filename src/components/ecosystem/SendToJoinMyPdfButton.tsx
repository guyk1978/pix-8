"use client";

import { useState } from "react";
import { ExternalLink, FilePlus2 } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { useToast } from "@/components/ui/ToastProvider";
import { sendCanvasToJoinMyPdf } from "@/lib/ecosystem/bridge";
import {
  buildJoinMyPdfHandoffUrl,
  isPopupBlockedError,
  resolveJoinMyPdfBaseUrl,
} from "@/lib/ecosystem/protocol";

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
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const locale = language === "he" ? "he" : "en";
  const homeUrl = `${resolveJoinMyPdfBaseUrl()}/${locale}/home/`;

  const handleSend = async (intent: string) => {
    if (!source || !previewCanvasRef.current) {
      showToast(t("editor.uploadFirst"));
      return;
    }
    setBusy(true);
    setOpen(false);
    setFallbackUrl(null);
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
      if (isPopupBlockedError(error)) {
        const url =
          error.fallbackUrl || buildJoinMyPdfHandoffUrl(intent, locale);
        setFallbackUrl(url);
        showToast(t("ecosystem.popupBlocked"));
        const openManual = window.confirm(
          `${t("ecosystem.popupBlocked")}\n\n${t("ecosystem.popupBlockedHint")}`,
        );
        if (openManual) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } else {
        showToast(
          error instanceof Error ? error.message : t("ecosystem.sendFailed"),
        );
      }
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

      {fallbackUrl ? (
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="unified-editor-pill-btn ms-1"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          <span>{t("ecosystem.openManually")}</span>
        </a>
      ) : null}
    </div>
  );
}
