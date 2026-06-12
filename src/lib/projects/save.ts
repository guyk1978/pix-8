import {
  deleteProject,
  getProject,
  listProjects,
  loadProjectImages,
  upsertProject,
} from "@/lib/projects/db";
import type {
  ProjectImageInput,
  SavedProjectRecord,
  StoredImageRecord,
} from "@/lib/projects/types";
import type { ToolId } from "@/lib/tools";

export interface SaveProjectInput {
  id?: string;
  name: string;
  toolId: ToolId;
  payload: Record<string, unknown>;
  images: ProjectImageInput[];
}

export async function saveProject(
  input: SaveProjectInput,
): Promise<SavedProjectRecord> {
  const id = input.id ?? crypto.randomUUID();
  const now = new Date().toISOString();

  const images = input.images.map((image) => ({
    key: image.key.startsWith(`${id}-`) ? image.key : `${id}-${image.key}`,
    fileName: image.file.name || `${image.key}.png`,
    mimeType: image.file.type || "image/png",
  }));

  const storedImages: StoredImageRecord[] = input.images.map((image, index) => ({
    key: images[index]!.key,
    blob: image.file,
    fileName: images[index]!.fileName,
    mimeType: images[index]!.mimeType,
  }));

  const record: SavedProjectRecord = {
    id,
    name: input.name.trim(),
    toolId: input.toolId,
    updatedAt: now,
    payload: input.payload,
    images,
  };

  return upsertProject(record, storedImages);
}

export async function updateProjectName(
  id: string,
  name: string,
): Promise<SavedProjectRecord | undefined> {
  const existing = await getProject(id);
  if (!existing) return undefined;

  return upsertProject(
    {
      ...existing,
      name: name.trim(),
      updatedAt: new Date().toISOString(),
    },
    [],
  );
}

export {
  deleteProject,
  getProject,
  listProjects,
  loadProjectImages,
};
