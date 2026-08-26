---
title: "Вебхуки"
description: "Настройка и приём вебхуков каналов в v1"
section: "v1"
---

> **Warning:** **Каналы** API v1 (и связанные с ними события вебхуков каналов) будут отключены. Точная дата будет объявлена позднее в этом году. После отключения API Каналов v1 перестанет работать полностью — перейдите на [События каналов](/v2/webhooks/auth-events) в API v2. См. [Переход с API v1 на API v2 для Каналов](/migrate-channels-to-auths).

## Вебхуки

На этой странице описаны вебхуки **жизненного цикла каналов** для API v1 (QR-коды, состояние подключения, синхронизация и подобные события).

Ваш эндпоинт `webhook_url` **обязан** отвечать HTTP-статусом `200`. Если статус отличается от `200`, доставка повторяется до 10 раз с задержкой 60 секунд. После 10 попыток вебхук отбрасывается.

Для событий сообщений и диалогов используйте API v2 — см. [События](/v2/webhooks), [События сообщений](/v2/webhooks/message-events) и [События диалогов](/v2/webhooks/conversation-events).

### Whatsapp: новый QR-код

```json
{
   "type":"qr_code",
   "event":"new",
   "company_id":1,
   "channel_id":1,
   "data":"BASE64 QR-CODE image string"
}
```

#### Когда приходит

- Вы подключаете канал `whatsapp` в своей компании
- Пользователь вышел из аккаунта в приложении WhatsApp

### Whatsapp: канал успешно подключён

```json
{
   "type":"system",
   "severity":"information",
   "data":{
      "message":"authorized",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

QR-код был успешно отсканирован

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: телефон офлайн

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone offline",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

Устройство с приложением WhatsApp недоступно. Пока телефон офлайн, мы не можем работать с WhatsApp.

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: телефон онлайн

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"phone online",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

Устройство с приложением WhatsApp снова доступно.

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: канал недоступен

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"unavailable",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

Кто-то начал сессию на [web.whatsapp.com](https://web.whatsapp.com) или в похожей интеграции. Пока открыт WhatsApp Web, мы не можем работать с WhatsApp.

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: канал отключён

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"disabled",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

По какой-то причине сессия WhatsApp больше не активна (например, пользователь вышел из аккаунта на устройстве или срок сессии WhatsApp истёк)

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: попытка возобновить работу канала

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"trying_resume_work",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

Мы пытаемся возобновить работу после предыдущего конфликтного состояния

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Whatsapp: синхронизация завершена

```json
{
   "type":"system",
   "severity":"critical",
   "data":{
      "message":"synchronized",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "timestamp":1603119138,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

- Канал WhatsApp был подключён и синхронизация завершилась
- Синхронизация после возобновления работы

> **Note:** `date_timestamp` — временная метка события; `timestamp` — временная метка обратного вызова.

### Instagram: состояние изменено на disabled

```json
{
   "type":"system",
   "severity":"information",
   "data":{
      "message":"IG was set DISABLED",
      "date":"2017-11-11 12:45:53 UTC",
      "date_timestamp":1603118584,
      "details":{
         "entity":"channel",
         "entity_id":1
      }
   }
}
```

#### Когда приходит

- Служебное сообщение успешно доставлено
- Не удалось доставить служебное сообщение
