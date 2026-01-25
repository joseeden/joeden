---
title: "Partial Matching"
description: "Partial Matching in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 7
last_update:
  date: 12/30/2022
---

## Overview

Partial matching allows you to search for documents that partially match a given value. This is useful when you want to match substrings or patterns within a field using techniques like `prefix` or `wildcard`.

- `prefix` matches terms that start with a specified string.  
- `wildcard` for flexible pattern matching, including the use of `*` and `?`.


## Prefix

Prefix matching is used to search for documents that have a field value starting with a given prefix. It is particularly useful for autocomplete or searching for documents based on the beginning of a string.

- Prefix queries are faster when the prefix is short.  
- Can be used with `keyword` or `text` fields.

Consider an index containing films with different genres. We can use the prefix query to match films with a specific prefix in the year field.

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
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty" -d '
{
  "query": {
    "prefix": {
      "year": "201"
    }
  }
}' | jq
```  

This will retrieve all movies where the `year` field starts with 201, covering years 2010 to 2019.



## Wildcard

Wildcard queries allow for more flexible pattern matching using `*` (matches any character sequence) and `?` (matches a single character). This allows you to find documents with more complex patterns.

- Wildcards are more flexible but can be slower for large datasets.  
- Can be used to match parts of words or phrases.

Using the previous example, we can use the wildcard query to match movies from years that start with `2`.

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty" -d '
{
  "query": {
    "wildcard": {
      "year": "2*"
    }
  }
}' | jq
```  

This query will retrieve all movies where the `year` field starts with `2`, matching any year in the 2000s.