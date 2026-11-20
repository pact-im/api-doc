---
title: "Assign Tag to Conversation"
description: "Adds an existing tag to a conversation"
section: "v2"
---

Assigns an existing tag to a conversation. The same tag cannot be assigned to a conversation twice. A conversation can have up to 10 tags.

## HTTP Request

`POST https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/tags`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | Conversation ID

## Body Parameters (JSON)

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
tag_id | true | Integer | Tag ID from the [tag catalog](/v2/tags/get-tags)

## Example

### Request

```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/123/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "tag_id": 42
  }'
```

### Response

```json
{
  "conversation": {
    "id": 123,
    "company_id": 1,
    "sender_name": "Ivan",
    "tags": [
      {
        "id": 42,
        "title": "VIP",
        "color": "purple",
        "position": 1,
        "created_at": "2026-11-19T12:00:00.000Z",
        "updated_at": "2026-11-19T12:00:00.000Z"
      }
    ]
  }
}
```
