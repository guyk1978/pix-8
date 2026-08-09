export const JOIN_MY_PDF_URL = "https://joinmypdf.com/";

/** Local JoinMyPDF when developing Pix-8 on another port. Override with NEXT_PUBLIC_JOINMYPDF_URL. */
export function getJoinMyPdfUrl(): string {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    if (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return (
        process.env.NEXT_PUBLIC_JOINMYPDF_URL?.replace(/\/$/, "") ||
        "http://localhost:3000"
      );
    }
  }
  return (
    process.env.NEXT_PUBLIC_JOINMYPDF_URL?.replace(/\/$/, "") ||
    JOIN_MY_PDF_URL.replace(/\/$/, "")
  );
}
