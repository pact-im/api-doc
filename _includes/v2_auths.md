## Auths
> Webhook without page:

```json
{
  "event": "create",
  "type": "auth",
  "object": {
    "id": 69174,
    "company_id": 52368,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "created_at": "2025-06-23T14:33:47.886Z",
    "updated_at": "2025-06-23T14:33:47.886Z",
    "sync_messages_at": "2025-06-22T14:33:47.877Z"
  }
}
```
Auths represent integrations with external messaging providers (WhatsApp, Telegram, VK, Facebook, Instagram, etc.).

### Get Company Auths

Returns all auths for a company.

#### HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
page | false | Must be integer | Page number
per_page | false | Must be integer | Items per page

### Get Auths (Multi-company)

Returns auths for multiple companies.

#### HTTP Request

`GET https://api.pact.im/api/p2/auths`

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_ids | true | Must be an array of integers | List of company IDs
page | false | Must be integer | Page number
per_page | false | Must be integer | Items per page

### Create Auth

Creates a new authentication (auth) for a messaging provider.

#### HTTP Request

`POST https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

#### Body Parameters

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

#### Provider Parameters

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

### QR Authentication

QR authentication is supported by the following providers:

- `whatsapp`
- `telegram_personal`
- `max`

After creating an auth, the API response contains a `qr` field with a Base64-encoded QR image.

The same QR code is also delivered through the `update` webhook event.

Example webhook payload:

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 70719,
    "provider": "whatsapp",
    "state": "initial",
    "company_id": 52524,
    "phone_number": null,
    "settings": {},
    "qr": "data:image/png;base64,...",
    "created_at": "2026-06-17T06:45:20.562Z",
    "updated_at": "2026-06-17T06:45:21.521Z",
    "sync_messages_at": null
  }
}
```

When the QR code expires, another `update` webhook event is sent containing a new QR code.

### Code Authentication

Code authentication is available for:

- `whatsapp`
- `telegram_personal`

If the `phone_number` parameter is included in the Create Auth request, the Code flow is used instead of QR authentication.

#### WhatsApp

The response contains a `code` field.

The same code is also delivered through the `update` webhook.

#### Telegram Personal

Telegram sends the verification code directly to the user's device.

The received code must be provided when enabling the auth:

`PUT/PATCH https://api.pact.im/api/p2/companies/{company_id}/auths/{id}/enable`


Request:

{
  "code": "12345"
}


### OAuth Authentication

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

#### VKontakte

VKontakte authorization consists of two steps.

Step 1

Open the initial `oauth_provider_url` and complete authorization.

Step 2

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

### Enable Auth

Enables an existing auth.

#### HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths/<AUTH_ID>/enable`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
AUTH_ID | ID of the auth

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

#### Body Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
code | false | Must be a string | Required only for telegram_personal (code flow)

### Disable Auth

Disables an existing auth.

#### HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths/<AUTH_ID>/disable`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
AUTH_ID | ID of the auth

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

### Delete Auth

Deletes an auth permanently.

#### HTTP Request

`DELETE https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths/<AUTH_ID>`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
AUTH_ID | ID of the auth

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN

### Response Parameters
<p id="v2-auth-object"></p>

 Auth object

* <b>id</b> (Integer) - ID Auth
* <b>company_id</b> (Integer) - ID of the company
* <b>provider</b> (String) - Name of the connected messenger
* <b>state</b> (String ) - Connection status, can be `disabled` or `enabled`
* <b>phone_number</b> (Integer) - Phone number of the connected messenger (only available for messengers that transmit the account's phone number)
* <b>username</b> (String ) - Username of the connected messenger (only available for messengers that transmit the account's username)
* <b>created_at</b> (Time) - Auth connection time
* <b>updated_at</b> (Time) - Last update time
* <b>sync_messages_at</b> (Time) - The time from which the synchronization of messages began
* <b>pages</b> (Object) - Some providers may provide a list of pages that can be connected to. Additional parameters will be passed for this purpose.

> Webhook with pages:

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 69167,
    "company_id": 52368,
    "provider": "vkontakte",
    "state": "enabled",
    "created_at": "2025-06-20T08:10:20.517Z",
    "updated_at": "2025-06-23T15:31:00.275Z",
    "sync_messages_at": "2025-06-20T08:10:36.951Z",
    "pages": [
      {
        "id": 30190,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "229559196",
        "name": "Test1",
        "enabled": true
      },
      {
        "id": 30191,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "223020390",
        "name": "Test2",
        "enabled": false
      }
    ]
  }
}
```
Pages object
* <b>id</b> (Integer) - Page ID
* <b>auth_id</b> (Integer) - Auth id to which the page belongs
* <b>company_id</b> (Integer) - Company id to which the page belongs
* <b>external_id</b> (Integer) - External page Id
* <b>name</b> (String) - Page title
* <b>enabled</b> (String) - Page connection status, can be true or false