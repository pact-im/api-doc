---
title: "Migration from Channels v1 to Auths v2"
description: "Move from API v1 Channels to API v2 Auths and auth webhooks"
section: "getting-started"
---

API v1 [Channels](/v1/channels) are being replaced by API v2 [Auths](/v2/auths). An **auth** is the v2 name for a connected messaging provider (WhatsApp, Telegram, VK, and others).

This guide helps you switch integrations that create, list, update, or delete channels — and that listen for channel-related webhooks.

> **Warning:** API v1 **Channels** will be shut down. The exact date will be announced later this year. After shutdown, Channels v1 will not work at all — migrate to [Auths](/v2/auths).

## What changes

The entity is the same — connected messaging accounts. What changes is the API:

| What | API v1 | API v2 |
| ---- | ------ | ------ |
| Base URL | `https://api.pact.im/p1/...` | `https://api.pact.im/api/p2/...` |
| Channel webhooks | Data with `entity: "channel"`, `type: "qr_code"`, and similar fields — see [Webhooks v1](/v1/webhooks) | Unified format with `"type": "auth"` and `"event": "create" \| "update" \| "delete"` — see [Auth events](/v2/webhooks/auth-events) |
| How to confirm a channel | `request_code` / `confirm` methods and webhook data (QR, etc.) | [Confirm auth](/v2/auths/confirm-auth) (QR, code, or OAuth) and [Enable auth](/v2/auths/enable-auth) when needed |
| Channel API methods | `/p1/companies/:company_id/channels/...` | `/api/p2/companies/:company_id/auths/...` — see [Auths](/v2/auths) |

Token auth still uses your private API token. In v2 you typically pass `private_api_token` as a query or body parameter — see [Authentication](/v2/authentication-v1).

## Endpoint mapping

| Action | API v1 (Channels) | API v2 (Auths) |
| ------ | ----------------- | -------------- |
| List | `GET /p1/companies/:company_id/channels` | [Get company auths](/v2/auths/get-company-auths) — `GET /api/p2/companies/:company_id/auths` |
| Create / connect | `POST /p1/companies/:company_id/channels` | [Create auth](/v2/auths/create-auth) — `POST /api/p2/companies/:company_id/auths` |
| Confirm (code / enable) | `POST .../channels/:id/request_code`, `POST .../channels/:id/confirm` | [Confirm auth](/v2/auths/confirm-auth) and [Enable auth](/v2/auths/enable-auth) |
| Disable / pause | — | [Disable auth](/v2/auths/disable-auth) |
| Re-enable | — | [Enable auth](/v2/auths/enable-auth) |
| Delete | `DELETE /p1/companies/:company_id/channels/:id` | [Delete auth](/v2/auths/delete-auth) |
| List across companies | — | [Get auths (multi-company)](/v2/auths/get-auths) |

Provider-specific create parameters (token, phone number, sync period, and so on) are documented on [Create auth](/v2/auths/create-auth).

## Confirmation flows (QR, code, OAuth)

In v1, confirmation was spread across channel create, `request_code`, `confirm`, and webhook payloads (for example QR codes).

In v2:

1. [Create auth](/v2/auths/create-auth) for the provider.
2. Complete the flow described in [Confirm auth](/v2/auths/confirm-auth):
   - **QR** — WhatsApp, Telegram Personal, MAX (`qr` in the response and in webhooks)
   - **Code** — WhatsApp / Telegram Personal when `phone_number` is provided
   - **OAuth** — Facebook, VK, Instagram Business, WhatsApp Business, Avito (`oauth_provider_url`)
3. Use [Enable auth](/v2/auths/enable-auth) when the provider requires a verification code (for example Telegram Personal code flow).

## Migrating webhooks

v1 channel lifecycle events used payloads with `entity: "channel"`, `type: "qr_code"`, and similar shapes under [v1 Webhooks](/v1/webhooks).

v2 delivers a single envelope with `"type": "auth"` and `"event": "create" | "update" | "delete"`. Full payloads and meanings are in [Auth events](/v2/webhooks/auth-events).

| Situation | v2 auth event |
| --------- | ------------- |
| Auth created | `event: create` |
| Connected / ready | `event: update` with `state: enabled` |
| Disconnected | `event: update` with `state: disabled` |
| Deleted | `event: delete` |
| QR refresh, pages list, OAuth progress | `event: update` (see auth-events examples) |

### Checklist for webhook handlers

1. Register or update a company webhook URL with [Company webhooks](/v2/company-webhooks) (if you are not already receiving v2 events).
2. Accept the v2 envelope: `event`, `type`, `object`.
3. When `type === "auth"`, read provider state from `object` (and `pages` / `qr` / `oauth_provider_url` when present).
4. Stop relying on v1-only fields such as `channel_id`, `channel_type`, or `entity: "channel"` for new logic.
5. Keep v1 handlers only while you still have traffic on the old API; plan to turn them off after cutover.

## Suggested migration steps

1. **Read the v2 Auths overview** — [Auths](/v2/auths) and the [Auth object](/v2/auths#auth-object).
2. **Map your calls** — replace each Channels endpoint you use with the matching Auths method above.
3. **Update create + confirm** — follow [Create auth](/v2/auths/create-auth) and [Confirm auth](/v2/auths/confirm-auth) for each provider you support.
4. **Switch webhooks** — implement handling for [Auth events](/v2/webhooks/auth-events); verify create / connect / disconnect / delete in a staging company.
5. **Smoke-test** — list auths, create one test auth, complete confirmation, confirm webhooks, then delete or disable the test auth.
6. **Cut over** — point production traffic to v2; remove v1 Channels usage when ready.

## Related docs

- [Channels (API v1)](/v1/channels) — legacy reference
- [Auths (API v2)](/v2/auths)
- [Confirm auth](/v2/auths/confirm-auth)
- [Auth events](/v2/webhooks/auth-events)
- [Company webhooks](/v2/company-webhooks)
- [Events overview](/v2/webhooks)
