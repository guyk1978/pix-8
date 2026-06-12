import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AppShell } from "@/components/layout/AppShell";
import { FavoritesProvider } from "@/components/favorites/FavoritesContext";
import { ProjectsProvider } from "@/components/projects/ProjectsContext";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ShareMetaSync } from "@/components/ShareMetaSync";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { DEFAULT_SHARE_IMAGE } from "@/lib/shareImages";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Browser-based image utilities that run entirely on your device. Resize, convert, compress, and crop — no uploads, no tracking.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pix-8.com"),
  title: {
    default: "pix-8 — Privacy-first image tools",
    template: "%s · pix-8",
  },
  description: siteDescription,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "pix-8",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "pix-8 | Client-side image utilities",
    description: "Process images locally. Nothing leaves your browser.",
    type: "website",
    images: [
      {
        url: DEFAULT_SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "pix-8 — client-side image utilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pix-8 | Client-side image utilities",
    description: "Process images locally. Nothing leaves your browser.",
    images: [DEFAULT_SHARE_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <ProjectsProvider>
              <ToastProvider>
                <ShareMetaSync />
                <AppShell>{children}</AppShell>
              <CookieConsent />
              <GoogleAnalytics />
              </ToastProvider>
              </ProjectsProvider>
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
