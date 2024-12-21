---
title: "Data Modelling"
description: "Data Modelling and Parent-Child Relationships in Elasticsearch"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 17
last_update:
  date: 3/28/2023
---

## Overview

Data modeling in Elasticsearch organizes and optimizes data for efficient storage and faster retrieval. Proper modeling ensures scalability and improves query performance.

The parent-child relationship is a key feature that links related documents without storing redundant data.

- Related data is stored in distinct documents, reducing duplication.  
- Retrieval of related data using efficient parent-child queries.  


## Normalized Data  

Normalized data reduces redundancy by dividing information into smaller, related documents. This approach optimizes storage and ensures data consistency.  

- Reduces duplication, saving storage space  
- Requires joins or multiple queries to retrieve related data  

Consider the diagram below. 

![](/img/docs/12222024-Observability-normalized-data.png)

This diagram shows how normalized data minimizes duplication:  

1. Ratings are stored in a separate table with userID, movieID, and rating.  
2. Movie details like title and genres are stored in another table.  
3. Retrieving data requires looking up ratings and titles separately.  

This structure makes it easy to update titles but requires multiple queries to fetch related information.  

For more details, please refer to the [Normalization Guide.](/docs/022-Data-Engineering/021-Database-Design/003-Schemas-and-Normalization.md)  

## Denormalized Data  

Denormalized data combines related information into a single document for faster access. This approach simplifies queries but increases storage needs.  

- Stores all necessary data together, speeding up queries  
- Increases storage usage due to repeated data  

Using the previous example, the title is included in every rating record. This allows retrieving both the rating and title in one query.

![](/img/docs/12222024-Observability-denormalized-data.png)

As shown, titles are duplicated, which uses more storage space, but the benefit is that all required information can be retrieved in a single query.


## Parent-Child Relationship 

In Elasticsearch...add simplified short intro...2 sentences..

- add short info
- add short info
- add short info