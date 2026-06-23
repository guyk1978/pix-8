"use client";

import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import {
  getAppsMenuEntries,
  getAppsMenuUncategorized,
} from "@/lib/navigationConfig";
import type { ToolId } from "@/lib/tools";

interface HomeToolSelectorProps {
  value: ToolId;
  onChange: (toolId: ToolId) => void;
}

const optionClassName =
  "w-full truncate px-3 py-2 text-start font-label text-xs transition-colors hover:bg-background hover:text-foreground";

export function HomeToolSelector({ value, onChange }: HomeToolSelectorProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const triggerId = `${listboxId}-trigger`;

  const categories = useMemo(() => getAppsMenuEntries(), []);
  const uncategorized = useMemo(() => getAppsMenuUncategorized(), []);

  const getToolName = useCallback(
    (toolId: ToolId) => t(getToolTranslationKey(toolId, "name")),
    [t],
  );

  const close = useCallback(() => setOpen(false), []);

  const selectTool = useCallback(
    (toolId: ToolId) => {
      onChange(toolId);
      close();
    },
    [onChange, close],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  const renderOption = (toolId: ToolId) => {
    const selected = value === toolId;

    return (
      <button
        key={toolId}
        type="button"
        role="option"
        aria-selected={selected}
        onClick={() => selectTool(toolId)}
        className={`${optionClassName} ${
          selected
            ? "border-s-2 border-muted bg-background text-foreground"
            : "border-s-2 border-transparent text-muted"
        }`}
      >
        {getToolName(toolId)}
      </button>
    );
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-xs space-y-2">
      <label id={`${triggerId}-label`} className="font-label text-muted">
        {t("home.activeToolLabel")}
      </label>

      <button
        id={triggerId}
        type="button"
        aria-labelledby={`${triggerId}-label`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-2 rounded-none border border-border bg-card px-3 py-2.5 font-label text-sm text-foreground transition-colors hover:border-muted"
      >
        <span className="min-w-0 truncate text-start">{getToolName(value)}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={`${triggerId}-label`}
          className="absolute top-full z-40 mt-1 max-h-60 w-full overflow-y-auto rounded-none border border-border bg-card py-1 shadow-[var(--shadow-elevated)]"
        >
          {categories.map((category) => (
            <div key={category.id}>
              <p className="sticky top-0 bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                {t(`nav.toolCategories.${category.id}`)}
              </p>
              {category.tools.map((tool) => renderOption(tool.id))}
            </div>
          ))}

          {uncategorized.length > 0 ? (
            <div>
              <p className="sticky top-0 bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                {t("nav.tools")}
              </p>
              {uncategorized.map((tool) => renderOption(tool.id))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
