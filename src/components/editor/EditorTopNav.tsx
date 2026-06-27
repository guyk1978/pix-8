"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Pin } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { usePinnedTools } from "@/components/editor/PinnedToolsProvider";
import { EDITOR_CATEGORIES, useEditor } from "@/hooks/useEditorState";
import type { EditorToolAction } from "@/lib/editor/layerTypes";

export function EditorTopNav() {
  const { t } = useLanguage();
  const { openCategory, setOpenCategory, addToolAction, source } = useEditor();
  const { isPinned, togglePinned } = usePinnedTools();
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
  };

  return (
    <nav
      ref={navRef}
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
                disabled={!source}
                onClick={() =>
                  setOpenCategory(isOpen ? null : category.id)
                }
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
                  className="unified-editor-dropdown"
                  role="menu"
                >
                  {category.tools.map((tool) => {
                    const pinned = isPinned(tool.action);
                    return (
                      <div
                        key={tool.action}
                        className="unified-editor-dropdown-row"
                        role="none"
                      >
                        <button
                          type="button"
                          role="menuitem"
                          className="unified-editor-dropdown-item"
                          onClick={() => handleAddTool(tool.action)}
                        >
                          {t(tool.labelKey)}
                        </button>
                        <button
                          type="button"
                          className={`unified-editor-dropdown-pin ${
                            pinned ? "is-active" : ""
                          }`}
                          aria-label={
                            pinned
                              ? t("editor.pinned.unpin", {
                                  name: t(tool.labelKey),
                                })
                              : t("editor.pinned.pin", {
                                  name: t(tool.labelKey),
                                })
                          }
                          aria-pressed={pinned}
                          onClick={(event) => {
                            event.stopPropagation();
                            togglePinned(tool.action);
                          }}
                        >
                          <Pin
                            className="h-3.5 w-3.5"
                            strokeWidth={2}
                            fill={pinned ? "currentColor" : "none"}
                            aria-hidden
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
