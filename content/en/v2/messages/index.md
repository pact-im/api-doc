---
title: "Messages"
description: "A message is a single text or media item inside a conversation between your company and a client"
section: "v2"
---

A **message** is one item in a [conversation](/v2/conversations) — text, media, a reply, or a template send.

Messages can be incoming (from the client) or outgoing (from your company). Each one carries delivery status, timestamps from Pact.im and from the provider, optional attachments, and links back to the conversation and contact.

Use the Messages API to read history, reply in an existing chat, or delete messages where the provider allows it.

With the Messages API you can:

- [Get messages of a conversation](/v2/messages/get-conversation-messages)
- [Get conversation message](/v2/messages/get-conversation-message)
- [Send a message to an existing conversation](/v2/messages/send-message)
- [Delete messages](/v2/messages/delete-message)

To start a new conversation, use [Write a first message](/v2/conversations/write-first-message).

## Message object

### Example

```json
{
  "message": {
    "id": 1134326991,
    "external_id": "34577",
    "company_id": 86605,
    "conversation_id": 209752626,
    "contact_id": 1583160940,
    "replied_to_id": null,
    "created_at": "2025-02-05T09:01:48.514Z",
    "external_created_at": "2025-02-05T09:01:47.000Z",
    "income": true,
    "status": "created",
    "message": "",
    "reactions": [],
    "details": null,
    "attachments": [],
    "delivery": false,
    "deleted": false
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
<span id="v2-message-id">id</span> | Integer | ID
<span id="v2-message-external-id">external_id</span> | String | External message ID from provider (used for message replies)
company_id | Integer | ID of the company
conversation_id | Integer | [ID](/v2/conversations#v2-conversation-id) of the conversation
contact_id | Integer | ID of the message contact
replied_to_id | String | External ID of the message to which this message is a reply
created_at | Time | Time we created this message in our db
<span id="v2-message-external-created-at">external_created_at</span> | Time | Time from provider (as a rule, the time of direct sending of the message)
income | Boolean | Whether message is income or outgoing
status | String | Status of the message (`created`, `sent`, `delivered`, `read`, or `error`)
message | String | Message body
reactions | Array | Message reactions
details | Object | Data containing reason why message was not delivered (if it is)
attachments | Array | Array of message [attachment objects](/v2/attachments#attachment-object) (if it has)
delivery | Boolean | Whether this message was sent using the bulk mail feature
deleted | Boolean | Whether this message has been deleted
