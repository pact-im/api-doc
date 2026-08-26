---
title: "Auth events"
description: "Webhook payloads for auth create, update, and delete events"
section: "webhooks"
---

Auth webhooks use `"type": "auth"`.

They are triggered whenever an auth object changes significantly. Manage auths via the [Auths API](/v2/auths).

## Events

Parameter | Payload | Description
--------- | ------- | -----------
Created | `"event": "create"` | A new auth was created
Connected | `"event": "update"`, `"state": "enabled"` | Auth successfully connected (for example WhatsApp connected)
Disconnected | `"event": "update"`, `"state": "disabled"` | Auth disconnected from the external service
Deleted | `"event": "delete"` | Auth permanently deleted

`update` events are also used during QR / code / OAuth flows (new QR code, pages list, and similar progress updates).

Object fields: [Auth object](/v2/auths#auth-object), [Pages object](/v2/auths#pages-object).

## Create (without pages)

```json
{
  "event": "create",
  "type": "auth",
  "object": {
    "id": 69174,
    "company_id": 52368,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "created_at": "2025-06-23T14:33:47.886Z",
    "updated_at": "2025-06-23T14:33:47.886Z",
    "sync_messages_at": "2025-06-22T14:33:47.877Z"
  }
}
```

## Update (connected / without pages)

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 1,
    "company_id": 1,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "created_at": "2025-06-25T08:02:01.578Z",
    "updated_at": "2025-06-25T08:02:30.904Z",
    "sync_messages_at": "2025-06-24T08:02:01.570Z"
  }
}
```

## Update (QR code)

Sent after creating an auth that uses QR authentication, and again when the QR code expires.

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 70719,
    "provider": "whatsapp",
    "state": "initial",
    "company_id": 52524,
    "phone_number": null,
    "settings": {},
    "qr": "data:image/png;base64,...",
    "created_at": "2026-06-17T06:45:20.562Z",
    "updated_at": "2026-06-17T06:45:21.521Z",
    "sync_messages_at": null
  }
}
```

## Update (with pages)

Example for providers that expose connectable pages (e.g. VKontakte):

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 69167,
    "company_id": 52368,
    "provider": "vkontakte",
    "state": "enabled",
    "created_at": "2025-06-20T08:10:20.517Z",
    "updated_at": "2025-06-23T15:31:00.275Z",
    "sync_messages_at": "2025-06-20T08:10:36.951Z",
    "pages": [
      {
        "id": 30190,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "229559196",
        "name": "Test1",
        "enabled": true
      },
      {
        "id": 30191,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "223020390",
        "name": "Test2",
        "enabled": false
      }
    ]
  }
}
```
