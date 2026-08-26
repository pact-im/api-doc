---
title: "Каналы"
description: "Подключение каналов сообщений и управление ими"
section: "v1"
---

> **Warning:** **Каналы** API v1 будут отключены. Точная дата будет объявлена позднее в этом году. После отключения API Каналов v1 перестанет работать полностью — перейдите на [Каналы](/v2/auths) в API v2. См. [Переход с API v1 на API v2 для Каналов](/migrate-channels-to-auths).

## Каналы

Чтобы получать и отправлять сообщения, нужно подключить каналы.
Каналы — это источник входящих сообщений в системе. Провайдеры каналов:

* MAX
* WhatsApp
* Instagram_business
* Telegram
* Telegram Personal
* Viber
* VK
* Facebook

Нужные каналы также можно подключить через веб-интерфейс на [странице настроек](https://app.pact.im/project_settings/channels).

> **Note:** Для каждого провайдера можно подключить только один канал на компанию. Если нужно больше одного канала, обратитесь в поддержку

> **Warning:** Чтобы каналы работали в полном объёме, необходимо настроить вебхуки.

### Получить все каналы

```shell
curl "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

```php
<?php

/**
 * This method returns all the company channels.
 * @link https://pact-im.github.io/api-doc/#get-all-channels
 *
 * @param int $companyId Id of the company
 * @param string $from Next page token geted from last request. Not valid or empty token return first page
 * @param int $per Number of elements per page. Default: 50
 * @param string $sort Change sorting direction (sorting by id). Avilable values: asc, desc. Default: asc.
 */

$client->channels->getChannels($companyId,
                               $from,
                               $per,
                               $sort);

```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "status":"ok",
   "data":{
      "channels":[
         {
            "external_id":399,
            "provider":"whatsapp"
         }
      ],
      "next_page": "fslkfg2lkdfmlwkmlmw4of94wg34lfkm34lg"
   }
}
```

Этот эндпоинт возвращает все каналы компании.

#### HTTP Request

`GET https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

#### Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
from | нет | Строка не длиннее 255 символов | Токен следующей страницы, полученный в предыдущем запросе. Если токен неверный или пустой, возвращается первая страница
per | нет | Число от 1 до 100 | Количество элементов на странице. По умолчанию: 50
sort_direction | нет | Строка | Результаты сортируются по id. Позволяет изменить направление сортировки. Допустимые значения: asc, desc. По умолчанию: asc.

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

### Создать новый канал

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram&token=12345677890"
```

> Создание канала:

```php
<?php

/**
 * Unified method that can create channel in company.
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 * @note You can connect only one channel per one company for each provider.
 *       Contact with support if you want to use more than one channel
 *
 * @param int $companyId Id of the company
 * @param string $provider
 * @param array $parameters
 */

// # Create channel unified method
// Note: The array of parameters variables depending on the provider
//       You need add required parameters for your particular provider

$parameters = [
  'sync_messages_from' => $syncMessagesFrom
  // ...
];

$client->channels->createChannelUnified($companyId,
                                        $provider,
                                        $parameters);

```

> Создание канала whatsapp:

```php
<?php

/**
 * This method create a new channel for WhatsApp
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 *
 * @param int $companyId Id of the company
 * @param DateTimeInterface $syncMessagesFrom Only messages created after will be synchronized
 * @param bool $doNotMarkAsRead Do not mark chats as read after synchronization
 * @return Json|null
 */

$client->channels->createChannelWhatsApp(
  $companyId,
  $syncMessagesFrom,
  $doNotMarkAsRead,
  $phone
);
```

> Создание канала instagram business:

```php
<?php

/**
 * This method create a new channel for InstagramBusiness
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 *
 * @param int $companyId Id of the company
 * @param string $private_api_token on our side
 * @param string $provider there must be "instagram_business"
 * @param hash $data data from Instagram
 * @param string $token from Instagram data hash
 * @param string $phone user phone
 * @return Json|null
 */

$client->channels->createChannelInstagramBusiness(
  $companyId,
  $private_api_token,
  $provider,
  $data,
  $token
  $phone
);
```

> Создание канала facebook/vkontakte/vkontakte_direct/telegram/viber

```php
<?php

/**
 * This method create a new channel in the company using token.
 * @link https://pact-im.github.io/api-doc/#create-new-channel
 * @note List of supported channels that can be created by token
 *       you can see in link above
 *
 * @param int $companyId Id of the company
 * @param string $provider (facebook, viber, vk, ...)
 * @param string $token
 * @return Json|null
 */

$client->channels->createChannelByToken(
  $companyId,
  $provider,
  $token
);

```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "status": "created",
   "data": {
      "external_id": 1
   }
}
```

Этот эндпоинт создаёт новый канал в компании.

> **Note:** Для каждого провайдера можно подключить только один канал на компанию. Если нужно больше одного канала, обратитесь в поддержку

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании

#### Параметры запроса

##### Создание канала max (по QR-коду)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `max`
sync_messages_from | нет | timestamp | Будут синхронизированы только сообщения, созданные после `sync_messages_from`. Не старше одного месяца. Если параметр не указан, сообщения синхронизироваться не будут.

> **Note:** После этого действия вы получите вебхук с QR-кодом. Этот QR-код нужно отсканировать на мобильном устройстве, чтобы авторизовать Pact.im. Если сделать это не получается, попробуйте подключить max через наш веб-интерфейс.

##### Создание канала whatsapp (по QR-коду)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `whatsapp`
sync_messages_from | нет | timestamp | Будут синхронизированы только сообщения, созданные после `sync_messages_from`. Не старше одного месяца. Если параметр не указан, сообщения синхронизироваться не будут.

> **Note:** После этого действия вы получите вебхук с QR-кодом. Этот QR-код нужно отсканировать на мобильном устройстве, чтобы авторизовать Pact.im. Если сделать это не получается, попробуйте подключить Whatsapp через наш веб-интерфейс.

##### Создание канала whatsapp (по цифровому коду)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `whatsapp`
sync_messages_from | нет | timestamp | Будут синхронизированы только сообщения, созданные после `sync_messages_from`. Не старше одного месяца. Если параметр не указан, сообщения синхронизироваться не будут.
phone | да | string | Номер телефона. Пример: ‘7999999999’

> **Note:** После создания канала WhatsApp мы отправим код подтверждения (эндпоинт «Request code»). Этот код нужно ввести в приложении WhatsApp, чтобы завершить подключение.

##### Создание канала whatsapp business (dialog360 по токену)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `whatsapp_business` |
hosting_type | да | Должно быть `cloud` или `onpremise` | Тип хостинг-платформы
token | да | Строка | Токен для канала.
subtype | нет | Должно быть `regular`, `unlim` или `no_write_first` | Название тарифа

##### Создание канала whatsapp business (dialog360 по channel_id)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `whatsapp_business` |
hosting_type | да | Должно быть `cloud` или `onpremise` | Тип хостинг-платформы
dialog360_channel_id | да | Строка | channel_id для авторизации
dialog360_client_id | нет | Строка | client_id для авторизации
account_name | нет | Строка | Название аккаунта для профиля waba
subtype | нет | Должно быть `regular`, `unlim` или `no_write_first` | Название тарифа

##### Создание канала avito

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `avito` |
login | да | Строка | client_id из avito
password | да | Строка | client secret из avito

##### Создание канала instagram business

Шаги:
1. Необходимо следовать инструкции для Facebook, пока вы не получите [токен](https://developers.facebook.com/docs/instagram/business-login-for-instagram#step-3--capture-user-access-token).
2. Выполните запрос к `https://graph.facebook.com/v4.0/me?fields=first_name,last_name,picture,name,email`, указав токен.  
   В ответе вы получите информацию о вашем пользователе.

