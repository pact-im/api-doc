"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileTextIcon, SearchIcon } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { useSidebar } from "@/components/ui/sidebar"
import { getUiMessages, parseLocalePath, type Locale } from "@/lib/i18n"
import type { NavSection } from "@/lib/nav"
import type { Pagefind, PagefindSearchFragment } from "@/types/pagefind"

type SearchHit = {
  id: string
  url: string
  title: string
  excerpt?: string
}

type DocsSearchContextValue = {
  openSearch: () => void
}

const DocsSearchContext = React.createContext<DocsSearchContextValue | null>(
  null
)

function useDocsSearch() {
  const context = React.useContext(DocsSearchContext)
  if (!context) {
    throw new Error("useDocsSearch must be used within DocsSearchProvider.")
  }
  return context
}

function flattenNavItems(
  sections: NavSection[]
): { title: string; url: string }[] {
  const items: { title: string; url: string }[] = []

  function walk(
    navItems:
      | NavSection["items"]
      | NonNullable<NavSection["items"][number]["items"]>
  ) {
    for (const item of navItems) {
      if (!item.external) {
        items.push({ title: item.title, url: item.href })
      }
      if (item.items?.length) walk(item.items)
    }
  }

  for (const section of sections) {
    walk(section.items)
  }
  return items
}

function stripBasePath(url: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  if (!base) return url
  if (url === base || url === `${base}/`) return "/"
  if (url.startsWith(`${base}/`)) return url.slice(base.length)
  return url
}

function matchesLocale(url: string, locale: Locale): boolean {
  const path = stripBasePath(url)
  const { locale: pathLocale } = parseLocalePath(path)
  return pathLocale === locale
}

function getIsMac(): boolean {
  if (typeof navigator === "undefined") return true
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
}

async function loadPagefind(): Promise<Pagefind | null> {
  if (typeof window === "undefined") return null
  if (window.pagefind) return window.pagefind

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  try {
    const pf = (await import(
      /* webpackIgnore: true */ `${base}/pagefind/pagefind.js`
    )) as Pagefind
    window.pagefind = pf
    return pf
  } catch {
    return null
  }
}

function filterNavHits(
  navItems: { title: string; url: string }[],
  query: string
): SearchHit[] {
  const lowered = query.toLowerCase()
  return navItems
    .filter((item) => item.title.toLowerCase().includes(lowered))
    .slice(0, 20)
    .map((item) => ({
      id: item.url,
      url: item.url,
      title: item.title,
    }))
}

/** Keeps the dialog mounted outside the mobile sidebar Sheet. */
export function DocsSearchProvider({
  locale,
  sections,
  children,
}: {
  locale: Locale
  sections: NavSection[]
  children: React.ReactNode
}) {
  const ui = getUiMessages(locale)
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [hits, setHits] = React.useState<SearchHit[]>([])
  const [loading, setLoading] = React.useState(false)
  const [useNavFallback, setUseNavFallback] = React.useState(false)
  const [pagefindReady, setPagefindReady] = React.useState(false)
  const navItems = React.useMemo(() => flattenNavItems(sections), [sections])

  const openSearch = React.useCallback(() => {
    setOpenMobile(false)
    // Wait for the mobile Sheet to finish dismissing so it cannot steal focus
    // or dismiss the Command dialog that lives outside the Sheet.
    window.setTimeout(() => setOpen(true), 0)
  }, [setOpenMobile])

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((wasOpen) => {
          if (wasOpen) return false
          setOpenMobile(false)
          window.setTimeout(() => setOpen(true), 0)
          return false
        })
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [setOpenMobile])

  React.useEffect(() => {
    if (!open) return
    let cancelled = false

    void (async () => {
      const pf = await loadPagefind()
      if (cancelled) return
      if (pf) {
        setUseNavFallback(false)
        setPagefindReady(true)
      } else {
        setUseNavFallback(true)
        setPagefindReady(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open])

  React.useEffect(() => {
    const q = query.trim()
    if (!open || !q) return

    let cancelled = false
    const handle = window.setTimeout(() => {
      void (async () => {
        setLoading(true)

        if (useNavFallback || !pagefindReady) {
          const filtered = filterNavHits(navItems, q)
          if (!cancelled) {
            setHits(filtered)
            setLoading(false)
          }
          return
        }

        try {
          const pf = await loadPagefind()
          if (!pf || cancelled) return

          const search = await pf.search(q)
          const limited = search.results.slice(0, 30)
          const data = await Promise.all(
            limited.map(async (result) => {
              const fragment: PagefindSearchFragment = await result.data()
              return {
                id: result.id,
                url: fragment.url,
                title: fragment.meta.title ?? fragment.url,
                excerpt: fragment.excerpt,
              } satisfies SearchHit
            })
          )

          if (!cancelled) {
            setHits(data.filter((hit) => matchesLocale(hit.url, locale)))
            setLoading(false)
          }
        } catch {
          if (!cancelled) {
            setUseNavFallback(true)
            setHits(filterNavHits(navItems, q))
            setLoading(false)
          }
        }
      })()
    }, 150)

    return () => {
      cancelled = true
      window.clearTimeout(handle)
    }
  }, [query, locale, useNavFallback, pagefindReady, navItems, open])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setQuery("")
      setHits([])
      setLoading(false)
    }
  }

  const onSelect = (url: string) => {
    handleOpenChange(false)
    router.push(stripBasePath(url))
  }

  const trimmed = query.trim()
  const visibleHits = trimmed ? hits : []
  const emptyMessage = !trimmed ? ui.searchEmpty : ui.searchNoResults

  const contextValue = React.useMemo(() => ({ openSearch }), [openSearch])

  return (
    <DocsSearchContext.Provider value={contextValue}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title={ui.searchPlaceholder}
        description={ui.searchEmpty}
        className="sm:max-w-lg"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={ui.searchPlaceholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {!loading && visibleHits.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : null}
            {visibleHits.length > 0 ? (
              <CommandGroup>
                {visibleHits.map((hit) => (
                  <CommandItem
                    key={hit.id}
                    value={hit.id}
                    onSelect={() => onSelect(hit.url)}
                    className="items-start py-2"
                  >
                    <FileTextIcon className="mt-0.5" />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate font-medium">{hit.title}</span>
                      {hit.excerpt ? (
                        <span
                          className="line-clamp-2 text-xs text-muted-foreground [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-foreground"
                          dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                        />
                      ) : null}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </DocsSearchContext.Provider>
  )
}

export function DocsSearchTrigger({ locale }: { locale: Locale }) {
  const ui = getUiMessages(locale)
  const { openSearch } = useDocsSearch()
  const isMac = React.useSyncExternalStore(
    () => () => {},
    getIsMac,
    () => true
  )

  return (
    <InputGroup
      className="cursor-pointer bg-background/50"
      role="button"
      tabIndex={0}
      aria-label={ui.searchPlaceholder}
      onClick={openSearch}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openSearch()
        }
      }}
    >
      <InputGroupInput
        readOnly
        tabIndex={-1}
        placeholder={ui.searchPlaceholder}
        className="cursor-pointer"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="hidden sm:flex">
        <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
