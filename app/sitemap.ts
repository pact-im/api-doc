import type { MetadataRoute } from "next"

import { getAllDocs, getDocLastModified } from "@/lib/docs"
import { absolutePageUrl } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const ruDocs = getAllDocs("ru")
  const enBySlug = new Map(
    getAllDocs("en").map((doc) => [doc.slug.join("/"), doc])
  )

  return ruDocs.flatMap((ru) => {
    const en = enBySlug.get(ru.slug.join("/"))
    if (!en) {
      throw new Error(`Missing English doc for slug: ${ru.slug.join("/")}`)
    }

    const ruUrl = absolutePageUrl(ru.href)
    const enUrl = absolutePageUrl(en.href)
    const alternates = {
      languages: {
        ru: ruUrl,
        en: enUrl,
        "x-default": ruUrl,
      },
    }
    const isHome = ru.slug.length === 0

    return [
      {
        url: ruUrl,
        lastModified: getDocLastModified(ru.slug, "ru"),
        changeFrequency: "weekly" as const,
        priority: isHome ? 1 : 0.7,
        alternates,
      },
      {
        url: enUrl,
        lastModified: getDocLastModified(en.slug, "en"),
        changeFrequency: "weekly" as const,
        priority: isHome ? 1 : 0.7,
        alternates,
      },
    ]
  })
}
