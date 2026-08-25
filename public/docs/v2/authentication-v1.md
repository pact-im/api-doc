---
title: "Аутентификация"
description: "Аутентификация запросов к API v2 с помощью приватного API-токена"
section: "v2"
---

Каждый запрос к API v2 должен содержать ваш приватный API-токен. Получить его можно в [настройках аккаунта](https://app.pact.im/account).

> **Note:** Заменяйте `YOUR_API_TOKEN` на ваш персональный API-ключ в каждом запросе.

Передать токен можно одним из следующих способов:

1. [В теле JSON](#тело-json)
2. [В HTTP-заголовке](#http-заголовок)
3. [В параметре URL-запроса](#параметр-url-запроса)

## Тело JSON

Передайте `private_api_token` в JSON-теле запроса.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint" \
  --header "Content-Type: application/json" \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "another_parameter": "value"
  }'
```

## HTTP-заголовок

Передайте `X-Private-Api-Token` в заголовках запроса.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint" \
  --header "Content-Type: application/json" \
  --header "X-Private-Api-Token: YOUR_API_TOKEN" \
  --data '{
    "another_parameter": "value"
  }'
```

## Параметр URL-запроса

Передайте `private_api_token` как параметр строки запроса.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint?private_api_token=YOUR_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "another_parameter": "value"
  }'
```

## Ошибки аутентификации

Если токен не передан или недействителен, API возвращает `401`:

```json
{
  "errors": [
    {
      "status": 401,
      "code": "unauthorized",
      "title": "Unauthorized",
      "detail": "No token provided"
    }
  ]
}
```
