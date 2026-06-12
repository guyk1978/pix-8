"use client";

import { AppLink } from "@/components/layout/AppLink";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { isActiveHref } from "@/lib/routes";

type NavLinkProps = Omit<ComponentProps<typeof AppLink>, "href"> & {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  onNavigate?: () => void;
};

export function NavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  onNavigate,
  onClick,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isActiveHref(pathname, href);
  const resolvedClassName = `${className} ${active ? activeClassName : inactiveClassName}`.trim();

  return (
    <AppLink
      href={href}
      className={resolvedClassName}
      onClick={(event) => {
        onNavigate?.();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </AppLink>
  );
}
