---
title: "Tags"
description: "Tag catalog and conversation tag management"
section: "v2"
---

Tags help categorize conversations. Create a tag in the shared catalog first, then assign it to one or more conversations.

Tags belong to the account owner and are available in all of that owner's companies. An owner can have up to 200 tags, and a conversation can have up to 10 tags.

With the Tags API you can:

- [Get the tag catalog](/v2/tags/get-tags)
- [Create a tag](/v2/tags/create-tag)
- [Update a tag](/v2/tags/update-tag)
- [Delete a tag](/v2/tags/delete-tag)
- [Get conversation tags](/v2/tags/get-conversation-tags)
- [Assign a tag to a conversation](/v2/tags/assign-conversation-tag)
- [Remove a tag from a conversation](/v2/tags/remove-conversation-tag)

<span id="tag-object"></span>

## Tag object

### Example

```json
{
  "tag": {
    "id": 42,
    "title": "VIP",
    "color": "purple",
    "position": 1,
    "created_at": "2026-11-19T12:00:00.000Z",
    "updated_at": "2026-11-19T12:00:00.000Z"
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
id | Integer | Tag ID
title | String | Tag name, up to 30 characters. Names are case-insensitively unique within the owner's catalog
color | String | Tag color: `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `purple`, `pink`, or `gray`
position | Integer | Tag position in the owner's catalog
created_at | Time | Creation time
updated_at | Time | Last update time
