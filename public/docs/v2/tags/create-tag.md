---
title: "Создать тег"
description: "Создаёт тег в каталоге владельца аккаунта"
section: "v2"
---

Создаёт новый тег. Если `color` не передан, используется `blue`.

## HTTP Request

`POST https://api.pact.im/api/p2/tags`

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
title | да | String, до 30 символов | Название тега
color | нет | Один из цветов [объекта tag](/v2/tags#tag-object) | Цвет тега, по умолчанию `blue`

## Пример

### Запрос

```shell
curl -X POST 'https://api.pact.im/api/p2/tags' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "title": "VIP",
    "color": "purple"
  }'
```

### Ответ

```json
{
  "tag": {
    "id": 42,
    "title": "VIP",
    "color": "purple",
    "position": 1,
    "created_at": "2026-11-19T12:00:00.000Z",
    "updated_at": "2026-11-19T12:00:00.000Z"
  }
}
```
