"use client";

import type { ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import {
  EmbeddedToolbarDropdown,
} from "@/components/tools/shared/EmbeddedToolbarDropdown";

export interface ToolFieldConfig {
  label: string;
  englishLabel: string;
  menuTitle?: string;
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
  menuTitle,
  htmlFor,
  children,
}: ToolFieldConfig) {
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;

  if (embeddedToolbarLayout) {
    return (
      <EmbeddedToolbarDropdown
        id={htmlFor}
        title={menuTitle ?? englishLabel}
      >
        {children}
      </EmbeddedToolbarDropdown>
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
      {embeddedToolbarLayout ? (
        <>
          {fields.map((field) => (
            <ToolField key={field.htmlFor} {...field} />
          ))}
        </>
      ) : (
        <div className="flex w-full flex-col gap-6">
          {fields.map((field) => (
            <ToolField key={field.htmlFor} {...field} />
          ))}
        </div>
      )}
    </ToolSidebarSlot>
  );
}
