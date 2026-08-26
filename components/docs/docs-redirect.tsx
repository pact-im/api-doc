"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  defaultLocale,
  getUiMessages,
  isLocale,
  localePath,
} from "@/lib/i18n"

/** Redirect /docs and /docs/* → locale paths (keeps hash). */
export function DocsPathRedirect({ slug }: { slug?: string[] }) {
  const router = useRouter()

  React.useEffect(() => {
    const hash = window.location.hash
    const parts = slug ?? []

    let locale = defaultLocale
    let pathParts = parts

    if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) {
      locale = parts[0]
      pathParts = parts.slice(1)
    }

    const bare = pathParts.length === 0 ? "/" : `/${pathParts.join("/")}`
    const href =
      bare === "/"
        ? `${localePath(locale, "/")}${hash}`
        : `${localePath(locale, bare)}/${hash}`

    router.replace(href)
  }, [router, slug])

  return (
    <p className="p-8 text-sm text-muted-foreground">
      {getUiMessages(defaultLocale).redirecting}
    </p>
  )
}
