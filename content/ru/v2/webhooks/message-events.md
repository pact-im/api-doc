---
title: "События сообщений"
description: "Структура вебхуков для событий создания и обновления сообщений"
section: "webhooks"
---

Вебхуки сообщений используют `"type": "message"`.

См. также [Объект сообщения](/v2/messages#message-object).

## Поведение

Когда сообщение отправляется (например, после [отправки сообщения в существующий диалог](/v2/messages/send-message)), сервис инициирует вебхук с событием `create` и статусом `sent`.

На этом этапе `external_id` имеет значение `null`, поскольку ответ от провайдера ещё не получен.

После успешной отправки сообщения инициируется вебхук `update`, в котором:

- статус меняется на `delivered`
- присваивается `external_id`

Если отправить сообщение не удалось, статус меняется на `error`, а в поле `details` указывается причина ошибки (например, у получателя нет WhatsApp Business).

Для входящих сообщений приходит только один вебхук с событием `create` и статусом `created`.

Представление контакта в вебхуке зависит от направления сообщения:

- Исходящие сообщения из Pact содержат внутренний контакт с `internal_id`, но никогда не содержат `external_id` или `external_public_id`
- Входящие сообщения содержат внешний контакт с `external_id` и `external_public_id`, но никогда не содержат `internal_id`

## Создание

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
