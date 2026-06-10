"use client";

import type { CharacterKey } from "@/lib/characters";
import { CHARACTERS } from "@/lib/characters";

interface HelperCharacterProps {
  character: CharacterKey;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
  animate?: "float" | "wave" | "none";
  /** Soft drop-shadow only — no box, no background */
  glow?: boolean;
}

export function HelperCharacter({
  character,
  alt,
  size = 96,
  className = "",
  animate = "none",
  glow = false,
}: HelperCharacterProps) {
  const animationClass =
    animate === "float"
      ? "animate-character-float"
      : animate === "wave"
        ? "animate-character-wave"
        : "";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={CHARACTERS[character]}
      alt={alt}
      width={size}
      decoding="async"
      className={`pointer-events-none block h-auto w-auto max-w-none select-none object-contain ${glow ? "character-glow" : ""} ${animationClass} ${className}`}
      style={{ width: size, maxHeight: "none" }}
      aria-hidden={alt === ""}
      draggable={false}
    />
  );
}
