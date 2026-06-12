import type { AnchorHTMLAttributes, ReactNode } from "react";

export type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Native full-page links for static export (Cloudflare Pages).
 * Next.js client router navigations can fail silently against static RSC files.
 */
export function AppLink({ href, children, ...props }: AppLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
