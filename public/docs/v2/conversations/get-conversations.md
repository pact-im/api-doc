---
title: "Список диалогов"
description: "Возвращает постраничный список диалогов компании"
section: "v2"
---

Возвращает постраничный список диалогов компании, отсортированный по полю `last_updated_at`.

По умолчанию возвращается 25 диалогов на страницу.

Подробнее о [пагинации](/v2/pagination).

## HTTP Request

`GET https://api.pact.im/api/p2/conversations`

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
search_string | нет | Должно быть строкой | Поиск по телефону отправителя, имени отправителя или публичному внешнему идентификатору отправителя. Ведущие символы `+` и `@` удаляются автоматически, поэтому `+79991112233` и `79991112233`, а также `@username` и `username` дают одинаковый результат
page | нет | Должно быть целым числом | Номер страницы. Если не передан, возвращается первая страница
per_page | нет | Должно быть целым числом | Количество записей на странице (по умолчанию 25)

## Пример

### Запрос
```shell
curl -X GET 'https://api.pact.im/api/p2/conversations' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID,
    "page": 1
  }'
```

### Ответ
```json
{
  "conversations": [
    {
      "id": 18642847,
      "company_id": 52204,
      "sender_name": "79517591813",
      "sender_phone": "79517591813",
      "sender_external_id": "79517591813",
      "sender_external_public_id": "79517591813",
      "provider": "whatsapp",
      "avatar_url": "http://localhost:3000/avatars/original/missing.png",
      "created_at": "2024-11-11T12:35:57.995Z",
      "last_updated_at": "2024-11-21T08:37:36.000Z",
      "last_message_id": 14056,
      "operational_state": "open",
      "replied_state": "replied",
      "group": false
    }
  ],
  "meta": {
    "page": 1,
    "entries_count": 2,
    "per_page": 25
  }
}
```
