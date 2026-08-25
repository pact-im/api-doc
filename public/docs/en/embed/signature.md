---
title: "Build URL and signature"
description: "Required chat UI URL parameters and HMAC-SHA512 signature generation"
section: "embed"
---

Every chat UI URL starts with the base path and two required query parameters.

```text
https://msg.pact.im/pact_embed
```

## Required parameters

Parameter | Required | Description
--------- | -------- | -----------
company_uuid | true | Company UUID. Take it from the [Companies](/v1/companies) response — the `external_uuid` field
signature | true | HMAC-SHA512 signature used for authentication

## How to build signature

Compute HMAC-SHA512 over the JSON string `{"company_uuid":"YOUR_COMPANY_UUID"}`, using your `private_api_token` (the same token you use for the API) as the key.

> **Note:** The signed string must match that JSON literally: the `company_uuid` key and your company’s UUID value.

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

## Example URL

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=d41d8cd98f00b204e9800998ecf8427e
```

Next, add [parameters](/embed/parameters) and [add the iframe](/embed/iframe) to your product.
