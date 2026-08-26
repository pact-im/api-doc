"use client"

import * as React from "react"

/** Sets <html lang> for non-default locales (root layout defaults to ru). */
export function HtmlLang({ lang }: { lang: string }) {
  React.useEffect(() => {
    document.documentElement.lang = lang
    return () => {
      document.documentElement.lang = "ru"
    }
  }, [lang])

  return null
}
