# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl -X GET "api_endpoint_here"
  -H "X-Private-Api-Token: YOUR_API_TOKEN"

# OR use a private_api_token parameter
curl -X GET "api_endpoint_here?private_api_token=YOUR_API_TOKEN"
```

> Make sure to replace `YOUR_API_TOKEN` with your API key.

Pact uses API keys to allow access to the API.

You can get your Pact API key at [account settings page](https://app.pact.im/account).

Pact expects for the API key to be included in all API requests to the server in a header that looks like the following:

`X-Private-Api-Token: YOUR_API_TOKEN`

or as a additional parameter in URI

`"api_endpoint_here?private_api_token=YOUR_API_TOKEN"`

<aside class="notice">
You must replace <code>YOUR_API_TOKEN</code> with your personal API key.
</aside>

<aside class="warning">
You must use personal API key on each request to the API.
</aside>
