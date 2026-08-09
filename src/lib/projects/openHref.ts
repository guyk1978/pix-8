import { isEditorProjectPayload } from "@/lib/editor/editorProject";
import { getToolRoute } from "@/lib/sidebarNav";
import type { Language } from "@/lib/language";
import type { SavedProjectRecord } from "@/lib/projects/types";

/** Build a deep-link that restores a saved project in the correct workspace. */
export function buildProjectOpenHref(
  project: SavedProjectRecord,
  language: Language,
): string {
  const projectParam = encodeURIComponent(project.id);

  if (isEditorProjectPayload(project.payload)) {
    return `/?lang=${language}&project=${projectParam}`;
  }

  return `${getToolRoute(project.toolId)}?project=${projectParam}`;
}