3. Отправьте запрос к нам на `p1/companies/<company_id>/channels`.  
   Тело запроса должно содержать:
   - provider: "instagram_business"
   - token: "token"
   - phone: "+79131112233"
   - data: "тело ответа из предыдущего запроса"

   На этом этапе канал создан, а информация о бизнес-аккаунтах Instagram загружена.

4. Отправьте запрос на `p1/companies/<company_id>/channels/<external_id>/enable_page_instagram?page_id=<page[:id]>&sync_period=<sync_period>`.

   `external_id` — параметр из предыдущего запроса  
   `page[:id]` — параметр из предыдущего запроса  
   `sync_period` — определяет, за какой период будут синхронизированы сообщения: day, week, month, all.

   Это необходимо, чтобы определить, какой аккаунт Instagram использовать.

Параметр | Обязательный | Валидация | Описание
--------- | -------- |--------| -----------
provider | да | Должно быть `instagram_business` |
private_api_token | да | Строка | Приватный токен пользователя
data | да | Хеш   | Данные из Instagram, переданные в redirect_url
phone | да | Строка | Телефон пользователя
token | да | Строка | Токен Instagram

##### Создание канала facebook/vkontakte/vkontakte_direct/telegram/viber

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Одно из значений: `facebook`, `vkontakte`, `vkontakte_direct`, `telegram`, `viber` | Указывает, какого провайдера вы хотите подключить
token | да | Строка | Токен для канала.

