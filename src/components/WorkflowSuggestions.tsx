import Link from "next/link";

export interface WorkflowLink {
  name: string;
  href: string;
}

interface WorkflowSuggestionsProps {
  suggestions: WorkflowLink[];
}

export function WorkflowSuggestions({ suggestions }: WorkflowSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <section
      className="mt-6 border-t border-dashed border-border pt-6"
      aria-label="Suggested next tools"
    >
      <h2 className="mb-3 font-label text-muted">What&apos;s next?</h2>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        {suggestions.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group shrink-0 rounded-sm border border-border bg-background px-4 py-2.5 font-label text-sm text-muted transition-all hover:border-muted hover:text-foreground hover:shadow-[var(--glow-hover)] focus-visible:border-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted"
          >
            <span className="flex items-center gap-2">
              <span>{link.name}</span>
              <span
                aria-hidden="true"
                className="font-mono text-[10px] text-muted transition-colors group-hover:text-accent"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
