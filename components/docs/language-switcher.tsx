"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { getBasePath } from "@/lib/docs-client"
import { locales, switchLocalePath, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const labels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const base = getBasePath()
  const pathWithoutBase =
    (pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname) ||
    "/"

  return (
    <div
      className="flex shrink-0 items-center rounded-md border p-0.5"
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const href = switchLocalePath(pathWithoutBase, loc)
        const active = loc === locale
        return (
          <Link
            key={loc}
            href={href}
            hrefLang={loc}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-sm px-2 text-xs font-medium transition-colors",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels[loc]}
          </Link>
        )
      })}
    </div>
  )
}
