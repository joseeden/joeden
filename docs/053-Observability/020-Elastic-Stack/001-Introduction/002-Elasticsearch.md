---
title: "Elasticsearch"
description: "Basics of Elasticsearch"
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
  date: 12/30/2022
---


## Overview  

Elasticsearch is a distributed search and analytics engine initially designed for full-text search, now widely used for log analysis, metrics monitoring, and real-time data processing.  

- Built on **Apache Lucene** for indexing and search.  
- Core of the **ELK stack** for managing logs and metrics.  

## Timeline  

1. **2010**: Created by Shay Banon, released as open source.  
2. **2012**: Added multi-tenancy and clustering (v0.9).  
3. **2013**: Elastic founded; Elasticsearch 1.0 released.  
4. **2015**: Popular for log aggregation in the **ELK stack**.  
5. **2016**: X-Pack introduced for security and monitoring.  
6. **2020**: Machine learning capabilities added.  

## Logical Concepts 

Elasticsearch organizes and processes data through key logical concepts, which makes it efficient for search and analytics.

### Documents  

Data is stored as JSON **documents**, the smallest unit in Elasticsearch.  

- Each document is a unit of search and retrieval.  
- Each document has a unique ID and type.  
- Grouped into **indices** with unique IDs and types.  

### Indexing  

Indexing stores documents for fast retrieval using inverted indices.  

- Acts as a database for similar data types.  
- Supports multiple indices for organization.  

When a document is indexed, Elasticsearch creates an inverted index which allows for fast, full-text searches.

### Searching 

Elasticsearch uses **Lucene** for efficient queries.  

- Supports term, match, and boolean queries.  
- Optimized for both simple and complex searches.  

### Mapping 

Mapping specifies how documents and their fields are stored, indexed, and queried in Elasticsearch.  

- Similar to a schema in SQL, defining data types and field properties.  
- Ensures efficient storage and accurate search results.  

For more information, please see [Mappings.](/docs/053-Observability/020-Elastic-Stack/003-Mapping-and-indexing/011-Mappings.md)



The number of primary shards must be set when creating an index. However, you can add read replicas later for more throughput. If necessary, re-indexing is an option.  

- Set the number of shards upfront using a `PUT` request.  
- This is configured via Elasticsearch's REST HTTP API.  

```bash
PUT /indexname
{
    "settings": {
        "number_of_shards": 3,
        "number_of_replicas": 1
    }
} 
```