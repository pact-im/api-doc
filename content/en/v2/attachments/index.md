---
title: "Attachments"
description: "An attachment is a file you upload once and then send inside a message"
section: "v2"
---

An **attachment** is a file stored in Pact.im so you can send it in a [message](/v2/messages) — images, documents, audio, video, and similar media.

Upload the file first, then pass its ID in `attachment_ids` when you send or write a message. Until it is attached to a message, `message_id` may be empty. Image attachments can include a preview URL, aspect ratio, and dimensions.

Use attachments whenever the conversation needs more than plain text.

- [Upload attachment](/v2/attachments/upload-attachment)

## Attachment object

### Example

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
    },
    "push_to_talk": null
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | ID
message_id | Integer | ID of the message
file_name | String | Original file name
mime_type | String | Mime type (`audio/ogg` for example)
size | Integer | File size in bytes
attachment_url | String | URL of the file
preview_url | String | URL of the image preview (if it is an image)
aspect_ratio | Float | Aspect ratio (if it is an image)
data | Object | Width and height (if it is an image)
push_to_talk | Boolean | Voice message vs regular audio file (if it is audio)
