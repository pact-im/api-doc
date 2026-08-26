---
title: "События"
description: "Обзор форматов и доставки вебхуков API v2"
section: "webhooks"
---

> **Note:** URL вебхука должен отвечать HTTP-статусом `200`. Иначе доставка повторяется до 5 раз с задержкой 60 секунд. После 5 попыток событие отбрасывается и больше не доставляется.

Данные по типам событий:

- [События сообщений](/v2/webhooks/message-events)
- [События диалогов](/v2/webhooks/conversation-events)
- [События каналов](/v2/webhooks/auth-events)

Настраивайте эндпоинты вебхуков через [Вебхуки компании](/v2/company-webhooks).

## Формат события

Каждый вебхук имеет такую верхнеуровневую структуру:

### Пример

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

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
event | String | Действие события (`create`, `update`, `delete`)
type | String | Тип объекта (`message`, `conversation`, `auth`, ...)
object | Object | Данные объекта с его полями
