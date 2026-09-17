import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        This URL is not part of the Pact.im API docs.
      </p>
      <Link href="/" className="text-sm font-medium underline-offset-4 hover:underline">
        Back to docs
      </Link>
    </main>
  )
}
