import {
  defaultLocale,
  getUiMessages,
  localePath,
  type Locale,
} from "@/lib/i18n"

export type NavItem = {
  title: string
  href: string
  method?: string
  deprecated?: boolean
  /** Static / non-doc link (e.g. llms.txt). Shown in sidebar, skipped in prev/next. */
  external?: boolean
  items?: NavItem[]
}

export type NavSection = {
  title: string
  items: NavItem[]
}

type LocalizedString = Record<Locale, string>

type NavItemDef = {
  title: LocalizedString
  /** Unprefixed path (same for all locales). */
  href: string
  method?: string
  deprecated?: boolean
  external?: boolean
  items?: NavItemDef[]
}

type NavSectionDef = {
  title: LocalizedString
  items: NavItemDef[]
}

const navSectionDefs: NavSectionDef[] = [
  {
    title: { ru: "Начало работы", en: "Getting started" },
    items: [
      { title: { ru: "Введение", en: "Introduction" }, href: "/" },
      {
        title: { ru: "Партнерская программа", en: "Partner Program" },
        href: "/partners-program",
      },
      {
        title: {
          ru: "Переход с API v1 на API v2 для Каналов",
          en: "Migration from Channels v1 to Auths v2",
        },
        href: "/migrate-channels-to-auths",
      },
    ],
  },
  {
    title: { ru: "API v1", en: "API v1" },
    items: [
      {
        title: { ru: "Аутентификация", en: "Authentication" },
        href: "/v1/authentication",
        deprecated: true,
      },
      { title: { ru: "Компании", en: "Companies" }, href: "/v1/companies" },
      {
        title: { ru: "Каналы", en: "Channels" },
        href: "/v1/channels",
        deprecated: true,
      },
      {
        title: { ru: "Вебхуки", en: "Webhooks" },
        href: "/v1/webhooks",
        deprecated: true,
      },
    ],
  },
  {
    title: { ru: "API v2", en: "API v2" },
    items: [
      {
        title: { ru: "Аутентификация", en: "Authentication" },
        href: "/v2/authentication-v1",
      },
      {
        title: { ru: "Диалоги", en: "Conversations" },
        href: "/v2/conversations",
        items: [
          {
            title: { ru: "Список диалогов", en: "Get conversations" },
            href: "/v2/conversations/get-conversations",
          },
          {
            title: { ru: "Получить диалог", en: "Get conversation" },
            href: "/v2/conversations/get-conversation",
          },
          {
            title: {
              ru: "Написать первое сообщение",
              en: "Write first message",
            },
            href: "/v2/conversations/write-first-message",
          },
          {
            title: { ru: "Обновить диалог", en: "Update conversation" },
            href: "/v2/conversations/update-conversation",
          },
        ],
      },
      {
        title: { ru: "Сообщения", en: "Messages" },
        href: "/v2/messages",
        items: [
          {
            title: {
              ru: "Сообщения диалога",
              en: "Get conversation messages",
            },
            href: "/v2/messages/get-conversation-messages",
          },
          {
            title: {
              ru: "Сообщение диалога",
              en: "Get conversation message",
            },
            href: "/v2/messages/get-conversation-message",
          },
          {
            title: { ru: "Отправить сообщение", en: "Send message" },
            href: "/v2/messages/send-message",
          },
          {
            title: { ru: "Удалить сообщение", en: "Delete message" },
            href: "/v2/messages/delete-message",
          },
        ],
      },
      {
        title: { ru: "Вложения", en: "Attachments" },
        href: "/v2/attachments",
        items: [
          {
            title: { ru: "Загрузить вложение", en: "Upload attachment" },
            href: "/v2/attachments/upload-attachment",
          },
        ],
      },
      {
        title: { ru: "Каналы", en: "Auths" },
        href: "/v2/auths",
        items: [
          {
            title: {
              ru: "Каналы компании",
              en: "Get company auths",
            },
            href: "/v2/auths/get-company-auths",
          },
          {
            title: {
              ru: "Каналы (несколько компаний)",
              en: "Get auths (multi-company)",
            },
            href: "/v2/auths/get-auths",
          },
          {
            title: { ru: "Создать канал", en: "Create auth" },
            href: "/v2/auths/create-auth",
          },
          {
            title: { ru: "Подтвердить канал", en: "Confirm auth" },
            href: "/v2/auths/confirm-auth",
          },
          {
            title: { ru: "Включить канал", en: "Enable auth" },
            href: "/v2/auths/enable-auth",
          },
          {
            title: { ru: "Отключить канал", en: "Disable auth" },
            href: "/v2/auths/disable-auth",
          },
          {
            title: { ru: "Удалить канал", en: "Delete auth" },
            href: "/v2/auths/delete-auth",
          },
        ],
      },
      {
        title: { ru: "WABA-шаблоны", en: "WABA Templates" },
        href: "/v2/waba-templates",
        items: [
          {
            title: {
              ru: "Получить WABA-шаблоны",
              en: "Get WABA Templates",
            },
            href: "/v2/waba-templates/get-waba-templates",
          },
        ],
      },
      {
        title: { ru: "Пагинация", en: "Pagination" },
        href: "/v2/pagination",
      },
      {
        title: { ru: "Лимиты запросов", en: "Rate limits" },
        href: "/v2/rate-limits",
      },
    ],
  },
  {
    title: { ru: "Вебхуки", en: "Webhooks" },
    items: [
      {
        title: { ru: "События", en: "Events" },
        href: "/v2/webhooks",
        items: [
          {
            title: { ru: "События сообщений", en: "Message events" },
            href: "/v2/webhooks/message-events",
          },
          {
            title: { ru: "События диалогов", en: "Conversation events" },
            href: "/v2/webhooks/conversation-events",
          },
          {
            title: { ru: "События каналов", en: "Auth events" },
            href: "/v2/webhooks/auth-events",
          },
        ],
      },
      {
        title: { ru: "Вебхуки компании", en: "Company webhooks" },
        href: "/v2/company-webhooks",
        items: [
          {
            title: {
              ru: "Список вебхуков компании",
              en: "Get company webhooks",
            },
            href: "/v2/company-webhooks/get-company-webhooks",
          },
          {
            title: { ru: "Создать вебхук", en: "Create webhook" },
            href: "/v2/company-webhooks/create-webhook",
          },
          {
            title: { ru: "Обновить вебхук", en: "Update webhook" },
            href: "/v2/company-webhooks/update-webhook",
          },
          {
            title: { ru: "Удалить вебхук", en: "Delete webhook" },
            href: "/v2/company-webhooks/delete-webhook",
          },
        ],
      },
    ],
  },
  {
    title: {
      ru: "Интерфейс чата в вашей CRM",
      en: "Chat UI in your CRM",
    },
    items: [
      {
        title: {
          ru: "Веб-интерфейс",
          en: "Web UI",
        },
        href: "/embed/overview",
      },
      {
        title: {
          ru: "Формирование ссылки и подписи",
          en: "Build URL and signature",
        },
        href: "/embed/signature",
      },
      {
        title: { ru: "Дополнительные параметры", en: "Optional parameters" },
        href: "/embed/parameters",
      },
      {
        title: {
          ru: "Вставка iframe",
          en: "Add iframe",
        },
        href: "/embed/iframe",
      },
    ],
  },
  {
    title: { ru: "Справка", en: "Reference" },
    items: [
      { title: { ru: "Ошибки", en: "Errors" }, href: "/errors" },
      { title: { ru: "llms.txt", en: "llms.txt" }, href: "/llms.txt", external: true },
    ],
  },
]

