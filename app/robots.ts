import type { MetadataRoute } from "next";

import { SITE_URL, absoluteUrl } from "@/lib/site";

// Required by `output: export` — emits out/robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
