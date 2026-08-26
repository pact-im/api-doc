---
title: "Отправить сообщение"
description: "Отправка сообщения в существующий диалог"
section: "v2"
---

Позволяет отправить сообщение в существующий диалог.

## HTTP Request

`POST https://api.pact.im/api/p2/conversations/<CONVERSATION_ID>/messages`

## Параметры URL

Параметр | Описание
--------- | -----------
CONVERSATION_ID | Идентификатор диалога

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
text | нет | Должно быть строкой | Текст сообщения
attachment_ids | нет | Должно быть массивом целых чисел | Идентификатор [вложения](/v2/attachments). Одно сообщение может содержать только массив с одним идентификатором. Чтобы отправить несколько вложений, выполните несколько запросов с разными идентификаторами.
replied_to_id | нет | Должно быть строкой | [Внешний идентификатор](/v2/messages#v2-message-external-id) сообщения, на которое отвечает данное сообщение
send_to_crm | нет | boolean | Синхронизировать инициирующее сообщение с CRM-интеграциями. По умолчанию: `true`

## Пример

### Запрос
```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": COMPANY_ID,
    "text": "test",
    "attachment_ids": ["ID_attachment"],
    "replied_to_id": EXTERNAL_MESSAGE_ID_FROM_PROVIDER
  }'
```

```shell
curl -X POST 'https://api.pact.im/api/p2/conversations/CONVERSATION_ID/messages' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "company_id": COMPANY_ID,
    "text": "test"
  }'
```

### Ответ
```json
{
    "message": {
        "id": 123,
        "external_id": null,
        "company_id": 838111,
        "conversation_id": 2073572213,
        "contact_id": 1582597339,
        "replied_to_id": "AC36714A437FAE372F0CC3CC21330F336",
        "created_at": "2025-12-09T13:40:23.716Z",
        "external_created_at": "2025-12-09T13:40:23.000Z",
        "income": false,
        "status": "sent",
        "message": "Hello World!",
        "reactions": [],
        "details": null,
        "delivery": false,
        "deleted": false,
        "attachments": [
            {
                "id": 315200264,
                "message_id": 1414933437,
                "file_name": "image_processing20241227-195666-pny0n6.jpeg",
                "mime_type": "image/jpeg",
                "size": 25436,
                "attachment_url": "https://cdn.pact.im/storage/attachment/file/53cbacc1433e4396889a0e53eb8f102fab.jpeg",
                "preview_url": "https://cdn.pact.im/storage/attachment/file/small-11191138a56305df28e13d71cc57071113.jpeg",
                "aspect_ratio": null,
                "data": {}
            }
        ]
    }
}
```
