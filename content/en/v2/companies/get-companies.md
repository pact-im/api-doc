---
title: "Get companies"
description: "Returns a paginated list of the user's companies"
section: "v2"
---

Returns a list of companies available to the current user.

25 companies are returned per page by default. See [pagination](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/companies`

## Request parameters

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | yes | Must be a string | YOUR_API_TOKEN
sort | no | Must be an object | Sort by `id`. Example: `{"id": "asc"}`
page | no | Must be an integer | Page number
per_page | no | Must be an integer | Number of companies per page (25 by default)

## Example

### Request

```shell
curl -X GET 'https://api.pact.im/api/p2/companies' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "sort": {"id": "asc"}
  }'
```

### Response

```json
{
  "companies": [
    {
      "id": 52368,
      "name": "My company",
      "phone": "+79990000000",
      "about": "Customer support",
      "owner_id": 12345,
      "auto_assigned_user_id": null,
      "feature_deliveries": false,
      "waba_allowed": true,
      "avatar_url": null
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 25
  }
}
```
