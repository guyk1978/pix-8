import Link from "next/link";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import { tools } from "@/lib/tools";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-panel mt-auto border-x-0 border-b-0">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-sm font-medium text-foreground">
                pix
              </span>
              <span className="font-mono text-sm font-medium text-accent">
                -8
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Privacy-first image utilities. All processing runs in your
              browser — files never leave your device.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1">
            <span className="font-label col-span-full text-muted">Tools</span>
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="font-mono text-xs text-muted transition-colors hover:text-foreground"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <a
            href={JOIN_MY_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-md flex-col gap-1 rounded-sm border border-[#333] bg-[#161616] px-4 py-3 transition-colors hover:border-muted hover:bg-[#1a1a1a]"
          >
            <span className="font-label text-foreground">
              Done editing? Combine these images into a PDF
            </span>
            <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
              Open JoinMyPDF →
            </span>
          </a>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-xs text-muted">
              © {year} pix-8
            </span>
            <span className="font-label text-muted">
              Zero uploads · Zero tracking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
