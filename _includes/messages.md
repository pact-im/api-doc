# Messages

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
      ]
   }
}
```

This endpoint retrieves all messages from the conversation.

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
CONVERSATION_ID | The ID of the conversation

## Send message

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations/CONVERSATION_ID/messages"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "message=hello"
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

This endpoint add new message to the conversation. This message will be delivered to the End client.

Message was delivered synchronously if you received a response with not null `message_id`. You'll receive a webhook with delivery status if it wasn't happened. It means what was added a job for delivering your message.

You can check operation result manually. Pleas, look to [Jobs](#jobs)

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
CONVERSATION_ID | The ID of the conversation

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
message | true | Must be String | Message text
attachments_ids | false | Must be an Array with attachments ids | IDs of attachment which was previously uploaded (if you want send message with attachments).

<aside class="notice">
Send message with attachment is an experimental feature.
Sending messages without attachment works perfect
</aside>

## Upload attachments for message

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

This endpoint creates an attachment which can be sent into conversation.

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<CONVERSATION_ID>/messages/attachments`

### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | The ID of the company
CONVERSATION_ID | The ID of the conversation

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
file | true | Must be a File | Attachment file

<aside class="notice">
It's an experimental feature
</aside>
