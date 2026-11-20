---
title: "Удалить тег"
description: "Удаляет тег или заменяет его другим тегом"
section: "v2"
---

Удаляет тег из каталога. Если передать `replacement_tag_id`, назначенные удаляемому тегу диалоги будут переведены на указанный тег, после чего исходный тег будет удалён. Замена выполняется в фоне.

Без `replacement_tag_id` связи тега с диалогами удаляются вместе с тегом.

## HTTP Request

`DELETE https://api.pact.im/api/p2/tags/<TAG_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
TAG_ID | ID удаляемого тега

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
replacement_tag_id | нет | Integer | ID тега на замену. Не может совпадать с `TAG_ID`

## Пример

### Запрос

```shell
curl -X DELETE 'https://api.pact.im/api/p2/tags/42' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "replacement_tag_id": 43
  }'
```

### Ответ

`200 OK` с пустым объектом.

```json
{}
```
