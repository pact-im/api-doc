"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHighlightedCode } from "@/lib/highlight"
import { cn } from "@/lib/utils"

function CodeBlockChrome({
  language,
  code,
  className,
  children,
}: {
  language?: string
  code: string
  className?: string
  children: React.ReactNode
}) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "not-typeset group relative my-4 overflow-hidden rounded-lg border",
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-1.5">
        <span className="text-xs text-muted-foreground">
          {language || "code"}
        </span>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onCopy}
          aria-label="Copy code"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      {children}
    </div>
  )
}

function HighlightedBody({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  const html = React.use(getHighlightedCode(code, language))

  return (
    <div
      className={cn(
        "overflow-x-auto text-sm leading-relaxed",
        "[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:p-4",
        "[&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-relaxed"
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function PlainBody({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto bg-muted/20 p-4 text-sm leading-relaxed">
      <code className="font-mono text-[13px]">{code}</code>
    </pre>
  )
}

export function CodeBlock({
  language,
  code,
  className,
}: {
  language?: string
  code: string
  className?: string
}) {
  return (
    <CodeBlockChrome language={language} code={code} className={className}>
      <React.Suspense fallback={<PlainBody code={code} />}>
        <HighlightedBody code={code} language={language} />
      </React.Suspense>
    </CodeBlockChrome>
  )
}

export function CodeTabs({
  tabs,
}: {
  tabs: { language: string; code: string }[]
}) {
  const items = tabs.map((tab, index) => ({
    ...tab,
    value: `${tab.language}-${index}`,
  }))
  const defaultValue = items[0]?.value ?? "code"

  return (
    <Tabs defaultValue={defaultValue} className="not-typeset my-4">
      <TabsList variant="line">
        {items.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.language}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <CodeBlock language={tab.language} code={tab.code} className="my-0" />
        </TabsContent>
      ))}
    </Tabs>
  )
}
