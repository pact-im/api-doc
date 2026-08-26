---
title: "Формирование ссылки и подписи"
description: "Обязательные параметры ссылки на интерфейс чата и генерация HMAC-SHA512 подписи"
section: "embed"
---

Каждая ссылка на интерфейс чата начинается с базового URL и двух обязательных query-параметров.

```text
https://msg.pact.im/pact_embed
```

## Обязательные параметры

Параметр | Обязательный | Описание
--------- | ------------ | -----------
company_uuid | да | UUID компании. Берётся из ответа [Компании](/v1/companies) — поле `external_uuid`
signature | да | HMAC-SHA512 подпись для аутентификации

## Как получить signature

Подпись считается так: HMAC-SHA512 от строки JSON `{"company_uuid":"YOUR_COMPANY_UUID"}`, ключ — ваш `private_api_token` (тот же токен, что и для API).

> **Note:** Строка для подписи должна совпадать с JSON буквально: ключ `company_uuid` и значение UUID вашей компании.

```js
const crypto = require("crypto")

const privateApiToken = "YOUR_API_TOKEN"
const companyUuid = '{"company_uuid":"YOUR_COMPANY_UUID"}'

const signature = crypto
  .createHmac("sha512", privateApiToken)
  .update(companyUuid)
  .digest("hex")

console.log(signature)
```

```python
import hmac
import hashlib

private_api_token = "YOUR_API_TOKEN"
company_uuid = '{"company_uuid":"YOUR_COMPANY_UUID"}'

signature = hmac.new(
    private_api_token.encode(),
    company_uuid.encode(),
    hashlib.sha512,
).hexdigest()

print(signature)
```

```php
<?php
$privateApiToken = "YOUR_API_TOKEN";
$companyUuid = '{"company_uuid":"YOUR_COMPANY_UUID"}';
$signature = hash_hmac("sha512", $companyUuid, $privateApiToken);
echo $signature;
```

```ruby
require "openssl"

private_api_token = "YOUR_API_TOKEN"
company_uuid = '{"company_uuid":"YOUR_COMPANY_UUID"}'
signature = OpenSSL::HMAC.hexdigest("SHA512", private_api_token, company_uuid)
puts signature
```

## Пример ссылки

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=d41d8cd98f00b204e9800998ecf8427e
```

Дальше можно добавить [параметры](/embed/parameters) и [вставить iframe](/embed/iframe) в свой продукт.
