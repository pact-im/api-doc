---
title: "Написать первое сообщение"
description: "Отправка сообщения, когда диалога с получателем ещё нет"
section: "v2"
---

Позволяет отправить сообщение, когда диалога с этим получателем ещё нет.

На данный момент доступны только следующие провайдеры: <b>max, whatsapp, telegram_personal, whatsapp_business, vkontakte_direct</b>

## HTTP Request

`POST https://api.pact.im/api/p2/messages`

## Параметры тела запроса (JSON)

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
provider | да | Должно быть строкой и одним из значений: max, whatsapp, telegram_personal, whatsapp_business, vkontakte_direct | Провайдер
phone | нет | Должно быть строкой | Телефон получателя
nickname | нет | Должно быть строкой | Никнейм получателя (для telegram_personal)
vkontakte_id  | нет | Должно быть строкой | Идентификатор получателя во ВКонтакте (нельзя передавать вместе с `vkontakte_domain`)
vkontakte_domain  | нет | Должно быть строкой | Домен получателя во ВКонтакте (нельзя передавать вместе с `vkontakte_id`)
text | нет | Должно быть строкой | Текст сообщения
attachment_ids | нет | Должно быть массивом целых чисел | Идентификатор [вложения](/v2/attachments). Одно сообщение может содержать только массив с одним идентификатором. Чтобы отправить несколько вложений, выполните несколько запросов с разными идентификаторами.
waba_id | нет | Должно быть строкой | Идентификатор WABA-шаблона
substitutions | нет | Должно быть массивом строк | Подстановки для WABA-шаблона (если они в нём есть)
send_to_crm | нет | boolean | Синхронизировать инициирующее сообщение с CRM-интеграциями. По умолчанию: `true`

Используйте waba_id, если хотите написать первым через провайдера <b>whatsapp_business</b>.
Подробнее о [WABA-шаблонах](/v2/waba-templates).

## Пример

### Запрос
```shell
curl -X POST 'https://api.pact.im/api/p2/messages' \
--header 'Content-Type: application/json' \
--data '{
    "private_api_token": YOUR_API_TOKEN,
    "company_id": COMPANY_ID,
    "text": "test"
  }'
```

### Ответ
```json
{
  "message": {
    "id": 239,
    "external_id": null,
    "company_id": 52204,
    "conversation_id": 18642824,
    "contact_id": 3,
    "replied_to_id": null,
    "created_at": "2025-02-13T14:07:51.582Z",
    "external_created_at": "2025-02-13T14:07:51.000Z",
    "income": false,
    "status": "sent",
    "message": null,
    "reactions": [],
    "details": null,
    "attachments": [
      {
        "id": 5,
        "message_id": 239,
        "file_name": "5287346531311154701.png",
        "mime_type": "image/jpeg",
        "size": 65030,
        "attachment_url": "https://cdn.pact.im/uploads/storage/attachment/file/a845515c570e285e2ae22d9d493e3abc.png",
        "preview_url": "https://cdn.pact.im/uploads/storage/attachment/file/small-3a46073e438fa82c6c04fd2ff3e1cfef.png",
        "aspect_ratio": 0.46,
        "data": {
          "width": 591,
          "height": 1280
        }
      }
    ]
  }
}
```
