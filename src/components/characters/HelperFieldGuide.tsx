"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { CHARACTER_SIZES, type CharacterKey } from "@/lib/characters";

interface HelperFieldGuideProps {
  character: "width" | "height";
  label: string;
  englishLabel?: string;
  htmlFor: string;
  children: ReactNode;
  characterAlt?: string;
}

const FIELD_CHARACTER_MAP = {
  width: "widthAlt",
  height: "robot",
} as const satisfies Record<"width" | "height", CharacterKey>;

type Point = { x: number; y: number };

function getCharacterFlip(character: CharacterKey): string {
  if (character === "robot") return "-scale-x-100";
  return "";
}

function FieldLightTrail({
  from,
  to,
  gradientId,
  glowFilterId,
}: {
  from: Point;
  to: Point;
  gradientId: string;
  glowFilterId: string;
}) {
  const c1: Point = {
    x: from.x + (to.x - from.x) * 0.06,
    y: from.y - Math.abs(from.y - to.y) * 0.58,
  };
  const c2: Point = {
    x: to.x - (to.x - from.x) * 0.1,
    y: to.y + Math.abs(from.y - to.y) * 0.32,
  };

  const d = `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
  const stroke = `url(#${gradientId})`;
  const glow = `url(#${glowFilterId})`;

  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.22}
        filter={glow}
      />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.48}
        filter={glow}
      />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.95}
      />
    </>
  );
}

export function HelperFieldGuide({
  character: characterKey,
  label,
  englishLabel,
  htmlFor,
  children,
  characterAlt,
}: HelperFieldGuideProps) {
  const character = FIELD_CHARACTER_MAP[characterKey];
  const flip = getCharacterFlip(character);
  const gradientId = useId().replace(/:/g, "");
  const glowFilterId = useId().replace(/:/g, "");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [connector, setConnector] = useState<{
    from: Point;
    to: Point;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const input = inputRef.current;
    const mascot = characterRef.current;
    if (!container || !input || !mascot) return;

    const measure = () => {
      const bounds = container.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();
      const mascotRect = mascot.getBoundingClientRect();

      const from: Point =
        characterKey === "height"
          ? {
              x: mascotRect.left + mascotRect.width * 0.6 - bounds.left,
              y: mascotRect.top + mascotRect.height * 0.14 - bounds.top,
            }
          : {
              x: mascotRect.left + mascotRect.width * 0.24 - bounds.left,
              y: mascotRect.top + mascotRect.height * 0.24 - bounds.top,
            };

      const to: Point =
        characterKey === "height"
          ? {
              x: inputRect.left + inputRect.width * 0.3 - bounds.left,
              y: inputRect.bottom - bounds.top - 2,
            }
          : {
              x: inputRect.right - inputRect.width * 0.3 - bounds.left,
              y: inputRect.bottom - bounds.top - 2,
            };

      setConnector({
        from,
        to,
        width: bounds.width,
        height: bounds.height,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(input);
    observer.observe(mascot);

    return () => observer.disconnect();
  }, [characterKey]);

  return (
    <div className="field-guide">
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 font-label text-muted"
      >
        <span>{label}</span>
        {englishLabel ? (
          <span className="font-mono text-[10px] normal-case tracking-normal text-muted/70">
            {englishLabel}
          </span>
        ) : null}
      </label>

      <div ref={containerRef} className="relative overflow-visible">
        {connector ? (
          <svg
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={connector.width}
            height={connector.height}
            aria-hidden
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="var(--glow-teal)" />
                <stop offset="45%" stopColor="var(--glow-purple)" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
              <filter
                id={glowFilterId}
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <FieldLightTrail
              from={connector.from}
              to={connector.to}
              gradientId={gradientId}
              glowFilterId={glowFilterId}
            />
          </svg>
        ) : null}

        <div ref={inputRef} className="tool-input-matte relative z-10">
          {children}
        </div>

        <div
          className="relative z-10 mt-1 h-[8rem] overflow-visible sm:h-[8.5rem]"
          dir="ltr"
        >
          <div
            ref={characterRef}
            className={`absolute bottom-0 ${flip} ${
              characterKey === "height"
                ? "-left-2 sm:left-0"
                : "-right-2 sm:right-0"
            }`}
          >
            <HelperCharacter
              character={character}
              alt={characterAlt ?? label}
              size={CHARACTER_SIZES.field}
              glow="field"
              animate="float"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
