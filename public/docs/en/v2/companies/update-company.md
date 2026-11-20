---
title: "Update a company"
description: "Updates company details"
section: "v2"
---

Updates individual company fields.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>`

## URL parameters

Parameter | Description
--------- | -----------
COMPANY_ID | Company ID

## Request parameters

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | yes | Must be a string | YOUR_API_TOKEN
name | no | Must be a string | Company name
phone | no | Must be a string | Company phone number
about | no | Must be a string | Company description
avatar | no | Must be a file | Company avatar
auto_assigned_user_id | no | Must be an integer or null | ID of a company team member to automatically assign to new conversations. Pass `null` to clear the assignment

## Example

```shell
curl -X PUT 'https://api.pact.im/api/p2/companies/52368' \
  --header 'Content-Type: application/json' \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "name": "Updated company",
    "auto_assigned_user_id": 67890
  }'
```
