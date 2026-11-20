---
title: "Create a company"
description: "Creates a new company"
section: "v2"
---

Creates a new company for the current user.

## HTTP Request

`POST https://api.pact.im/api/p2/companies`

## Request parameters

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | yes | Must be a string | YOUR_API_TOKEN
name | yes | Must be a string | Company name
phone | no | Must be a string | Company phone number
about | no | Must be a string | Company description
avatar | no | Must be a file | Company avatar

## Example

```shell
curl -X POST 'https://api.pact.im/api/p2/companies' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "name": "My company",
    "phone": "+79990000000",
    "about": "Customer support"
  }'
```
