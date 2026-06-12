"use client";

import Link from "next/link";
import { FolderOpen, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useProjects } from "@/components/projects/ProjectsContext";
import { getToolTranslationKey } from "@/i18n";
import type { SavedProjectRecord } from "@/lib/projects/types";
import { getToolById } from "@/lib/tools";

interface ProjectCardProps {
  project: SavedProjectRecord;
}

function formatUpdatedAt(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, language } = useLanguage();
  const { removeProject } = useProjects();
  const tool = getToolById(project.toolId);
  const toolName = tool
    ? t(getToolTranslationKey(tool.id, "name"))
    : project.toolId;

  return (
    <article className="glow-panel flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-[var(--glass-shadow)]">
      <div className="min-w-0 space-y-1">
        <h2 className="truncate font-label text-foreground">{project.name}</h2>
        <p className="font-mono text-[10px] text-muted">{toolName}</p>
        <p className="font-mono text-[10px] text-muted/80">
          {t("projects.lastUpdated", {
            date: formatUpdatedAt(project.updatedAt, language),
          })}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/tools/${project.toolId}?project=${project.id}`}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-sm border border-[color-mix(in_srgb,var(--glow-teal)_40%,var(--border))] bg-accent-muted px-4 py-2 font-label text-sm text-accent transition-colors hover:bg-accent/20"
        >
          <FolderOpen className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          {t("projects.openProject")}
        </Link>
        <button
          type="button"
          onClick={() => void removeProject(project.id)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-border bg-background px-4 py-2 font-label text-sm text-muted transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 sm:w-auto"
          aria-label={t("projects.deleteProject")}
        >
          <Trash2 className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span className="sm:hidden">{t("projects.deleteProject")}</span>
        </button>
      </div>
    </article>
  );
}
