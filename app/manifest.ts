import type { MetadataRoute } from "next"

import { getWebManifest } from "@/lib/web-manifest"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return getWebManifest()
}
