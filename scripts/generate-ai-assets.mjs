import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_ROOT = path.join(process.cwd(), "content")
const PUBLIC_DOCS = path.join(process.cwd(), "public/docs")
const LLMS_PATH = path.join(process.cwd(), "public/llms.txt")

const LOCALES = [
  { code: "ru", default: true },
  { code: "en", default: false },
]

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pact-im.github.io"

function walk(dir, parts = []) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      results.push(...walk(path.join(dir, entry.name), [...parts, entry.name]))
      continue
    }
    if (!entry.name.endsWith(".md")) continue
    const slug =
      entry.name === "index.md"
        ? parts
        : [...parts, entry.name.replace(/\.md$/, "")]
    results.push({
      slug,
      filePath: path.join(dir, entry.name),
    })
  }
  return results
}

function hrefFromSlug(slug, localeDefault) {
  const bare = slug.length === 0 ? "/" : `/${slug.join("/")}`
  if (localeDefault) return bare
  return bare === "/" ? "/en" : `/en${bare}`
}

function markdownHrefFromSlug(slug, filePath, localeDefault) {
  const isIndex = path.basename(filePath) === "index.md"
  const prefix = localeDefault ? "/docs" : "/docs/en"
  if (slug.length === 0) return `${prefix}/index.md`
  if (isIndex) return `${prefix}/${slug.join("/")}/index.md`
  return `${prefix}/${slug.join("/")}.md`
}

function withBase(pathName) {
  if (!basePath) return pathName
  return `${basePath}${pathName}`
}

fs.rmSync(PUBLIC_DOCS, { recursive: true, force: true })
fs.mkdirSync(PUBLIC_DOCS, { recursive: true })

const lines = [
  "# Pact.im API",
  "",
  "> Pact.im API documentation / Документация Pact.im API. Integrate WhatsApp, Telegram, Instagram, MAX, VK, Avito, and more into your product.",
  "",
]

let total = 0

for (const locale of LOCALES) {
  const contentDir = path.join(CONTENT_ROOT, locale.code)
  const docs = walk(contentDir)
  const publicRoot = locale.default
    ? PUBLIC_DOCS
    : path.join(PUBLIC_DOCS, locale.code)

  lines.push(`## Docs (${locale.code})`, "")

  for (const doc of docs) {
    const raw = fs.readFileSync(doc.filePath, "utf8")
    const { data } = matter(raw)
    const title = data.title ?? doc.slug.at(-1) ?? "Docs"
    const description = data.description ?? ""
    const mdHref = markdownHrefFromSlug(doc.slug, doc.filePath, locale.default)
    const outPath =
      path.basename(doc.filePath) === "index.md"
        ? path.join(publicRoot, ...doc.slug, "index.md")
        : path.join(
            publicRoot,
            ...doc.slug.slice(0, -1),
            `${doc.slug[doc.slug.length - 1]}.md`
          )

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, raw)

    const url = `${siteOrigin}${withBase(mdHref)}`
    lines.push(
      `- [${title}](${url}): ${description || hrefFromSlug(doc.slug, locale.default)}`
    )
    total += 1
  }

  lines.push("")
}

fs.writeFileSync(LLMS_PATH, lines.join("\n") + "\n")
console.log(`Generated ${total} public markdown files and llms.txt`)
