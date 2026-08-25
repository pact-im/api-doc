---
title: "Pagination"
description: "Paginate list endpoints in API v2"
section: "v2"
---

API v2 paginates list responses into pages so large result sets stay fast and manageable.

Use `page` and `per_page` on list endpoints. The response includes a `meta` object with the current page, how many entries were returned, and the page size.

For example, with 100 records and `per_page=25`, there are 4 pages. Increase `page` to walk through them.

> **Note:** If `entries_count` is less than `per_page`, this is the last page and there are no more entries.

## Request parameters

Parameter | Required | Validations | Description
--------- | -------- | ----------- | -----------
page | false | Must be an integer | Page number. Returns the first page if omitted
per_page | false | Must be an integer | Number of entries per page

## Response example

```json
{
  "companies": [
    {
      "id": 26,
      "name": "Company 26"
    },
    {
      "id": 27,
      "name": "Company 27"
    },
    {
      "id": 28,
      "name": "Company 28"
    },
    {
      "id": 29,
      "name": "Company 29"
    }
  ],
  "meta": {
    "page": 2,
    "entries_count": 4,
    "per_page": 25
  }
}
```

## Meta object

### Example

```json
{
  "meta": {
    "page": 2,
    "entries_count": 4,
    "per_page": 25
  }
}
```

### Description

Parameter | Type | Description
--------- | ---- | -----------
page | Integer | Current page number
entries_count | Integer | Number of entries returned on this page
per_page | Integer | Entries requested per page
