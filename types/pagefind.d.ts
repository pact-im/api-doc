export type PagefindSearchFragment = {
  url: string
  excerpt: string
  meta: Record<string, string>
  content?: string
}

export type PagefindSearchResult = {
  id: string
  score: number
  words: number[]
  data: () => Promise<PagefindSearchFragment>
}

export type PagefindSearchResults = {
  results: PagefindSearchResult[]
}

export type Pagefind = {
  search: (
    query: string,
    options?: { filters?: Record<string, string | string[]> }
  ) => Promise<PagefindSearchResults>
  options: (opts: { bundlePath?: string; baseUrl?: string }) => Promise<void>
  destroy?: () => Promise<void>
}

declare global {
  interface Window {
    pagefind?: Pagefind
  }
}

declare module "*/pagefind/pagefind.js" {
  const pagefind: Pagefind
  export default pagefind
}
