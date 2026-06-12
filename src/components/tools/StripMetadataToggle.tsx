"use client";

import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
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

  return (
    <ToolSidebarSlot id="strip-metadata" order={25}>
      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span className="font-label text-muted">{t("privacy.stripMetadata")}</span>
        {checked && (
          <span className="sidebar-meta-badge rounded-full px-2 py-0.5 font-mono text-[10px] text-[var(--glow-teal)]">
            {t("privacy.privacyMode")}
          </span>
        )}
      </label>
    </ToolSidebarSlot>
  );
}
