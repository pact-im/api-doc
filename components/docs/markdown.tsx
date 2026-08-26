"use client"

import * as React from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import type { Components } from "react-markdown"
import { InfoIcon, TriangleAlertIcon, CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CodeBlock, CodeTabs } from "@/components/docs/code-block"
import { localePath, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function Callout({
  type,
  locale,
  children,
}: {
  type: "note" | "warning" | "success"
  locale: Locale
  children: React.ReactNode
}) {
  const icon =
    type === "warning" ? (
      <TriangleAlertIcon />
    ) : type === "success" ? (
      <CircleCheckIcon />
    ) : (
      <InfoIcon />
    )
  const titles = {
    ru: { note: "Заметка", warning: "Внимание", success: "Готово" },
    en: { note: "Note", warning: "Warning", success: "Success" },
  } as const
  const title = titles[locale][type]

  return (
    <Alert
      className={cn(
        "not-typeset my-4",
        type === "warning" && "border-amber-500/40",
        type === "success" && "border-emerald-500/40"
      )}
    >
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function decodeBase64(value: string) {
  const binary = atob(value)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

/** Languages that can be grouped into CodeTabs when consecutive. */
const CODE_TAB_LANGS = new Set([
  "shell",
  "bash",
  "sh",
  "curl",
  "php",
  "javascript",
  "js",
  "typescript",
  "ts",
  "python",
  "ruby",
  "go",
  "java",
  "csharp",
  "node",
])

function collapseConsecutiveCodeTabs(markdown: string): string {
  const fenceRe = /```([a-zA-Z0-9_-]+)\n([\s\S]*?)```/g
  const fences: {
    start: number
    end: number
    language: string
    code: string
  }[] = []

  for (const match of markdown.matchAll(fenceRe)) {
    const start = match.index ?? 0
    const full = match[0]
    fences.push({
      start,
      end: start + full.length,
      language: match[1].toLowerCase(),
      code: match[2].replace(/\n$/, ""),
    })
  }

  if (fences.length < 2) return markdown

  type Group = typeof fences
  const groups: Group[] = []
  let current: Group = [fences[0]]

  for (let i = 1; i < fences.length; i++) {
    const prev = fences[i - 1]
    const fence = fences[i]
    const between = markdown.slice(prev.end, fence.start)
    const consecutive = /^\s*$/.test(between)
    const bothTabbable =
      CODE_TAB_LANGS.has(prev.language) && CODE_TAB_LANGS.has(fence.language)
    const languageAlreadyInGroup = current.some(
      (item) => item.language === fence.language
    )

    // New tab set when a language repeats (e.g. shell+php, then shell+php again).
    if (consecutive && bothTabbable && !languageAlreadyInGroup) {
      current.push(fence)
    } else {
      groups.push(current)
      current = [fence]
    }
  }
  groups.push(current)

  let result = ""
  let cursor = 0
  for (const group of groups) {
    const first = group[0]
    result += markdown.slice(cursor, first.start)
    if (group.length >= 2) {
      const tabs = group.map(({ language, code }) => ({ language, code }))
      result += `<div data-code-tabs data-tabs="${encodeBase64(JSON.stringify(tabs))}"></div>`
    } else {
      result += markdown.slice(first.start, first.end)
    }
    cursor = group[group.length - 1].end
  }
  result += markdown.slice(cursor)
  return result
}

function formatCalloutBody(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function preprocess(markdown: string): string {
  let result = markdown.replace(
    /^>\s+\*\*(Note|Warning|Success|Заметка|Внимание|Готово):\*\*\s*(.+)$/gm,
    (_, label: string, body: string) => {
      const normalized = label.toLowerCase()
      const type =
        normalized === "warning" || normalized === "внимание"
          ? "warning"
          : normalized === "success" || normalized === "готово"
            ? "success"
            : "note"
      return `<div data-callout="${type}">${formatCalloutBody(body)}</div>`
    }
  )

  return collapseConsecutiveCodeTabs(result)
}

export function DocsMarkdown({
  content,
  locale = "ru",
}: {
  content: string
  locale?: Locale
}) {
  const prepared = preprocess(content)

  const components: Components = {
    a: ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:")
      ) {
        return (
          <a
            href={href}
            {...props}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {children}
          </a>
        )
      }
      const localized =
        href.startsWith("/") && !href.startsWith("/docs") && !href.startsWith("/llms")
          ? localePath(locale, href.split("#")[0]) +
            (href.includes("#") ? `#${href.split("#").slice(1).join("#")}` : "")
          : href
      return (
        <Link href={localized} {...props}>
          {children}
        </Link>
      )
    },
    table: ({ children }) => (
      <div className="not-typeset my-6 overflow-hidden rounded-lg border">
        <Table>{children}</Table>
      </div>
    ),
    thead: ({ children }) => (
      <TableHeader className="bg-muted/50 [&_tr]:border-b">{children}</TableHeader>
    ),
    tbody: ({ children }) => (
      <TableBody className="[&_tr:last-child]:border-0">{children}</TableBody>
    ),
    tr: ({ children }) => (
      <TableRow className="border-b hover:bg-muted/30">{children}</TableRow>
    ),
    th: ({ children }) => (
      <TableHead className="border-r px-3 last:border-r-0">{children}</TableHead>
    ),
    td: ({ children }) => (
      <TableCell className="whitespace-normal border-r px-3 last:border-r-0">
        {children}
      </TableCell>
    ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    h2: ({ children, id, ...props }) => (
      <h2 id={id} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3 id={id} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }) => (
      <h4 id={id} {...props}>
        {children}
      </h4>
    ),
    code: ({ className, children, ...props }) => {
      const isBlock = Boolean(className?.includes("language-"))
      if (!isBlock) {
        return <code {...props}>{children}</code>
      }
      const language = className?.replace("language-", "") ?? "text"
      const code = String(children).replace(/\n$/, "")
      return <CodeBlock language={language} code={code} />
    },
    pre: ({ children }) => <>{children}</>,
    div: ({ children, ...props }) => {
      const attrs = props as Record<string, string | undefined>
      const callout = attrs["data-callout"]
      if (callout === "note" || callout === "warning" || callout === "success") {
        return (
          <Callout type={callout} locale={locale}>
            {children}
          </Callout>
        )
      }

      if ("data-code-tabs" in attrs) {
        const rawTabs = attrs["data-tabs"]
        if (rawTabs) {
          try {
            const tabs = JSON.parse(decodeBase64(rawTabs)) as {
              language: string
              code: string
            }[]
            if (Array.isArray(tabs) && tabs.length > 0) {
              return <CodeTabs tabs={tabs} />
            }
          } catch {
            // fall through to legacy attributes
          }
        }

        const tabs = [
          {
            language: attrs["data-a-lang"] ?? "shell",
            code: decodeBase64(attrs["data-a-code"] ?? ""),
          },
          {
            language: attrs["data-b-lang"] ?? "php",
            code: decodeBase64(attrs["data-b-code"] ?? ""),
          },
        ]
        return <CodeTabs tabs={tabs} />
      }

      return <div {...props}>{children}</div>
    },
  }

  return (
    <div className="typeset typeset-docs max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {prepared}
      </ReactMarkdown>
    </div>
  )
}
