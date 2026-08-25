---
title: "Get WABA Templates"
description: "Returns paginated WABA templates for your companies"
section: "v2"
---

Returns paginated WABA templates for the user's companies.

Sorted by `created_at: desc` by default. You can override sorting with the `sort` parameter and filter by companies with `company_ids`.

By default, 25 templates are returned per page.

Read more about [pagination](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/waba_templates`

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_ids | false | Must be an array of integers | Company IDs. Returns templates for all companies if omitted
sort | false | Must be an object | Sort by `created_at` or `position`, ascending or descending. Example: `{"position": "asc"}`. Defaults to `created_at: desc`
page | false | Must be an integer | Page number. Returns the first page if omitted
per_page | false | Must be an integer | Entries per page (25 by default)

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/waba_templates' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_ids": [<COMPANY_ID>],
    "sort": {"position": "asc"},
    "per_page": 50
  }'
```

### Response
```json
{
  "waba_templates": [
    {
      "id": 1,
      "name": "fuga",
      "body": "Temporibus et rerum optio.",
      "waba_id": "cjw8av3d2l",
      "substitutions_count": 0,
      "header_content_type": null,
      "company_id": 52204,
      "header": null,
      "namespace": null,
      "created_at": "2025-05-21T00:29:29.313Z",
      "position": 1
    },
    {
      "id": 2,
      "name": "with_params",
      "body": "Привет, {{1}}. Это тест параметров. {{2}} - тест второго параметра.",
      "waba_id": "with_params",
      "substitutions_count": 2,
      "header_content_type": null,
      "company_id": 52204,
      "header": null,
      "namespace": "ab06e962_230a_4e22_a3e2_a17bb8951856",
      "created_at": "2025-05-21T02:13:08.232Z",
      "position": 2
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 2,
    "per_page": 25
  }
}
```
