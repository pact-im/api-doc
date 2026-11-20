---
title: "Get Conversation Tags"
description: "Returns tags assigned to a conversation"
section: "v2"
---

Returns only tags assigned to the specified conversation.

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/tags`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | Conversation ID

## Query Parameters

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
page | false | Integer | Page number
per_page | false | Integer | Tags per page
sort[position] | false | `asc` or `desc` | Sort direction by position

## Example

### Request

```shell
curl 'https://api.pact.im/api/p2/conversations/123/tags?private_api_token=YOUR_API_TOKEN'
```

### Response

```json
{
  "tags": [
    {
      "id": 42,
      "title": "VIP",
      "color": "purple",
      "position": 1,
      "created_at": "2026-11-19T12:00:00.000Z",
      "updated_at": "2026-11-19T12:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 150
  }
}
```
