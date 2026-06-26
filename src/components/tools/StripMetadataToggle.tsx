"use client";

import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { EmbeddedToolbarDropdown } from "@/components/tools/shared/EmbeddedToolbarDropdown";

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

  const field = (
    <label className="embedded-strip-meta flex min-h-9 cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-3.5 w-3.5 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span className="font-label text-xs text-muted">
        {t("privacy.stripMetadata")}
      </span>
    </label>
  );

  return (
    <ToolSidebarSlot id="strip-metadata" order={25}>
      {embeddedToolbarLayout ? (
        <EmbeddedToolbarDropdown
          id="strip-metadata"
          title={t("embeddedToolbar.privacySection")}
        >
          {field}
        </EmbeddedToolbarDropdown>
      ) : (
        <label
          className={`embedded-strip-meta flex cursor-pointer items-center gap-1.5 min-h-11 gap-3`}
        >
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
            className="h-3.5 w-3.5 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="font-label text-muted">{t("privacy.stripMetadata")}</span>
          {checked ? (
            <span className="sidebar-meta-badge rounded-full px-2 py-0.5 font-mono text-[10px] text-[var(--glow-teal)]">
              {t("privacy.privacyMode")}
            </span>
          ) : null}
        </label>
      )}
    </ToolSidebarSlot>
  );
}
