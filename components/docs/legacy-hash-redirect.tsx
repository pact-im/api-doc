"use client"

import * as React from "react"

import { getBasePath } from "@/lib/docs-client"
import { legacyHashRedirects } from "@/lib/legacy-hashes"

/**
 * On the site root, rewrite old Slate hashes (#conversations, #v2-get-…)
 * to the matching multi-page path.
 */
export function LegacyHashRedirect() {
  React.useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash) return

    // Slate sometimes suffixes colliding ids (e.g. messages15, conversations14)
    const bare = hash.replace(/\d+$/, "")
    const target =
      legacyHashRedirects[hash] ??
      (bare !== hash ? legacyHashRedirects[bare] : undefined)
    if (!target) return

    const base = getBasePath()
    const [path, fragment] = target.split("#")
    const next = `${base}${path === "/" ? "/" : `${path}/`}${
      fragment ? `#${fragment}` : ""
    }`
    window.location.replace(next)
  }, [])

  return null
}
