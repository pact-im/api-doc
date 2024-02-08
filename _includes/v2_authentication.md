## Authentication

All requests to Pact API must be authenticated.

Pact expects for an authentication token to be included in all API requests to the server in a header that looks like the following:

`X-Api-Token: YOUR_AUTHENTICATION_TOKEN`

Here are steps to receive your Authentication Token

1. Set `webhook_url` in your user settings at `https://msg.pact.im/account`
2. To receive security code on your `webhook_url` send request

`POST https://api.pact.im/api/verification?locale=ru&source=private_api_v2&phone=YOUR_PHONE`

3. To receive Authentication Token and Refresh token send

`POST https://api.pact.im/api/sign_in?phone=YOUR_PHONE&code=SECURITY_CODE`

Authentication Token in Authentication-Token header and Refresh Token in Refresh-Token header (lifespan is 1 hour / 30 days respectivly). Refresh Token is one use only.

To receive new pair of tokens send with a header that looks like this

`X-Api-Refresh-Token: Refresh Token`

`POST https://api.pact.im/api/refresh_token`

### Examples

```shell
# Header
curl -X GET "API_ENDPOINT_HERE"
  -H "X-Api-Token: YOUR_AUTHENTICATION_TOKEN"
```
