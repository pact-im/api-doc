# Billing

## Account Information

```shell
curl "https://api.pact.im/p1/billing"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> The above command returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "date":1510393996,
      "details":[
         {
            "channel":{
               "id":1,
               "type":"whatsapp",
               "created":1501783168
            },
            "company":{
               "id":1,
               "name":"Company name",
               "created":1501783103
            },
            "cost":10000
         }
      ],
      "total_cost":10000
   }
}
```

These endpoints are designed to provide information on the cost of using the API.

Response contains information about which channels you used and how much it costs for you.

<aside class="warning">
This endpoint is intended for partners and will NOT be used by other companies.
</aside>

### HTTP Request

`GET https://api.pact.im/p1/billing`

<aside class="notice">
Response contains information ONLY for <code>current month</code>. Contact with support if you need a historical data.
</aside>
