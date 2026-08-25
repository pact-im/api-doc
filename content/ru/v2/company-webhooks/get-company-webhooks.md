---
title: "Список вебхуков компании"
description: "Возвращает постраничный список вебхуков компании"
section: "webhooks"
---

Возвращает постраничный список вебхуков компании.

Подробнее о [пагинации](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN
  }'
```

### Ответ
```json
{
  "webhooks": [
    {
      "id": 1,
      "url": "https://example.com/webhook",
      "active": true
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 25
  }
}
```
