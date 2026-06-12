"use client";

import type { ReactNode } from "react";
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
  return (
    <ToolSidebarSlot
      id="tool-fields"
      order={15}
      className="tool-fields-stage w-full"
    >
      <div className="flex w-full flex-col gap-6">
        {fields.map((field) => (
          <ToolField key={field.htmlFor} {...field} />
        ))}
      </div>
    </ToolSidebarSlot>
  );
}
