---
title: "WABA-шаблоны"
description: "WABA-шаблон — одобренный шаблон WhatsApp Business, который можно отправить как первое исходящее сообщение"
section: "v2"
---

**WABA-шаблон** — одобренный шаблон сообщения WhatsApp Business (WABA) для вашей компании.

WhatsApp требует шаблоны, когда вы пишете клиенту первым вне окна свободных сообщений. У каждого шаблона есть имя, текст тела, опциональный заголовок и плейсхолдеры, которые вы заполняете подстановками при отправке.

Список шаблонов можно получить здесь, а затем передать `waba_id` (и при необходимости `substitutions`) в [Написать первое сообщение](/v2/conversations/write-first-message).

- [Получить WABA-шаблоны](/v2/waba-templates/get-waba-templates)

<span id="waba-template-object"></span>

## Объект waba_template

### Пример

```json
{
  "waba_template": {
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
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
id | Integer | ID
name | String | Имя WABA-шаблона
body | String | Текст шаблона
waba_id | String | ID шаблона на стороне WhatsApp Business
substitutions_count | Integer | Число подстановок
header_content_type | String | Тип содержимого заголовка: `video`, `document`, `text` или `image`
company_id | Integer | ID компании
header | String | Текст заголовка
namespace | String | Namespace
created_at | Time | Время создания шаблона
position | Integer | Позиция шаблона в компании
