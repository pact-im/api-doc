import { NextResponse } from "next/server"

import { getWebManifest } from "@/lib/web-manifest"

export const dynamic = "force-static"

export function GET() {
  return NextResponse.json(getWebManifest(), {
    headers: {
      "content-type": "application/manifest+json; charset=utf-8",
    },
  })
}
