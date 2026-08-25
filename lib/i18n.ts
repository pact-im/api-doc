export const locales = ["ru", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "ru"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Prefix path for a locale. Russian (default) stays unprefixed. */
export function localePath(locale: Locale, href: string): string {
  const normalized = href === "/" ? "/" : href.replace(/\/$/, "") || "/"
  if (locale === defaultLocale) return normalized
  if (normalized === "/") return `/${locale}`
  return `/${locale}${normalized}`
}

/** Strip locale prefix from a pathname; returns locale + unprefixed path. */
export function parseLocalePath(pathname: string): {
  locale: Locale
  path: string
} {
  const cleaned =
    (pathname.replace(/\/$/, "") || "/") === ""
      ? "/"
      : pathname.replace(/\/$/, "") || "/"
  const segments = cleaned === "/" ? [] : cleaned.replace(/^\//, "").split("/")
  if (segments[0] && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    const rest = segments.slice(1)
    return {
      locale: segments[0],
      path: rest.length === 0 ? "/" : `/${rest.join("/")}`,
    }
  }
  return { locale: defaultLocale, path: cleaned === "/" ? "/" : cleaned }
}

/** Swap locale while keeping the same doc path. */
export function switchLocalePath(
  pathname: string,
  nextLocale: Locale
): string {
  const { path } = parseLocalePath(pathname)
  return localePath(nextLocale, path)
}

export type UiMessages = {
  previous: string
  next: string
  onThisPage: string
  copyPage: string
  copied: string
  copyPageAsMarkdown: string
  viewAsMarkdown: string
  openInChatGpt: string
  openInClaude: string
  openInAliceAi: string
  deprecated: string
  apiDocumentation: string
  docs: string
  redirecting: string
  gettingStarted: string
  searchPlaceholder: string
  searchEmpty: string
  searchNoResults: string
}

const messages: Record<Locale, UiMessages> = {
  ru: {
    previous: "Назад",
    next: "Далее",
    onThisPage: "На этой странице",
    copyPage: "Копировать",
    copied: "Скопировано",
    copyPageAsMarkdown: "Копировать как Markdown",
    viewAsMarkdown: "Открыть Markdown",
    openInChatGpt: "Открыть в ChatGPT",
    openInClaude: "Открыть в Claude",
    openInAliceAi: "Открыть в Алиса AI",
    deprecated: "Устарело",
    apiDocumentation: "Документация API",
    docs: "Документация",
    redirecting: "Перенаправление…",
    gettingStarted: "Начало работы",
    searchPlaceholder: "Поиск…",
    searchEmpty: "Начните вводить запрос",
    searchNoResults: "Ничего не найдено",
  },
  en: {
    previous: "Previous",
    next: "Next",
    onThisPage: "On this page",
    copyPage: "Copy page",
    copied: "Copied",
    copyPageAsMarkdown: "Copy page as Markdown",
    viewAsMarkdown: "View as Markdown",
    openInChatGpt: "Open in ChatGPT",
    openInClaude: "Open in Claude",
    openInAliceAi: "Open in Alice AI",
    deprecated: "Deprecated",
    apiDocumentation: "API Documentation",
    docs: "Docs",
    redirecting: "Redirecting…",
    gettingStarted: "Getting started",
    searchPlaceholder: "Search…",
    searchEmpty: "Start typing to search",
    searchNoResults: "No results found",
  },
}

export function getUiMessages(locale: Locale): UiMessages {
  return messages[locale]
}
