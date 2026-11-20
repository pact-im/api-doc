---
title: "Снять тег с диалога"
description: "Удаляет тег из диалога"
section: "v2"
---

Снимает назначенный тег с диалога. Тег остаётся в каталоге и может быть назначен другим диалогам.

## HTTP Request

`DELETE https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/tags`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | ID диалога

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
tag_id | да | Integer | ID назначенного тега

## Пример

### Запрос

```shell
curl -X DELETE 'https://api.pact.im/api/p2/conversations/123/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "tag_id": 42
  }'
```

### Ответ

`200 OK` с пустым объектом.

```json
{}
```
