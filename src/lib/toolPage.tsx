import { ToolShell } from "@/components/tools/ToolShell";
import { ToolJsonLd } from "@/components/tools/ToolJsonLd";
import { getArticleBundlesByToolId } from "@/lib/blog";
import { getToolRoute } from "@/lib/sidebarNav";
import { SITE_URL } from "@/lib/siteUrl";
import { TOOL_COMPONENTS } from "@/lib/toolComponents";
import type { Tool } from "@/lib/tools";
import type { Metadata } from "next";

export { TOOL_COMPONENTS } from "@/lib/toolComponents";

export function buildToolPageMetadata(tool: Tool): Metadata {
  const canonicalPath = getToolRoute(tool.id);

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `${SITE_URL}${canonicalPath}`,
    },
  };
}

export function ToolPageContent({ tool }: { tool: Tool }) {
  const ToolComponent = TOOL_COMPONENTS[tool.id];
  const { en: relatedArticlesEn, he: relatedArticlesHe } =
    getArticleBundlesByToolId(tool.id);

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolShell
        tool={tool}
        relatedArticlesEn={relatedArticlesEn}
        relatedArticlesHe={relatedArticlesHe}
      >
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
            <span className="font-label text-muted">Status</span>
            <p className="font-mono text-sm text-muted">
              Tool workspace — implementation pending
            </p>
          </div>
        )}
      </ToolShell>
    </>
  );
}
