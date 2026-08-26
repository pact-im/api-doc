---
title: "Get Company Auths"
description: "Returns all auths for a company"
section: "v2"
---

Returns all auths for a company.

## HTTP Request

`GET https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
page | false | Must be integer | Page number
per_page | false | Must be integer | Items per page
