---
title: "Update Tag"
description: "Updates a tag's title, color, or position"
section: "v2"
---

Updates the provided tag properties.

## HTTP Request

`PATCH https://api.pact.im/api/p2/tags/<TAG_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
TAG_ID | Tag ID

## Body Parameters (JSON)

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
title | false | String, up to 30 characters | New tag name
color | false | One of the colors in the [tag object](/v2/tags#tag-object) | New tag color
position | false | Integer | New catalog position

## Example

### Request

```shell
curl -X PATCH 'https://api.pact.im/api/p2/tags/42' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "position": 2
  }'
```

### Response

```json
{
  "tag": {
    "id": 42,
    "title": "VIP",
    "color": "purple",
    "position": 2,
    "created_at": "2026-11-19T12:00:00.000Z",
    "updated_at": "2026-11-19T12:05:00.000Z"
  }
}
```
