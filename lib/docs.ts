import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import GithubSlugger from "github-slugger"
import { getAllNavItems, getNavSections } from "@/lib/nav"
import type { NavItem, NavSection } from "@/lib/nav"
import { defaultLocale, localePath, type Locale } from "@/lib/i18n"

function contentDir(locale: Locale): string {
  return path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "content",
    locale
  )
}

export type DocFrontmatter = {
  title: string
  description?: string
  section?: string
}

export type DocHeading = {
  id: string
  text: string
  level: number
}

export type HttpRequestInfo = {
  method: string
  url: string
}

export type Doc = {
  slug: string[]
  href: string
  markdownHref: string
  locale: Locale
  frontmatter: DocFrontmatter
  content: string
  raw: string
  headings: DocHeading[]
  httpRequest?: HttpRequestInfo
}

function slugToFilePath(slug: string[], locale: Locale): string {
  const dir = contentDir(locale)
  if (slug.length === 0) {
    return path.join(dir, "index.md")
  }
  const asFile = path.join(dir, ...slug) + ".md"
  if (fs.existsSync(asFile)) return asFile
  const asIndex = path.join(dir, ...slug, "index.md")
  if (fs.existsSync(asIndex)) return asIndex
  throw new Error(`Doc not found for slug: ${slug.join("/")} (${locale})`)
}

function hrefFromSlug(slug: string[], locale: Locale): string {
  const bare = slug.length === 0 ? "/" : `/${slug.join("/")}`
  return localePath(locale, bare)
}

function markdownHrefFromSlug(
  slug: string[],
  filePath: string,
  locale: Locale
): string {
  const isIndex = path.basename(filePath) === "index.md"
  const prefix = locale === defaultLocale ? "/docs" : `/docs/${locale}`
  if (slug.length === 0) return `${prefix}/index.md`
  if (isIndex) return `${prefix}/${slug.join("/")}/index.md`
  return `${prefix}/${slug.join("/")}.md`
}

function extractHeadings(content: string): DocHeading[] {
  const slugger = new GithubSlugger()
  const headings: DocHeading[] = []
  const lines = content.split("\n")
  let inFence = false

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{2,3})\s+(.+)$/.exec(line)
    if (!match) continue

    const level = match[1].length
    const text = match[2].replace(/[#*`_[\]]/g, "").trim()
    const idMatch = /\{#([^}]+)\}/.exec(match[2])
    const id = idMatch?.[1] ?? slugger.slug(text)

    headings.push({ id, text: text.replace(/\{#[^}]+\}/, "").trim(), level })
  }

  return headings
}

const HTTP_REQUEST_RE =
  /^## HTTP Request\s*\n+`([A-Z]+)\s+(.+?)`\s*(?:\n|$)/m

function extractHttpRequest(content: string): {
  content: string
  httpRequest?: HttpRequestInfo
} {
  const sectionCount = (content.match(/^## HTTP Request\s*$/gm) ?? []).length
  if (sectionCount !== 1) return { content }

  const match = HTTP_REQUEST_RE.exec(content)
  if (!match) return { content }

  return {
    content: content.replace(HTTP_REQUEST_RE, "\n").replace(/^\n+/, ""),
    httpRequest: {
      method: match[1],
      url: match[2].trim(),
    },
  }
}

export function getDocBySlug(
  slug: string[],
  locale: Locale = defaultLocale
): Doc {
  const filePath = slugToFilePath(slug, locale)
  const rawFile = fs.readFileSync(filePath, "utf8")
  const { data, content: rawContent } = matter(rawFile)
  const frontmatter = data as DocFrontmatter
  const { content, httpRequest } = extractHttpRequest(rawContent)

  return {
    slug,
    href: hrefFromSlug(slug, locale),
    markdownHref: markdownHrefFromSlug(slug, filePath, locale),
    locale,
    frontmatter: {
      title: frontmatter.title ?? slug[slug.length - 1] ?? "Docs",
      description: frontmatter.description,
      section: frontmatter.section,
    },
    content,
    raw: rawFile,
    headings: extractHeadings(content),
    httpRequest,
  }
}

export function getAllDocSlugs(locale: Locale = defaultLocale): string[][] {
  const slugs: string[][] = []
  const dir = contentDir(locale)

  function walk(walkDir: string, parts: string[]) {
    const entries = fs.readdirSync(walkDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(walkDir, entry.name), [...parts, entry.name])
        continue
      }
      if (!entry.name.endsWith(".md")) continue
      if (entry.name === "index.md") {
        slugs.push(parts)
      } else {
        slugs.push([...parts, entry.name.replace(/\.md$/, "")])
      }
    }
  }

  if (fs.existsSync(dir)) {
    walk(dir, [])
  }

  return slugs
}

export function getAllDocs(locale: Locale = defaultLocale): Doc[] {
  return getAllDocSlugs(locale).map((slug) => getDocBySlug(slug, locale))
}

export function getAdjacentDocs(
  href: string,
  locale: Locale = defaultLocale
): {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
} {
  const items = getAllNavItems(locale)
  const normalized = href.replace(/\/$/, "") || "/"
  const index = items.findIndex(
    (item) => item.href.replace(/\/$/, "") === normalized
  )
  if (index === -1) return {}
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  }
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

function hrefToSlug(href: string, locale: Locale): string[] {
  let normalized = href.replace(/\/$/, "") || "/"
  if (locale !== defaultLocale) {
    const prefix = `/${locale}`
    if (normalized === prefix) return []
    if (normalized.startsWith(`${prefix}/`)) {
      normalized = normalized.slice(prefix.length) || "/"
    }
  }
  if (normalized === "/" || normalized === "/docs") return []
  return normalized
    .replace(/^\/docs\/?/, "/")
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean)
}

function enrichNavItem(item: NavItem, locale: Locale): NavItem {
  let method = item.method
  if (!method) {
    try {
      method = getDocBySlug(hrefToSlug(item.href, locale), locale).httpRequest
        ?.method
    } catch {
      // Overview / non-endpoint pages have no HTTP request
    }
  }

  return {
    ...item,
    method,
    items: item.items?.map((child) => enrichNavItem(child, locale)),
  }
}

export function getNavSectionsWithMethods(
  locale: Locale = defaultLocale
): NavSection[] {
  return getNavSections(locale).map((section) => ({
    ...section,
    items: section.items.map((item) => enrichNavItem(item, locale)),
  }))
}
