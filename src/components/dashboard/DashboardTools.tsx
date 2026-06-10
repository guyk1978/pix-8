"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { dashboardSections, tools } from "@/lib/tools";

export function DashboardTools() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tools;
    return tools.filter((tool) => tool.name.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <section className="space-y-8">
      <div className="max-w-md">
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <input
          id="tool-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search utilities…"
          className="w-full rounded-sm border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-muted"
        />
      </div>

      {filteredTools.length === 0 ? (
        <div className="flex min-h-36 flex-col items-center justify-center border border-border bg-card p-8 text-center">
          <p className="font-label text-muted">No tools found</p>
          <p className="mt-2 text-sm text-muted">
            Try a different search term.
          </p>
        </div>
      ) : (
        dashboardSections.map((section) => {
          const sectionTools = filteredTools.filter((tool) =>
            section.categories.includes(tool.category),
          );

          if (sectionTools.length === 0) return null;

          return (
            <div key={section.id}>
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <h2 className="font-label text-foreground">{section.label}</h2>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {sectionTools.length} utility
                  {sectionTools.length === 1 ? "" : "ies"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sectionTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
