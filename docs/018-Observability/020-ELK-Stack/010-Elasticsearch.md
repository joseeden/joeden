---
title: "Elasticsearch"
description: "Basics of Elasticsearch"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 10
last_update:
  date: 3/28/2023
---


## Elasticsearch and its Evolution  

Elasticsearch is a distributed search and analytics engine, originally built for full-text search but now widely used for log analysis, metrics monitoring, and real-time data processing.

- Initially designed for search, now supports analytics and logging.
- Built on the **Apache Lucene** library for indexing and search.
- A key component of the **ELK stack** for log and metric management.

Timeline:

1. **2010**: Created by Shay Banon, released as open-source.
2. **2012**: Version 0.9 introduced multi-tenancy and clustering.
3. **2013**: Elastic was founded, Elasticsearch 1.0 released.
4. **2015**: Widely adopted for log aggregation in the **ELK stack**.
5. **2016**: X-Pack added for security and monitoring.
6. **2020**: Introduced machine learning, enhancing its capabilities.

## Logical Concepts 

Elasticsearch organizes and processes data through key logical concepts, making it efficient for search and analytics.

- **Documents**  
    - Represent the items you're searching for.  
    - Each document has a unique ID and type.  
    - Stores data in JSON format for flexibility.  
    - Serves as the smallest unit of data in Elasticsearch.  

- **Index**  
    - Groups documents to enable searching within a collection.  
    - Acts as a database for storing similar types of data.  
    - Supports multiple indices for organizing data.  
    - **Inverted Indices**: Allows fast full-text search by mapping terms to document locations.  
    - **Mappings**: Define schemas for the data structure within an index.  

## How Elasticsearch Scales  

Elasticsearch scales by distributing data across shards. Documents are hashed to a specific shard, ensuring efficient data storage and retrieval.  

- An index is divided into smaller units called shards.  
- Each shard can reside on a different node within a cluster.  
- Every shard operates as an independent Lucene index.  

This design allows shards to spread across multiple machines in a cluster. As demand grows, additional machines can be added to the cluster, and more shards can be created to balance the load efficiently.

- Elasticsearch supports replication, ensuring data is available even if a node fails.  
- Queries are distributed across shards for faster search and retrieval.  
- Horizontal scaling is seamless, enabling easy capacity expansion.  
- The system ensures balanced resource utilization across nodes.


## Primary and Replica Shards 

Elasticsearch uses primary and replica shards to store and balance data. In a cluster with multiple nodes, **primary shards** hold the main data, while **replica shards** provide redundancy and improve read performance.  

In the example below, the cluster has three nodes, each with two shards:  

- **Node-1**: Primary shard (primary-1) and a replica (replica-0).  
- **Node-2**: Two replicas (replica-0 and replica-1).  
- **Node-3**: Primary shard (primary-0) and a replica (replica-1).  

![](/img/docs/12102024-Observability-elasticsearch-wth.png)  

This setup has two primary shards and two replicas:  

- Write requests routed to primary shards and replicated to replicas.  
- Read requests handled by primary or replica shards to balance load.  

If **Node-1** goes down, Elasticsearch promotes a replica from **Node-2** or **Node-3** as the new primary, maintaining availability.  

- Odd-numbered nodes (e.g., 3, 5, 7) improve resiliency.  
- Requests are distributed round-robin to balance the load.  
- More replicas increase read capacity.  
- Write capacity is limited by the number of primary shards.  



## Number of Primary Shards cannot be changed later

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