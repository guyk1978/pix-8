import JSZip from "jszip";

export interface ZipEntry {
  filename: string;
  blob: Blob;
}

export async function downloadZipArchive(
  entries: ZipEntry[],
  archiveName: string,
): Promise<void> {
  if (entries.length === 0) {
    throw new Error("No files to archive.");
  }

  const zip = new JSZip();

  for (const entry of entries) {
    zip.file(entry.filename, entry.blob);
  }

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  const fullName = archiveName.endsWith(".zip") ? archiveName : `${archiveName}.zip`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fullName;
  anchor.click();
  URL.revokeObjectURL(url);
}
