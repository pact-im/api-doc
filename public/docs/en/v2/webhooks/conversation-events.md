---
title: "Conversation events"
description: "Webhook payloads for conversation create, update, and delete events"
section: "webhooks"
---

Conversation webhooks use `"type": "conversation"`.

Supported events:

Parameter | Description
--------- | -----------
create | Triggered when a new conversation is created
update | Triggered when conversation fields change (for example `last_message_id` after a new message)
delete | Triggered when a conversation is deleted

See also the [Conversations API](/v2/conversations).

## Create

```json
{
  "event": "create",
  "type": "conversation",
  "object": {
    "id": 216291470,
    "company_id": 96467,
    "sender_name": "70000000000",
    "sender_phone": "70000000000",
    "sender_external_id": "70000000000",
    "sender_external_public_id": "70000000000",
    "provider": "whatsapp",
    "avatar_url": "path to file",
    "created_at": "2025-08-31T13:28:00.562Z",
    "last_updated_at": "2025-08-31T13:28:00.000Z",
    "last_message_id": 1315284110,
    "operational_state": "open",
    "replied_state": "unreplied",
    "group": false
  }
}
```
