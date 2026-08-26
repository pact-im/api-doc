---
title: "Add iframe"
description: "How to place the Pact chat UI in your product with an HTML iframe"
section: "embed"
---

To show the Pact chat UI in your CRM or another product, add an HTML `iframe` on the page and set its `src` to the chat UI URL — with a [signature](/embed/signature) and the [parameters](/embed/parameters) you need.

## HTML

```html
<iframe
  src="https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=conversations"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

## Common issues

Problem | What to check
------- | -------------
Blank or broken UI | `company_uuid` and `signature` in the URL
Authentication error | `signature` is built with the same `private_api_token` you use for the API, over the exact JSON string with the UUID
Wrong conversation opens | `scope`, `conversation_id`, `phone`, and `provider`
