import { DocsPage } from "@/components/docs/docs-page"
import { LegacyHashRedirect } from "@/components/docs/legacy-hash-redirect"
import { getDocBySlug } from "@/lib/docs"
import { defaultLocale } from "@/lib/i18n"

export default function HomePage() {
  const doc = getDocBySlug([], defaultLocale)
  return (
    <>
      <LegacyHashRedirect />
      <DocsPage doc={doc} />
    </>
  )
}
