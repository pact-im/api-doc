---
title: "Create Tag"
description: "Creates a tag in the account owner's catalog"
section: "v2"
---

Creates a new tag. If `color` is omitted, `blue` is used.

## HTTP Request

`POST https://api.pact.im/api/p2/tags`

## Body Parameters (JSON)

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
title | true | String, up to 30 characters | Tag name
color | false | One of the colors in the [tag object](/v2/tags#tag-object) | Tag color; defaults to `blue`

## Example

### Request

```shell
curl -X POST 'https://api.pact.im/api/p2/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "title": "VIP",
    "color": "purple"
  }'
```

### Response

```json
{
  "tag": {
    "id": 42,
    "title": "VIP",
    "color": "purple",
    "position": 1,
    "created_at": "2026-11-19T12:00:00.000Z",
    "updated_at": "2026-11-19T12:00:00.000Z"
  }
}
```
