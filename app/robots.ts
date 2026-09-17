import type { MetadataRoute } from "next"

import { absoluteFileUrl, getSiteOrigin, withBasePath } from "@/lib/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [withBasePath("/docs"), withBasePath("/docs/")],
    },
    sitemap: absoluteFileUrl("/sitemap.xml"),
    host: new URL(getSiteOrigin()).host,
  }
}
