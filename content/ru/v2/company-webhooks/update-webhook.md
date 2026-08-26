---
title: "Обновить вебхук"
description: "Обновление существующего вебхука компании"
section: "webhooks"
---

Обновляет существующий вебхук компании.

При установке или изменении `url` вебхука (а также при его активации) Pact проверяет доступность этого адреса.

> **Note:** URL вебхука должен быть корректным и принимать запросы `POST`. Pact отправляет тестовый запрос с телом JSON `{"source":"pact.im","operation":"test"}`. Ваш обработчик должен ответить HTTP-статусом `200`.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks/<WEBHOOK_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
WEBHOOK_ID | ID вебхука

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
url | нет | Должно быть строкой | URL вебхука
active | нет | Должно быть логическим значением | Активен вебхук или нет

## Пример

### Запрос
```shell
curl -X PUT 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks/WEBHOOK_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "url": "https://example.com/new-webhook",
    "active": true
  }'
```

### Ответ
```json
{
  "webhook": {
    "id": 1,
    "url": "https://example.com/new-webhook",
    "active": true
  }
}
```
