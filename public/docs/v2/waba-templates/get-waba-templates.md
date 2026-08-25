---
title: "Получить WABA-шаблоны"
description: "Возвращает постраничный список WABA-шаблонов ваших компаний"
section: "v2"
---

Возвращает постраничный список WABA-шаблонов компаний пользователя.

По умолчанию сортировка `created_at: desc`. Её можно переопределить параметром `sort`, а фильтр по компаниям — через `company_ids`.

По умолчанию на странице возвращается 25 шаблонов.

Подробнее о [пагинации](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/waba_templates`

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_ids | нет | Должно быть массивом целых чисел | ID компаний. Если не указано, возвращаются шаблоны всех компаний
sort | нет | Должно быть объектом | Сортировка по `created_at` или `position`, по возрастанию или убыванию. Пример: `{"position": "asc"}`. По умолчанию `created_at: desc`
page | нет | Должно быть целым числом | Номер страницы. Если не указан, возвращается первая страница
per_page | нет | Должно быть целым числом | Число записей на странице (по умолчанию 25)

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/waba_templates' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_ids": [<COMPANY_ID>],
    "sort": {"position": "asc"},
    "per_page": 50
  }'
```

### Ответ
```json
{
  "waba_templates": [
    {
      "id": 1,
      "name": "fuga",
      "body": "Temporibus et rerum optio.",
      "waba_id": "cjw8av3d2l",
      "substitutions_count": 0,
      "header_content_type": null,
      "company_id": 52204,
      "header": null,
      "namespace": null,
      "created_at": "2025-05-21T00:29:29.313Z",
      "position": 1
    },
    {
      "id": 2,
      "name": "with_params",
      "body": "Привет, {{1}}. Это тест параметров. {{2}} - тест второго параметра.",
      "waba_id": "with_params",
      "substitutions_count": 2,
      "header_content_type": null,
      "company_id": 52204,
      "header": null,
      "namespace": "ab06e962_230a_4e22_a3e2_a17bb8951856",
      "created_at": "2025-05-21T02:13:08.232Z",
      "position": 2
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 2,
    "per_page": 25
  }
}
```
