import type { Metadata } from "next"

import { DocsPage } from "@/components/docs/docs-page"
import { HtmlLang } from "@/components/docs/html-lang"
import { getDocBySlug } from "@/lib/docs"

export const metadata: Metadata = {
  title: {
    default: "Pact.im API Docs",
    template: "%s · Pact.im API",
  },
  description:
    "Pact.im API documentation. Integrate WhatsApp, Telegram, Instagram, MAX, VK, Avito, and more into your product.",
}

export default function EnglishHomePage() {
  const doc = getDocBySlug([], "en")
  return (
    <>
      <HtmlLang lang="en" />
      <DocsPage doc={doc} />
    </>
  )
}
