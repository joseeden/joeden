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

For more information, please see [Mappings.](/docs/018-Observability/020-Elastic-Stack/003-Mapping-and-indexing/011-Mappings.md)

## Sharding  

Elasticsearch is designed to scale horizontally, which means it can grow by adding more nodes to the cluster. It scales by distributing data across shards which ensures efficient storage and retrieval.

![](/img/docs/01062025-elasticsearch-sharding.png)

As demand increases, additional nodes can be added to the cluster, and more shards can be created for better scaling.

- **Shards**  
  Indexes are divided into smaller units called shards. Each shard acts as an independent, self-contained index, distributed across multiple nodes in the cluster.

- **Scalability**  
  As demand increases, additional nodes can be added to the cluster. Elasticsearch can create more shards to handle the growing workload effectively.

- **Parallel Processing**  
  Elasticsearch allows search and indexing operations to run concurrently by distributing data across shards, improving speed and efficiency.

- **Fault Tolerance**  
  In case of node failure, Elasticsearch relocates affected shards to other live nodes, maintaining system availability and performance.

- **Rebalancing**  
  Elasticsearch monitors the cluster continuously, moving shards automatically to optimize resource utilization. Processing happens across different nodes based on their assigned labels.

- **Shard Sizing**  
  Larger shards are better for bulk indexing, while smaller shards improve flexibility for scaling and rebalancing. Choosing the right shard size depends on the hardware and specific use case.

## Primary and Replica Shards  

Elasticsearch uses primary and replica shards to store and balance data. **Primary shards** hold the main data, while **replica shards** provide redundancy and improve read performance in a cluster with multiple nodes.  

- **Data Redundancy**  
  Replicas create multiple copies of your data across different nodes. This ensures data availability even if a node fails.  

- **High Availability**  
  Redundant data ensures uninterrupted service by keeping your data accessible at all times.  

- **Increased Read Capacity**  
  Read requests are distributed across multiple copies of the data, reducing the load on individual nodes and enabling simultaneous query handling.  

- **Configurable per Index**  
  The number of replica shards can be set for each index based on redundancy and performance requirements. More replicas improve availability but consume additional storage space.  

- **Automatic Shard Allocation**  
  Elasticsearch automatically assigns shards to nodes in the cluster. This ensures optimal resource utilization and load balancing.  

- **Shard Recovery**  
  When a primary shard fails, Elasticsearch promotes a replica shard to primary. It then rebalances the cluster to maintain data integrity and continuity.  

- **Zero Downtime Scaling**  
  Elasticsearch allows scaling without downtime. New nodes can be added to the cluster, and shards are redistributed seamlessly.  
  
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