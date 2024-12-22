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

```bash
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
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
curl -s -u elastic:elastic \
-H 'Content-Type: application/json' \
-XGET https://localhost:9200/movies/_search?pretty -d '
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

## Proximity