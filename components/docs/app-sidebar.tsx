"use client"

import * as React from "react"
import Link from "next/link"

import { DocsSearchTrigger } from "@/components/docs/docs-search"
import { NavMain } from "@/components/docs/docs-nav"
import { PactLogo } from "@/components/docs/pact-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUiMessages, localePath, type Locale } from "@/lib/i18n"
import type { NavSection } from "@/lib/nav"

export function AppSidebar({
  sections,
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  sections: NavSection[]
  locale: Locale
}) {
  const ui = getUiMessages(locale)
  const homeHref = localePath(locale, "/")
  const items = sections.map((section) => ({
    title: section.title,
    items: section.items.map((item) => ({
      title: item.title,
      url: item.href,
      method: item.method,
      deprecated: item.deprecated,
      external: item.external,
      items: item.items?.map((child) => ({
        title: child.title,
        url: child.href,
        method: child.method,
        deprecated: child.deprecated,
        external: child.external,
      })),
    })),
  }))

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href={homeHref} />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent">
                <PactLogo />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Pact.im</span>
                <span className="truncate text-xs">{ui.apiDocumentation}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <DocsSearchTrigger locale={locale} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} locale={locale} />
      </SidebarContent>
    </Sidebar>
  )
}
