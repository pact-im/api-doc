---
title: "Disable Auth"
description: "Disable an existing messaging provider auth"
section: "v2"
---

Disables an existing auth.

## HTTP Request

`PUT https://api.pact.im/api/p2/companies/<COMPANY_ID>/auths/<AUTH_ID>/disable`

## URL Parameters

Parameter | Description
--------- | -----------
COMPANY_ID | ID of the company
AUTH_ID | ID of the auth

## Query Parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
private_api_token | true | Must be a string | YOUR_API_TOKEN
