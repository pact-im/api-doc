---
title: "How to place the Pact chat UI in your product"
description: "How to show the Pact.im chat UI in your CRM or another web app with an iframe"
section: "embed"
---

You can show the Pact.im chat UI inside your CRM or another web app: add an HTML `iframe` on the page and pass the chat UI URL as its `src`.

In this section:

- [Build URL and signature](/embed/signature)
- [Optional parameters](/embed/parameters)
- [Add the iframe](/embed/iframe) to your product

## Get started

1. Take the company `company_uuid` from [Companies](/v1/companies) (`external_uuid`).
2. Compute `signature` from the UUID and your API token — see [Build URL and signature](/embed/signature).
3. Add the [optional parameters](/embed/parameters) you need: conversation list or a specific chat.
4. Put the finished URL in an `iframe` on your page — see [Add iframe](/embed/iframe).
