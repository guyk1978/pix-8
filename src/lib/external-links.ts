import { resolveJoinMyPdfBaseUrl } from "@/lib/ecosystem/protocol";

export const JOIN_MY_PDF_URL = "https://joinmypdf.com/";

/** Local JoinMyPDF when developing Pix-8 on another port. Override with NEXT_PUBLIC_JOINMYPDF_URL. */
export function getJoinMyPdfUrl(): string {
  return resolveJoinMyPdfBaseUrl();
}
