import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "pix-8 — Privacy-first image tools",
    template: "%s · pix-8",
  },
  description:
    "Browser-based image utilities that run entirely on your device. Resize, convert, compress, and crop — no uploads, no tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
            <CookieConsent />
            <GoogleAnalytics />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
