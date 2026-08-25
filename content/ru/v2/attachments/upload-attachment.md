---
title: "Загрузить вложение"
description: "Загрузка файла или ссылки на файл для отправки в сообщениях"
section: "v2"
---

Создаёт вложение, которое можно отправить в сообщении.

> **Note:** Нельзя загружать более 5 файлов в секунду и более 30 файлов в минуту на одного пользователя.

## HTTP Request

`POST https://api.pact.im/api/p2/attachments/`

Используйте:

- `Content-Type: multipart/form-data` при отправке `file`
- `Content-Type: application/json` при отправке `file_url`

## Параметры тела запроса

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
private_api_token | да | Должно быть строкой | YOUR_API_TOKEN
company_id | да | Должно быть целым числом | Идентификатор компании
file | нет | Должно быть файлом. Нельзя передавать вместе с `file_url` | Файл вложения
file_url | нет | Должно быть URL (`http` или `https`). Нельзя передавать вместе с `file` | URL файла вложения
metadata | нет | Должно быть объектом | Может содержать `push_to_talk` и `data`

## Метаданные

Параметр | Обязательный | Валидация | Описание
--------- | -------- | ----------- | -----------
push_to_talk | нет | Boolean | Отправлять аудиофайлы как голосовые сообщения
data | нет | Должно быть объектом | Только для изображений. Может содержать `height` и `width`

## Пример

### Запрос
```shell
curl -X POST 'https://api.pact.im/api/p2/attachments/' \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@"spec/fixtures/files/1.jpg"' \
  --form 'private_api_token=YOUR_API_TOKEN' \
  --form 'company_id=COMPANY_ID' \
  --form 'metadata[data][width]="1024"' \
  --form 'metadata[data][height]="1280"'
```

### Ответ
```json
{
  "attachment": {
    "id": 53439177,
    "message_id": null,
    "file_name": "1.jpg",
    "mime_type": "image/jpg",
    "size": 812089,
    "attachment_url": "The path to the file",
    "preview_url": "The path to the file",
    "aspect_ratio": 0.8,
    "data": {
      "width": 1024,
      "height": 1280
    }
  }
}
```
