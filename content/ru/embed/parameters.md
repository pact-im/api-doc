---
title: "Дополнительные параметры"
description: "Опциональные параметры ссылки: scope, диалог, телефон, провайдер и оператор"
section: "embed"
---

После [обязательных параметров](/embed/signature) в ссылку можно передать опции, которые определяют, что откроется в интерфейсе.

## Дополнительные параметры

Параметр | Обязательный | Описание
--------- | ------------ | -----------
scope | нет | Область интерфейса: `conversations` (список диалогов) или `messages` (конкретная переписка). По умолчанию — `conversations`. Если `scope` не передан, но указан `phone`, используется `messages`
conversation_id | нет | ID диалога при `scope=messages`. Обязателен, если не переданы `phone` и `provider`
phone | нет | Телефон для поиска контакта при `scope=messages`. Пример: `+1234567890`
provider | нет | Провайдер канала при открытии по телефону. Пример: `whatsapp`, `whatsapp_business`
current_user_id | нет | ID оператора, от имени которого отправляются сообщения. Пример: `85328`

## Примеры ссылок

Список диалогов:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=conversations
```

Диалог по ID:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=messages&conversation_id=12345
```

Диалог по телефону и провайдеру:

```text
https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=messages&phone=+1234567890&provider=whatsapp
```

Собранный URL передаётся в `src` при [вставке iframe](/embed/iframe).
