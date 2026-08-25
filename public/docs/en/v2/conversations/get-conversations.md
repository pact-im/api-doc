---
title: "Get Conversations"
description: "Returns a paginated list of company conversations"
section: "v2"
---

Returns paginated conversations of the company sorted by `last_updated_at`.

By default, 25 conversations are returned per page.

Read more about [pagination](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/conversations`

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
search_string | false | Must be a string | Search by sender phone, sender name, or sender public external ID. Leading `+` and `@` are stripped automatically, so `+79991112233` and `79991112233`, or `@username` and `username`, return the same result
page | false | Must be an integer | Page number. Returns the first page if omitted
per_page | false | Must be an integer | Entries per page (25 by default)

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID,
    "page": 1
  }'
```

### Response
```json
{
  "conversations": [
    {
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
  ],
  "meta": {
    "page": 1,
    "entries_count": 2,
    "per_page": 25
  }
}
```
