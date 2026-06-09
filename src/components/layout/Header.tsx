"use client";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-[#333] bg-[#121212]/95 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#333] text-muted transition-colors hover:border-muted hover:text-foreground lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="hidden sm:block">
          <p className="font-label text-muted">Platform</p>
          <p className="font-mono text-xs text-foreground">
            Client-side image utilities
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-[#333] text-muted transition-colors hover:border-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-foreground" />
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#333] text-muted transition-colors hover:border-muted hover:text-foreground"
          aria-label="User account"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
            aria-hidden
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
