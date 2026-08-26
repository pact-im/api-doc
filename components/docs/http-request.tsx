"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { httpMethodBadgeStyles } from "@/lib/http-method"
import { cn } from "@/lib/utils"

export function HttpRequest({
  method,
  url,
}: {
  method: string
  url: string
}) {
  const [copied, setCopied] = React.useState(false)
  const request = `${method} ${url}`

  async function onCopy() {
    await navigator.clipboard.writeText(request)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="not-typeset flex items-center gap-2 rounded-lg border bg-muted/40 py-2 pr-2 pl-3">
      <Badge
        variant="outline"
        className={cn(
          "rounded-md font-mono text-[11px] tracking-wide uppercase",
          httpMethodBadgeStyles[method] ?? "bg-muted text-foreground"
        )}
      >
        {method}
      </Badge>
      <code className="min-w-0 flex-1 truncate font-mono text-sm">{url}</code>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onCopy}
        aria-label="Copy request"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