##### Создание канала telegram personal (по QR-коду)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `telegram_personal`
via_qr_code | да | boolean | Должно быть 'true'
sync_messages_from | нет | timestamp | Будут синхронизированы только сообщения, созданные после `sync_messages_from`. Не старше одного месяца. Если параметр не указан, сообщения синхронизироваться не будут.

> **Note:** После этого действия вы получите вебхук с QR-кодом. Этот QR-код нужно отсканировать на мобильном устройстве, чтобы авторизовать Pact.im. Если сделать это не получается, попробуйте подключить Telegram через наш веб-интерфейс.

##### Создание канала telegram personal (по цифровому коду)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `telegram_personal` |
phone | да | Строка | Номер телефона. Пример: '7999999999'
sync_messages_from | нет | timestamp | Будут синхронизированы только сообщения, созданные после `sync_messages_from`. Не старше одного месяца. Если параметр не указан, сообщения синхронизироваться не будут.

> **Note:** После создания канала telegram необходимо запросить код подтверждения (эндпоинт «Request Code»). Код придёт в приложение Telegram на вашем устройстве. Полученный код нужно отправить в эндпоинт «Confirm code»

[Запросить код](#запросить-код-telegram-personal) [Подтвердить код](#подтвердить-код-telegram-personal)

###### Как получить токен для группы VK:

1. Откройте раздел «Управление» в нужном сообществе
2. Откройте «Работа с API» (https://vk.com/public<GROUP_ID>?act=tokens)
3. Создайте и скопируйте новый токен

### Обновить канал

```shell
curl -X PUT "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "token=9876543210"
```
> Обновление канала:

```php
<?php

/**
 * This method updates existing channel in the company
 * @link https://pact-im.github.io/api-doc/#update-channel
 *
 * @param int $companyId
 * @param int $conversationId
 * @param array $parameters
 * @return Json|null
 */

// # Update channel unified method
// Note: The array of parameters variables depending on the provider
//       You need add required parameters for your particular provider

$parameters = [
  'login' => $login,
  'password' => $password,
  // ...
];

$client->channels->updateChannel(
  $companyId,
  $conversationId,
  $parameters
);
```

> Обновление канала instagram:

```php
<?php

/**
 * This method updates instagramm channel
 * @link https://pact-im.github.io/api-doc/#update-channel
 *
 * @param int $companyId
 * @param int $conversationId
 * @param string $login Instagram login
 * @param string $password Instagram password
 * @return Json|null
 */

$client->channels->updateChannelInstagram(
  $companyId,
  $conversationId,
  $login,
  $password
);
```

> Обновление канала facebook/vkontakte/vkontakte_direct/telegram/viber:

```php
<?php

/**
 * This method updates channels that using tokens to auth
 * @link https://pact-im.github.io/api-doc/#update-channel
 * @note List of supported channels that can be created by token
 *       you can see in link above
 *
 * @param int $companyId
 * @param int $conversationId
 * @param string $token
 * @return Json|null
 */

$client->channels->updateChannelToken(
  $companyId,
  $conversationId,
  $token
);
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

Этот эндпоинт обновляет существующий канал в компании.

#### HTTP Request

`PUT https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

##### Для каналов facebook/vkontakte/vkontakte_direct/telegram/viber/instagram_business

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
token | да | Строка | ...

### Удалить канал

```shell
curl -X DELETE "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
```

> Удаление канала:

```php
<?php
/**
 * Method deletes (disables) the channel
 * @link https://pact-im.github.io/api-doc/#delete-channel
 *
 * @param int $companyId Id of the company
 * @param int $channelId Id of the conversation
 */

$client->chanells->deleteChannel($companyId, $channelId);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "status":"deleted"
}
```

#### HTTP Request

`DELETE https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID отключаемого канала

### Как написать первое сообщение в Whatsapp Business

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/conversations"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "phone=79250000001&template[id]=template_id&template[language_code]=ru&template[parameters][]=имя"
```

```php
<?php

/**
 * Send first message to whatsapp business
 * @link https://pact-im.github.io/api-doc/#how-to-write-first-message-to-whatsapp
 *
 * @param int $companyId Id of the company
 * @param int $channelId Id of the conversation
 * @param string $phone Phone number
 * @param string $message Message text
 */

$template = [
  'id' => $templateId,
  'language_code' => $templateLanguageCode,
  'parameters' => []
];

$client->channels->sendFirstWhatsAppMessage(
  $companyId,
  $channelId,
  $phone,
  $template
);
```

Этот эндпоинт позволяет создать диалог с клиентом в канале whatsapp.
При выполнении запроса мы добавим задачу на доставку. Когда операция завершится успешно или с ошибкой, мы отправим вебхук.

Статус доставки также можно опрашивать здесь: [Jobs](#jobs)

> **Note:** Whatsapp business требует использовать этот метод для отправки первого сообщения.

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/conversations`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
phone | да | Должен быть в формате `79250000001` | Номер телефона контакта
message | нет | Строка | Текст сообщения. Только для обычного канала Whatsapp
template | нет | Объект | Данные шаблона. Только для канала Whatsapp Business

#### Параметры шаблона Whatsapp Business

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
id | да | Строка | ID зарегистрированного шаблона
language_code | да | Строка | Код языка зарегистрированного шаблона (`'en'`, `'ru'` и т. д.)
parameters | да | Массив | Параметры подстановки в шаблон

### Запросить код (whatsapp)

> Запрос кода:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=whatsapp"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-whatsapp
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'whatsapp'
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
   "sessionId": "1426",
   "code": "ZHHJ-KQSP",
   "ttl": "160s"
}
```

В мобильном приложении WhatsApp вы получите уведомление с просьбой ввести код канала.
Введите там значение из поля "code"

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала
provider | whatsapp

#### Параметры запроса

##### Запрос кода проверки

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `whatsapp` |

### Запросить код (telegram personal)

> Запрос кода:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal'
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
  "code_length": 6,
  "code_type": "app",
  "expires_in": 60,
  "next_type": "app",
  "session_id": 1337,
  "status": "ok"
}
```

Этот эндпоинт запрашивает код для telegram personal

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

##### Запрос кода проверки

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `telegram_personal` |

### Подтвердить код (telegram personal)

> Тип подтверждения — code

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal&confirmation_type=code&code=2567"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal',
  'confirmation_type' => 'code',
  'code' => 2567
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Успешный ответ:

```json
{
  "result": "ok",
  "state": "enabled"
}
```

> Тип подтверждения — password

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=telegram_personal&confirmation_type=password&password=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-telegram-personal
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'provider' => 'telegram_personal',
  'confirmation_type' => 'password',
  'password' => 'qwerty123'
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
  "result": "ok",
  "state": "enabled"
}
```

Этот эндпоинт подтверждает канал telegram personal двумя способами: кодом или паролем

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/confirm`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

##### Тип подтверждения — code

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `telegram_personal` |
confirmation_type | да | Должно быть `code` |
code | да | Число | Пример: `1234`

##### Тип подтверждения — password

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `telegram_personal` |
confirmation_type | да | Должно быть `password` |
password | да | Строка | Пример: `qwerty123`

### Запросить код (только instagram)

> Запрос кода проверки:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_variant=0"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'challenge_variant' => $challengeVariant
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
  "result": "ok"
}
```

> Запрос кода двухфакторной аутентификации:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/request_code"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&challenge_type=two_factor"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#request-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'challenge_type' => $challengeType
];

$client->channels->requestChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
  "result": "ok"
}
```

Этот эндпоинт запрашивает код проверки или код двухфакторной аутентификации.

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/request_code`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

