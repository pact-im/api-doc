---
title: "Remove Tag from Conversation"
description: "Removes a tag from a conversation"
section: "v2"
---

Removes an assigned tag from a conversation. The tag remains in the catalog and can be assigned to other conversations.

## HTTP Request

`DELETE https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/tags`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | Conversation ID

## Body Parameters (JSON)

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
tag_id | true | Integer | Assigned tag ID

## Example

### Request

```shell
curl -X DELETE 'https://api.pact.im/api/p2/conversations/123/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "tag_id": 42
  }'
```

### Response

`200 OK` with an empty object.

```json
{}
```
