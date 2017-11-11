# Channels

In order to receive and send messages, you need to connect channels.

You can connect the channels either via our web interface on the [settings page](https://app.pact.im/project_settings/channels) or using the API.

<aside class="warning">
You must accept webhook's if you want to connect channels via API.
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
      ]
   }
}
```

This endpoint returns all the company channels.

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company

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
Possible to connect only one channel to one company from each provider.
Contact with support if you want to use more than one channel
</aside>

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company

### Query Parameters

#### Create whatsapp channel

Parameter | Required | Validations |
--------- | -------- | ----------- |
provider | true | Must be `whatsapp`

<aside class="notice">
After this operation you'll recieve QR-code webhook on company webhook_url. You need to scan this QR-code on mobile device.
If you can't do this - try to connect Whatsapp via our web interface.
</aside>

#### Create instagram channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `instagram` | Shows what you want to connect to Instagram
login | true | Must be a String | Instagram account login
password | true | Must be a String | Instagram account passowrd. We don't save password as a plain text and can't access to password in the future

<aside class="notice">
After this operation you might be need to confirm access. Check instagram application after success connect and allow access if instagram asks.
</aside>

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

This endpoint updates exist channels in the company.

### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
ID | The ID of the channel which should be updated

### Query Parameters

#### For instagram channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
login | true | Must be a String | Instagram account login
password | true | Must be a String | Instagram account passowrd. We don't save password as a plain text and can't access to password in the future

#### For facebook/vkontakte/telegram/viber channels

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
token | true | Must be a String | ...

## Disable channel

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

This endpoint disable exist channels in the company.

### HTTP Request

`DELETE https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
ID | The ID of the channel for disable

## Write first in whatsapp

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

This endpoint provide an ability to write first in whatsapp channel.

When you send this request will be added a job for delivering your message. When operation finished we send webhooks with information about this operation.

You can check operation result manually. Pleas, look to [Jobs](#jobs)

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/conversations`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
ID | The ID of the whatsapp channel

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
phone | true | Must be in format `79250000001` | Contact phone number
text | true | Must be String | Message text
