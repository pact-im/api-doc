---
title: "Optional parameters"
description: "Optional URL parameters: scope, conversation, phone, provider, and operator"
section: "embed"
---

After the [required parameters](/embed/signature), you can pass options that control what the chat UI opens.

## Optional parameters

Parameter | Required | Description
--------- | -------- | -----------
scope | false | UI scope: `conversations` (conversation list) or `messages` (a specific chat). Defaults to `conversations`. If `scope` is omitted but `phone` is set, `messages` is used
conversation_id | false | Conversation ID when `scope=messages`. Required if `phone` and `provider` are not set
phone | false | Phone number used to find the contact when `scope=messages`. Example: `+1234567890`
provider | false | Channel provider when opening by phone. Example: `whatsapp`, `whatsapp_business`
current_user_id | false | Operator ID that sends messages in the chat UI. Example: `85328`

## Example URLs

Conversation list:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=conversations
```

Conversation by ID:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=messages&conversation_id=12345
```

Conversation by phone and provider:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=messages&phone=+1234567890&provider=whatsapp
```

Pass the finished URL as `src` when you [add the iframe](/embed/iframe).
