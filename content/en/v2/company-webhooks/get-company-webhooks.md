---
title: "Get Company Webhooks"
description: "Returns a paginated list of webhooks for the company"
section: "webhooks"
---

Returns paginated list of webhooks of the company.

Read more about [pagination](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN
  }'
```

### Response
```json
{
  "webhooks": [
    {
      "id": 1,
      "url": "https://example.com/webhook",
      "active": true
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 25
  }
}
```
