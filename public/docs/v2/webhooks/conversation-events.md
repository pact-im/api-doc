---
title: "События диалогов"
description: "Структура вебхуков для событий создания, обновления и удаления диалогов"
section: "webhooks"
---

Вебхуки диалогов используют `"type": "conversation"`.

Поддерживаемые события:

Параметр | Описание
--------- | -----------
create | Отправляется при создании нового диалога
update | Отправляется при изменении полей диалога (например, `last_message_id` после нового сообщения)
delete | Отправляется при удалении диалога

См. также [API диалогов](/v2/conversations).

## Создание

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
