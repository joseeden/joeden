---
title: "Concurrency"
description: "Dealing with Concurrency in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 14
last_update:
  date: 3/28/2023
---


## Overview 

When two clients send requests to update the same document in an index simultaneously, data conflicts can occur. Elasticsearch uses **optimistic concurrency control** to ensure only one update is applied, preventing inconsistencies.

![](/img/docs/12212024-es-dealing-with-concurrency.png)


## Optimistic Concurrency Control

Elasticsearch uses a sequence number and primary term to handle simultaneous updates to the same document. These ensure updates are applied in order to avoid conflicts between requests.  

![](/img/docs/12212024-es-dealing-with-concurrency-2.png)

To automatically retry failed updates due to conflicts, use `retry_on_conflicts=N`, where `N` is the number of retries:  

## Handling Concurrency 

:::info 

The example below is tested on a running Elasticsearch 8, and uses a dataset containing movie ratings. For more information, please see [Importing by Bulk.](/docs/018-Observability/020-Elastic-Stack/ 003-Mapping-and-indexing/013-Updating-Data.md#importing-by-bulk)

:::

Retrieve the movie details for id `109487`.

```bash
curl -s -u elastic:<password> \
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

We can update this document to "Interstellar" while restricting the update to the sequence number `7`. If someone else attempts to update the document, they will receive an error.

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XPUT "https://localhost:9200/movies/_doc/109487?if_seq_no=7&if_primary_term=1" \
-d '{
    "genre": ["IMAX", "Sci-Fi"],
    "title": "Interstellar",
    "year": 2014
}' | jq
```

The result will indicate that the document was "updated" and show a new sequence number.

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

If we attempt to rerun the same `XPUT` request, an error will occur.

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

## Using Retry 

First, retrieve the document and take note of the current `version` and `sequence number`.

```bash
curl -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_doc/109487?pretty | jq
```

Output:

```json 
{
  "_index": "movies",
  "_id": "109487",
  "_version": 9,
  "_seq_no": 14,
  "_primary_term": 1,
  "found": true,
  "_source": {
    "genre": [
      "IMAX",
      "Sci-Fi"
    ],
    "title": "Interstellar",
    "year": 2014
  }
}
```

Open two terminals. In the first terminal, paste the following but do not execute it yet.

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XPOST "https://localhost:9200/movies/_update/109487?retry_on_conflict=5" \
-d '{
    "doc": {
        "title": "Terminator 2: Judgment Day",
        "year": 1991    
        }
}' | jq
```

On the second terminal, paste the following command to update it to a different movie title but still use the `retry_on_conflict` parameter. Run the commands in both terminals consecutively.


```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XPOST "https://localhost:9200/movies/_update/109487?retry_on_conflict=5" \
-d '{
    "doc": {
        "title": "Terminator 3: Rise of the Machines",
        "year": 2003    
        }
}' | jq
```

Both requests will return similar outputs. To check if both succeeded, retrieve the document again using the `XGET` command.

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_doc/109487?pretty
```

The document have been updated twice, as seen in the version number (previously 9, now 11).

```json
{
  "_index": "movies",
  "_id": "109487",
  "_version": 11,
  "_seq_no": 16,
  "_primary_term": 1,
  "found": true,
  "_source": {
    "genre": [
      "IMAX",
      "Sci-Fi"
    ],
    "title": "Terminator 3: Rise of the Machines",
    "year": 2003
  }
} 
```