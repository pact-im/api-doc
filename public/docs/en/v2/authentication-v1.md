---
title: "Authentication"
description: "Authenticate API v2 requests with a private API token"
section: "v2"
---

All API v2 requests must include your private API token. Get it from [account settings](https://app.pact.im/account).

> **Note:** Replace `YOUR_API_TOKEN` with your personal API key in every request.

You can pass the token in any one of these ways:

1. [JSON body](#json-body)
2. [HTTP header](#http-header)
3. [URL query parameter](#url-query-parameter)

## JSON body

Send `private_api_token` in the request JSON payload.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint" \
  --header "Content-Type: application/json" \
  --data '{
    "private_api_token": "YOUR_API_TOKEN",
    "another_parameter": "value"
  }'
```

## HTTP header

Send `X-Private-Api-Token` in the request headers.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint" \
  --header "Content-Type: application/json" \
  --header "X-Private-Api-Token: YOUR_API_TOKEN" \
  --data '{
    "another_parameter": "value"
  }'
```

## URL query parameter

Send `private_api_token` as a query string parameter.

```shell
curl -X POST "https://api.pact.im/api/p2/some_endpoint?private_api_token=YOUR_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "another_parameter": "value"
  }'
```

## Auth errors

If the token is missing or invalid, the API responds with `401`:

```json
{
  "errors": [
    {
      "status": 401,
      "code": "unauthorized",
      "title": "Unauthorized",
      "detail": "No token provided"
    }
  ]
}
```
