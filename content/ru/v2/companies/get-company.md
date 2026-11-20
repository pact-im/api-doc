---
title: "Получить компанию"
description: "Возвращает компанию по ID"
section: "v2"
---

Возвращает доступную пользователю компанию.

## HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN

## Пример

```shell
curl -X GET 'https://api.pact.im/api/p2/companies/52368' \
  --header 'X-Private-Api-Token: YOUR_API_TOKEN'
```
