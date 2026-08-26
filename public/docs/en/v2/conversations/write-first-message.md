---
title: "Write First Message"
description: "Send a message when no conversation with the recipient exists"
section: "v2"
---

Allows to send message when no conversation with this recipient exists.

Only these providers available at this moment: <b>max, whatsapp, telegram_personal, whatsapp_business, vkontakte_direct</b>

## HTTP Request

`POST https://api.pact.im/api/p2/messages`

## Body Parameters (JSON)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
provider | true | Must be a string and one of: max, whatsapp, telegram_personal, whatsapp_business, vkontakte_direct | Provider
phone | false | Must be a string | Recipient phone
nickname | false | Must be a string | Recipient nickname (for telegram_personal)
vkontakte_id  | false | Must be a string | Recipient ID vkontakte (Mutually exclusive with `vkontakte_domain`)
vkontakte_domain  | false | Must be a string | Recipient domain vkontakte (Mutually exclusive with `vkontakte_id`)
text | false | Must be a string | Text of the message
attachment_ids | false | Must be an array of integers | ID of the [attachments](/v2/attachments). One message can contain only one array with one ID. To send multiple attachments, you must send multiple requests with different IDs.
waba_id | false | Must be a string | WABA template ID
substitutions | false | Must be an array of strings | WABA template substitutions (if template has them)
send_to_crm | false | boolean | Sync initializing message to CRM integrations. Default: `true`

You should use waba_id if you want to write first with <b>whatsapp_business</b> provider.
More about [WABA Templates](/v2/waba-templates).

## Example

### Request
```shell
curl -X POST 'https://api.pact.im/api/p2/messages' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID,
    "text": "test"
  }'
```

### Response
```json
{
  "message": {
    "id": 239,
    "external_id": null,
    "company_id": 52204,
    "conversation_id": 18642824,
    "contact_id": 3,
    "replied_to_id": null,
    "created_at": "2025-02-13T14:07:51.582Z",
    "external_created_at": "2025-02-13T14:07:51.000Z",
    "income": false,
    "status": "sent",
    "message": null,
    "reactions": [],
    "details": null,
    "attachments": [
      {
        "id": 5,
        "message_id": 239,
        "file_name": "5287346531311154701.png",
        "mime_type": "image/jpeg",
        "size": 65030,
        "attachment_url": "https://cdn.pact.im/uploads/storage/attachment/file/a845515c570e285e2ae22d9d493e3abc.png",
        "preview_url": "https://cdn.pact.im/uploads/storage/attachment/file/small-3a46073e438fa82c6c04fd2ff3e1cfef.png",
        "aspect_ratio": 0.46,
        "data": {
          "width": 591,
          "height": 1280
        }
      }
    ]
  }
}
```
