"use client";

import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { EmbeddedToolbarDropdown } from "@/components/tools/shared/EmbeddedToolbarDropdown";
import { SliderControl } from "@/components/ui/SliderControl";

interface StripMetadataToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  cornerRadius?: number;
  onCornerRadiusChange?: (radius: number) => void;
  maxCornerRadius?: number;
}

export function StripMetadataToggle({
  checked,
  disabled = false,
  onChange,
  cornerRadius = 0,
  onCornerRadiusChange,
  maxCornerRadius = 200,
}: StripMetadataToggleProps) {
  const { t } = useLanguage();
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;
  const showCornerRadius = onCornerRadiusChange !== undefined;
  const sliderMax = Math.max(0, Math.round(maxCornerRadius));

  const stripField = (
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

  const cornerRadiusField = showCornerRadius ? (
    <SliderControl
      label={t("toolUi.roundCorners")}
      value={cornerRadius}
      min={0}
      max={sliderMax}
      step={1}
      disabled={disabled || sliderMax === 0}
      suffix="px"
      onChange={onCornerRadiusChange}
    />
  ) : null;

  const embeddedFields = (
    <div className="flex flex-col gap-3">
      {stripField}
      {cornerRadiusField}
    </div>
  );

  return (
    <ToolSidebarSlot id="strip-metadata" order={25}>
      {embeddedToolbarLayout ? (
        <EmbeddedToolbarDropdown
          id="strip-metadata"
          title={t("embeddedToolbar.cornersSection")}
        >
          {embeddedFields}
        </EmbeddedToolbarDropdown>
      ) : (
        <div className="flex flex-col gap-3">
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
          {cornerRadiusField}
        </div>
      )}
    </ToolSidebarSlot>
  );
}
