---
title: "Auths"
description: "An auth is a connected messaging account — WhatsApp, Telegram, VK, and more — for your company"
section: "v2"
---

An **auth** is a connected messaging account for your company: WhatsApp, Telegram, MAX, VK, Instagram, Facebook, Avito, and other providers.

Think of it as the bridge between Pact.im and the messenger. Until an auth is created and confirmed, you cannot send or receive messages on that channel. Auths go through create → confirm (QR, code, or OAuth) → enabled, and can later be disabled or deleted.

Some providers also expose **pages** (for example VK groups) that you choose during confirmation. Auth changes are pushed as webhooks — see [Auth events](/v2/webhooks/auth-events).

If you still use API v1 Channels, see [Migration from Channels v1 to Auths v2](/migrate-channels-to-auths).

With the Auths API you can:

- [Get company auths](/v2/auths/get-company-auths)
- [Get auths (multi-company)](/v2/auths/get-auths)
- [Create auth](/v2/auths/create-auth)
- [Confirm auth](/v2/auths/confirm-auth)
- [Enable auth](/v2/auths/enable-auth)
- [Disable auth](/v2/auths/disable-auth)
- [Delete auth](/v2/auths/delete-auth)

## Auth object

### Example

```json
{
  "auth": {
    "id": 69174,
    "company_id": 52368,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "username": null,
    "created_at": "2025-06-23T14:33:47.886Z",
    "updated_at": "2025-06-23T14:33:47.886Z",
    "sync_messages_at": "2025-06-22T14:33:47.877Z",
    "pages": null
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | Auth ID
company_id | Integer | ID of the company
provider | String | Name of the connected messenger
state | String | Connection status (`disabled` or `enabled`)
phone_number | Integer | Phone number of the connected messenger (when the provider exposes it)
username | String | Username of the connected messenger (when the provider exposes it)
created_at | Time | Auth connection time
updated_at | Time | Last update time
sync_messages_at | Time | The time from which message synchronization began
pages | Object | Some providers may provide a list of pages that can be connected

## Pages object

### Example

```json
{
  "page": {
    "id": 30190,
    "auth_id": 69167,
    "company_id": 52368,
    "external_id": "229559196",
    "name": "Test1",
    "enabled": true
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | Page ID
auth_id | Integer | Auth ID to which the page belongs
company_id | Integer | Company ID to which the page belongs
external_id | Integer | External page ID
name | String | Page title
enabled | Boolean | Page connection status (`true` or `false`)
