---
title: "Delete Message"
description: "Delete messages from a conversation"
section: "v2"
---

Allows you to delete messages.

Only these providers available at this moment: <b>whatsapp, telegram_personal, max</b>

## HTTP Request

`DELETE https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages`

## Body Parameters (JSON)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
message_ids  | true | Must be an array of integers | Message IDs to be deleted. The maximum array size is 100 elements.
company_id | true | Must be an integer | ID of the company