##### Запрос кода проверки

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `instagram` |
challenge_variant | да | |

##### Запрос кода двухфакторной аутентификации по SMS

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
provider | да | Должно быть `instagram` |
challenge_type | да | Должно быть `two_factor` |

### Подтвердить код (только instagram)

> Подтверждение кода проверки:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&confirmation_code=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'confirmation_code' => $confirmationCode
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры.

> Успешный ответ:

```json
{
  "result": "ok"
}
```

> Требуется двухфакторная аутентификация:

```json
{
  "result": "ok",
  "data": {
    "two_factor_requires": true,
    "details": [
      { "value": 1, "key": "sms" },
      { "value": 2, "key": "recovery_code" },
      { "value": 3, "key": "totp" }
    ]
  }
}
```

> Требуется проверка (challenge):

```json
{
  "result": "ok",
  "data": {
    "confirmation_requires": true,
    "details": [
      { "value" => 1, "label" => "e*******e@example.org" },
      { "value" => 0, "label" => "+0 *** ***-**-00" }
    ]
  }
}
```

> Подтверждение кода двухфакторной аутентификации:

```shell
curl -X POST "https://api.pact.im/p1/companies/COMPANY_ID/channels/ID/confirm"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"
  -d "provider=instagram&confirmation_type=two_factor&confirmation_variant=3&confirmation_code=123456"
```

