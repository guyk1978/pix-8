"use client";

import { PanelTopClose } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditorFocusMode } from "@/components/editor/EditorFocusModeContext";
import { headerUtilityButtonClass } from "@/components/layout/headerNavStyles";
import { isLanguage } from "@/lib/language";
import { isHomeDashboard } from "@/lib/routes";

function EditorFocusToggleInner() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isHeaderVisible, toggleHeaderVisible } = useEditorFocusMode();
  const lang = searchParams.get("lang");
  const isEditor = isHomeDashboard(pathname) && isLanguage(lang);

  if (!isEditor || !isHeaderVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={`${headerUtilityButtonClass} editor-focus-toggle`}
      onClick={toggleHeaderVisible}
      aria-pressed={false}
      aria-label={t("editor.focusMode.hideHeader")}
      title={t("editor.focusMode.hideHeader")}
    >
      <PanelTopClose size={16} strokeWidth={1.75} aria-hidden />
    </button>
  );
}

export function EditorFocusToggle() {
  return (
    <Suspense fallback={null}>
      <EditorFocusToggleInner />
    </Suspense>
  );
}
