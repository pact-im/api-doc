import type { NextConfig } from "next"
import path from "node:path"
import { fileURLToPath } from "node:url"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  turbopack: {
    root: projectRoot,
  },
}

export default nextConfig
