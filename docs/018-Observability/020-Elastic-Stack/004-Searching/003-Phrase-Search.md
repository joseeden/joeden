---
title: "Phrase Search"
description: "Phrase Search"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 3
last_update:
  date: 3/28/2023
---

## Overview 

Phrase search looks for terms in the exact order and ensures more accurate results. It's useful when searching for specific phrases or word sequences.

- Terms must appear in the correct order  
- Works for exact phrases or words near each other  
- Ideal for searching quotes or specific combinations of words

For example, you can use this query to search for "Star Wars":

:::info 

Store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

:::


```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty -d '
{
  "query": {
    "match_phrase": {
      "title": "star wars"
    }
  }
}' | jq
```


## Slop 

Slop allows for flexibility in the word order while still finding relevant results. It helps when terms can be close to each other but not in the exact sequence.

- Order matters, but some words can be between the terms  
- Useful for allowing variations in word placement

Using the previous example, we can specify `slop` to allow some flexibility in the word order:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty -d '
{
  "query": {
    "match_phrase": {
      "title": {
        "query": "star beyond", "slop": 1
        }
     }
  }
}' | jq
```

The query above will match these records:

- "Star Trek Beyond"
- "Star Wars Beyond"
- "Beyond Star"

## Proximity Queries

Proximity queries allow you to search for terms that are close to each other in a document. These queries rank results based on how close the terms are, with terms closer together being ranked higher.

- Since it's a query, results are sorted by relevance.  
- You can use slop to control how far apart the terms can be.  

To get documents containing the words in your phrase but with closer terms receiving a higher score, you can use a high slop value:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET $ELASTIC_ENDPOINT:9200/movies/_search?pretty -d '
{
  "query": {
    "match_phrase": {
      "title": {
        "query": "star beyond", "slop": 100
        }
     }
  }
}' | jq
```

## Examples 

:::info 

The following examples have been tested on Elasticsearch 8.

:::


#### Keyword Matching

Import the **movies** dataset.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty \
--data-binary @movies.json 
```

Run the query below to search for "Star Wars" films.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty=true" -d'
{
  "query": {
    "match": {
      "title": "star wars"
    }
  }
}' | jq
```

Notice that the query returned both "Star Wars" and "Star Trek" movies. This is because the query treats "star" and "wars" independently, so it matches any title containing either term. 

```json
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 2,
      "relation": "eq"
    },
    "max_score": 1.5458014,
    "hits": [
      {
        "_index": "movies",
        "_id": "122886",
        "_score": 1.5458014,
        "_source": {
          "id": "122886",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
          "genre": [
            "Action",
            "Adventure",
            "Fantasy",
            "Sci-Fi",
            "IMAX"
          ]
        }
      },
      {
        "_index": "movies",
        "_id": "135569",
        "_score": 0.8025915,
        "_source": {
          "id": "135569",
          "title": "Star Trek Beyond",
          "year": 2016,
          "genre": [
            "Action",
            "Adventure",
            "Sci-Fi"
          ]
        }
      }
    ]
  }
} 
```


#### Phrase Matching

Now, let's use phrase matching to get more precise results:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty=true" -d'
{
  "query": {
    "match_phrase": {
      "title": "star wars"
    }
  }
}' | jq
```

This time, we only get the correct match because `match_phrase` requires the terms to appear in the exact order.

```json
{
  "took": 7,
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
    "max_score": 1.5458014,
    "hits": [
      {
        "_index": "movies",
        "_id": "122886",
        "_score": 1.5458014,
        "_source": {
          "id": "122886",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
          "genre": [
            "Action",
            "Adventure",
            "Fantasy",
            "Sci-Fi",
            "IMAX"
          ]
        }
      }
    ]
  }
} 
```

