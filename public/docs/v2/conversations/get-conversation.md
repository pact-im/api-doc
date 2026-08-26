---
title: "Получить диалог"
description: "Возвращает один диалог по идентификатору"
section: "v2"
---

Возвращает диалог компании по идентификатору.

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | Идентификатор диалога

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID
  }'
```

### Ответ
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
