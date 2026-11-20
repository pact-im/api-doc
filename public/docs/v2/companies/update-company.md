---
title: "Обновить компанию"
description: "Изменяет информацию о компании"
section: "v2"
---

Изменяет отдельные поля компании.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
name | нет | Должно быть строкой | Название компании
phone | нет | Должно быть строкой | Телефон компании
about | нет | Должно быть строкой | Описание компании
avatar | нет | Должен быть файлом | Аватар компании
auto_assigned_user_id | нет | Должно быть целым числом или null | ID сотрудника компании для автоматического назначения на новые диалоги. Передайте `null`, чтобы снять назначение

## Пример

```shell
curl -X PUT 'https://api.pact.im/api/p2/companies/52368' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "name": "Новое название",
    "auto_assigned_user_id": 67890
  }'
```
