---
title: "Sorting"
description: "Sorting in Elasticsearch"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 5
last_update:
  date: 3/28/2023
---

## Overview

Sorting allows you to order search results based on specific fields. You can sort by one or multiple fields in ascending or descending order.  

- Sort fields can include text, numbers, dates, or relevance scores.  
- Sorting is efficient but may require properly mapped fields.  

Consider an index containing films with different genres. We can sort the films by release dates by running:

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET "https://127.0.0.1:9200/movies/_search?sort=year&pretty"
```

## Dealing with Strings  

Sorting on analyzed string fields isn’t possible as they are stored as terms in the inverted index. You need a non-analyzed version for sorting.  

- Use `keyword` fields for sorting.  
- Store both analyzed and non-analyzed versions if needed.  
- Avoid sorting on text fields.

Using the previous example, try sorting by `title`. Since titles are stored as analyzed strings, running the query below will result in an error:

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET "https://127.0.0.1:9200/movies/_search?sort=title&pretty"
```

Expected error:

```bash
"type" : "search_phase_execution_exception",
"reason" : "all shards failed",
"phase" : "query",
"grouped" : true,
"failed_shards" : [
  {
    "shard" : 0,
    "index" : "movies",
    "node" : "jessZFfOTCixl-lvGUfrvA",
    "reason" : {
      "type" : "illegal_argument_exception",
      "reason" : "Fielddata is disabled on [title] in [movies]. Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default. Please use a keyword field instead. Alternatively, set fielddata=true on [title] in order to load field data by uninverting the inverted index. Note that this can use significant memory."
    }
  }
]

```

To enable sorting, set up a non-analyzed subfield. This allows sorting while maintaining full-text search capabilities on the primary field.

## Workaround: Subfields for Sorting  

To enable sorting using strings, create a subfield that is not analyzed. Note that you can't change the mapping on an existing index, so you'll have to delete it, set up a new mapping, and re-index it.

:::info 

Like recreating the number of shards, deleting the mapping to add a subfield requires careful consideration.

:::


For example:  

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XPUT "https://127.0.0.1:9200/movies/" -d '
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      }
    }
  }
}'
```  

This setup allows sorting on `title.raw` while keeping `title` for full-text search. We can then use the `title` for full-text search and the 'title.raw` for sorting purposes. 

To sort on the raw keyword field:

```bash
curl -s -u elastic:<password> \
-H 'Content-Type: application/json' \
-XGET "https://127.0.0.1:9200/movies/_search?sort=title.raw&pretty"
```

 