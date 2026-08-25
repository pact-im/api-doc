import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPage } from "@/components/docs/docs-page"
import { HtmlLang } from "@/components/docs/html-lang"
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs"

type PageProps = {
  params: Promise<{ slug: string[] }>
}

const locale = "en" as const

export function generateStaticParams() {
  return getAllDocSlugs(locale)
    .filter((slug) => slug.length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const slugs = getAllDocSlugs(locale).map((s) => s.join("/"))
  const key = slug.join("/")
  if (!slugs.includes(key)) {
    return { title: "Not found" }
  }
  const doc = getDocBySlug(slug, locale)
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }
}

export default async function EnglishDocRoutePage({ params }: PageProps) {
  const { slug } = await params
  const slugs = getAllDocSlugs(locale).map((s) => s.join("/"))
  const key = slug.join("/")
  if (!slugs.includes(key)) {
    notFound()
  }
  const doc = getDocBySlug(slug, locale)
  return (
    <>
      <HtmlLang lang="en" />
      <DocsPage doc={doc} />
    </>
  )
}