```php
<?php

/**
 * @link https://pact-im.github.io/api-doc/#confirm-code-instagram-only
 *
 * @param int $companyId Id of the compnay
 * @param int $channelId Id of the channel
 * @param array $parameters
 * @return Json|null
 */

$parameters = [
  'confirmation_type' => $confirmationType,
  'confirmation_variant' => $confirmationVariant,
  'confirmation_code' => $confirmationCode
];

$client->channels->confirmChannelCode(
  $companyId,
  $channelId,
  $parameters
);
```

> Приведённая выше команда возвращает JSON следующей структуры:

```json
{
  "result": "ok"
}
```

Этот эндпоинт отправляет код проверки или код двухфакторной аутентификации.

#### HTTP Request

`POST https://api.pact.im/p1/companies/<COMPANY_ID>/channels/<ID>/confirm`

#### Параметры URL

Параметр | Описание
--------- | -----------
COMPANY_ID | ID компании
ID | ID канала

#### Параметры запроса

##### код проверки

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `instagram` |
confirmation_code | да | Строка |

##### код двухфакторной аутентификации

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- |
provider | да | Должно быть `instagram` |
confirmation_type| да | Должно быть `two_factor` |
confirmation_variant | да | Целое число | Вариант из ответа на запрос кода (`data->details->value`). Обычно 1, 2 или 3.
confirmation_code | да | Строка |
