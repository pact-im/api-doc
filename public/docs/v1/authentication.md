---
title: "Аутентификация"
description: "Аутентификация запросов к API Pact v1"
section: "v1"
---

> **Warning:** Аутентификация API v1 устарела. Для новых интеграций используйте [Аутентификацию](/v2/authentication-v1) в API v2.

## Аутентификация

Все запросы к API Pact должны быть аутентифицированы.

Есть два способа аутентификации.

Pact ожидает, что API-ключ будет передан во всех запросах к серверу в заголовке следующего вида:

`X-Private-Api-Token: YOUR_API_TOKEN`

либо как дополнительный параметр в URI:

`"API_ENDPOINT_HERE?private_api_token=YOUR_API_TOKEN"`

> **Note:** Замените `YOUR_API_TOKEN` на свой персональный API-ключ.

> **Warning:** Персональный API-ключ необходимо передавать в каждом запросе к API.

Получить API-ключ Pact можно на [странице настроек аккаунта](https://app.pact.im/account).

### Примеры

```shell
# Header
curl -X GET "API_ENDPOINT_HERE"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"

# OR use a private_api_token parameter
curl -X GET "API_ENDPOINT_HERE?private_api_token=YOUR_API_TOKEN"
```

```php
<?php
$token = '<your super secret token>';
$pact = new \Pact\PactClient($token);
```
