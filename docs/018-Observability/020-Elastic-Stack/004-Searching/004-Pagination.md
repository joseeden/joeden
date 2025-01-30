---
title: "Pagination"
description: "Pagination"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 4
last_update:
  date: 3/28/2023
---

## Overview

Pagination allows you to split large result sets into smaller, manageable chunks. This helps improve performance and makes it easier to navigate through large datasets.

- Use `from` to set the starting point 
- Use `size` to define the number of results per page.
- Query large datasets without overwhelming the system or user.

## Example 

Consider an index with movie films across different genres. Let's assume there are 10 films under the Sci-Fi genre, as shown below:

```plaintext
Result 1: Star Wars: Episode IV - A New Hope
Result 2: Star Wars: Episode V - The Empire Strikes Back
Result 3: Star Wars: Episode VI - Return of the Jedi
Result 4: Star Trek Beyond
Result 5: The Matrix
Result 6: Blade Runner 2049
Result 7: Guardians of the Galaxy
Result 8: The Terminator
Result 9: Avatar
Result 10: Inception
```

First, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

To specify pagination, use `from` and `size` parameters:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty -d '
{
  "from": 3,
  "size": 2,
  "query": {
    "match": {
      "genre": "Sci-Fi"
    }
  }
}' | jq
```


The `from` parameter specifies the cutting point (3rd result), and `size` defines the number of results to return (2 results). The pagination will cut after the cutting point, which will return:

```plaintext
Result 4: Star Trek Beyond
Result 5: The Matrix
```

If `from` is not specified, the cutting point will automatically start from 0.

## Considerations 

There are some important considerations when implementing pagination in Elasticsearch:

- Deep pagination impacts performance.
- Retrieving and sorting large offsets is inefficient.
- Limit the number of results returned to avoid performance degradation.