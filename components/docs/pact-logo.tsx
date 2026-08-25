import { cn } from "@/lib/utils"

export function PactLogo({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 25 15"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-3.5 w-auto", className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H25V11.5385H4.16667L0 15V0ZM4.16667 4.03846H20.8333V7.5H4.16667V4.03846Z"
        fill="#0066FF"
      />
    </svg>
  )
}