function localizeItem(item: NavItemDef, locale: Locale): NavItem {
  return {
    title: item.title[locale],
    href: localePath(locale, item.href),
    method: item.method,
    deprecated: item.deprecated,
    external: item.external,
    items: item.items?.map((child) => localizeItem(child, locale)),
  }
}

export function getNavSections(locale: Locale = defaultLocale): NavSection[] {
  return navSectionDefs.map((section) => ({
    title: section.title[locale],
    items: section.items.map((item) => localizeItem(item, locale)),
  }))
}

/** @deprecated Use getNavSections(locale) */
export const navSections = getNavSections(defaultLocale)

function flattenNavItems(items: NavItem[]): NavItem[] {
  const result: NavItem[] = []
  for (const item of items) {
    if (!item.external) result.push(item)
    if (item.items?.length) {
      result.push(...flattenNavItems(item.items))
    }
  }
  return result
}

export function getAllNavItems(locale: Locale = defaultLocale): NavItem[] {
  return getNavSections(locale).flatMap((section) =>
    flattenNavItems(section.items)
  )
}

export function findNavItem(
  href: string,
  locale: Locale = defaultLocale
): NavItem | undefined {
  const normalized = href.replace(/\/$/, "") || "/"
  return getAllNavItems(locale).find(
    (item) => item.href.replace(/\/$/, "") === normalized
  )
}

export function getBreadcrumbs(
  href: string,
  locale: Locale = defaultLocale
): { title: string; href?: string }[] {
  const normalized = href.replace(/\/$/, "") || "/"
  const ui = getUiMessages(locale)
  const crumbs: { title: string; href?: string }[] = [
    { title: ui.docs, href: localePath(locale, "/") },
  ]
  const gettingStartedTitle = getUiMessages(locale).gettingStarted
  const sections = getNavSections(locale)

  for (const section of sections) {
    for (const item of section.items) {
      const itemHref = item.href.replace(/\/$/, "")
      const child = item.items?.find(
        (sub) => sub.href.replace(/\/$/, "") === normalized
      )

      if (child) {
        if (section.title !== gettingStartedTitle) {
          crumbs.push({ title: section.title })
        }
        crumbs.push({ title: item.title, href: item.href })
        crumbs.push({ title: child.title })
        return crumbs
      }

      if (itemHref === normalized) {
        if (section.title !== gettingStartedTitle) {
          crumbs.push({ title: section.title })
        }
        if (item.href !== localePath(locale, "/")) {
          crumbs.push({ title: item.title })
        }
        return crumbs
      }
    }
  }

  return crumbs
}
