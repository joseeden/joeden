---
title: "Elasticsearch SQL"
description: "Elasticsearch SQL"
tags: 
- Linux
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 6
last_update:
  date: 3/28/2023
---

## Overview

Elasticsearch SQL lets you query data in Elasticsearch using SQL syntax. You can run queries from the Elastic Cloud console or directly via the terminal.  

If you're using Elastic Cloud, go to **Management > DevTools**, enter your SQL commands in the Console Editor, and click the **Play** button to see results.  

![](/img/docs/01302025-elastic-cloud-elasticsearch-sql.png)  

If you are using a self-managed Elasticsearch cluster, you can run SQL queries from the terminal using `curl`:  

```bash
curl -XPOST https://add-your-endpoint-here/_xpack/sql?format=txt -d '
{
  "query": "DESCRIBE index-name-here" 
}' 
```  

## How it Works  

Elasticsearch SQL processes queries in several steps:  

1. **Parser**: Converts the SQL query into an internal abstract syntax tree (AST) and validates it.  
2. **Analyzer**: Matches tables, columns, and functions to the underlying indices and creates a logical execution plan.  
3. **Query Planner**: Optimizes the logical plan by removing redundant operations and generates a physical plan.  
4. **Query Executor**: Runs the physical plan to execute the query. Returns the query results to the client.  

Here’s a diagram illustrating the Elasticsearch SQL query execution process:

```graphql
SQL Query  
    │  
    ▼  
Parser  
    │  
    ▼  
Analyzer  
    │  
    ▼  
Query Planner  
    │  
    ▼  
Query Executor  
    │  
    ▼  
Query Results  
```


## Pre-requisites 




## Importing the Dataset  

Next, store the Elasticsearch endpoint and credentials in variables:  

```bash
ELASTIC_ENDPOINT="https://your-elasticsearch-endpoint:9200"
ELASTIC_USER="your-username"
ELASTIC_PW="your-password"
```  

Verify you can reach by running this from the Elasticsearch node.

```bash
$ curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-XGET $ELASTIC_ENDPOINT:9200

{
  "name" : "node1",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "UYlLyPlmRkGGSHGZQxUIhw",
  "version" : {
    "number" : "8.17.0",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "2b6a7fed44faa321997703718f07ee0420804b41",
    "build_date" : "2024-12-11T12:08:05.663969764Z",
    "build_snapshot" : false,
    "lucene_version" : "9.12.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
} 
```

Next, import the dataset...download file here: [movies.json](@site/assets/elastic-stack/movies.json)

```bash
curl -s -u $ELASTIC_USER:$ELASTIC_PW \
-H 'Content-Type: application/json' \
-XPUT $ELASTIC_ENDPOINT:9200/_bulk?pretty  \
--data-binary @movies.json 
```


## Using curl 



