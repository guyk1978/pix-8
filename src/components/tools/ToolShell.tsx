import Link from "next/link";
import type { ReactNode } from "react";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { WorkflowSuggestions } from "@/components/WorkflowSuggestions";
import type { Article } from "@/lib/blog";
import type { Tool } from "@/lib/tools";
import { getWorkflowSuggestions } from "@/lib/workflows";

interface ToolShellProps {
  tool: Tool;
  children?: ReactNode;
  relatedArticles?: Article[];
}

export function ToolShell({ tool, children, relatedArticles = [] }: ToolShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          ← Dashboard
        </Link>
        <span className="text-border">/</span>
        <span className="font-label text-muted">{tool.tag}</span>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          {tool.name}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {tool.description}
        </p>
      </div>

      <div className="border border-border bg-card p-4 sm:p-6">
        {children}
        <WorkflowSuggestions suggestions={getWorkflowSuggestions(tool.id)} />
      </div>

      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}
