---
title: "События каналов"
description: "Структура вебхуков для событий создания, обновления и удаления каналов"
section: "webhooks"
---

Вебхуки каналов используют `"type": "auth"`.

Они отправляются при каждом значимом изменении объекта канала. Управлять каналами можно через [API каналов](/v2/auths).

## События

Параметр | Содержимое | Описание
--------- | ------- | -----------
Создан | `"event": "create"` | Создан новый канал
Подключён | `"event": "update"`, `"state": "enabled"` | Канал успешно подключён (например, подключён WhatsApp)
Отключён | `"event": "update"`, `"state": "disabled"` | Канал отключён от внешнего сервиса
Удалён | `"event": "delete"` | Канал безвозвратно удалён

События `update` также используются в процессе аутентификации по QR-коду, по коду и через OAuth (новый QR-код, список страниц и другие промежуточные обновления).

Поля объекта: [Объект канала](/v2/auths#auth-object), [Объект страницы](/v2/auths#pages-object).

## Создание (без страниц)

```json
{
  "event": "create",
  "type": "auth",
  "object": {
    "id": 69174,
    "company_id": 52368,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "created_at": "2025-06-23T14:33:47.886Z",
    "updated_at": "2025-06-23T14:33:47.886Z",
    "sync_messages_at": "2025-06-22T14:33:47.877Z"
  }
}
```

## Обновление (подключена / без страниц)

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 1,
    "company_id": 1,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "created_at": "2025-06-25T08:02:01.578Z",
    "updated_at": "2025-06-25T08:02:30.904Z",
    "sync_messages_at": "2025-06-24T08:02:01.570Z"
  }
}
```

## Обновление (QR-код)

Отправляется после создания канала, использующей аутентификацию по QR-коду, и повторно при истечении срока действия QR-кода.

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 70719,
    "provider": "whatsapp",
    "state": "initial",
    "company_id": 52524,
    "phone_number": null,
    "settings": {},
    "qr": "data:image/png;base64,...",
    "created_at": "2026-06-17T06:45:20.562Z",
    "updated_at": "2026-06-17T06:45:21.521Z",
    "sync_messages_at": null
  }
}
```

## Обновление (со страницами)

Пример для провайдеров, предоставляющих страницы для подключения (например, VKontakte):

```json
{
  "event": "update",
  "type": "auth",
  "object": {
    "id": 69167,
    "company_id": 52368,
    "provider": "vkontakte",
    "state": "enabled",
    "created_at": "2025-06-20T08:10:20.517Z",
    "updated_at": "2025-06-23T15:31:00.275Z",
    "sync_messages_at": "2025-06-20T08:10:36.951Z",
    "pages": [
      {
        "id": 30190,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "229559196",
        "name": "Test1",
        "enabled": true
      },
      {
        "id": 30191,
        "auth_id": 69167,
        "company_id": 52368,
        "external_id": "223020390",
        "name": "Test2",
        "enabled": false
      }
    ]
  }
}
```
