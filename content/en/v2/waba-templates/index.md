---
title: "WABA Templates"
description: "A WABA template is an approved WhatsApp Business message template you can send as a first outbound message"
section: "v2"
---

A **WABA template** is an approved WhatsApp Business (WABA) message template for your company.

WhatsApp requires templates when you write first to a client outside the free-form messaging window. Each template has a name, body text, optional header, and placeholders you fill with substitutions when you send.

List templates here, then pass `waba_id` (and `substitutions` when needed) in [Write first message](/v2/conversations/write-first-message).

- [Get WABA Templates](/v2/waba-templates/get-waba-templates)

## WABA template object

### Example

```json
{
  "waba_template": {
    "id": 2,
    "name": "with_params",
    "body": "Привет, {{1}}. Это тест параметров. {{2}} - тест второго параметра.",
    "waba_id": "with_params",
    "substitutions_count": 2,
    "header_content_type": null,
    "company_id": 52204,
    "header": null,
    "namespace": "ab06e962_230a_4e22_a3e2_a17bb8951856",
    "created_at": "2025-05-21T02:13:08.232Z",
    "position": 2
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | ID
name | String | WABA template name
body | String | Template text
waba_id | String | ID of the template on the WhatsApp Business side
substitutions_count | Integer | Count of substitutions
header_content_type | String | Header content type: `video`, `document`, `text`, or `image`
company_id | Integer | ID of the company
header | String | Header text
namespace | String | Namespace
created_at | Time | Template create time
position | Integer | Position of the template in the company
