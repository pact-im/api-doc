# Waba templates

A company with a whatsapp_business channel can have waba templates

## Get waba templates

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/waba_templates"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
  * Gets WhatsApp Business templates
  * @link https://pact-im.github.io/api-doc/#waba-templates
  *
  * @param int id of the company
  * @param string Next page token geted from last request.
  * Not valid or empty token return first page
  * @param int Number of elements per page. Min 1, max 100, default: 50
  * @param string Change sorting direction. Available values: asc, desc. Default: asc.
  * @return Json|null
  */

# Simple request

$client->companies->getWabaTemplates(
  $companyId
);

# Pagination

$client->companies->getWabaTemplates(
  $companyId,
  $from,
  $per,
  $sort
);
```

> returns JSON structured like this:

```json
{
  "status":"ok",
  "data":{
    "waba_templates":[
      {
        "id":7754,
        "company_id":72562,
        "name":"Шаблон с переменной",
        "waba_id":"1_shablon_kakoito",
        "body":"Тестовый шаблон с какой то переменной {% raw %}{{1}}{% endraw %}",
        "substitutions_count":1,
        "position":7754
      }
    ]
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
