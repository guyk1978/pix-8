"use client";

import type { ReactNode } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { ToolGuideLines } from "@/components/tools/ToolGuideLines";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";

interface ToolWorkspaceProps {
  children: ReactNode;
  showGuideLines?: boolean;
  /** Floating base guide in the corner of the workspace */
  showCornerGuide?: boolean;
}

export function ToolWorkspace({
  children,
  showGuideLines = true,
  showCornerGuide = true,
}: ToolWorkspaceProps) {
  const { dir } = useLanguage();

  return (
    <div className="tool-workspace relative w-full overflow-visible">
      {showGuideLines ? <ToolGuideLines /> : null}

      {showCornerGuide ? (
        <HelperCharacter
          character="base"
          alt=""
          size={CHARACTER_SIZES.corner}
          glow
          className={`pointer-events-none absolute -top-2 z-[2] opacity-80 ${
            dir === "rtl" ? "-left-2 -scale-x-100" : "-right-2"
          } hidden sm:block`}
          animate="float"
        />
      ) : null}

      <div className="relative z-[1] space-y-5">{children}</div>
    </div>
  );
}
