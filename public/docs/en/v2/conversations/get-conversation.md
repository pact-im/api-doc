---
title: "Get Conversation"
description: "Returns a single conversation by ID"
section: "v2"
---

Returns a conversation of the company by ID.

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | ID of the conversation

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID
  }'
```

### Response
```json
{
  "conversation": {
    "id": 18642847,
    "company_id": 52204,
    "sender_name": "79517591813",
    "sender_phone": "79517591813",
    "sender_external_id": "79517591813",
    "sender_external_public_id": "79517591813",
    "provider": "whatsapp",
    "avatar_url": "http://localhost:3000/avatars/original/missing.png",
    "created_at": "2024-11-11T12:35:57.995Z",
    "last_updated_at": "2024-11-21T08:37:36.000Z",
    "last_message_id": 14056,
    "operational_state": "open",
    "replied_state": "replied",
    "group": false
  }
}
```
