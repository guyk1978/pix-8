"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

interface EmbeddedToolbarDropdownProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function EmbeddedToolbarDropdown({
  id,
  title,
  children,
}: EmbeddedToolbarDropdownProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`embedded-toolbar-dropdown ${isOpen ? "is-open" : ""}`.trim()}
      data-dropdown-id={id}
    >
      <button
        type="button"
        className="embedded-toolbar-dropdown-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{title}</span>
        <ChevronDown
          className="embedded-toolbar-dropdown-chevron"
          size={16}
          strokeWidth={2.25}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        className={`embedded-toolbar-dropdown-panel ${
          isOpen ? "" : "embedded-toolbar-dropdown-panel--closed"
        }`.trim()}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="embedded-toolbar-dropdown-body">{children}</div>
      </div>
    </div>
  );
}

export function EmbeddedToolbarMenuRow({ children }: { children: ReactNode }) {
  return <div className="embedded-toolbar-menu-row">{children}</div>;
}
