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
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

This endpoint return list of all user companies.

### HTTP Request

`GET https://api.pact.im/p1/companies`

### Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
from | false | Must be a String not more than 255 symbols | Next page token geted from last request. Not valid or empty token return first page
per | false | Must be a number between 1 and 100 | Number of elements per page. Default: 50
sort_direction | false | Must be a String | We sort results by id. Change sorting direction. Avilable values: asc, desc. Default: asc.

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
If you want to receive <code>webhooks</code> make sure that <code>webhook_url</code> is present. Webhook url must be valid and response code on <code>POST</code> json-request <code>{'source':'pact.im', 'operation':'test'}</code> must be 200
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
If you want to receive <code>webhooks</code> make sure that <code>webhook_url</code> is present. Webhook url must be valid and response code on <code>POST</code> json-request <code>{'source':'pact.im', 'operation':'test'}</code> must be 200
</aside>
