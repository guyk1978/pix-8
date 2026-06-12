import type { ToolId } from "@/lib/tools";

export const PROJECT_DB_VERSION = 1;

export interface ProjectImageRef {
  key: string;
  fileName: string;
  mimeType: string;
}

export interface SavedProjectRecord {
  id: string;
  name: string;
  toolId: ToolId;
  updatedAt: string;
  payload: Record<string, unknown>;
  images: ProjectImageRef[];
}

export interface StoredImageRecord {
  key: string;
  blob: Blob;
  fileName: string;
  mimeType: string;
}

export interface ProjectImageInput {
  key: string;
  file: File;
}

export const MAIN_IMAGE_KEY = "main";
export const WATERMARK_IMAGE_KEY = "watermark";
