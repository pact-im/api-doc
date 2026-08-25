---
title: "Delete Webhook"
description: "Delete a company webhook"
section: "webhooks"
---

Deletes a webhook of the company.

## HTTP Request

`DELETE https://api.pact.im/api/p2/companies/<COMPANY_ID>/webhooks/<WEBHOOK_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
WEBHOOK_ID | ID of the webhook

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

## Example

### Request
```shell
curl -X DELETE 'https://api.pact.im/api/p2/companies/COMPANY_ID/webhooks/WEBHOOK_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN
  }'
```

### Response

HTTP status `204 No Content` with an empty body.
