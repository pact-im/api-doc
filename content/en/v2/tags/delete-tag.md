---
title: "Delete Tag"
description: "Deletes a tag or replaces it with another tag"
section: "v2"
---

Deletes a tag from the catalog. If `replacement_tag_id` is provided, conversations assigned to the deleted tag are reassigned to that tag before the original tag is deleted. Replacement runs in the background.

Without `replacement_tag_id`, the tag's conversation assignments are deleted together with the tag.

## HTTP Request

`DELETE https://api.pact.im/api/p2/tags/<TAG_ID>`

## URL Parameters

Parameter | Description
--------- | -----------
TAG_ID | ID of the tag to delete

## Body Parameters (JSON)

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | true | String | Your private API token
replacement_tag_id | false | Integer | Replacement tag ID. Cannot equal `TAG_ID`

## Example

### Request

```shell
curl -X DELETE 'https://api.pact.im/api/p2/tags/42' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "replacement_tag_id": 43
  }'
```

### Response

`200 OK` with an empty object.

```json
{}
```
