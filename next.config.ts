import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Every route is prerendered, so the site ships as plain files to Cloudflare
  // Pages. `next build` writes them to out/.
  output: "export",

  // Static export has no image optimizer at request time. The only raster asset
  // is the logo, which is committed already-compressed and served as-is.
  images: { unoptimized: true },

  // Emits out/careers.html rather than out/careers/index.html. Pages serves that
  // at /careers, matching the canonical URLs and the sitemap.
  trailingSlash: false,
};

export default nextConfig;
