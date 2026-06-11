const DB_NAME = "pix8-model-cache";
const DB_VERSION = 1;
const STORE_NAME = "models";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open IndexedDB."));
  });
}

function readCachedModel(db: IDBDatabase, key: string): Promise<ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      const value = request.result;
      resolve(value instanceof ArrayBuffer ? value : null);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to read cached model."));
  });
}

function writeCachedModel(
  db: IDBDatabase,
  key: string,
  data: ArrayBuffer,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(data, key);

    request.onsuccess = () => resolve();
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to cache model."));
  });
}

export interface ModelFetchProgress {
  loaded: number;
  total: number;
}

export async function loadModelWithCache(
  cacheKey: string,
  url: string,
  onProgress?: (progress: ModelFetchProgress) => void,
): Promise<ArrayBuffer> {
  const db = await openDatabase();

  try {
    const cached = await readCachedModel(db, cacheKey);
    if (cached) {
      onProgress?.({ loaded: cached.byteLength, total: cached.byteLength });
      return cached;
    }
  } catch {
    // IndexedDB may be unavailable (private mode, quota) — fall back to network.
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Model download failed (${response.status}).`);
  }

  const total = Number(response.headers.get("content-length") ?? 0);
  const reader = response.body?.getReader();

  if (!reader) {
    const buffer = await response.arrayBuffer();
    onProgress?.({ loaded: buffer.byteLength, total: buffer.byteLength || buffer.byteLength });
    try {
      await writeCachedModel(db, cacheKey, buffer);
    } catch {
      // Non-fatal if caching fails.
    }
    return buffer;
  }

  const chunks: Uint8Array[] = [];
  let loaded = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.byteLength;
      onProgress?.({ loaded, total: total || loaded });
    }
  }

  const buffer = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const arrayBuffer = buffer.buffer;

  try {
    await writeCachedModel(db, cacheKey, arrayBuffer);
  } catch {
    // Non-fatal if caching fails.
  }

  return arrayBuffer;
}
