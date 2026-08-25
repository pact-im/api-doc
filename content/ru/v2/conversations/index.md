---
title: "Диалоги"
description: "Диалог — это переписка между вашей компанией и клиентом в подключённом мессенджере"
section: "v2"
---

**Диалог** — это переписка между сотрудниками вашей компании и клиентом в подключённом мессенджере: WhatsApp, Telegram, VK и других.

Каждый диалог относится к одной компании и одному аккаунту провайдера. В нём хранятся данные о клиенте (имя, телефон, внешние идентификаторы), состояние переписки (открыта или в архиве) и время последнего сообщения. Групповые чаты — тоже диалоги, они отмечены полем `group: true`.

Диалоги используются для построения списка входящих, синхронизации сделок в CRM и поиска нужной переписки перед отправкой или чтением сообщений.

С помощью API диалогов вы можете:

- [Получить список диалогов](/v2/conversations/get-conversations)
- [Получить диалог](/v2/conversations/get-conversation)
- [Написать первое сообщение](/v2/conversations/write-first-message) (создать диалог)
- [Обновить диалог](/v2/conversations/update-conversation)

<span id="conversation-object"></span>

## Объект диалога

### Пример

```json
{
  "conversation": {
    "id": 18642847,
    "company_id": 52204,
    "sender_name": "79517591813",
    "sender_phone": "79517591813",
    "sender_external_id": "79517591813",
    "sender_external_public_id": "79517591813",
    "provider": "whatsapp",
    "avatar_url": "http://localhost:3000/avatars/original/missing.png",
    "created_at": "2024-11-11T12:35:57.995Z",
    "last_updated_at": "2024-11-21T08:37:36.000Z",
    "last_message_id": 14056,
    "operational_state": "open",
    "replied_state": "replied",
    "group": false
  }
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
<span id="v2-conversation-id">id</span> | Integer | Идентификатор
company_id | Integer | Идентификатор компании
sender_name | String | Имя отправителя или название чата (если это группа)
sender_phone | String | Телефон отправителя (если провайдер передаёт телефоны)
sender_external_id | String | Внешний идентификатор диалога
sender_external_public_id | String | Публичный внешний идентификатор диалога
provider | String | Провайдер
avatar_url | String | URL аватара отправителя или чата (если это группа)
created_at | Time | Время создания диалога в нашей базе данных
last_updated_at | Time | [Время создания на стороне провайдера](/v2/messages#v2-message-external-created-at) последнего сообщения (null, если сообщений ещё нет)
last_message_id | Integer | [Идентификатор](/v2/messages#v2-message-id) последнего сообщения (null, если сообщений ещё нет)
operational_state | String | `open`, `archived` или `blocked`
replied_state | String | `initialized`, `replied` или `unreplied`
group | Boolean | Является ли диалог групповым
