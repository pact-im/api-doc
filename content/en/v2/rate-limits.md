---
title: "Rate limits"
description: "Request rate limits for API v2"
section: "v2"
---

API v2 enforces rate limits to keep the system stable, prevent abuse, and share capacity fairly across clients. Limits control how many requests a single user can make within a time window.

Some endpoints have both short-term (per second) and longer-term (per minute) caps. That keeps burst traffic under control without blocking normal usage.

## Limits by endpoint

Endpoint | Rate limits
-------- | -----------
[Get messages of the conversation](/v2/messages/get-conversation-messages) | Maximum 20 requests per minute
[Get conversation message](/v2/messages/get-conversation-message) | Maximum 20 requests per minute
[Get conversations of the company](/v2/conversations/get-conversations) | Maximum 10 requests per minute
[Get conversation](/v2/conversations/get-conversation) | Maximum 10 requests per minute
[Send message to existing conversation](/v2/messages/send-message) | Maximum 5 requests per second<br>Maximum 30 requests per minute
[Write first message](/v2/conversations/write-first-message) | Maximum 5 requests per second<br>Maximum 30 requests per minute
[Get WABA Templates](/v2/waba-templates/get-waba-templates) | Maximum 20 requests per minute

## When a limit is exceeded

If you exceed a rate limit, the API returns HTTP `429 Too Many Requests`. Wait for the time indicated in the error `detail`, then retry the request.

### Example

```json
{
  "errors": [
    {
      "status": 429,
      "code": "too_many_requests",
      "title": "Too many requests error",
      "detail": "Please wait for 50 seconds"
    }
  ]
}
```
