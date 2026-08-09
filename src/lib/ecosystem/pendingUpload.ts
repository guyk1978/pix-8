/**
 * Persist Pix-8 inbound handoffs (from JoinMyPDF) across the splash→editor remount.
 */

export const PIX8_PENDING_UPLOAD_KEY = "pix8-pending-upload-v1";
const MAX_AGE_MS = 15 * 60 * 1000;

type StoredFile = {
  name: string;
  type: string;
  lastModified: number;
  dataBase64: string;
};

type PendingPayload = {
  version: 1;
  createdAt: number;
  files: StoredFile[];
};

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToBytes(dataBase64: string): Uint8Array {
  const binary = atob(dataBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function fileToStored(file: File): Promise<StoredFile> {
  const buffer = await file.arrayBuffer();
  return {
    name: file.name,
    type: file.type,
    lastModified: file.lastModified,
    dataBase64: bytesToBase64(new Uint8Array(buffer)),
  };
}

function storedToFile(stored: StoredFile): File {
  const bytes = base64ToBytes(stored.dataBase64);
  const buffer = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
  return new File([buffer], stored.name, {
    type: stored.type,
    lastModified: stored.lastModified,
  });
}

export function clearPix8PendingUpload(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(PIX8_PENDING_UPLOAD_KEY);
  } catch {
    /* ignore */
  }
}

export async function writePix8PendingUpload(files: File[]): Promise<void> {
  if (typeof window === "undefined" || !files.length) return;
  const storedFiles = await Promise.all(files.map(fileToStored));
  const payload: PendingPayload = {
    version: 1,
    createdAt: Date.now(),
    files: storedFiles,
  };
  window.sessionStorage.setItem(PIX8_PENDING_UPLOAD_KEY, JSON.stringify(payload));
}

export function consumePix8PendingUpload(): File[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PIX8_PENDING_UPLOAD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPayload;
    clearPix8PendingUpload();
    if (!parsed?.files?.length || parsed.version !== 1) return null;
    if (Date.now() - parsed.createdAt > MAX_AGE_MS) return null;
    return parsed.files.map(storedToFile);
  } catch {
    clearPix8PendingUpload();
    return null;
  }
}
