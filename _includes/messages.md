# Messages

Each message belongs to conversation. Message fields:

* id (Integer)
* channel_type (String) – whatsapp, instagram, etc..
* message (String) – message body
* income (Boolean) – whether message is income or outcome


## Get conversation messages

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/conversations/CONVERSATION_ID/messages"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "messages":[
         {
            "external_id":47098,
            "channel_id":381,
            "channel_type":"whatsapp",
            "message":"Hello",
            "income":false,
            "created_at":"2017-09-17T12:44:28.000Z",
            "attachments":[

            ]
         }
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages`

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
from | false | Must be a String not more than 255 symbols | Next page token geted from last request. Not valid or empty token return first page
per | false | Must be a number between 1 and 100 | Number of elements per page. Default: 50
sort_direction | false | Must be a String | We sort results by created_at. Change sorting direction. Avilable values: asc, desc. Default: asc.

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
CONVERSATION_ID | ID of the conversation

## Send message

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations/CONVERSATION_ID/messages"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "message=hello&attachments_ids[]=attachment_id"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "id":18,
      "company_id":154,
      "channel":{
         "id":399,
         "type":"whatsapp"
      },
      "conversation_id":8741,
      "state":"trying_deliver",
      "message_id":null,
      "details":null,
      "created_at":1510396057
   }
}
```

This endpoint delivers message to the client under specified
conversation.

There are two delivery modes: *synchronous* and *asyncronous*.
If `message_id` field in response is null or empty – it means asyncronous delivery.

You'll receive a webhook with the delivery status if delivery is async.

You can check operation result manually here: [Jobs](#jobs)

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
CONVERSATION_ID | ID of the conversation

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
message | false | Must be String | Message text
attachments_ids | false | Must be an Array with attachments ids | IDs of previously uploaded attachments.

**Important**: Some messengers support only text or only attachment in one message. For example, whatsapp allows to attach a caption for an image but not allows to attach a caption to a PDF document.

## Upload attachments

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations/CONVERSATION_ID/messages/attachments"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -F "file=@path/to/local/file"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "external_id":1
   }
}
```

This endpoint creates an attachment which can be sent in message.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages/attachments`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
CONVERSATION_ID | ID of the conversation

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
file | false | Must be a File. Mutually exclusive with `file_url` | Attachment file
file_url | false | Must be a url (http or https). mutually exclusive with `file` | Attachment file url

<aside class="notice">
You can use only one parameter: 'file' or 'file_url'. You can`t use both parameters together.
</aside>
