"use client";

import { useEffect, useId, useState } from "react";

function countDecimals(step: number): number {
  if (!Number.isFinite(step) || step >= 1) return 0;
  const text = step.toString();
  const index = text.indexOf(".");
  return index === -1 ? 0 : text.length - index - 1;
}

function clampValue(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  if (!Number.isFinite(value)) return min;

  const snapped = Math.round(value / step) * step;
  const decimals = countDecimals(step);
  const normalized =
    decimals > 0 ? Number(snapped.toFixed(decimals)) : Math.round(snapped);

  return Math.min(max, Math.max(min, normalized));
}

function formatNumber(value: number, step: number): string {
  const decimals = countDecimals(step);
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  disabled?: boolean;
  description?: string;
  id?: string;
}

export function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "%",
  disabled = false,
  description,
  id,
}: SliderControlProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const [inputText, setInputText] = useState(formatNumber(value, step));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputText(formatNumber(value, step));
    }
  }, [value, step, isEditing]);

  const commitInput = () => {
    const parsed = Number(inputText);
    const next = clampValue(parsed, min, max, step);
    onChange(next);
    setInputText(formatNumber(next, step));
    setIsEditing(false);
  };

  return (
    <div className="space-y-2 text-start">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={sliderId} className="tool-control-label font-label text-start">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="text"
            inputMode="decimal"
            disabled={disabled}
            value={isEditing ? inputText : formatNumber(value, step)}
            onFocus={() => {
              setIsEditing(true);
              setInputText(formatNumber(value, step));
            }}
            onChange={(event) => {
              setInputText(event.target.value.replace(/[^\d.-]/g, ""));
            }}
            onBlur={commitInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                commitInput();
              }

              if (event.key === "Escape") {
                setIsEditing(false);
                setInputText(formatNumber(value, step));
              }
            }}
            aria-label={`${label} value`}
            className="tool-slider-value w-14 px-1.5 py-0.5 text-end text-[11px] tabular-nums outline-none disabled:cursor-not-allowed disabled:opacity-50"
            dir="ltr"
          />
          {suffix ? (
            <span className="font-mono text-[10px] text-muted">{suffix}</span>
          ) : null}
        </div>
      </div>

      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={value}
        onInput={(event) => {
          onChange(Number(event.currentTarget.value));
        }}
        className="slider-control disabled:cursor-not-allowed disabled:opacity-50"
      />

      {description ? (
        <p className="text-start font-mono text-[10px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
