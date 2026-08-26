---
title: "Компании"
description: "Управление компаниями в API Pact v1"
section: "v1"
---

## Компании

> **Note:** У каждого пользователя может быть несколько компаний. У каждого пользователя должна быть хотя бы одна компания в системе.

### Получить все компании

```shell
curl "https://api.pact.im/p1/companies"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
 * This method return list of all user companies
 * @link https://pact-im.github.io/api-doc//docs/v1/companies
 *
 * @param string $from Next page token geted from last request.
 *               Not valid or empty token return first page
 * @param int $per Number of elements per page. Default: 50
 * @param string $sort Change sorting direction. Available values: asc, desc. Default: asc.
 * @return Json|null
 */

// Get companies without params

$client->companies->getCompanies();

// Get companies with params

$client->companies->getCompanies($from, $per, $sort)
```

> Приведённая выше команда возвращает JSON следующей структуры:

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

Этот эндпоинт возвращает список всех компаний пользователя.

#### HTTP Request

`GET https://api.pact.im/p1/companies`

#### Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
from | нет | Строка не длиннее 255 символов | Токен следующей страницы, полученный в предыдущем запросе. Если токен неверный или пустой, возвращается первая страница
per | нет | Число от 1 до 100 | Количество элементов на странице. По умолчанию: 50
sort_direction | нет | Строка | Результаты сортируются по id. Позволяет изменить направление сортировки. Допустимые значения: asc, desc. По умолчанию: asc.

### Обновить компанию

```shell
curl -X PUT "https://api.pact.im/p1/companies/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "name=Test"
```

```php
<?php

/**
  * This method updates specific company attributes
  * @link https://pact-im.github.io/api-doc/#get-all-companies
  *
  * @param int $companyId Id of the company for update
  * @param string $name Company name
  * @param string $phone Official company phone number of contact person
  * @param string $description Company description
  * @param string $webhook_url Endpoint for webhooks
  * @return Json|null
  */

$client->companies->updateCompany($companyId,
                                  $name,
                                  $phone,
                                  $description,
                                  $webhook_url);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "status":"updated",
   "data":{
      "external_id":2
   }
}
```

Этот эндпоинт обновляет отдельные атрибуты компании.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<ID>`

#### Параметры URL

Параметр | Описание
--------- | -----------
ID | ID обновляемой компании

#### Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
name | нет | Строка не длиннее 255 символов | Название компании
phone | нет | Строка | Официальный телефон компании или телефон контактного лица
description | нет | Строка | Описание компании
webhook_url | нет | Строка | Адрес для приёма вебхуков
hidden | нет | Логическое значение | Скрыть/показать компанию в веб-интерфейсе Pact

> **Note:** Если вы хотите получать `вебхуки`, убедитесь, что указан `webhook_url`. URL вебхука должен быть корректным, а код ответа на `POST` json-запрос `{'source':'pact.im', 'operation':'test'}` должен быть 200

### Создать новую компанию

```shell
curl -X POST "https://api.pact.im/p1/companies"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "name=Test"
```

```php
<?php

/**
 * This method creates a new company for user
 * @link https://pact-im.github.io/api-doc/#update-company
 *
 * @param string $name Company name
 * @param string $phone Official company phone number of contact person
 * @param string $description Company description
 * @param string $webhook_url Endpoint for webhooks
 * @return Json|null
 */

$client->companies->createCompany($name,
                                  $phone,
                                  $description,
                                  $webhook_url);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "status":"created",
   "data":{
      "external_id":2
   }
}
```

Этот эндпоинт создаёт новую компанию для пользователя.

#### HTTP Request

`POST https://api.pact.im/p1/companies`

#### Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
name | да | Строка не длиннее 255 символов | Название компании
phone | нет | Строка | Официальный телефон компании или телефон контактного лица
description | нет | Строка | Описание компании
webhook_url | нет | Строка | Доступный в интернете адрес, который может принимать вебхуки

> **Note:** Если вы хотите получать `вебхуки`, убедитесь, что указан `webhook_url`. URL вебхука должен быть корректным, а код ответа на `POST` json-запрос `{'source':'pact.im', 'operation':'test'}` должен быть 200
