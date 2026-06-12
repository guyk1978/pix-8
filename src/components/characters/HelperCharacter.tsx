"use client";

import type { CharacterKey } from "@/lib/characters";
import { CHARACTERS } from "@/lib/characters";

export type CharacterGlow = boolean | "soft" | "field" | "hero" | "upload";

interface HelperCharacterProps {
  character: CharacterKey;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
  animate?: "float" | "wave" | "none";
  /** Volumetric glow filter + optional radial light-field aura */
  glow?: CharacterGlow;
  /** Crisp pixel-art rendering */
  pixelated?: boolean;
  /** Horizontal flip on wrapper (keeps float/wave transforms on the image) */
  flipped?: boolean;
}

function resolveGlowClasses(glow: CharacterGlow): {
  filter: string;
  aura: string;
} {
  if (!glow) return { filter: "", aura: "" };
  if (glow === true) return { filter: "character-glow", aura: "character-aura-soft" };
  return {
    filter: `character-glow-${glow}`,
    aura: `character-aura-${glow}`,
  };
}

export function HelperCharacter({
  character,
  alt,
  size = 96,
  className = "",
  animate = "none",
  glow = false,
  pixelated = false,
  flipped = false,
}: HelperCharacterProps) {
  const animationClass =
    animate === "float"
      ? "animate-character-float"
      : animate === "wave"
        ? "animate-character-wave"
        : "";

  const { filter, aura } = resolveGlowClasses(glow);

  return (
    <div
      data-helper-mascot=""
      className={`character-volumetric relative inline-flex shrink-0 items-center justify-center overflow-visible ${aura} ${flipped ? "-scale-x-100" : ""}`}
      style={{ width: size, minHeight: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CHARACTERS[character]}
        alt={alt}
        width={size}
        decoding="async"
        className={`relative z-10 block h-auto w-auto max-w-none select-none object-contain ${pixelated ? "character-pixelated" : ""} ${filter} ${animationClass} ${className}`}
        style={{ width: size, maxHeight: "none" }}
        aria-hidden={alt === ""}
        draggable={false}
      />
    </div>
  );
}
