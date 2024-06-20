## Channels

In order to receive and send messages, you need to connect channels.
Channels is a source of incoming messages in the system. Channel providers:

* WhatsApp
* Instagram_business
* Telegram
* Telegram Personal
* Viber
* VK
* Facebook

You can also connect required channels via our web interface under the [settings page](https://app.pact.im/project_settings/channels).

<aside class="notice">
You can connect only one channel per one company for each provider.
Contact with support if you want to use more than one channel
</aside>

<aside class="warning">
You have to setup webhook's to make channels fully functional.
</aside>


### Get All channels

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
 * This method returns all the company channels.
 * @link https://pact-im.github.io/api-doc/#get-all-channels
 *
 * @param int $companyId Id of the company
 * @param string $from Next page token geted from last request. Not valid or empty token return first page
 * @param int $per Number of elements per page. Default: 50
 * @param string $sort Change sorting direction (sorting by id). Avilable values: asc, desc. Default: asc.
 */

$client->channels->getChannels($companyId,
                               $from,
                               $per,
                               $sort);

```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "channels":[
         {
            "external_id":399,
            "provider":"whatsapp"
         }
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

This endpoint returns all the company channels.

#### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
from | false | Must be a String not more than 255 symbols | Next page token geted from last request. Not valid or empty token return first page
per | false | Must be a number between 1 and 100 | Number of elements per page. Default: 50
sort_direction | false | Must be a String | We sort results by id. Change sorting direction. Avilable values: asc, desc. Default: asc.

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

### Create new channel

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram&token=12345677890"
```

> Create channel:

```php
<?php

/**
 * Unified method that can create channel in company.
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 * @note You can connect only one channel per one company for each provider.
 *       Contact with support if you want to use more than one channel
 *
 * @param int $companyId Id of the company
 * @param string $provider
 * @param array $parameters
 */

// # Create channel unified method
// Note: The array of parameters variables depending on the provider
//       You need add required parameters for your particular provider

$parameters = [
  'sync_messages_from' => $syncMessagesFrom
  // ...
];

$client->channels->createChannelUnified($companyId,
                                        $provider,
                                        $parameters);

```


> Create whatsapp channel:

```php
<?php

/**
 * This method create a new channel for WhatsApp
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 *
 * @param int $companyId Id of the company
 * @param DateTimeInterface $syncMessagesFrom Only messages created after will be synchronized
 * @param bool $doNotMarkAsRead Do not mark chats as read after synchronization
 * @return Json|null
 */

$client->channels->createChannelWhatsApp(
  $companyId,
  $syncMessagesFrom,
  $doNotMarkAsRead,
  $phone
);
```

> Create instagram business channel:

```php
<?php

/**
 * This method create a new channel for InstagramBusiness
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 *
 * @param int $companyId Id of the company
 * @param string $private_api_token on our side
 * @param string $provider there must be "instagram_business"
 * @param hash $data data from Instagram
 * @param string $token from Instagram data hash
 * @param string $phone user phone
 * @return Json|null
 */

$client->channels->createChannelInstagramBusiness(
  $companyId,
  $private_api_token,
  $provider,
  $data,
  $token
  $phone
);
```

> Create facebook/vkontakte/vkontakte_direct/telegram/viber channel

```php
<?php

/**
 * This method create a new channel in the company using token.
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 * @note List of supported channels that can be created by token
 *       you can see in link above
 *
 * @param int $companyId Id of the company
 * @param string $provider (facebook, viber, vk, ...)
 * @param string $token
 * @return Json|null
 */

$client->channels->createChannelByToken(
  $companyId,
  $provider,
  $token
);

```

> The above command returns JSON structured like this:

```json
{
   "status": "created",
   "data": {
      "external_id": 1
   }
}
```

This endpoint create a new channel in the company.

<aside class="notice">
You can connect only one channel per one company for each provider.
Contact with support if you want to use more than one channel
</aside>

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

#### Query Parameters

##### Create whatsapp channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp`
sync_messages_from | false | timestamp | Only messages created after `sync_messages_from` will be synchronized. Not older than one month.
phone | true | string 

<aside class="notice">
You will get QR-code webhook after this action. This QR-code must be scanned on mobile device to authorize Pact.im.
If you can't do this - try to connect Whatsapp via our web interface.
</aside>

##### Create whatsapp business channel (dialog360 by token)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp_business` |
hosting_type | true | Must be a `cloud`, `onpremise` | Hosting platform type
token | true | Must be a String | Token for auth.
subtype | false | Must be a `regular`, `unlim`, `no_write_first` | Tarif name

##### Create whatsapp business channel (dialog360 by channel_id)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp_business` |
hosting_type | true | Must be a `cloud`, `onpremise` | Hosting platform type
dialog360_channel_id | true | Must be a String | channel_id for auth
dialog360_client_id | false | Must be a String | client_id for auth
account_name | false | Must be a String | Account name for waba profile
subtype | false | Must be a `regular`, `unlim`, `no_write_first` | Tarif name

##### Create avito channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `avito` |
login | true | Must be a String | avito client_id
password | true | Must be a String | avito client secret

##### Create instagram business channel

Steps:
1. It is necessary to follow the instructions for Facebook until you receive the [token](https://developers.facebook.com/docs/instagram/business-login-for-instagram#step-3--capture-user-access-token).
2. Make a request for `https://graph.facebook.com/v4.0/me?fields=first_name,last_name,picture,name,email` indicating the token.  
   In the response you will receive information about your user.

3. Send a request to us  `p1/companies/<company_id>/channels`.  
   The request body must contain:
   - provider: "instagram_business"
   - token: "token"
   - phone: "+79131112233"
   - data: "response body to previous request"

   At this stage, a channel was created and information on Instagram business accounts was uploaded.


4. Send a request to `p1/companies/<company_id>/channels/<external_id>/enable_page_instagram?page_id=<page[:id]>&sync_period=<sync_period>`.

   `external_id` - parameter from previous request  
   `page[:id]` - parameter from previous request  
   `sync_period` - used to determine what period of messages will be synchronized: day, week, month, all.

   This is necessary in order to determine which Instagram account to use.

Parameter | Required | Validations | Description
--------- | -------- |--------| -----------
provider | true | Must be `instagram_business` |
private_api_token | true | String | User privat token
data | true | Hash   | Data from Instagram that was transferred to redirect_url
phone | true | String | User phone
token | true | String | Instagram token

##### Create facebook/vkontakte/vkontakte_direct/telegram/viber channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be one of: `facebook`, `vkontakte`, `vkontakte_direct`, `telegram`, `viber` | Shows which provider you want to connect
token | true | Must be a String | Token for auth.

##### Create telegram personal channel (by qr code)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `telegram_personal`
via_qr_code | true | boolean | Must be a 'true'
sync_messages_from | false | timestamp | Only messages created after `sync_messages_from` will be synchronized. Not older than one month.

<aside class="notice">
You will get QR-code webhook after this action. This QR-code must be scanned on mobile device to authorize Pact.im.
If you can't do this - try to connect Telegram via our web interface.
</aside>


##### Create telegram personal channel (by digital code)

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `telegram_personal` |
phone | true | Must be a String | Phone number. Example: '7999999999'
sync_messages_from | false | timestamp | Only messages created after `sync_messages_from` will be synchronized. Not older than one month.

<aside class="notice">
After you have created a telegram channel. You must request a confirmation code ("Request Code" endpoint). The code will be sent to your device's Telegram App. You must send the received code to the endpoint "Confirm code"
</aside>
[Request code](#request-code-telegram-personal) [Confirm code](#confirm-code-telegram-personal)

###### Get token for vk group:

1. Open "Manage" in selected group
2. Open "API usage" (https://vk.com/public<GROUP_ID>?act=tokens)
3. Create and copy new token

### Update channel

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "token=9876543210"
```
> Update channel:

```php
<?php

/**
 * This method updates existing channel in the company
 * @link https://pact-im.github.io/api-doc/#update-channel
 *
 * @param int $companyId
 * @param int $conversationId
 * @param array $parameters
 * @return Json|null
 */

// # Update channel unified method
// Note: The array of parameters variables depending on the provider
//       You need add required parameters for your particular provider

$parameters = [
  'login' => $login,
  'password' => $password,
  // ...
];

$client->channels->updateChannel(
  $companyId,
  $conversationId,
  $parameters
);
```

> Update instagram channel:

```php
<?php

/**
 * This method updates instagramm channel
 * @link https://pact-im.github.io/api-doc/#update-channel
 *
 * @param int $companyId
 * @param int $conversationId
 * @param string $login Instagram login
 * @param string $password Instagram password
 * @return Json|null
 */

$client->channels->updateChannelInstagram(
  $companyId,
  $conversationId,
  $login,
  $password
);
```

> Update facebook/vkontakte/vkontakte_direct/telegram/viber channel:

```php
<?php

/**
 * This method updates channels that using tokens to auth
 * @link https://pact-im.github.io/api-doc/#update-channel
 * @note List of supported channels that can be created by token
 *       you can see in link above
 *
 * @param int $companyId
 * @param int $conversationId
 * @param string $token
 * @return Json|null
 */

$client->channels->updateChannelToken(
  $companyId,
  $conversationId,
  $token
);
```

> The above command returns JSON structured like this:

```json
{
   "status":"updated",
   "data":{
      "external_id":2
   }
}
```

This endpoint updates existing channel in the company.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

##### For facebook/vkontakte/vkontakte_direct/telegram/viber/instagram_business channels

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
token | true | Must be a String | ...

### Delete channel

```shell
curl -X DELETE "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> Delete channel:

```php
<?php
/**
 * Method deletes (disables) the channel
 * @link https://pact-im.github.io/api-doc/#delete-channel
 *
 * @param int $companyId Id of the company
 * @param int $channelId Id of the conversation
 */

$client->chanells->deleteChannel($companyId, $channelId);
```

> The above command returns JSON structured like this:

```json
{
   "status":"deleted"
}
```

#### HTTP Request

`DELETE https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel for disable

### How to write first message to Whatsapp

<aside class="notice">
  Whatsapp requires using this method to write the first message.
</aside>

> Send first message to whatsapp

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&text=message"
```

```php
<?php

/**
 * Send first message to whatsapp
 * @link https://pact-im.github.io/api-doc/#how-to-write-first-message-to-whatsapp
 *
 * @param int $companyId Id of the company
 * @param int $channelId Id of the conversation
 * @param string $phone Phone number
 * @param string $message Message text
 */

$client->channels->sendFirstWhatsAppMessage(
  $companyId,
  $channelId,
  $phone,
  $message
);
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "id":17,
      "company_id":154,
      "channel":{
         "id":399,
         "type":"whatsapp"
      },
      "state":"trying_deliver",
      "conversation_id":null,
      "message_id":null,
      "details":null,
      "created_at":1510393147
   }
}
```

### How to check if user has Whatsapp account


```shell
curl -X GET "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/user_exists?phone=79250000001"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "exists": true
}
```

### How to write first message to Whatsapp Business

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&template[id]=template_id&template[language_code]=ru&template[parameters][]=имя"
```

```php
<?php

/**
 * Send first message to whatsapp business
 * @link https://pact-im.github.io/api-doc/#how-to-write-first-message-to-whatsapp
 *
 * @param int $companyId Id of the company
 * @param int $channelId Id of the conversation
 * @param string $phone Phone number
 * @param string $message Message text
 */

$template = [
  'id' => $templateId,
  'language_code' => $templateLanguageCode,
  'parameters' => []
];

$client->channels->sendFirstWhatsAppMessage(
  $companyId,
  $channelId,
  $phone,
  $template
);
```

This endpoint provides an ability to create conversation with a client in whatsapp channel.
When you execute this request we will add a job for delivery. We will send webhook when the operation is complete or failed.

You can also poll delivery status here: [Jobs](#jobs)

<aside class="notice">
Whatsapp business requires using this method to write the first message.
</aside>

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/conversations`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
phone | true | Must be in format `79250000001` | Contact phone number
message | false | Must be String | Message text. For regular Whatsapp channel only
template | false | Must be Object | Template data. For Whatsapp Business channel only

#### Whatsapp Business Template Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
id | true | Must be String | ID of registered template
language_code | true | Must be String | Language code of registered template (`'en'`, `'ru'`, etc)
parameters | true | Must be Array | Template substitution parameters

### Request code (whatsapp)

> Request code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=whatsapp"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-whatsapp
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'whatsapp'
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
   "sessionId": "1426",
   "code": "ZHHJ-KQSP",
   "ttl": "160s"
}
```

In the WhatsApp mobile application, you will receive a notification asking you to insert an authorization code.
Enter the value "code" there

### Request code (telegram personal)

> Request code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal'
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
  "code_length": 6,
  "code_type": "app",
  "expires_in": 60,
  "next_type": "app",
  "session_id": 1337,
  "status": "ok"
}
```

This endpoint request code for telegram personal

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

##### Request challenge code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `telegram_personal` |

### Confirm code (telegram personal)

> Confirmation type is code

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal&confirmation_type=code&code=2567"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal',
  'confirmation_type' => 'code',
  'code' => 2567
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Successful response:

```json
{
  "result": "ok",
  "state": "enabled"
}
```

> Confirmirmation type is password

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal&confirmation_type=password&password=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal',
  'confirmation_type' => 'password',
  'password' => 'qwerty123'
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
  "result": "ok",
  "state": "enabled"
}
```

This endpoint confirm telegram personal channel with two types: code, password

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/confirm`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

##### Confirmation type is code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `telegram_personal` |
confirmation_type | true | Must be `code` |
code | true | Must be a Number | Example: `1234`

##### Confirmation type is password

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `telegram_personal` |
confirmation_type | true | Must be `password` |
password | true | Must be a String | Example: `qwerty123`

### Request code (instagram only)

> Request challenge code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_variant=0"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'challenge_variant' => $challengeVariant
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
  "result": "ok"
}
```

> Request two factor authentication code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_type=two_factor"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'challenge_type' => $challengeType
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
  "result": "ok"
}
```

This endpoint request challenge or two factor authentication code.

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

##### Request challenge code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
challenge_variant | true | |

##### Request two factor SMS authentication code

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `instagram` |
challenge_type | true | Must be `two_factor` |

### Confirm code (instagram only)

> Confirm challenge code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&confirmation_code=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'confirmation_code' => $confirmationCode
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this.

> Successful response:

```json
{
  "result": "ok"
}
```

> Two factor authentication required:

```json
{
  "result": "ok",
  "data": {
    "two_factor_requires": true,
    "details": [
      { "value": 1, "key": "sms" },
      { "value": 2, "key": "recovery_code" },
      { "value": 3, "key": "totp" }
    ]
  }
}
```

> Challenge required:

```json
{
  "result": "ok",
  "data": {
    "confirmation_requires": true,
    "details": [
      { "value" => 1, "label" => "e*******e@example.org" },
      { "value" => 0, "label" => "+0 *** ***-**-00" }
    ]
  }
}
```

> Confirm two factor authentication code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&confirmation_type=two_factor&confirmation_variant=3&confirmation_code=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'confirmation_type' => $confirmationType,
  'confirmation_variant' => $confirmationVariant,
  'confirmation_code' => $confirmationCode
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> The above command returns JSON structured like this:

```json
{
  "result": "ok"
}
```

This endpoint submit challenge or two factor authentication code.

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/confirm`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

#### Query Parameters

##### challenge code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
confirmation_code | true | Must be a String |

##### two factor authentication code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
confirmation_type| true | Must be `two_factor` |
confirmation_variant | true | Must be a Integer | Variant from request code response (`data->details->value`). Typicaly 1, 2 or 3.
confirmation_code | true | Must be a String |
