---
title: "Сообщение диалога"
description: "Возвращает одно сообщение диалога по идентификатору"
section: "v2"
---

Возвращает сообщение диалога по идентификатору.

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages/<MESSAGE_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | Идентификатор диалога
MESSAGE_ID | Идентификатор сообщения

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages/MESSAGE_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID
  }'
```

### Ответ
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
    "attachments": []
  }
}
```
