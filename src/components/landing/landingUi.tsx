import { AppLink } from "@/components/layout/AppLink";
import {
  IMAGE_ANNOTATOR_CAPABILITIES,
  IMAGE_ANNOTATOR_TOOL_HREF,
  LANDING_ACCENT,
} from "@/lib/imageAnnotatorLandings";
import type { ReactNode } from "react";

interface LandingCtaButtonProps {
  children: ReactNode;
  href?: string;
}

export function LandingCtaButton({
  children,
  href = IMAGE_ANNOTATOR_TOOL_HREF,
}: LandingCtaButtonProps) {
  return (
    <AppLink
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-sm px-6 py-3 text-sm font-medium tracking-tight text-[#0f0f0f] transition-opacity hover:opacity-90"
      style={{ backgroundColor: LANDING_ACCENT }}
    >
      {children}
    </AppLink>
  );
}

interface LandingFeatureCalloutProps {
  title: string;
  body: string;
}

export function LandingFeatureCallout({ title, body }: LandingFeatureCalloutProps) {
  return (
    <div
      className="rounded-sm border px-4 py-4 sm:px-5"
      style={{
        borderColor: `color-mix(in srgb, ${LANDING_ACCENT} 35%, var(--border))`,
        backgroundColor: `color-mix(in srgb, ${LANDING_ACCENT} 8%, var(--card))`,
      }}
    >
      <p
        className="font-label text-xs"
        style={{ color: LANDING_ACCENT }}
      >
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function LandingPrivacyNote() {
  return (
    <p className="font-mono text-[10px] leading-relaxed text-muted">
      Client-side canvas only — your image never leaves the browser.
    </p>
  );
}

export function LandingCapabilitiesList({
  capabilities = IMAGE_ANNOTATOR_CAPABILITIES,
}: {
  capabilities?: readonly string[];
}) {
  return (
    <ul className="mt-3 space-y-2">
      {capabilities.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-relaxed text-foreground"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: LANDING_ACCENT }}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
