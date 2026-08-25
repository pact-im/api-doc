---
title: "Создать вебхук"
description: "Создание нового вебхука компании (по умолчанию неактивного)"
section: "webhooks"
---

Создаёт новый вебхук для компании. По умолчанию вебхук создаётся неактивным.

Для одной компании допускается не более 5 вебхуков.

## HTTP Request

`POST https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
url | да | Должно быть строкой | URL вебхука

## Пример

### Запрос
```shell
curl -X POST 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "url": "https://example.com/webhook"
  }'
```

### Ответ
```json
{
  "webhook": {
    "id": 1,
    "url": "https://example.com/webhook",
    "active": false
  }
}
```
