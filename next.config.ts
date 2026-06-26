import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is for production builds (Cloudflare Pages). Dev needs a normal server.
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
