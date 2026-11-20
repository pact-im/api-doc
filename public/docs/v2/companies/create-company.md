---
title: "Создать компанию"
description: "Создаёт новую компанию"
section: "v2"
---

Создаёт новую компанию для текущего пользователя.

## HTTP Request

`POST https://api.pact.im/api/p2/companies`

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
name | да | Должно быть строкой | Название компании
phone | нет | Должно быть строкой | Телефон компании
about | нет | Должно быть строкой | Описание компании
avatar | нет | Должен быть файлом | Аватар компании

## Пример

```shell
curl -X POST 'https://api.pact.im/api/p2/companies' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "name": "Моя компания",
    "phone": "+79990000000",
    "about": "Поддержка клиентов"
  }'
```
