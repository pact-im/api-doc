import type { MetadataRoute } from "next"

import { withBasePath } from "@/lib/site"

export function getWebManifest(): MetadataRoute.Manifest {
  return {
    name: "Pact.im API — Документация",
    short_name: "Pact.im API",
    description:
      "Документация Pact.im API. Интегрируйте WhatsApp, Telegram, Instagram, MAX, VK, Avito и другие каналы в ваш продукт.",
    start_url: withBasePath("/"),
    scope: withBasePath("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0066FF",
    icons: [
      {
        src: withBasePath("/favicon.ico"),
        sizes: "32x32",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: withBasePath("/icon.png"),
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icon1.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icon2.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
