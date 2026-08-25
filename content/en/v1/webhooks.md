---
title: "Webhooks"
description: "Configure and receive v1 channel webhooks"
section: "v1"
---

> **Warning:** API v1 **Channels** (and related channel webhook events) will be shut down. The exact date will be announced later this year. After shutdown, Channels v1 will not work at all — migrate to API v2 [Auth events](/v2/webhooks/auth-events). See [Migration from Channels v1 to Auths v2](/migrate-channels-to-auths).

## Webhooks

This page documents **channel lifecycle** webhooks for API v1 (QR codes, connection state, sync, and similar events).

Your `webhook_url` endpoint **must** respond with HTTP status `200`. Delivery can be retried up to 10 times with a 60 second delay if the status is not `200`. After 10 retries the webhook is dropped.

For message and conversation events, use API v2 — see [Events](/v2/webhooks), [Message events](/v2/webhooks/message-events), and [Conversation events](/v2/webhooks/conversation-events).

### Whatsapp: new QR-code

```json
{
   "type":"qr_code",
   "event":"new",
   "company_id":1,
   "channel_id":1,
   "data":"BASE64 QR-CODE image string"
}
```

#### When

- You are connecting a `whatsapp` channel in your company
- The user logged out in the WhatsApp app

### Whatsapp: channel connected sucessfuly

```json
{
   "type":"system",
   "severity":"information",
   "data":{
      "message":"authorized",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

QR-code was scanned successfuly

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: phone offline

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone offline",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

Device with WhatsApp application is unreachable. We can't work with whatsapp while phone is offline.

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: phone online

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone online",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

Device with WhatsApp application is reachable again.

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: channel not available

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"unavailable",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

Someone started a session at [web.whatsapp.com](https://web.whatsapp.com) or a similar integration. We can't work with WhatsApp while WhatsApp Web is open.

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: channel disabled

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"disabled",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

By some reason whatsapp session is not alive anymore (for example, user exited on the device or whatsapp expired session)

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: trying to resume channel work

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"trying_resume_work",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

We're trying to resume work after previous conflict state

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Whatsapp: synchronization completed

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"synchronized",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

- Whatsapp channel was connected and syncronisation was completed
- Syncronisation after work resume

> **Note:** `date_timestamp` is date timestamp; `timestamp` is callback timestamp.

### Instagram: changed state to disabled

```json
{
   "type":"system",
   "severity":"information",
   "data":{
      "message":"IG was set DISABLED",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### When

- Service message successfully delivered
- Service message delivery failed
