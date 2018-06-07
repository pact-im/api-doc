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

```json
{
   "status":"created",
   "data":{
      "external_id":1
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

Parameter | Required | Validations |
--------- | -------- | ----------- |
provider | true | Must be `whatsapp`

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

```json
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

```json
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

## How to write first message in whatsapp

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&text=message"
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
message | true | Must be String | Message text

