---
title: "Вставка iframe"
description: "Как разместить интерфейс чата Pact в вашем продукте через HTML iframe"
section: "embed"
---

Чтобы показать интерфейс чата Pact в своей CRM или другом продукте, разместите на странице HTML-элемент `iframe` и укажите в `src` ссылку на интерфейс — с [подписью](/embed/signature) и нужными [параметрами](/embed/parameters).

## HTML

```html
<iframe
  src="https://msg.pact.im/pact_embed?company_uuid=1234a567-2d3a-4dfd-b021-489ead21b830&signature=SIGNATURE&scope=conversations"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

## Частые проблемы

Проблема | Что проверить
-------- | ------------
Пустой или сломанный интерфейс | `company_uuid` и `signature` в URL
Ошибка аутентификации | `signature` считается тем же `private_api_token`, что и для API, и от той же JSON-строки с UUID
Не открывается нужный диалог | `scope`, `conversation_id`, `phone` и `provider`
