---
title: "Get Conversation Messages"
description: "Returns paginated messages of a conversation"
section: "v2"
---

Returns paginated messages of the conversation sorted by `external_created_at` field.

By default, 150 messages will be returned per page.

Read more about [pagination](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | ID of the conversation

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
page | false | Must be an integer | Number of page. Returns first page if it is not provided
per_page | false | Must be an integer | Amount of entries per page will be return (150 by default)

## Example

### Request
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
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
  "messages": [
    {
      "id": 13224,
      "external_id": "b91c9b99-7c24-40a7-8b52-1d80b5b3e158",
      "company_id": 52204,
      "conversation_id": 18642850,
      "contact_id": 549645235,
      "replied_to_id": null,
      "created_at": "2024-11-12T06:28:10.907Z",
      "external_created_at": "2024-11-12T06:28:10.000Z",
      "income": false,
      "status": "read",
      "message": null,
      "reactions": [],
      "details": null,
      "attachments": [
        {
          "id": 53431944,
          "message_id": 13224,
          "file_name": "p4ct-br0ws3r-v01ce-r3c0rd.ogg",
          "mime_type": "audio/ogg",
          "size": 39185,
          "attachment_url": "https://cdn.pact.im/uploads/storage/attachment/file/a1dd41f80c3ae85beb355a38ea3f5b53.ogg",
          "push_to_talk": true
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 150
  }
}
```
