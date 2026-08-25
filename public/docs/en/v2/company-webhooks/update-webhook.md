---
title: "Update Webhook"
description: "Update an existing company webhook"
section: "webhooks"
---

Updates an existing webhook of the company.

When you set or change the webhook `url` (or activate the webhook), Pact checks that the URL is available.

> **Note:** The webhook URL must be valid and accept `POST` requests. Pact sends a test request with JSON body `{"source":"pact.im","operation":"test"}`. Your endpoint must respond with HTTP status `200`.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks/<WEBHOOK_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
WEBHOOK_ID | ID of the webhook

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
url | false | Must be a string | Webhook URL
active | false | Must be a boolean | Whether webhook is active or not

## Example

### Request
```shell
curl -X PUT 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks/WEBHOOK_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "url": "https://example.com/new-webhook",
    "active": true
  }'
```

### Response
```json
{
  "webhook": {
    "id": 1,
    "url": "https://example.com/new-webhook",
    "active": true
  }
}
```
