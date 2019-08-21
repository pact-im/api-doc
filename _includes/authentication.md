# Authentication

All requests to Pact API must be authenticated. There are two options
for autentication:

Pact expects for the API key to be included in all API requests to the server in a header that looks like the following:

`X-Private-Api-Token: YOUR_API_TOKEN`

or as a additional parameter in URI

`"API_ENDPOINT_HERE?private_api_token=YOUR_API_TOKEN"`

<aside class="notice">
You must replace <code>YOUR_API_TOKEN</code> with your personal API key.
</aside>

<aside class="warning">
You must use personal API key on each request to the API.
</aside>

You can get your Pact API key from [account settings page](https://app.pact.im/account).


## Examples

```shell
# Header
curl -X GET "API_ENDPOINT_HERE"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"

# OR use a private_api_token parameter
curl -X GET "API_ENDPOINT_HERE?private_api_token=YOUR_API_TOKEN"
```


