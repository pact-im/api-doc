---
title: "Create Webhook"
description: "Create a new company webhook (inactive by default)"
section: "webhooks"
---

Creates a new webhook for the company. Webhook is created inactive by default.

Maximum 5 webhooks per company are allowed.

## HTTP Request

`POST https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
url | true | Must be a string | Webhook URL

## Example

### Request
```shell
curl -X POST 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "url": "https://example.com/webhook"
  }'
```

### Response
```json
{
  "webhook": {
    "id": 1,
    "url": "https://example.com/webhook",
    "active": false
  }
}
```
