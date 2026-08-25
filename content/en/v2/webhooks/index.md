---
title: "Events"
description: "Overview of API v2 webhook payloads and delivery"
section: "webhooks"
---

> **Note:** Your webhook URL must respond with HTTP status `200`. If it does not, delivery is retried up to 5 times with a 60 second delay. After 5 retries the event is dropped and never delivered.

Event payloads by type:

- [Message events](/v2/webhooks/message-events)
- [Conversation events](/v2/webhooks/conversation-events)
- [Auth events](/v2/webhooks/auth-events)

Configure webhook endpoints with [Company webhooks](/v2/company-webhooks).

## Envelope

Every webhook uses this top-level shape:

### Example

```json
{
  "event": "create",
  "type": "message",
  "object": {
    "id": 123,
    "external_id": "msg_123456",
    "company_id": 1,
    "conversation_id": 456,
    "contact_id": 789,
    "replied_to_id": null,
    "created_at": "2024-01-15T10:30:00Z",
    "external_created_at": "2024-01-15T10:30:00Z",
    "income": true,
    "status": "delivered",
    "message": "Hello, this is a test message",
    "reactions": null,
    "details": null,
    "delivery": null,
    "deleted": false,
    "attachments": []
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
event | String | Event action (`create`, `update`, `delete`)
type | String | Object type (`message`, `conversation`, `auth`, ...)
object | Object | Object payload with its fields
