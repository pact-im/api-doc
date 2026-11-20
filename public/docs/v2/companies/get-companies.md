---
title: "Получить список компаний"
description: "Возвращает постраничный список компаний пользователя"
section: "v2"
---

Возвращает список доступных пользователю компаний.

По умолчанию на странице возвращается 25 компаний. Подробнее о [пагинации](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/companies`

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
sort | нет | Должно быть объектом | Сортировка по `id`. Пример: `{"id": "asc"}`
page | нет | Должно быть целым числом | Номер страницы
per_page | нет | Должно быть целым числом | Количество компаний на странице (по умолчанию 25)

## Пример

### Запрос

```shell
curl -X GET 'https://api.pact.im/api/p2/companies' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "sort": {"id": "asc"}
  }'
```

### Ответ

```json
{
  "companies": [
    {
      "id": 52368,
      "name": "Моя компания",
      "phone": "+79990000000",
      "about": "Поддержка клиентов",
      "owner_id": 12345,
      "auto_assigned_user_id": null,
      "feature_deliveries": false,
      "waba_allowed": true,
      "avatar_url": null
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 1,
    "per_page": 25
  }
}
```
