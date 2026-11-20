---
title: "Companies"
description: "Companies are workspaces for channels, conversations, and your team"
section: "v2"
---

A **company** is a workspace in Pact.im. It groups channels, conversations, team members, integrations, and webhooks.

With the Companies API you can:

- [Get companies](/v2/companies/get-companies)
- [Get a company](/v2/companies/get-company)
- [Create a company](/v2/companies/create-company)
- [Update a company](/v2/companies/update-company)

## Company object

### Example

```json
{
  "company": {
    "id": 52368,
    "name": "My company",
    "phone": "+79990000000",
    "about": "Customer support",
    "owner_id": 12345,
    "auto_assigned_user_id": 67890,
    "feature_deliveries": false,
    "waba_allowed": true,
    "avatar_url": "https://api.pact.im/uploads/company.png"
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | Company ID
name | String | Company name
phone | String \| null | Company phone number
about | String \| null | Company description
owner_id | Integer | Company owner ID
auto_assigned_user_id | Integer \| null | ID of the team member automatically assigned to new conversations
feature_deliveries | Boolean | Whether broadcasts are available for the company
waba_allowed | Boolean | Whether WhatsApp Business API connection is available
avatar_url | String \| null | Company avatar URL
