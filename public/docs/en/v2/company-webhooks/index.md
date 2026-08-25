---
title: "Company webhooks"
description: "A company webhook is a URL where Pact.im sends real-time events for that company"
section: "webhooks"
---

A **company webhook** is an HTTPS endpoint you register for a company. When something happens — a new message, a conversation update, an auth change — Pact.im sends a `POST` to that URL with the event payload.

Each company can have several webhooks (up to five). New webhooks start inactive; you turn them on after the URL is ready. Payload shapes and delivery rules are described under [Events](/v2/webhooks).

With the Company Webhooks API you can:

- [Get webhooks of the company](/v2/company-webhooks/get-company-webhooks)
- [Create webhook](/v2/company-webhooks/create-webhook)
- [Update webhook](/v2/company-webhooks/update-webhook)
- [Delete webhook](/v2/company-webhooks/delete-webhook)

## Webhook object

### Example

```json
{
  "webhook": {
    "id": 1,
    "url": "https://example.com/webhook",
    "active": true
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | ID
url | String | Webhook URL
active | Boolean | Whether webhook is active or not
