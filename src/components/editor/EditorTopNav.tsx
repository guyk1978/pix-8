"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { EDITOR_CATEGORIES, useEditor } from "@/hooks/useEditorState";
import { useOptionalEditorMobilePanel } from "@/components/editor/EditorMobilePanelContext";
import { useToast } from "@/components/ui/ToastProvider";
import type { EditorToolAction } from "@/lib/editor/layerTypes";

export function EditorTopNav() {
  const { t, dir, language } = useLanguage();
  const { showToast } = useToast();
  const { openCategory, setOpenCategory, addToolAction, source } = useEditor();
  const mobilePanel = useOptionalEditorMobilePanel();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenCategory]);

  const handleAddTool = (action: EditorToolAction) => {
    addToolAction(action);
    setOpenCategory(null);
    mobilePanel?.open();
  };

  const handleCategoryClick = (categoryId: (typeof EDITOR_CATEGORIES)[number]["id"], isOpen: boolean) => {
    if (!source) {
      showToast(t("editor.uploadFirst"));
      return;
    }
    setOpenCategory(isOpen ? null : categoryId);
  };

  return (
    <nav
      ref={navRef}
      dir={dir}
      lang={language}
      className="unified-editor-nav unified-editor-chrome shrink-0 border-b"
      aria-label={t("editor.nav.label")}
    >
      <div className="flex items-center gap-1 px-4 py-2 sm:gap-2 sm:px-6">
        {EDITOR_CATEGORIES.map((category) => {
          const isOpen = openCategory === category.id;
          return (
            <div key={category.id} className="relative">
              <button
                type="button"
                className={`unified-editor-nav-btn ${isOpen ? "is-active" : ""}`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                onClick={() => handleCategoryClick(category.id, isOpen)}
              >
                <span>{t(category.labelKey)}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <div
                  className="unified-editor-dropdown editor-ui-enter"
                  role="menu"
                >
                  {category.tools.map((tool) => (
                    <button
                      key={tool.action}
                      type="button"
                      role="menuitem"
                      className="unified-editor-dropdown-item"
                      onClick={() => handleAddTool(tool.action)}
                    >
                      {t(tool.labelKey)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
