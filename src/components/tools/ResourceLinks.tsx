"use client";

import { AppLink } from "@/components/layout/AppLink";
import {
  getImageAnnotatorResourceLinks,
  RESOURCE_LINK_ACCENT,
  type ResourceLink,
} from "@/lib/imageAnnotatorResources";
import { usePathname } from "next/navigation";

interface ResourceLinksProps {
  links?: ResourceLink[];
  title?: string;
  className?: string;
}

export function ResourceLinks({
  links: linksOverride,
  title = "Resources",
  className = "",
}: ResourceLinksProps) {
  const pathname = usePathname() ?? "/";
  const links =
    linksOverride ?? getImageAnnotatorResourceLinks(pathname);

  if (links.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className={`border-t border-dashed border-border pt-4 text-center ${className}`.trim()}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
        {links.map((link, index) => (
          <li key={link.href} className="inline-flex max-w-full items-center">
            {index > 0 ? (
              <span
                className="mx-2 font-mono text-[10px] text-border select-none"
                aria-hidden
              >
                ·
              </span>
            ) : null}
            <AppLink
              href={link.href}
              className="truncate font-label text-xs transition-opacity hover:opacity-80"
              style={{ color: RESOURCE_LINK_ACCENT }}
              title={link.label}
            >
              {link.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
