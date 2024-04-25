## Conversations

Conversation represents dialogue between you and the client. Currently only 1-1 conversations are supported.
Each conversation has many messages.

### Get All Conversations

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
 * Gets all conversations
 * @link https://pact-im.github.io/api-doc/#get-all-conversations
 *
 * @param int id of the company
 * @param string Next page token geted from last request.
 * Not valid or empty token return first page
 * @param int Number of elements per page. Min 1, max 100, default: 50
 * @param string Change sorting direction. Available values: asc, desc. Default: asc.
 * @return Json|null
 */

// Get conversations:

$client->conversations->getConversations($companyId);

// Get conversations with parameters:

$client->conversations->getConversations(
  $companyId,
  $from,
  $per,
  $sort
);
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
            "created_at_timestamp":1603119600,
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

#### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

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

### Create new conversation

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=whatsapp&phone=79250000001"
```

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal&username=testuser&text=Hello"
```

```php
<?php

/**
 * Creates new conversation
 * This endpoint creates conversation in the company
 * @link https://pact-im.github.io/api-doc/#create-new-conversation
 *
 * @param int id of the company
 * @param string conversation provider (e.g. "whatsapp")
 * @param array provider related params (e.g. for whatsapp is ["phone": "<phonenum>"])
 * @return Json|null
 */

$providerParams = [
  'phone' => $phone
];

$client->conversations->createConversation(
  $companyId,
  $provider,
  $providerParams
);
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
         "created_at_timestamp":1603119600,
         "avatar":"/avatars/original/missing.png",
         "sender_external_id":"79250000001",
         "meta":{

         }
      }
   }
}
```

This endpoint creates conversation in the company using whatsapp channel.

<aside class="notice">
If you have a `whatsapp_business` provider, use a different method to create conversation using a template
</aside>
[Create first message for whatsapp business provider](#how-to-write-first-message-to-whatsapp-business)

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

#### Query Parameters for `whatsapp` channel

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `whatsapp` | Shows what you want to create new conversation in the whatsapp channel
phone | true | Must be in format `79250000001` | Contact phone number

#### Query Parameters for `telegram_personal` channel

<aside class="notice">
You must use only one parameter: `phone` or `username`
</aside>


Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
provider | true | Must be `telegram_personal` | Shows what you want to create new conversation
phone | true | Must be in format `79250000001` | Contact phone number
username | true | String | Username
text | true | String | Message text
send_to_crm | false | boolean | Sync initializing message to CRM integrations. Default: `true`

### Update note for conversation

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/conversations/<ID>/note"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "note=your+note"
```

> The above command returns JSON structured like this:

```json
{
   "status":"updated"
}
```

This endpoint update note of conversation in the company.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>/note`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
CONVERSATION_ID | ID of the conversation

#### Body Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
note | true | Must be String | Note text

### Get conversation details

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/conversations/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
 * Retrives conversation details from server
 * @link https://pact-im.github.io/api-doc/#get-conversation-details
 *
 * @param int id of company
 * @param int id of conversation
 * @return Json|null
 */

$client->conversations->getDetails($companyId, $conversationId)
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
         "created_at_timestamp":1603119600,
         "avatar":"/avatars/original/missing.png",
         "sender_external_id":"79250000001",
         "meta":{

         }
      }
   }
}
```


#### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation


### Update assignee for conversation

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/conversations/<ID>/assign"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "assignee_id=42"
```

```php
<?php

/**
 * Update assignee for conversation
 * This endpoint update assignee of conversation in the company using whatsapp channel
 * @link https://pact-im.github.io/api-doc/#update-assignee-for-conversation
 *
 * @param int id of company
 * @param int id of conversation
 * @param int id of user
 * @return Json|null
 */

$client->conversations->updateAssignee(
  $companyId,
  $conversationId,
  $assigneeId
);
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

This endpoint update assignee the pact user to the conversation in the company.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>/assign`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
assignee_id | false | Must be an integer | User id

### Toggle bitrix block openlines

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/conversations/<ID>/toggle_bitrix_block_openlines"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "enabled=true"
```
> The above command returns JSON structured like this:

```json
{
  "status": "ok",
  "data": {
    "conversation": {
      "external_id": 91,
      "name": "Mikhail Tabunov",
      "channel_id": null,
      "channel_type": "whatsapp",
      "created_at": "2021-12-09T06:08:50.106Z",
      "created_at_timestamp": 1639030130,
      "avatar": "https://api.pact.im/avatars/original/missing.png",
      "sender_external_id": "79770000011",
      "meta": {},
      "last_message_at": 1639030130,
      "last_income_message_at": 0,
      "bitrix_block_openlines": true
    }
  }
}
```

This endpoint toggle bitrix_block_openlines param to the conversation in the company.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>/toggle_bitrix_block_openlines`

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
enabled | false | Must be a boolean | Enabled status

### Upload attachment for message

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data": {
      "conversation": {
         "external_id": 1,
      }
   }
}
```

#### URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
ID | ID of the conversation

#### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- |---------| -----------
file | false | Must be a file | Uploaded file
file_url | false | Must be a file url | File url
push_to_talk | false | Boolean | To send audio files as voice messages

<aside class="notice">
Whatsapp requires using this method with existing whatsapp business template
</aside>

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/conversations/<ID>/messages/attachments`

#### Code example

```php
<?php

/**
 * Сreates an attachment which can be sent in message
 * @link https://pact-im.github.io/api-doc/#upload-attachments
 *
 * @param int id of the company
 * @param int id of the conversation
 * @param Resource|StreamInterface|string file to upload
 * @return Json|null
 */

// Example with file on local:

$file_path = realpath('image.png');
$response_attach = $client->attachments->uploadAttachment($company, $conversation, $file_path);
$messages = $client->messages->sendMessage(
  $company,
  $conversation,
  $msg,
  [
    $response_attach->data->external_id
  ]
);

// Example with file url:

$file_url = 'https://en.wikipedia.org/wiki/Altai_Republic#/media/File:Katun.jpg';
$response_attach = $client->attachments->uploadAttachment($company, $conversation, $file_url);
$messages = $client->messages->sendMessage(
  $company,
  $conversation,
  $msg,
  [
    $response_attach->data->external_id
  ]
);

// Example with both variants:

$file_path = realpath('image.png');
$response_attach_1 = $client->attachments->uploadAttachment($company, $conversation, $file_path);

$file_url = 'https://en.wikipedia.org/wiki/Altai_Republic#/media/File:Katun.jpg';
$response_attach_2 = $client->attachments->uploadAttachment($company, $conversation, $file_url);

$messages = $client->messages->sendMessage(
  $company,
  $conversation,
  $msg,
  [
    $response_attach_1->data->external_id,
    $response_attach_2->data->external_id
  ]
);
```
