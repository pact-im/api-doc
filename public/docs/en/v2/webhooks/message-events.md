---
title: "Message events"
description: "Webhook payloads for message create and update events"
section: "webhooks"
---

Message webhooks use `"type": "message"`.

See also the [Message object](/v2/messages#message-object).

## Behavior

When a message is sent (for example after [sending a message to an existing conversation](/v2/messages/send-message)), the service triggers a webhook with the `create` event and status `sent`.

At this stage, `external_id` is `null` because the provider has not answered yet.

Once the message is successfully sent, an `update` webhook is triggered where:

- status becomes `delivered`
- `external_id` is assigned

If sending fails, status becomes `error` and `details` contains the failure reason (for example the recipient does not have WhatsApp Business).

For incoming messages you receive only one webhook with event `create` and status `created`.

Contact representation in the webhook depends on direction:

- Outbound messages from Pact include an internal contact with `internal_id`, but never `external_id` or `external_public_id`
- Incoming messages include an external contact with `external_id` and `external_public_id`, but never `internal_id`

## Create

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
    "contact": {
      "id": 789,
      "external_id": "123",
      "external_public_id": "+79001234567",
      "name": "John Doe",
      "avatar_url": "https://example.com/avatars/user.jpg",
      "phone": "+79001234567"
    },
    "conversation": {
      "id": 456,
      "company_id": 1,
      "sender_name": "John Doe",
      "sender_phone": "+79001234567",
      "sender_external_id": "123456789",
      "sender_external_public_id": "+79001234567",
      "provider": "whatsapp",
      "avatar_url": "https://example.com/avatars/user.jpg",
      "created_at": "2024-01-15T09:00:00Z",
      "last_updated_at": "2024-01-15T10:30:00Z",
      "last_message_id": 123,
      "operational_state": "active",
      "replied_state": "replied",
      "group": false
    },
    "attachments": [
      {
        "id": 101,
        "message_id": 123,
        "file_name": "image.jpg",
        "mime_type": "image/jpeg",
        "size": 102400,
        "attachment_url": "https://cdn.example.com/attachments/image.jpg",
        "preview_url": "https://cdn.example.com/attachments/small/image.jpg",
        "aspect_ratio": 1.5
      }
    ]
  }
}
```
