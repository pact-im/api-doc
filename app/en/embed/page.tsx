import { EmbedIndexRedirect } from "@/components/docs/embed-redirect"
import { HtmlLang } from "@/components/docs/html-lang"

export default function EnglishEmbedIndexPage() {
  return (
    <>
      <HtmlLang lang="en" />
      <EmbedIndexRedirect locale="en" />
    </>
  )
}
