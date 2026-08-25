---
title: "Get Auths (Multi-company)"
description: "Returns auths for multiple companies"
section: "v2"
---

Returns auths for multiple companies.

## HTTP Request

`GET https://api.pact.im/api/p2/auths`

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
company_ids | true | Must be an array of integers | List of company IDs
page | false | Must be integer | Page number
per_page | false | Must be integer | Items per page
