---
title: "Компании"
description: "Компании — рабочие пространства для каналов, диалогов и команды"
section: "v2"
---

**Компания** — рабочее пространство в Pact.im. В компании объединены каналы, диалоги, сотрудники, интеграции и вебхуки.

С API компаний вы можете:

- [Получить список компаний](/v2/companies/get-companies)
- [Получить компанию](/v2/companies/get-company)
- [Создать компанию](/v2/companies/create-company)
- [Обновить компанию](/v2/companies/update-company)

## Объект company

### Пример

```json
{
  "company": {
    "id": 52368,
    "name": "Моя компания",
    "phone": "+79990000000",
    "about": "Поддержка клиентов",
    "owner_id": 12345,
    "auto_assigned_user_id": 67890,
    "feature_deliveries": false,
    "waba_allowed": true,
    "avatar_url": "https://api.pact.im/uploads/company.png"
  }
}
```

### Описание

Параметр | Тип | Описание
--------- | ---- | -----------
id | Integer | ID компании
name | String | Название компании
phone | String \| null | Телефон компании
about | String \| null | Описание компании
owner_id | Integer | ID владельца компании
auto_assigned_user_id | Integer \| null | ID сотрудника, который автоматически назначается ответственным за новые диалоги
feature_deliveries | Boolean | Доступность рассылок для компании
waba_allowed | Boolean | Доступность подключения WhatsApp Business API
avatar_url | String \| null | URL аватара компании
