# Conversations

## Get All Conversations

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "conversations":[
         {
            "external_id":1,
            "name":"Friend",
            "channel_id":1,
            "channel_type":"whatsapp",
            "created_at":"2017-04-25T18:30:23.076Z",
            "avatar":"/avatars/original/missing.png",
            "sender_external_id":"79260000001",
            "meta":{

            }
         }
      ]
   }
}
```

This endpoint returns ALL company conversations.

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company

## Create new conversation

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=whatsapp&phone=79250000001"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "conversation":{
         "external_id":1,
         "name":"79250000001",
         "channel_id":1,
         "channel_type":"whatsapp",
         "created_at":"2017-11-11T10:17:10.655Z",
         "avatar":"/avatars/original/missing.png",
         "sender_external_id":"79250000001",
         "meta":{

         }
      }
   }
}
```

This endpoint create a new conversation in the company whatsapp channel. But this operation doesn't garantee future delivery messages to this contact.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp` | Shows what you want to create new conversation in the whatsapp channel
phone | true | Must be in format `79250000001` | Contact phone number

## Get conversation details

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/conversations/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "conversation":{
         "external_id":1,
         "name":"79250000001",
         "channel_id":1,
         "channel_type":"whatsapp",
         "created_at":"2017-11-11T10:17:10.655Z",
         "avatar":"/avatars/original/missing.png",
         "sender_external_id":"79250000001",
         "meta":{

         }
      }
   }
}
```

This endpoint return information about exist conversations in the company.

### HTTP Request

`GEt https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
ID | The ID of the conversation
