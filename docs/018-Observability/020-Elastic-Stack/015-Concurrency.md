---
title: "Concurrency"
description: "Dealing with Concurrency in Elasticsearch"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 15
last_update:
  date: 3/28/2023
---


## Overview 

When two clients send requests to update the same document in an index simultaneously, data conflicts can occur. Elasticsearch uses **optimistic concurrency control** to ensure only one update is applied, preventing inconsistencies.

![](/img/docs/12212024-es-dealing-with-concurrency.png)


## Optimistic Concurrency Control

Elasticsearch uses a sequence number and primary term to handle simultaneous updates to the same document. These ensure updates are applied in order to avoid conflicts between requests.  

![](/img/docs/12212024-es-dealing-with-concurrency.png)

To automatically retry failed updates due to conflicts, use `retry_on_conflicts=N`, where `N` is the number of retries:  

## Handling Concurrency 

:::info 

The example below is tested on a running Elasticsearch 8, and uses a dataset containing movie ratings. For more information, please see [Importing by Bulk.](/docs/018-Observability/020-Elastic-Stack/014-Updating-Data.md#importing-by-bulk)

:::

Retrieve the movie details for id `109487`.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://127.0.0.1:9200/movies/_doc/109487?pretty | jq
```

Output:

```json
{
  "_index" : "movies",
  "_id" : "109487",
  "_version" : 4,
  "_seq_no" : 7,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "genre" : [
      "IMAX",
      "Sci-Fi"
    ],
    "title" : "The Terminator",
    "year" : 1984
  }
} 
```

We can update this document to "Interstellar" and restrict the update to this sequence number, which in this case is `7`. If someone else try to update the document, they will get fail message.

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XPUT "https://localhost:9200/movies/_doc/109487?if_seq_no=7&if_primary_term=1" \
-d '{
    "genre": ["IMAX", "Sci-Fi"],
    "title": "Interstellar",
    "year": 2014
}' | jq
 
```

It will return the seult as "updated" and with a new sequence number.

```json
{
  "_index": "movies",
  "_id": "109487",
  "_version": 5,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 10,
  "_primary_term": 1
} 
```

If we try to re-run the same `XPUT` request, we'll be faced with an error.

```json
{
  "error": {
    "root_cause": [
      {
        "type": "version_conflict_engine_exception",
        "reason": "[109487]: version conflict, required seqNo [7], primary term [1]. current document has seqNo [10] and primary term [1]",
        "index_uuid": "hQheZkZaSHOKUAvMojpyMw",
        "shard": "0",
        "index": "movies"
      }
    ],
    "type": "version_conflict_engine_exception",
    "reason": "[109487]: version conflict, required seqNo [7], primary term [1]. current document has seqNo [10] and primary term [1]",
    "index_uuid": "hQheZkZaSHOKUAvMojpyMw",
    "shard": "0",
    "index": "movies"
  },
  "status": 409
} 
```



