---
title: "Сообщения"
description: "Сообщение — это отдельный текст или медиафайл внутри диалога между вашей компанией и клиентом"
section: "v2"
---

**Сообщение** — это одна запись в [диалоге](/v2/conversations): текст, медиафайл, ответ на другое сообщение или отправленный шаблон.

Сообщения бывают входящими (от клиента) и исходящими (от вашей компании). Каждое из них содержит статус доставки, отметки времени со стороны Pact.im и со стороны провайдера, вложения (если они есть), а также связи с диалогом и контактом.

API сообщений позволяет читать историю переписки, отвечать в существующем диалоге и удалять сообщения, если провайдер это поддерживает.

С помощью API сообщений вы можете:

- [Получить сообщения диалога](/v2/messages/get-conversation-messages)
- [Получить сообщение диалога](/v2/messages/get-conversation-message)
- [Отправить сообщение в существующий диалог](/v2/messages/send-message)
- [Удалить сообщения](/v2/messages/delete-message)

Чтобы начать новый диалог, используйте [Написать первое сообщение](/v2/conversations/write-first-message).

<span id="message-object"></span>

## Объект сообщения

### Пример

```json
{
  "message": {
    "id": 1134326991,
    "external_id": "34577",
    "company_id": 86605,
    "conversation_id": 209752626,
    "contact_id": 1583160940,
    "replied_to_id": null,
    "created_at": "2025-02-05T09:01:48.514Z",
    "external_created_at": "2025-02-05T09:01:47.000Z",
    "income": true,
    "status": "created",
    "message": "",
    "reactions": [],
    "details": null,
    "attachments": [],
    "delivery": false,
    "deleted": false
  }
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
<span id="v2-message-id">id</span> | Integer | Идентификатор
<span id="v2-message-external-id">external_id</span> | String | Внешний идентификатор сообщения на стороне провайдера (используется для ответов на сообщения)
company_id | Integer | Идентификатор компании
conversation_id | Integer | [Идентификатор](/v2/conversations#v2-conversation-id) диалога
contact_id | Integer | Идентификатор контакта, которому принадлежит сообщение
replied_to_id | String | Внешний идентификатор сообщения, на которое отвечает данное сообщение
created_at | Time | Время создания сообщения в нашей базе данных
<span id="v2-message-external-created-at">external_created_at</span> | Time | Время, полученное от провайдера (как правило, время непосредственной отправки сообщения)
income | Boolean | Входящее сообщение или исходящее
status | String | Статус сообщения (`created`, `sent`, `delivered`, `read` или `error`)
message | String | Текст сообщения
reactions | Array | Реакции на сообщение
details | Object | Данные с причиной, по которой сообщение не было доставлено (если такое произошло)
attachments | Array | Массив [объектов вложений](/v2/attachments#attachment-object) сообщения (если они есть)
delivery | Boolean | Было ли сообщение отправлено через рассылку
deleted | Boolean | Было ли сообщение удалено
