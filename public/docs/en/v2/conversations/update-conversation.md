---
title: "Update Conversation"
description: "Update conversation status, archive state, or assignee"
section: "v2"
---

Update the conversation status (answered/unanswered), archive or unarchive it, or set the responsible user.

## HTTP Request

`PUT https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | ID of the conversation

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
operational_state | false | Must be a string | `open` or `archived`
replied_state | false | Must be a string | `replied` or `unreplied`
assignee_id | false | Must be an integer or null | ID of the responsible user. Pass `null` to remove the assignee

## Example

### Request
```shell
curl -X PUT 'https://api.pact.im/api/p2/conversations/3' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": 1,
    "operational_state": "archived",
    "replied_state": "unreplied"
  }'
```

### Response
```json
{
  "conversation": {
    "id": 3,
    "company_id": 1,
    "sender_name": "Иван",
    "sender_phone": null,
    "sender_external_id": "110218431333189",
    "sender_external_public_id": "test",
    "provider": "telegram_personal",
    "avatar_url": "http://localhost:3000/avatars/original/missing.png",
    "created_at": "2025-12-11T15:14:17.879Z",
    "last_updated_at": "2025-12-15T10:52:40.000Z",
    "last_message_id": 1123356,
    "operational_state": "archived",
    "replied_state": "unreplied",
    "group": false
  }
}
```
