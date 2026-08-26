---
title: "Introduction"
description: "Welcome to the Pact.im API — integrate WhatsApp, Telegram, Instagram, and more into your product"
section: "getting-started"
---

[Pact.im](https://pact.im) is a messaging platform for business. It brings WhatsApp, Telegram, MAX, VK, Avito, Instagram, and other channels into one place — so your team can sell, support, and follow up without jumping between apps.

Companies use Pact.im as a shared inbox, with optional AI assistants for replies and conversation analytics, CRM sync (amoCRM, Bitrix24, and custom tools), broadcasts, and WhatsApp telephony. Under the hood, the same platform is available through this API.

Use the **Pact.im API** when you want to connect Pact.im to your own product, CRM, or backend: send and receive messages, manage conversations, connect channels, and react to events via webhooks.

We keep the API focused on what teams need in production. If something important is missing, [tell us](https://pact.im) — we ship methods that solve real integration problems.

## Get started in a few minutes

1. **Create an account** — [Sign up](https://app.pact.im/signup) (you can try Pact.im free for a few days).
2. **Copy your API token** — find it in [account settings](https://app.pact.im/account).
3. **Connect a channel** — WhatsApp, Telegram, Instagram, or another provider in [project settings](https://app.pact.im/project_settings).
4. **Point webhooks at your server** — so you get messages and conversation updates as they happen. See [Company webhooks](/v2/company-webhooks) and [Events](/v2/webhooks).
5. **Send or list messages** — start with [Messages](/v2/messages) and [Conversations](/v2/conversations).

> **Warning:** Prefer **API v2** for all new work. **API v1** is deprecated and remains documented only for existing integrations. If you still use v1 [Channels](/v1/channels), follow [Migration from Channels v1 to Auths v2](/migrate-channels-to-auths) to move to v2 [Auths](/v2/auths) and [Auth events](/v2/webhooks/auth-events). The shutdown date for Channels v1 will be announced later this year; after that they will not work at all.

## Calling the API

You can call the Pact.im API with any HTTP client — `curl`, Postman, or your language’s standard libraries. Examples in these docs use `curl` so you can try requests quickly from a terminal.

Authentication, pagination, rate limits, and errors are covered in the sections in the sidebar.
