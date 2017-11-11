# Webhooks

## New conversation

> The above command returns JSON structured like this:

```json
{
   "type":"conversation",
   "event":"new",
   "data":{
      "external_id":1,
      "name":"Sender Name",
      "channel_id":1,
      "channel_type":"whatsapp",
      "created_at":"2017-11-11 12:45:53 UTC",
      "last_message_at":null,
      "last_income_message_at":null
   }
}

```

### When

 - Client sent to you new message first time.
 - You sent message to new client. Message was delivered, conversation was created.

## New message

> The above command returns JSON structured like this:

```json
{
   "type":"message",
   "event":"new",
   "data":{
      "external_id":1,
      "channel_id":1,
      "channel_type":"whatsapp",
      "channel":{
        "id": 1,
        "type": "whatsapp"
      },
      "conversation_id":1,
      "message":"Message body",
      "income":true,
      "created_at":"2017-11-11 12:45:53 UTC",
      "ack":1,
      "attachments":[],
      "job_id":1
   }
}

```

### When

 - Client sent to you new message.
 - You sent message to client.

<aside class="success">
Webhook can be sent ONLY when message received/delivered.
</aside>

<aside class="notice">
<code>job_id</code> attribute will be available only if message was sent in async mode.
</aside>

## Message delivery/read status

> The above command returns JSON structured like this:

```json
{
    "type": "message",
    "event": "ack",
    "data": {
        "external_id": 1,
        "channel": {
            "id": 1,
            "type": "whatsapp"
        },
        "conversation_id": 1,
        "ack": 3
    }
}

```

### When

 - Message delivery/read status was changed.

Possible statuses:

  - `-1` : Message are in preparing to deliver state
  - ` 0` : Message are in delivering state
  - ` 1` : Message was sent
  - ` 2` : Message was delivered
  - ` 3` : Message was read

If message in a `-1` state - message may not be delivered. You must to care about message delivering by yourself.

## Job executed

> The above command returns JSON structured like this:

```json
{
   "type":"job",
   "event":"executed",
   "data":{
      "id":1,
      "result":"DELIVERED",
      "message_id":1,
      "date":1510404738
   }
}

```

### When

 - You sent message in async mode. When message delivery job was executed we'll notice you.

Possible results:

  - `DELIVERED`
  - `NOT DELIVERED`

If message is `NOT DELIVERED` we append `reason` filed with reason information.

## Whatsapp: new QR-code

> The above command returns JSON structured like this:

```json
{
   "type":"qr_code",
   "event":"new",
   "company_id":1,
   "channel_id":1,
   "data":"BASE64 QR-CODE image string"
}

```

### When

  - You started enabling a `whatsapp` channel in your company
  - Connection was removed via mobile application interface

## Whatsapp: channel authorized

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"information",
   "data":{
      "message":"authorized",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

QR-code was scanned successful

## Whatsapp: phone offline

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone offline",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

Device with Whatsapp application gone into `offline` by any reason. We can't continue work with whatsapp while phone is offline. You need to resolve this issue if you want to use an integration.

## Whatsapp: phone online

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone offline",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

Device with Whatsapp application was returned back to `online`.

## Whatsapp: channel not awailable

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"unawailable",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

Someone started session at [web.whatsapp.com](https://web.whatsapp.com) or user similar integration.

## Whatsapp: trying to resume channel work

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"trying_resume_work",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

We're trying to resume work after previous conflict state

## Whatsapp: synchronization completed

> The above command returns JSON structured like this:

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"synchronized",
      "date":"2017-11-11 12:45:53 UTC",
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}

```

### When

  - Whatsapp channel was connected and syncronisation was completed
  - Syncronisation after work resuming
