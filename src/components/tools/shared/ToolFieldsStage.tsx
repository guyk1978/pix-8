"use client";

import type { ReactNode } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { CHARACTER_SIZES } from "@/lib/characters";

export interface ToolFieldConfig {
  label: string;
  englishLabel: string;
  htmlFor: string;
  accentClass?: string;
  children: ReactNode;
}

interface CharacterOffset {
  bottom?: string;
}

interface ToolFieldsStageProps {
  fields: ToolFieldConfig[];
  robotAlt: string;
  widthAlt: string;
  /** Per-character bottom offset (e.g. "8rem") when one column is much taller. */
  characterOffsets?: {
    robot?: CharacterOffset;
    widthAlt?: CharacterOffset;
  };
}

function ToolField({
  label,
  englishLabel,
  htmlFor,
  accentClass = "text-[var(--glow-teal)]",
  children,
}: ToolFieldConfig) {
  return (
    <div className="tool-field relative z-10">
      <label
        htmlFor={htmlFor}
        className="tool-field-label mb-2 flex items-baseline gap-2 font-label"
      >
        <span className={accentClass}>{label}</span>
        <span className="font-mono text-[10px] normal-case tracking-normal text-muted/80">
          {englishLabel}
        </span>
      </label>
      <div className="tool-input-matte">{children}</div>
    </div>
  );
}

export function ToolFieldsStage({
  fields,
  robotAlt,
  widthAlt,
  characterOffsets,
}: ToolFieldsStageProps) {
  const columnClass =
    fields.length > 1
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1";

  return (
    <div className="tool-fields-stage relative mt-5 overflow-visible pb-2">
      <div className={`relative z-10 grid gap-x-8 gap-y-2 ${columnClass}`}>
        {fields.map((field) => (
          <ToolField key={field.htmlFor} {...field} />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[8.5rem] sm:h-[9rem]"
        dir="ltr"
      >
        <div
          className="absolute left-0 sm:left-1"
          style={{ bottom: characterOffsets?.robot?.bottom ?? "0" }}
        >
          <HelperCharacter
            character="robot"
            alt={robotAlt}
            size={CHARACTER_SIZES.field + 8}
            glow="soft"
            pixelated
            animate="float"
          />
        </div>

        <div
          className="absolute right-0 sm:right-1"
          style={{ bottom: characterOffsets?.widthAlt?.bottom ?? "0" }}
        >
          <HelperCharacter
            character="widthAlt"
            alt={widthAlt}
            size={CHARACTER_SIZES.field + 8}
            glow="soft"
            pixelated
            animate="float"
          />
        </div>
      </div>
    </div>
  );
}
