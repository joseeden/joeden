---
title: "JSON Search"
description: "JSON Search"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
sidebar_position: 2
last_update:
  date: 3/28/2023
---


## Request Body Search 

Request body searches in Elasticsearch use structured JSON to define search parameters. It provides advanced capabilities through **Query DSL**, which offers precision and flexibility beyond query lite.  

- Enables complex queries with multiple criteria and filters  
- Easier to read and adjust than query strings  
- Advanced features like nesting, scripting, and highlighting  

Here’s an example of a request body search where we query for movies with "Star" in the title:

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
    "match": {
      "title": "star"
      }
  }
}' | jq
```



## Queries and Filters  

Elasticsearch uses queries and filters to retrieve and refine data effectively. Filters are best for binary checks, while queries focus on relevance ranking.  

- Filters evaluate conditions with a simple yes/no logic  
- Queries rank results based on relevance scores  

Filters are more efficient and cacheable This makes them suitable for repeated or non-scoring conditions.  

### Query Example

Suppose you want to search for action movies released after 2000 and group results by genre. You can use the following query:

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty" \
-d '{
  "query": {
    "bool": {
      "must": { "term": { "genre": "Action" } },
      "filter": { "range": { "year": { "gt": 2000 } } }
    }
  }
}' | jq
```

Where:

- The `must` specifies that the query must include documents matching the given term, in this case, movies in the "Action" genre.

- The `filter` applies additional conditions without affecting relevance scores, such as finding movies released after the year 2000.

:::info 

Queries are wrapped in `"query": {}` block.
Filters are wrapped in `"filter": {}` block.

:::


### Using `must_not` 

The `must_not` clause excludes documents that match certain conditions. It is often combined with other clauses for fine-tuned queries.  

In the example below, the query searches for Sci-Fi movies released between 2000 and 2015 but excludes any with "trek" in the title:  

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XGET "$ELASTIC_ENDPOINT:9200/movies/_search?pretty" -d '
{
  "query": {
    "bool": {
      "must": { "match": { "genre": "Sci-Fi" } },
      "must_not": { "match": { "title": "trek" } },
      "filter": { "range": { "year": { "gt": 2000, "lt": 2015 } } }
    }
  }
}' | jq
```  


## Common Filters 

Filters in Elasticsearch help refine searches with specific conditions, which makes data retrieval more precise. 

- **Term:** Matches documents with an exact value.  

  ```json
  {
    "term": { "year": 2014 }
  }
  ```  

- **Terms:** Matches documents if any value from a list matches.  

  ```json
  {
    "terms": { "genre": ["Sci-Fi", "Adventure"] }
  }
  ```  

- **Range:** Filters numbers/dates within a range using operators like `gt`, `gte`, `lt`, and `lte`.  

  ```json
  {
    "range": { "year": { "gte": 2010 } }
  }
  ```  

- **Exists:** Finds documents where a specific field exists.  

  ```json
  {
    "exists": { "field": "tags" }
  }
  ```  

- **Missing:** Finds documents where a specific field is absent.  

  ```json
  {
    "missing": { "field": "tags" }
  }
  ```  

- **Bool:** Combines multiple filters using Boolean logic (`must`, `must_not`, `should`).  

  ```json
  {
    "bool": { 
      "must": [...], 
      "must_not": [...], 
      "should": [...] 
    }
  }
  ```  

## Common Queries  

Queries in Elasticsearch allow you to search for specific data or patterns in documents. They can handle full-text searches, multiple fields, and relevance scoring.  

- **Match_all:** Returns all documents and is the default, often used with a filter.  

  ```json
  { "match_all": {} }
  ```  

- **Match:** Searches analyzed text fields, such as full-text search.  

  ```json
  { "match": { "title": "star" } }
  ```  

- **Multi_match:** Runs the same query on multiple fields at once.  

  ```json
  { 
    "multi_match": { 
      "query": "star", 
      "fields": ["title", "synopsis"] 
    } 
  }
  ```  

- **Bool:** Similar to a bool filter, but the results are scored based on relevance.  

  ```json
  { 
    "bool": { 
      "must": [...], 
      "should": [...], 
      "must_not": [...] 
    } 
  }
  ```  