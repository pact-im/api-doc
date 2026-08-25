---
title: "Get Conversation Message"
description: "Returns a single message of a conversation by ID"
section: "v2"
---

Returns message of the conversation by ID.

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages/<MESSAGE_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | ID of the conversation
MESSAGE_ID | ID of the message

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages/MESSAGE_ID' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID
  }'
```

### Response
```json
{
  "message": {
    "id": 1134326991,
    "external_id": "34577",
    "company_id": 86605,
    "conversation_id": 209752626,
    "contact_id": 1583160940,
    "replied_to_id": null,
    "created_at": "2025-02-05T09:01:48.514Z",
    "external_created_at": "2025-02-05T09:01:47.000Z",
    "income": true,
    "status": "created",
    "message": "",
    "reactions": [],
    "details": null,
    "attachments": []
  }
}
```
