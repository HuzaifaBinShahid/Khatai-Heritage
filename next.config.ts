import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  transpilePackages: ["three"],
};

export default config;
