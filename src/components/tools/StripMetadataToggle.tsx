"use client";

import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface StripMetadataToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export function StripMetadataToggle({
  checked,
  disabled = false,
  onChange,
}: StripMetadataToggleProps) {
  const { t } = useLanguage();
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;

  return (
    <ToolSidebarSlot id="strip-metadata" order={25}>
      <label
        className={`embedded-strip-meta flex cursor-pointer items-center gap-1.5 ${
          embeddedToolbarLayout ? "h-8 shrink-0" : "min-h-11 gap-3"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="h-3.5 w-3.5 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span
          className={`font-label text-muted ${
            embeddedToolbarLayout ? "text-[0.625rem] uppercase tracking-wide" : ""
          }`}
        >
          {t("privacy.stripMetadata")}
        </span>
        {checked && !embeddedToolbarLayout ? (
          <span className="sidebar-meta-badge rounded-full px-2 py-0.5 font-mono text-[10px] text-[var(--glow-teal)]">
            {t("privacy.privacyMode")}
          </span>
        ) : null}
      </label>
    </ToolSidebarSlot>
  );
}
