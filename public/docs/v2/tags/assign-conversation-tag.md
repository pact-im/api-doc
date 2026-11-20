---
title: "Назначить тег диалогу"
description: "Добавляет существующий тег к диалогу"
section: "v2"
---

Назначает существующий тег диалогу. Один и тот же тег нельзя назначить диалогу повторно. Для диалога доступно не более 10 тегов.

## HTTP Request

`POST https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/tags`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | ID диалога

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
tag_id | да | Integer | ID тега из [каталога тегов](/v2/tags/get-tags)

## Пример

### Запрос

```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/123/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "tag_id": 42
  }'
```

### Ответ

```json
{
  "conversation": {
    "id": 123,
    "company_id": 1,
    "sender_name": "Иван",
    "tags": [
      {
        "id": 42,
        "title": "VIP",
        "color": "purple",
        "position": 1,
        "created_at": "2026-11-19T12:00:00.000Z",
        "updated_at": "2026-11-19T12:00:00.000Z"
      }
    ]
  }
}
```
