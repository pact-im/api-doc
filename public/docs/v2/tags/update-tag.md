---
title: "Обновить тег"
description: "Изменяет название, цвет или позицию тега"
section: "v2"
---

Изменяет переданные свойства тега.

## HTTP Request

`PATCH https://api.pact.im/api/p2/tags/<TAG_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
TAG_ID | ID тега

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
title | нет | String, до 30 символов | Новое название тега
color | нет | Один из цветов [объекта tag](/v2/tags#tag-object) | Новый цвет тега
position | нет | Integer | Новая позиция в каталоге

## Пример

### Запрос

```shell
curl -X PATCH 'https://api.pact.im/api/p2/tags/42' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "position": 2
  }'
```

### Ответ

```json
{
  "tag": {
    "id": 42,
    "title": "VIP",
    "color": "purple",
    "position": 2,
    "created_at": "2026-11-19T12:00:00.000Z",
    "updated_at": "2026-11-19T12:05:00.000Z"
  }
}
```
