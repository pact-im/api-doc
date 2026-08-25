import { EmbedIndexRedirect } from "@/components/docs/embed-redirect"
import { defaultLocale } from "@/lib/i18n"

export default function EmbedIndexPage() {
  return <EmbedIndexRedirect locale={defaultLocale} />
}
