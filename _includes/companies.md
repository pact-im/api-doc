# Companies

<aside class="notice">
Each user has many companies. Each user must have at least one company
in the system.
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
   }y after registration. 
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

This endpoint updates specific company attributes.

### HTTP Request

`PUT https://api.pact.im/p1/companies/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | ID of the company for update

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
name | false | Must be a String not more than 255 symbols | Company name
phone | false | Must be a String | Official company phone number or phone number of contact person
description | false | Must be a String | Company description
webhook_url | false | Must be a String | Endpoint for webhooks

<aside class="notice">
If you want to receive <code>webhooks</code> make sure that <code>webhook_url</code> is present
</aside>


## Create new company


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
If you want to receive <code>webhooks</code> make sure that <code>webhook_url</code> is present
</aside>
