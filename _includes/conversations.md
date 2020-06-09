# Conversations

Conversation represents dialogue between you and the client. Currently only 1-1 conversations are supported.
Each conversation has many messages.

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
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

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

This endpoint creates conversation in the company using whatsapp channel.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp` | Shows what you want to create new conversation in the whatsapp channel
phone | true | Must be in format `79250000001` | Contact phone number

## Get conversation details

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/conversations/ID"
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


### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation


## Update assignee for conversation

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/conversations/<ID>/assign"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "assignee_id=42"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "conversation":{
         "external_id":1,
      }
   }
}
```

This endpoint update assignee of conversation in the company using whatsapp channel.

### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>/assign`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
assignee_id | false | Must be an integer | User id
