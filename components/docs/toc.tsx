"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { DocHeading } from "@/lib/docs"
import { defaultLocale, getUiMessages, type Locale } from "@/lib/i18n"

export function TableOfContents({
  headings,
  locale = defaultLocale,
}: {
  headings: DocHeading[]
  locale?: Locale
}) {
  const ui = getUiMessages(locale)
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{ui.onThisPage}</p>
      <ul className="flex flex-col gap-1 border-l border-border text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l border-transparent py-1 text-muted-foreground transition-colors hover:text-foreground",
                heading.level === 3 && "pl-6",
                heading.level === 2 && "pl-4",
                activeId === heading.id &&
                  "border-foreground font-medium text-foreground"
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
