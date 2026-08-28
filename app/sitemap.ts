import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

// Required by `output: export` — emits out/sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time doubles as lastModified: the pages are static, so a rebuild is
  // the only way their content can have changed.
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/careers"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
