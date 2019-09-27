# Service messages

## Send message

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/service_messages"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&short_text=hi&long_text=hello"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
     "id": 42,
     "company_id": 154
   }
}
```

### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/service_messages`

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
phone | true | Must be in format 79250000001 | Recipient phone number
short_message | true | Must be a String | Short message text
long_message | true | Must be a String | Long message text
