---
title: "Upload Attachment"
description: "Upload a file or file URL to use in messages"
section: "v2"
---

Creates an attachment that can be sent in a message.

> **Note:** You cannot upload more than 5 files per second and more than 30 files per minute per user.

## HTTP Request

`POST https://api.pact.im/api/p2/attachments/`

Use:

- `Content-Type: multipart/form-data` when sending `file`
- `Content-Type: application/json` when sending `file_url`

## Body Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_id | true | Must be an integer | ID of the company
file | false | Must be a File. Mutually exclusive with `file_url` | Attachment file
file_url | false | Must be a URL (`http` or `https`). Mutually exclusive with `file` | Attachment file URL
metadata | false | Must be an object | Can contain `push_to_talk` and `data`

## Metadata

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
push_to_talk | false | Boolean | Send audio files as voice messages
data | false | Must be an object | Images only. May contain `height` and `width`

## Example

### Request
```shell
curl -X POST 'https://api.pact.im/api/p2/attachments/' \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@"spec/fixtures/files/1.jpg"' \
  --form 'private_api_token=YOUR_API_TOKEN' \
  --form 'company_id=COMPANY_ID' \
  --form 'metadata[data][width]="1024"' \
  --form 'metadata[data][height]="1280"'
```

### Response
```json
{
  "attachment": {
    "id": 53439177,
    "message_id": null,
    "file_name": "1.jpg",
    "mime_type": "image/jpg",
    "size": 812089,
    "attachment_url": "The path to the file",
    "preview_url": "The path to the file",
    "aspect_ratio": 0.8,
    "data": {
      "width": 1024,
      "height": 1280
    }
  }
}
```
