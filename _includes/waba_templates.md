# Waba templates

A company with a whatsapp_business channel can have waba templates

## Get waba templates

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/waba_templates"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> returns JSON structured like this:

```json
{
   "status":"ok",
   "data":{
      "waba_templates":[
        {
          "id": 321,
          "company_id": 123,
          "name": "template_name",
          "waba_id": "template_id",
          "body": "Здравствуйте, {{1}}",
          "substitutions_count": 2
        }
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/waba_templates`

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
