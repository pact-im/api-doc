import Link from "next/link"
import { Fragment } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/docs/app-sidebar"
import { CopyPageMenu } from "@/components/docs/copy-page"
import { DocsSearchProvider } from "@/components/docs/docs-search"
import { DocsMarkdown } from "@/components/docs/markdown"
import { HttpRequest } from "@/components/docs/http-request"
import { LanguageSwitcher } from "@/components/docs/language-switcher"
import { TableOfContents } from "@/components/docs/toc"
import { ThemeToggle } from "@/components/docs/theme-toggle"
import { getAdjacentDocs, getNavSectionsWithMethods, type Doc } from "@/lib/docs"
import { getUiMessages } from "@/lib/i18n"
import { getBreadcrumbs } from "@/lib/nav"

export function DocsPage({ doc }: { doc: Doc }) {
  const locale = doc.locale
  const ui = getUiMessages(locale)
  const crumbs = getBreadcrumbs(doc.href, locale)
  const { prev, next } = getAdjacentDocs(doc.href, locale)
  const navSections = getNavSectionsWithMethods(locale)

  return (
    <SidebarProvider open>
      <DocsSearchProvider locale={locale} sections={navSections}>
      <AppSidebar sections={navSections} locale={locale} />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-1.5 border-b bg-background/80 px-3 backdrop-blur sm:gap-2 sm:px-4">
          <SidebarTrigger className="-ml-1 shrink-0 md:hidden" />
          <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
            <BreadcrumbList className="flex-nowrap overflow-hidden">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1
                return (
                  <Fragment key={`${crumb.title}-${index}`}>
                    {index > 0 ? (
                      <BreadcrumbSeparator className="hidden shrink-0 md:block" />
                    ) : null}
                    <BreadcrumbItem
                      className={
                        isLast
                          ? "min-w-0"
                          : "hidden shrink-0 md:inline-flex"
                      }
                    >
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage className="truncate">
                          {crumb.title}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          className="truncate"
                          render={<Link href={crumb.href} />}
                        >
                          {crumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <CopyPageMenu
              markdown={doc.raw}
              markdownHref={doc.markdownHref}
              locale={locale}
            />
          </div>
        </header>

        <div className="flex flex-1 gap-10 px-4 py-8 xl:px-8">
          <div className="mx-auto min-w-0 max-w-3xl flex-1">
            <article
              lang={locale}
              data-pagefind-body
              data-pagefind-meta={`lang:${locale}`}
            >
              <div className="mb-8 flex flex-col gap-3 font-heading">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {doc.frontmatter.title}
                  </h1>
                  {doc.frontmatter.description ? (
                    <p className="text-lg text-muted-foreground">
                      {doc.frontmatter.description}
                    </p>
                  ) : null}
                </div>
                {doc.httpRequest ? (
                  <HttpRequest
                    method={doc.httpRequest.method}
                    url={doc.httpRequest.url}
                  />
                ) : null}
              </div>

              <DocsMarkdown content={doc.content} locale={locale} />
            </article>

            <div className="mt-12 flex items-stretch justify-between gap-4 border-t pt-6">
              {prev ? (
                <Link
                  href={prev.href}
                  className="group flex flex-1 flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ChevronLeftIcon className="size-3.5" />
                    {ui.previous}
                  </span>
                  <span className="font-medium group-hover:underline">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="group flex flex-1 flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors hover:bg-muted/50"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {ui.next}
                    <ChevronRightIcon className="size-3.5" />
                  </span>
                  <span className="font-medium group-hover:underline">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="sticky top-20 hidden w-56 shrink-0 self-start xl:block">
            <TableOfContents headings={doc.headings} locale={locale} />
          </aside>
        </div>
      </SidebarInset>
      </DocsSearchProvider>
    </SidebarProvider>
  )
}
