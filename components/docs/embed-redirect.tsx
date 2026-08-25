"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { getUiMessages, localePath, type Locale } from "@/lib/i18n"

/** Client redirect that preserves hash (works with static export). */
export function LocalePathRedirect({
  locale,
  to,
}: {
  locale: Locale
  to: string
}) {
  const router = useRouter()
  const ui = getUiMessages(locale)

  React.useEffect(() => {
    const hash = window.location.hash
    router.replace(`${localePath(locale, to)}/${hash}`)
  }, [router, locale, to])

  return (
    <p className="p-8 text-sm text-muted-foreground">{ui.redirecting}</p>
  )
}

/** Redirect /embed → /embed/overview (and EN equivalent). */
export function EmbedIndexRedirect({ locale }: { locale: Locale }) {
  return <LocalePathRedirect locale={locale} to="/embed/overview" />
}
