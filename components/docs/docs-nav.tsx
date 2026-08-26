"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRightIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { getBasePath, withBasePath } from "@/lib/docs-client"
import { httpMethodBadgeStyles } from "@/lib/http-method"
import { defaultLocale, getUiMessages, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type NavLeaf = {
  title: string
  url: string
  method?: string
  deprecated?: boolean
  external?: boolean
  items?: NavLeaf[]
}

const wrapTitleClass =
  "h-auto min-h-8 whitespace-normal py-1.5 leading-snug [&>span:last-child]:overflow-visible [&>span:last-child]:whitespace-normal [&>span:last-child]:text-wrap [&>span:last-child]:break-words"

const wrapSubTitleClass =
  "h-auto min-h-7 items-start whitespace-normal py-1.5 leading-snug [&>span:last-child]:overflow-visible [&>span:last-child]:whitespace-normal [&>span:last-child]:text-wrap [&>span:last-child]:break-words"

function NavTitle({
  title,
  method,
  deprecated,
  deprecatedLabel,
}: {
  title: string
  method?: string
  deprecated?: boolean
  deprecatedLabel: string
}) {
  return (
    <span className="flex min-w-0 items-start gap-1.5">
      {method ? (
        <Badge
          variant="outline"
          className={cn(
            "mt-0.5 h-4 shrink-0 rounded-sm px-1 font-mono text-[9px] tracking-wide uppercase",
            httpMethodBadgeStyles[method] ?? "bg-muted text-muted-foreground"
          )}
        >
          {method}
        </Badge>
      ) : null}
      <span className="min-w-0 flex-1 text-wrap break-words">{title}</span>
      {deprecated ? (
        <Badge
          variant="outline"
          className="mt-0.5 h-4 shrink-0 rounded-sm border-transparent bg-amber-500/15 px-1 text-[9px] font-medium tracking-wide text-amber-700 uppercase dark:text-amber-300"
        >
          {deprecatedLabel}
        </Badge>
      ) : null}
    </span>
  )
}

function pathInTree(current: string, items?: NavLeaf[]): boolean {
  if (!items?.length) return false
  return items.some((item) => {
    const href = item.url.replace(/\/$/, "") || "/"
    if (current === href || (href !== "/" && current.startsWith(`${href}/`))) {
      return true
    }
    return pathInTree(current, item.items)
  })
}

export function NavMain({
  items,
  locale = defaultLocale,
}: {
  items: {
    title: string
    items?: NavLeaf[]
  }[]
  locale?: Locale
}) {
  const ui = getUiMessages(locale)
  const pathname = usePathname()
  const base = getBasePath()
  const current =
    (pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname).replace(
      /\/$/,
      ""
    ) || "/"

  function isActive(url: string) {
    const href = url.replace(/\/$/, "") || "/"
    return (
      current === href || (href !== "/" && current.startsWith(`${href}/`))
    )
  }

  return (
    <>
      {items.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items?.map((item) => {
              const href = item.url.replace(/\/$/, "") || "/"
              const hasChildren = Boolean(item.items?.length)
              const childActive = pathInTree(current, item.items)
              const active = hasChildren
                ? current === href
                : isActive(item.url)

              if (!hasChildren) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      render={
                        item.external ? (
                          <a
                            href={withBasePath(item.url)}
                            target="_blank"
                            rel="noreferrer"
                          />
                        ) : (
                          <Link href={item.url} />
                        )
                      }
                      className={wrapTitleClass}
                    >
                      <NavTitle
                        title={item.title}
                        method={item.method}
                        deprecated={item.deprecated}
                        deprecatedLabel={ui.deprecated}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={active || childActive}
                  className="group/nav-item"
                >
                  <SidebarMenuItem>
                    <div className="flex items-center gap-0.5">
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.title}
                        render={<Link href={item.url} />}
                        className={cn(
                          wrapTitleClass,
                          "flex-1",
                          (active || childActive) && "font-medium"
                        )}
                      >
                        <NavTitle
                          title={item.title}
                          method={item.method}
                          deprecated={item.deprecated}
                          deprecatedLabel={ui.deprecated}
                        />
                      </SidebarMenuButton>
                      <CollapsibleTrigger className="flex size-7 shrink-0 items-center justify-center rounded-md text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2">
                        <ChevronRightIcon className="size-4 transition-transform duration-200 group-data-open/nav-item:rotate-90" />
                        <span className="sr-only">Toggle {item.title}</span>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items!.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              isActive={isActive(child.url)}
                              render={<Link href={child.url} />}
                              className={wrapSubTitleClass}
                            >
                              <NavTitle
                                title={child.title}
                                method={child.method}
                                deprecated={child.deprecated}
                                deprecatedLabel={ui.deprecated}
                              />
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
