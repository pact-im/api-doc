---
title: "Каналы"
description: "Канал — подключённый аккаунт мессенджера (WhatsApp, Telegram, VK и другие) для вашей компании"
section: "v2"
---

**Канал** (auth) — подключённый аккаунт мессенджера для вашей компании: WhatsApp, Telegram, MAX, VK, Instagram, Facebook, Avito и другие провайдеры.

Это мост между Pact.im и мессенджером. Пока канал не создан и не подтверждён, отправлять и получать сообщения по этому каналу нельзя. Жизненный цикл: create → confirm (QR, код или OAuth) → enabled; позже канал можно отключить или удалить.

Некоторые провайдеры также отдают **страницы** (например, сообщества VK), которые выбираются при подтверждении. Изменения каналов приходят вебхуками — см. [События каналов](/v2/webhooks/auth-events).

Если вы ещё используете Channels API v1, см. [Переход с API v1 на API v2 для Каналов](/migrate-channels-to-auths).

С API каналов вы можете:

- [Получить каналы компании](/v2/auths/get-company-auths)
- [Получить каналы (несколько компаний)](/v2/auths/get-auths)
- [Создать канал](/v2/auths/create-auth)
- [Подтвердить канал](/v2/auths/confirm-auth)
- [Включить канал](/v2/auths/enable-auth)
- [Отключить канал](/v2/auths/disable-auth)
- [Удалить канал](/v2/auths/delete-auth)

<span id="auth-object"></span>

## Объект auth

### Пример

```json
{
  "auth": {
    "id": 69174,
    "company_id": 52368,
    "provider": "whatsapp",
    "state": "enabled",
    "phone_number": "79000000000",
    "username": null,
    "created_at": "2025-06-23T14:33:47.886Z",
    "updated_at": "2025-06-23T14:33:47.886Z",
    "sync_messages_at": "2025-06-22T14:33:47.877Z",
    "pages": null
  }
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
id | Integer | ID канала
company_id | Integer | ID компании
provider | String | Название подключённого мессенджера
state | String | Статус подключения (`disabled` или `enabled`)
phone_number | Integer | Номер телефона подключённого мессенджера (если провайдер его отдаёт)
username | String | Имя пользователя подключённого мессенджера (если провайдер его отдаёт)
created_at | Time | Время подключения канала
updated_at | Time | Время последнего обновления
sync_messages_at | Time | Время, с которого началась синхронизация сообщений
pages | Object | Некоторые провайдеры могут отдавать список страниц для подключения

<span id="pages-object"></span>

## Объект pages

### Пример

```json
{
  "page": {
    "id": 30190,
    "auth_id": 69167,
    "company_id": 52368,
    "external_id": "229559196",
    "name": "Test1",
    "enabled": true
  }
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
id | Integer | ID страницы
auth_id | Integer | ID канала, к которому относится страница
company_id | Integer | ID компании, к которой относится страница
external_id | Integer | Внешний ID страницы
name | String | Название страницы
enabled | Boolean | Статус подключения страницы (`true` или `false`)
