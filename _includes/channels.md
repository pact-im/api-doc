# Channels

In order to receive and send messages, you need to connect channels.
Channels is a source of incoming messages in the system. Channel can be:

* WhatsApp
* Instagram
* Telegram
* Viber
* VK
* Facebook

You can also connect required channels via our web interface under the [settings page](https://app.pact.im/project_settings/channels).

<aside class="warning">
You have to setup webhook's to make channels fully functional.
</aside>


## Get All channels

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```shell
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

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
from | false | Must be a String not more than 255 symbols | Next page token geted from last request. Not valid or empty token return first page
per | false | Must be a number between 1 and 100 | Number of elements per page. Default: 50
sort_direction | false | Must be a String | We sort results by id. Change sorting direction. Avilable values: asc, desc. Default: asc.

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

## Create new channel

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram&token=12345677890"
```

> The above command returns JSON structured like this:


```shell
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

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

### Query Parameters

#### Create whatsapp channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp`
sync_messages_from | false | timestamp | Only messages created after `sync_messages_from` will be synchronized
do_not_mark_as_read | false | boolean | Do not mark chats as read after synchronization

<aside class="notice">
You will get QR-code webhook after this action. This QR-code must be scanned on mobile device to authorize Pact.im.
If you can't do this - try to connect Whatsapp via our web interface.
</aside>

#### Create instagram channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `instagram` |
login | true | Must be a String | Instagram login
password | true | Must be a String | Instagram password. We don't save password, only authorization cookies
sync_messages_from | false | timestamp | Only messages created after `sync_messages_from` will be synchronized
sync_comments | false | boolean | Enable comment sync

#### Create facebook/vkontakte/telegram/viber channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be one of: `facebook`, `vkontakte`, `telegram`, `viber` | Shows which provider you want to connect
token | true | Must be a String | Token for auth.

## Update channel

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "token=9876543210"
```

> The above command returns JSON structured like this:

```shell
{
   "status":"updated",
   "data":{
      "external_id":2
   }
}
```

This endpoint updates existing channel in the company.

### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

### Query Parameters

#### For instagram channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
login | true | Must be a String | Instagram login
password | true | Must be a String | Instagram passowrd. We don't save password, only authorization cookies

#### For facebook/vkontakte/telegram/viber channels

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
token | true | Must be a String | ...

## Delete channel

```shell
curl -X DELETE "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```shell
{
   "status":"deleted"
}
```

### HTTP Request

`DELETE https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel for disable

## How to write first message to Whatsapp

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&text=message"
```

```php
  $ch = curl_init();
  $ID_COMPANY = user_company;
  $ID_CHANNEL = user_company__whatsup_channel;
  $private_api_token = user_private_api_token;
  $phone = user_phone;
  $message = 'Hello';
  curl_setopt($ch, CURLOPT_URL, "https://api.pact.im/p1/companies/{$ID_COMPANY}/channels/{$ID_CHANNEL}/conversations");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, "phone={$phone}&text={$message}");
  curl_setopt($ch, CURLOPT_POST, 1);
  $headers = array();
  $headers[] = 'X-Private-Api-Token: '.$private_api_token;
  $headers[] = 'Content-Type: application/x-www-form-urlencoded';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  $result = curl_exec($ch);
  curl_close ($ch);
```

> The above command returns JSON structured like this:

```shell
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

## How to write first message to Whatsapp Business

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&template[id]=template_id&template[language_code]=ru&template[parameters][]=имя"
```


This endpoint provides an ability to create conversation with a client in whatsapp channel.
When you execute this request we will add a job for delivery. We will send webhook when the operation is complete or failed.

You can also poll delivery status here: [Jobs](#jobs)

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/conversations`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
phone | true | Must be in format `79250000001` | Contact phone number
message | false | Must be String | Message text. For regular Whatsapp channel only
template | false | Must be Object | Template data. For Whatsapp Business channel only

### Whatsapp Business Template Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
id | true | Must be String | ID of registered template
language_code | true | Must be String | Language code of registered template (`'en'`, `'ru'`, etc)
parameters | true | Must be Array | Template substitution parameters


## Request code (instagram only)

> Request challenge code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_variant=0"

# The above command returns JSON structured like this:

{
  "result": "ok"
}
```

> Request two factor authentication code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_type=two_factor"

# The above command returns JSON structured like this:

{
  "result": "ok"
}
```

This endpoint request challenge or two factor authentication code.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

### Query Parameters

#### Request challenge code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
challenge_variant | true | |

#### Request two factor SMS authentication code

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `instagram` |
challenge_type | true | Must be `two_factor` |

## Confirm code (instagram only)

> Confirm challenge code:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&confirmation_code=123456"

# The above command returns JSON structured like this.

# Successful response:

{
  "result": "ok"
}

# Two factor authentication required:

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

# Challenge required:

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

# The above command returns JSON structured like this:

{
  "result": "ok"
}
```

This endpoint submit challenge or two factor authentication code.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/confirm`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the channel

### Query Parameters

#### challenge code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
confirmation_code | true | Must be a String |

#### two factor authentication code

Parameter | Required | Validations | Description
--------- | -------- | ----------- |
provider | true | Must be `instagram` |
confirmation_type| true | Must be `two_factor` |
confirmation_variant | true | Must be a Integer | Variant from request code response (`data->details->value`). Typicaly 1, 2 or 3.
confirmation_code | true | Must be a String |
