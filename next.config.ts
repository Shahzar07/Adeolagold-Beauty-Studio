import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All imagery is served locally from /public. Add remote CDN hosts here
    // (e.g. a Shopify Files or Cloudinary domain) when swapping in campaign photography.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 200, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
