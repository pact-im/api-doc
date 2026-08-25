import { createHighlighter, type Highlighter } from "shiki"

const LANG_ALIASES: Record<string, string> = {
  shell: "bash",
  sh: "bash",
  curl: "bash",
  js: "javascript",
  ts: "typescript",
  text: "plaintext",
  txt: "plaintext",
  node: "javascript",
}

const LANGS = [
  "bash",
  "json",
  "php",
  "javascript",
  "typescript",
  "http",
  "ruby",
  "python",
  "markdown",
  "html",
  "xml",
  "yaml",
  "sql",
  "plaintext",
] as const

let highlighterPromise: Promise<Highlighter> | null = null
const htmlCache = new Map<string, Promise<string>>()

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [...LANGS],
    })
  }
  return highlighterPromise
}

function normalizeLang(language?: string) {
  const raw = (language ?? "plaintext").toLowerCase()
  return LANG_ALIASES[raw] ?? raw
}

export function getHighlightedCode(code: string, language?: string) {
  const lang = normalizeLang(language)
  const key = `${lang}\0${code}`
  let promise = htmlCache.get(key)
  if (!promise) {
    promise = (async () => {
      const highlighter = await getHighlighter()
      const loaded = highlighter.getLoadedLanguages()
      const resolved = loaded.includes(lang as never) ? lang : "plaintext"
      return highlighter.codeToHtml(code, {
        lang: resolved,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,
      })
    })()
    htmlCache.set(key, promise)
  }
  return promise
}
