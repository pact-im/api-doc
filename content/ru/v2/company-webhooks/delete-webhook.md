---
title: "Удалить вебхук"
description: "Удаление вебхука компании"
section: "webhooks"
---

Удаляет вебхук компании.

## HTTP Request

`DELETE https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks/<WEBHOOK_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
WEBHOOK_ID | ID вебхука

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN

## Пример

### Запрос
```shell
curl -X DELETE 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks/WEBHOOK_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN
  }'
```

### Ответ

HTTP-статус `204 No Content` с пустым телом ответа.
