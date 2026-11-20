---
title: "Get a company"
description: "Returns a company by ID"
section: "v2"
---

Returns a company available to the current user.

## HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>`

## URL parameters

Parameter | Description
--------- | -----------
COMPANY_ID | Company ID

## Request parameters

Parameter | Required | Validation | Description
--------- | -------- | ---------- | -----------
private_api_token | yes | Must be a string | YOUR_API_TOKEN

## Example

```shell
curl -X GET 'https://api.pact.im/api/p2/companies/52368' \
  --header 'X-Private-Api-Token: YOUR_API_TOKEN'
```
