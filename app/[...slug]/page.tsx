import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPage } from "@/components/docs/docs-page"
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs"
import { defaultLocale } from "@/lib/i18n"

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return getAllDocSlugs(defaultLocale)
    .filter((slug) => slug.length > 0)
    .filter((slug) => slug[0] !== "en")
    .map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (slug[0] === "en") {
    return { title: "Not found" }
  }
  const slugs = getAllDocSlugs(defaultLocale).map((s) => s.join("/"))
  const key = slug.join("/")
  if (!slugs.includes(key)) {
    return { title: "Not found" }
  }
  const doc = getDocBySlug(slug, defaultLocale)
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }
}

export default async function DocRoutePage({ params }: PageProps) {
  const { slug } = await params
  if (slug[0] === "en") {
    notFound()
  }
  const slugs = getAllDocSlugs(defaultLocale).map((s) => s.join("/"))
  const key = slug.join("/")
  if (!slugs.includes(key)) {
    notFound()
  }
  const doc = getDocBySlug(slug, defaultLocale)
  return <DocsPage doc={doc} />
}
