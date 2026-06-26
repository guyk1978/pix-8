"use client";

import type { ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";

export interface ToolFieldConfig {
  label: string;
  englishLabel: string;
  htmlFor: string;
  accentClass?: string;
  children: ReactNode;
}

interface ToolFieldsStageProps {
  fields: ToolFieldConfig[];
}

function ToolField({
  label,
  englishLabel,
  htmlFor,
  children,
}: ToolFieldConfig) {
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;

  if (embeddedToolbarLayout) {
    return (
      <section className="embedded-toolbar-section">
        <label htmlFor={htmlFor} className="embedded-toolbar-section-label">
          {englishLabel}
        </label>
        <div className="embedded-toolbar-section-body">{children}</div>
      </section>
    );
  }

  return (
    <section className="tool-workspace-zone text-start">
      <label htmlFor={htmlFor} className="tool-zone-label items-start text-start">
        <span className="tool-zone-title w-full text-start">{label}</span>
        <span className="tool-zone-subtitle" dir="ltr">
          {englishLabel}
        </span>
      </label>
      <div className="tool-zone-body text-start">{children}</div>
    </section>
  );
}

export function ToolFieldsStage({ fields }: ToolFieldsStageProps) {
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;

  return (
    <ToolSidebarSlot
      id="tool-fields"
      order={15}
      className="tool-fields-stage w-full"
    >
      <div
        className={
          embeddedToolbarLayout
            ? "embedded-toolbar-fields-grid"
            : "flex w-full flex-col gap-6"
        }
      >
        {fields.map((field) => (
          <ToolField key={field.htmlFor} {...field} />
        ))}
      </div>
    </ToolSidebarSlot>
  );
}
