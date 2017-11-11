# Companies

<aside class="notice">
Each user has at least one company after registration. This company was created automatically.
</aside>

## Get All Companies

```shell
curl "https://api.pact.im/p1/companies"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "companies":[
         {
            "external_id":1,
            "name":"COMPANY_NAME",
            "phone":null,
            "description":null,
            "webhook_url":null
         }
      ]
   }
}
```

This endpoint return list of all user companies.

### HTTP Request

`GET https://api.pact.im/p1/companies`

## Update company

```shell
curl -X PUT "https://api.pact.im/p1/companies/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "name=Test"
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

This endpoint updates an exist user company.

### HTTP Request

`PUT https://api.pact.im/p1/companies/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the company for update

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
name | false | Must be a String not more than 255 symbols | Company name
phone | false | Must be a String | Official company phone number or phone number of contact person
description | false | Must be a String | Company description
webhook_url | false | Must be a String | Endpoint in the Internet which can receive webhooks

<aside class="notice">
You will not receive important webhooks while without <code>webhook_url</code>.
If you want to receive <code>webhooks</code> make sure what <code>webhook_url</code> was added
</aside>


## Create new company

<aside class="notice">
This endpoint doesn't make sense for you if you're not a partner
</aside>

```shell
curl -X POST "https://api.pact.im/p1/companies"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "name=Test"
```

> The above command returns JSON structured like this:

```json
{
   "status":"created",
   "data":{
      "external_id":2
   }
}
```

This endpoint creates a new company for user.

### HTTP Request

`POST https://api.pact.im/p1/companies`

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
name | true | Must be a String not more than 255 symbols | Company name
phone | false | Must be a String | Official company phone number or phone number of contact person
description | false | Must be a String | Company description
webhook_url | false | Must be a String | Endpoint in the Internet which can receive webhooks

<aside class="notice">
You will not receive important webhooks while without <code>webhook_url</code>.
If you want to receive <code>webhooks</code> make sure what <code>webhook_url</code> was added
</aside>
