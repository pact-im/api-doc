import { DocsPathRedirect } from "@/components/docs/docs-redirect"
import { getAllDocSlugs } from "@/lib/docs"
import { locales } from "@/lib/i18n"

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export function generateStaticParams() {
  const params: { slug: string[] }[] = [{ slug: [] }]
  for (const locale of locales) {
    const slugs = getAllDocSlugs(locale)
    if (locale === "ru") {
      params.push(...slugs.map((slug) => ({ slug })))
    } else {
      params.push({ slug: [locale] })
      params.push(
        ...slugs.map((slug) => ({ slug: [locale, ...slug] }))
      )
    }
  }
  return params
}

export default async function DocsCompatRedirectPage({ params }: PageProps) {
  const { slug } = await params
  return <DocsPathRedirect slug={slug} />
}
