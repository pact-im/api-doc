---
title: "Отключить канал"
description: "Отключение существующего канала провайдера мессенджера"
section: "v2"
---

Отключает существующий канал.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths/<AUTH_ID>/disable`

## Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
AUTH_ID | ID канала

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
