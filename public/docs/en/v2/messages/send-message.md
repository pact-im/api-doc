---
title: "Send Message"
description: "Send a message to an existing conversation"
section: "v2"
---

Allows to send message to existing conversation.

## HTTP Request

`POST https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages`

## URL Parameters

Parameter | Description
--------- | -----------
CONVERSATION_ID | ID of the conversation

## Body Parameters (JSON)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
text | false | Must be a string | Text of the message
attachment_ids | false | Must be an array of integers | ID of the [attachments](/v2/attachments). One message can contain only one array with one ID. To send multiple attachments, you must send multiple requests with different IDs.
replied_to_id | false | Must be a string | [External ID](/v2/messages#v2-message-external-id) of the message to which this message is a reply
send_to_crm | false | boolean | Sync initializing message to CRM integrations. Default: `true`

## Example

### Request
```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": COMPANY_ID,
    "text": "test",
    "attachment_ids": ["ID_attachment"],
    "replied_to_id": EXTERNAL_MESSAGE_ID_FROM_PROVIDER
  }'
```

```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": COMPANY_ID,
    "text": "test"
  }'
```

### Response
```json
{
    "message": {
        "id": 123,
        "external_id": null,
        "company_id": 838111,
        "conversation_id": 2073572213,
        "contact_id": 1582597339,
        "replied_to_id": "AC36714A437FAE372F0CC3CC21330F336",
        "created_at": "2025-12-09T13:40:23.716Z",
        "external_created_at": "2025-12-09T13:40:23.000Z",
        "income": false,
        "status": "sent",
        "message": "Hello World!",
        "reactions": [],
        "details": null,
        "delivery": false,
        "deleted": false,
        "attachments": [
            {
                "id": 315200264,
                "message_id": 1414933437,
                "file_name": "image_processing20241227-195666-pny0n6.jpeg",
                "mime_type": "image/jpeg",
                "size": 25436,
                "attachment_url": "https://cdn.pact.im/storage/attachment/file/53cbacc1433e4396889a0e53eb8f102fab.jpeg",
                "preview_url": "https://cdn.pact.im/storage/attachment/file/small-11191138a56305df28e13d71cc57071113.jpeg",
                "aspect_ratio": null,
                "data": {}
            }
        ]
    }
}
```
