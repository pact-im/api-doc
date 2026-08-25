---
title: "Confirm auth"
description: "Complete provider authentication after creating an auth — via QR code, verification code, or OAuth"
section: "v2"
---

After [creating an auth](/v2/auths/create-auth), the provider determines how the connection is confirmed. Auth state changes are also delivered as webhooks — see [Auth events](/v2/webhooks/auth-events).

## QR authentication

QR authentication is supported by:

- `whatsapp`
- `telegram_personal`
- `max`

After creating an auth, the API response contains a `qr` field with a Base64-encoded QR image.

The same QR code is also delivered through the `update` webhook event.

When the QR code expires, another `update` webhook event is sent containing a new QR code.

## Code authentication

Code authentication is available for:

- `whatsapp`
- `telegram_personal`

If the `phone_number` parameter is included in the [Create Auth](/v2/auths/create-auth) request, the Code flow is used instead of QR authentication.

### WhatsApp

The response contains a `code` field.

The same code is also delivered through the `update` webhook.

### Telegram Personal

Telegram sends the verification code directly to the user's device.

The received code must be provided when [enabling the auth](/v2/auths/enable-auth):

`PUT/PATCH https://api.pact.im/api/p2/companies/{company_id}/auths/{id}/enable`

Request:

```json
{
  "code": "12345"
}
```

## OAuth authentication

OAuth authentication is supported by:

- `facebook`
- `vkontakte`
- `instagram_business`
- `whatsapp_business`
- `avito`

After creating an auth, the response contains an `oauth_provider_url`.

The same URL is also delivered through the `update` webhook.

The client should open this URL and complete the provider authorization flow.

For all providers except VKontakte, the auth becomes active automatically after the OAuth callback is received.

### VKontakte

VKontakte authorization consists of two steps.

#### Step 1

Open the initial `oauth_provider_url` and complete authorization.

#### Step 2

An `update` webhook is sent containing all available groups.

Each group contains its own `oauth_provider_url`.

Open the URL of the desired group to complete the connection.

Example:

```json
{
  "pages": [
    {
      "id": 30289,
      "enabled": false,
      "name": "test",
      "external_id": "232630093",
      "oauth_provider_url": "https://oauth.vk.ru/authorize?..."
    }
  ]
}
```
