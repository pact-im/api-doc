const DEFAULT_SITE_URL = "https://pact-im.github.io"

export function getSiteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(
    /\/$/,
    ""
  )
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? ""
}

export function withBasePath(pathName: string): string {
  const base = getBasePath()
  if (!base) return pathName
  if (pathName.startsWith(base)) return pathName
  return `${base}${pathName.startsWith("/") ? pathName : `/${pathName}`}`
}

/** Origin + GitHub Pages base path, without a trailing slash. */
export function getPublicSiteUrl(): string {
  return `${getSiteOrigin()}${getBasePath()}`
}

function withTrailingSlash(pathname: string): string {
  if (pathname === "/" || pathname === "") return "/"
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  return path.endsWith("/") ? path : `${path}/`
}

/** Canonical page URL. Matches `trailingSlash: true` in next.config. */
export function absolutePageUrl(href: string): string {
  return `${getPublicSiteUrl()}${withTrailingSlash(href)}`
}

/** File URL without a trailing slash (`/sitemap.xml`, `/manifest.webmanifest`). */
export function absoluteFileUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${getPublicSiteUrl()}${path}`
}
