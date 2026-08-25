---
title: "Сообщения диалога"
description: "Возвращает постраничный список сообщений диалога"
section: "v2"
---

Возвращает постраничный список сообщений диалога, отсортированный по полю `external_created_at`.

По умолчанию возвращается 150 сообщений на страницу.

Подробнее о [пагинации](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | Идентификатор диалога

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
page | нет | Должно быть целым числом | Номер страницы. Если не передан, возвращается первая страница
per_page | нет | Должно быть целым числом | Количество записей на странице (по умолчанию 150)

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID,
    "page": 1
  }'
```

### Ответ
```json
{
  "messages": [
    {
      "id": 13224,
      "external_id": "b91c9b99-7c24-40a7-8b52-1d80b5b3e158",
      "company_id": 52204,
      "conversation_id": 18642850,
      "contact_id": 549645235,
      "replied_to_id": null,
      "created_at": "2024-11-12T06:28:10.907Z",
      "external_created_at": "2024-11-12T06:28:10.000Z",
      "income": false,
      "status": "read",
      "message": null,
      "reactions": [],
      "details": null,
      "attachments": [
        {
          "id": 53431944,
          "message_id": 13224,
          "file_name": "p4ct-br0ws3r-v01ce-r3c0rd.ogg",
          "mime_type": "audio/ogg",
          "size": 39185,
          "attachment_url": "https://cdn.pact.im/uploads/storage/attachment/file/a1dd41f80c3ae85beb355a38ea3f5b53.ogg",
          "push_to_talk": true
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 150
  }
}
```
