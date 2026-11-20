---
title: "Получить каталог тегов"
description: "Возвращает теги владельца аккаунта"
section: "v2"
---

Возвращает постраничный каталог тегов владельца аккаунта.

## HTTP Request

`GET https://api.pact.im/api/p2/tags`

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | String | Ваш private API token
page | нет | Integer | Номер страницы
per_page | нет | Integer | Количество тегов на странице
sort[position] | нет | `asc` или `desc` | Направление сортировки по позиции

## Пример

### Запрос

```shell
curl 'https://api.pact.im/api/p2/tags?private_api_token=YOUR_API_TOKEN&sort[position]=asc'
```

### Ответ

```json
{
  "tags": [
    {
      "id": 42,
      "title": "VIP",
      "color": "purple",
      "position": 1,
      "created_at": "2026-11-19T12:00:00.000Z",
      "updated_at": "2026-11-19T12:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 150
  }
}
```
