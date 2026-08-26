---
title: "Обновить диалог"
description: "Изменение статуса диалога, архивация и назначение ответственного"
section: "v2"
---

Позволяет изменить статус диалога (отвечен / не отвечен), поместить его в архив или вернуть из архива, а также назначить ответственного сотрудника.

## HTTP Request

`PUT https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | Идентификатор диалога

## Параметры запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
operational_state | нет | Должно быть строкой | `open` или `archived`
replied_state | нет | Должно быть строкой | `replied` или `unreplied`
assignee_id | нет | Должно быть целым числом или null | Идентификатор ответственного пользователя. Передайте `null`, чтобы снять ответственного

## Пример

### Запрос
```shell
curl -X PUT 'https://api.pact.im/api/p2/conversations/3' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": 1,
    "operational_state": "archived",
    "replied_state": "unreplied"
  }'
```

### Ответ
```json
{
  "conversation": {
    "id": 3,
    "company_id": 1,
    "sender_name": "Иван",
    "sender_phone": null,
    "sender_external_id": "110218431333189",
    "sender_external_public_id": "test",
    "provider": "telegram_personal",
    "avatar_url": "http://localhost:3000/avatars/original/missing.png",
    "created_at": "2025-12-11T15:14:17.879Z",
    "last_updated_at": "2025-12-15T10:52:40.000Z",
    "last_message_id": 1123356,
    "operational_state": "archived",
    "replied_state": "unreplied",
    "group": false
  }
}
```
