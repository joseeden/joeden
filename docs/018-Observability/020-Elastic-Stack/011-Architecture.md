---
title: "Elasticsearch Architecture"
description: "Elasticsearch Archietcture"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 11
last_update:
  date: 3/28/2023
---


## Single-Node

A single-node Elasticsearch setup runs all processes on one machine. It is suitable for small-scale applications or testing. 

- Indexing, searching, and storage within the same node.  
- Handles data storage, indexing, and search queries in one place.  
- limited scalability, not highly available.

Recommended Node Configuration:

| Resource   | Recommended Value                                |  
|------------|--------------------------------------------------|  
| **Memory** | Allocate 50% to Elasticsearch (16GB to 32GB)     |  
| **CPU**    | Multi-core processor (4 to 8 cores).             |  
| **Disk**   | Fast SSD storage with sufficient space.          |  
| **Network**| At least 1 Gbps network connection               |  


## Clustered  

A clustered Elasticsearch setup consists of multiple nodes working together., ideal for large-scale data and high availability. It distributes tasks like 

- Indexing, searching, and storage are spread across nodes.  
- Nodes are assigned roles (e.g., master, data, or coordinating).  

Each node can serve multiple roles. By distributing tasks, the cluster can handle lagre volumes of data and high query load  efficiently.

## Namespace

A cluster in Elasticsearch provides a single namespace, making it easy to interact with data across multiple nodes.  

- Combines data from all nodes into one logical view.  
- Ensures consistent data access and coordination.  

## Node Roles   

In an Elasticsearch cluster, each node can have a specific role to handle different tasks, helping with performance, scalability, and data management.  

![](/img/docs/12192024-es-Architecture.png)

The node roles are:  

- **Master Node**  
  - Manages cluster state and metadata.  
  - Coordinates changes like adding/removing nodes.  
  - Responsible for maintaining cluster health.  

- **Data Node**  
  - Stores data and handles search and indexing operations.  
  - Responsible for query execution and storage management.  
  - Stores data in shards and replicas.  

- **Data Content**  
  - Handles the storage and search of content-related data.  
  - Can be used for managing high-volume data.  
  - Typically stores unprocessed data for fast search operations.  

- **Data Ingest**  
  - Prepares and formats data before storing in data nodes.  
  - Transforms data as it enters the system.  

- **ML Node**  
  - Runs machine learning tasks like anomaly detection.  
  - Performs predictive analytics and training.  
  - Optimized for heavy computation and data processing.  

- **Transform**  
  - Executes data transformations for analytics.  
  - Reformat and restructure data for improved analysis.  
  - Useful for large-scale data aggregation tasks.  

- **Remote Cluster Client**  
  - Interacts with remote Elasticsearch clusters.  
  - Enables cross-cluster search and aggregation.  

In addition to these roles, Elasticsearch provides specialized data storage nodes based on access frequency:

- **Data Hot**  
  - Stores recently indexed, frequently accessed data.  
  - Optimized for high-speed searches.  
  - For data workloads that need quick retrieval.  

- **Data Warm**  
  - Stores less frequently accessed data, but still searchable.  
  - Balances cost and performance for aging data.  
  - Slower to query than hot data but cheaper to store.  

- **Data Cold**  
  - Stores infrequently accessed, archived data.  
  - Optimized for long-term storage with minimal query speed.  
  - For data that doesn't require frequent searches.  

- **Data Frozen**  
  - Stores data that is rarely accessed, with extremely low cost.  
  - Long-term retention with minimal query requirements.  
  - Data retrieval is slower compared to cold nodes.  
