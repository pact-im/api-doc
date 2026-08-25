---
title: "Create Auth"
description: "Create a new authentication for a messaging provider"
section: "v2"
---

Creates a new authentication (auth) for a messaging provider.

## HTTP Request

`POST https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

## Body Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be a string | Provider name (e.g. whatsapp, telegram, vkontakte)
sync_period | false | Must be one of: day, week, month | Message sync interval (optional)

Message synchronization is supported only by the following providers:

- `telegram_personal`
- `whatsapp`
- `max`
- `instagram_business`
- `vkontakte`
- `vkontakte_direct`

## Provider Parameters

| Provider | Create Parameters | Enable Parameters |
|----------|-------------------|-------------------|
| `whatsapp` | `provider`, optional `phone_number`, optional `sync_period` | No additional parameters |
| `telegram_personal` | `provider`, optional `phone_number`, optional `sync_period` | `code` is required only when using Code authentication. Re-enabling a disabled auth requires no additional parameters. |
| `max` | `provider`, optional `sync_period` | No additional parameters |
| `telegram` | `provider`, `token` | No additional parameters |
| `viber` | `provider`, `token` | No additional parameters |
| `odnoklassniki` | `provider`, `token` | No additional parameters |
| `max_bot` | `provider`, `token` | No additional parameters |
| `vkontakte_direct` | `provider`, `token`, optional `sync_period` | No additional parameters |
| `vkontakte` | `provider`, optional `sync_period` | No additional parameters |
| `facebook` | `provider` | No additional parameters |
| `instagram_business` | `provider`, optional `sync_period` | No additional parameters |
| `whatsapp_business` | `provider` | No additional parameters |
| `avito` | `provider` | No additional parameters |
| `custom` | `provider` | optional `client_url` |

## Next steps

Depending on the provider, continue with [Confirm auth](/v2/auths/confirm-auth) (QR, code, or OAuth).

Auth changes are also pushed via webhooks. See [Auth events](/v2/webhooks/auth-events).
