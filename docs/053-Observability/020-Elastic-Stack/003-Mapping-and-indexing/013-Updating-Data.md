---
title: "Updating Data"
description: "Updating Data in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 13
last_update:
  date: 12/30/2022
---

## Overview  

You can update existing documents in Elasticsearch using simple `curl` requests. Updates can be performed for a single document or in bulk for multiple documents.  

In the following examples, we'll be using movie datasets to test Elasticsearch functionality.

## Pre-requisites 

- [Setup Elasticsearch](/docs/053-Observability/020-Elastic-Stack/002-Setting-up/001-Using-Vagrant-and-VirtualBox.md)
- [Install jq](https://www.scaler.com/topics/linux-jq/)


## Adding a Mapping 

First, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

Connect to your Elasticsearch node and run the following command. This sets up a mapping for the `movies` index.  

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT:9200/movies -d '
{
  "mappings": {
    "properties": {
        "year": {
            "type": "date"
        }
    }
  }
}'
```

Output: 

```bash
{"acknowledged":true,"shards_acknowledged":true,"index":"movies"}
```

To verify the mappings, run the following `GET` request:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_mapping | jq
```

Output:

```json
{
  "movies": {
    "mappings": {
      "properties": {
        "year": {
          "type": "date"
        }
      }
    }
  }
}
```

:::info 

You need to [install `jq`](https://www.scaler.com/topics/linux-jq/) to format the output as properly structured JSON.

:::


## Inserting Data 

Insert a `movie` document into the movies index using the following command:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPOST $ELASTIC_ENDPOINT:9200/movies/_doc/109487 -d '
{
    "genre": ["IMAX", "Sci-Fi"],
    "title": "Interstellar",
    "year": 2014
}' | jq
```

Output:

```json
{
  "_index": "movies",
  "_id": "109487",
  "_version": 2,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 1,
  "_primary_term": 1
}
```

To retrieve the document, run this search query:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty | jq 
```

Output:

```json
{
  "took": 217,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "movies",
        "_id": "109487",
        "_score": 1,
        "_source": {
          "genre": [
            "IMAX",
            "Sci-Fi"
          ],
          "title": "Interstellar",
          "year": 2014
        }
      }
    ]
  }
}
```

## Importing by Bulk 

Bulk importing allows you to efficiently index multiple documents in Elasticsearch.

For this example, download the following datasets:

- [movies.json](@site/assets/elastic-stack/movies.json)

To import the dataset into Elasticsearch:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
--data-binary @movies.json \
-XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty 
```

Output:

```json
{
  "took" : 201,
  "items" : [
    {
      "create" : {
        "_index" : "movies",
        "_id" : "135569",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 2,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "create" : {
        "_index" : "movies",
        "_id" : "122886",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 3,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "create" : {
        "_index" : "movies",
        "_id" : "58559",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 4,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "create" : {
        "_index" : "movies",
        "_id" : "1924",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 5,
        "_primary_term" : 1,
        "status" : 201
      }
    }
  ]
} 
```

After importing, you can retrieve all documents using a `GET` request:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty | jq 
```


## Updating Data

In Elasticsearch, documents are immutable, which means they can't be changed after being written. However, updates are possible using versioning.

- Every document has a `_version` field.
- Updates create a new document with an incremented version number.
- Older versions are marked for deletion and removed during cleanup.

When an update request is sent:

1. A new document is created with the updated content and an incremented version number.
2. Elasticsearch marks the old document as deleted.
3. During cleanup, older versions are purged to free up space.

As an example, let's retrieve a specific movie from our `movie` index:

```bash
curl -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_doc/109487?pretty
```

It will return the movie "Interstellar":

```bash
{
  "_index" : "movies",
  "_id" : "109487",
  "_version" : 2,
  "_seq_no" : 1,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "genre" : [
      "IMAX",
      "Sci-Fi"
    ],
    "title" : "Interstellar",
    "year" : 2014
  }
} 
```

we can update the movie title for the id `109487` by running:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT:9200/movies/_doc/109487?pretty -d '
{
    "genre": ["IMAX", "Sci-Fi"],
    "title": "The Terminator",
    "year": 1984
}' | jq
```

Output:

```json
{
  "_index": "movies",
  "_id": "109487",
  "_version": 4,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 7,
  "_primary_term": 1
} 
```

:::info

The version number will return the number of times the record has been updated. In my case, I've ran the previous `curl` command a couple of times.

:::

## Deleting Data

Deleting data in Elasticsearch is straightforward. You can delete a single document or multiple documents as needed.

To use as example, search the `id` of the movie "The Dark Knight".

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?q=Dark | jq
```

Output:

```json
....
    "hits": [
      {
        "_index": "movies",
        "_id": "58559",
        "_score": 1.5442266,
        "_source": {
          "id": "58559",
          "title": "Dark Knight, The",
          "year": 2008,
          "genre": [
            "Action",
            "Crime",
            "Drama",
            "IMAX"
          ]
        }
      }
```

Delete this movie from the index by running:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XDELETE  $ELASTIC_ENDPOINT:9200/movies/_doc/58559?pretty
```

Output:

```json
{
  "_index" : "movies",
  "_id" : "58559",
  "_version" : 2,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 8,
  "_primary_term" : 1
} 
```

Now try to search the keyword "Dark" It shuld not return any hits this time.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?q=Dark | jq
```

Output:

```bash
{
  "took": 8,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 0,
      "relation": "eq"
    },
    "max_score": null,
    "hits": []
  }
} 
```