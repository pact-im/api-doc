---
title: "Conversations"
description: "A conversation is a chat between your company and a client in a connected messenger"
section: "v2"
---

A **conversation** is a chat between your company’s agents and a client in a connected messenger — WhatsApp, Telegram, VK, and others.

Each conversation belongs to one company and one provider account. It tracks who the client is (name, phone, external IDs), whether the chat is open or archived, and when the last message arrived. Group chats are conversations too; they are marked with `group: true`.

Use conversations to build inboxes, sync CRM deals, and find the right chat before you send or read messages.

With the Conversations API you can:

- [Get conversations](/v2/conversations/get-conversations)
- [Get conversation](/v2/conversations/get-conversation)
- [Write a first message](/v2/conversations/write-first-message) (create a conversation)
- [Update conversation](/v2/conversations/update-conversation)

## Conversation object

### Example

```json
{
  "conversation": {
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
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
<span id="v2-conversation-id">id</span> | Integer | ID
company_id | Integer | ID of the company
sender_name | String | Sender or chat (if it's a group) name
sender_phone | String | Sender phone (if the provider has phones)
sender_external_id | String | External ID of the conversation
sender_external_public_id | String | Public external ID of the conversation
provider | String | Provider
avatar_url | String | Sender or chat (if it's a group) avatar URL
created_at | Time | Time we created this conversation in our db
last_updated_at | Time | [External created at](/v2/messages#v2-message-external-created-at) of the last message (null if no messages yet)
last_message_id | Integer | [ID](/v2/messages#v2-message-id) of the last message (null if no messages yet)
operational_state | String | `open`, `archived`, or `blocked`
replied_state | String | `initialized`, `replied`, or `unreplied`
group | Boolean | Whether this is a group conversation
