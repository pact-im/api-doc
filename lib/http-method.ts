import { cn } from "@/lib/utils"

export const httpMethodStyles: Record<string, string> = {
  GET: "text-sky-700 dark:text-sky-300",
  POST: "text-emerald-700 dark:text-emerald-300",
  PUT: "text-amber-700 dark:text-amber-300",
  PATCH: "text-orange-700 dark:text-orange-300",
  DELETE: "text-red-700 dark:text-red-300",
}

export const httpMethodBadgeStyles: Record<string, string> = {
  GET: "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-300",
  POST: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  PUT: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
  PATCH: "border-transparent bg-orange-500/15 text-orange-700 dark:text-orange-300",
  DELETE: "border-transparent bg-red-500/15 text-red-700 dark:text-red-300",
}

export function httpMethodClassName(method: string, variant: "text" | "badge" = "text") {
  const styles = variant === "badge" ? httpMethodBadgeStyles : httpMethodStyles
  return cn(
    variant === "text" && "font-mono text-[10px] font-semibold tracking-wide",
    styles[method] ?? "text-muted-foreground"
  )
}
