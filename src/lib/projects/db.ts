import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { ToolId } from "@/lib/tools";
import { PROJECT_DB_VERSION } from "@/lib/projects/types";
import type { SavedProjectRecord, StoredImageRecord } from "@/lib/projects/types";

interface Pix8ProjectsDB extends DBSchema {
  projects: {
    key: string;
    value: SavedProjectRecord;
    indexes: {
      "by-tool": ToolId;
      "by-updated": string;
    };
  };
  images: {
    key: string;
    value: StoredImageRecord;
  };
}

const DB_NAME = "pix-8-projects";

let dbPromise: Promise<IDBPDatabase<Pix8ProjectsDB>> | null = null;

function getDb(): Promise<IDBPDatabase<Pix8ProjectsDB>> {
  if (!dbPromise) {
    dbPromise = openDB<Pix8ProjectsDB>(DB_NAME, PROJECT_DB_VERSION, {
      upgrade(db) {
        const projects = db.createObjectStore("projects", { keyPath: "id" });
        projects.createIndex("by-tool", "toolId");
        projects.createIndex("by-updated", "updatedAt");
        db.createObjectStore("images", { keyPath: "key" });
      },
    });
  }

  return dbPromise;
}

export async function listProjects(): Promise<SavedProjectRecord[]> {
  const db = await getDb();
  const records = await db.getAll("projects");
  return records.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getProject(
  id: string,
): Promise<SavedProjectRecord | undefined> {
  const db = await getDb();
  return db.get("projects", id);
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDb();
  const record = await db.get("projects", id);
  if (!record) return;

  const tx = db.transaction(["projects", "images"], "readwrite");
  await Promise.all([
    ...record.images.map((image) => tx.objectStore("images").delete(image.key)),
    tx.objectStore("projects").delete(id),
    tx.done,
  ]);
}

export async function upsertProject(
  record: SavedProjectRecord,
  images: StoredImageRecord[],
): Promise<SavedProjectRecord> {
  const db = await getDb();
  const existing = await db.get("projects", record.id);

  const tx = db.transaction(["projects", "images"], "readwrite");

  if (existing) {
    for (const image of existing.images) {
      if (!record.images.some((next) => next.key === image.key)) {
        await tx.objectStore("images").delete(image.key);
      }
    }
  }

  for (const image of images) {
    await tx.objectStore("images").put(image);
  }

  await tx.objectStore("projects").put(record);
  await tx.done;

  return record;
}

function toLogicalImageKey(projectId: string, storedKey: string): string {
  const prefix = `${projectId}-`;
  return storedKey.startsWith(prefix) ? storedKey.slice(prefix.length) : storedKey;
}

export async function loadProjectImages(
  record: SavedProjectRecord,
): Promise<Map<string, File>> {
  const db = await getDb();
  const files = new Map<string, File>();

  for (const ref of record.images) {
    const stored = await db.get("images", ref.key);
    if (!stored) continue;

    files.set(
      toLogicalImageKey(record.id, ref.key),
      new File([stored.blob], ref.fileName, { type: stored.mimeType }),
    );
  }

  return files;
}

export async function loadProjectFiles(
  record: SavedProjectRecord,
): Promise<File[]> {
  const map = await loadProjectImages(record);
  return record.images
    .map((ref) => map.get(ref.key))
    .filter((file): file is File => !!file);
}
