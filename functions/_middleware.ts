const SHARE_HEADER_IMAGES = {
  dark: {
    en: "/share-heder-pix-8-dark-en.png",
    he: "/share-heder-pix-8-dark-he.png",
  },
  light: {
    en: "/share-heder-pix-8-light-en.png",
    he: "/share-heder-pix-8-light-he.png",
  },
} as const;

function getShareImagePath(
  lang: string | null,
  theme: string | null,
): string | null {
  if (!lang && !theme) return null;

  const language = lang === "he" ? "he" : "en";
  const isDark = theme !== "light";

  return SHARE_HEADER_IMAGES[isDark ? "dark" : "light"][language];
}

function createMetaRewriter(content: string) {
  return {
    element(element: Element) {
      element.setAttribute("content", content);
    },
  };
}

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const url = new URL(context.request.url);
  const imagePath = getShareImagePath(
    url.searchParams.get("lang"),
    url.searchParams.get("theme"),
  );

  if (!imagePath) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const imageUrl = new URL(imagePath, url.origin).href;

  return new HTMLRewriter()
    .on('meta[property="og:image"]', createMetaRewriter(imageUrl))
    .on('meta[name="twitter:image"]', createMetaRewriter(imageUrl))
    .transform(response);
};
