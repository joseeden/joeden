---
title: "Amazon DynamoDB"
description: "Fully managed NoSQL database"
tags: [Cloud, AWS, DevOps, Serverless, Certifications]
sidebar_position: 10
last_update:
  date: 7/26/2020
---



:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.

- Highly available with replication across 3 AZs.
- NoSQL database - not a relational database.
- Scales to massive workloads, distributed database.
- Fast and consistent regarding performance .
- Low latency retrieval of data.
- Integrated with IAM for security, authorization and administration.
- It enables event driven programming with DynamoDB Streams.
- It provides auto scaling capabilities at low cost.

## How DynamoDB works

- DynamoDB is made of tables.
- Each table has a primary key (must be decided at creation time).
- Each table can have an infinite number of items (rows).
- Each item has attributes which can be added over time (can be null).
- Maximum size of an item is 400KB.


## Supported data types 

- Scalar types: 
    - string
    - number
    - binary
    - null
- Document types: 
    - list
    - map
- Set types: 
    - string set
    - number set
    - binary set



## Provisioned Throughput

- Table must have a provisioned read and write capacity units.
- **Read Capacity Unit (RCU)**: throughput for reads ($0.00013 per RCU).
    - 1 RCU = 1 strongly consistent read of 4 KB per second
    - 1 RCU = 2 eventually consistent read of 4 KB per second
- **Write Capacity Unit (WCU)**: throughput for writes ($0.00065 per WCU).
    - 1 WCU =  1 write of 1 KB per second
- Option to setup auto-scaling of throughput to meet demand.
- Throughput can be exceeded temporarily using burst credits.
- If there are no more burst credits, we may get a "_ProvisionedThroughputExceptions_" in which case it is advised to do exponential back-off retry.


## DynamoDB DAX (DynamoDB Accelerator)

- Seamless cache for DynamoDB, no application re-write.
- Write go through DAX to DynamoDB.
- Micro second latency for cached reads and queries.
- Solves the Hot Key problem (too many reads on one value).
- Each cache entry has a 5 minute TTL by default.
- We can get up 10 nodes per cluster for cache.
- Multi AZ (3 nodes minimum recommended for production).
- It is secure (Encryption at rest with KMC, VPC, IAM, CloudTrail).

    ![](/img/docs/aws-dynamodb-dax.png)

 
## DynamoDB Streams

- Changes (Create, Update, Delete) can end up in a DynamoDB stream.
- This stream can be read by AWS Lambda, we can do some integrations:
    - React to changes in real time (example: welcome email to new users)
    - Analytics
    - Create derivative tables/views
    - Insert into ElasticSearch
- We can implement cross region replication using Stream.
- Streams has 24 hours of data retention.

## Concurrency 

- DynamoDB has a feature called "Conditional Update/Delete".
- This means you can ensure an item has not changed before altering it.
- This makes DynamoDB optimistic locking/concurrency database.

    ![](/img/docs/aws-dynamodb-concurrency.png)


## Throttling 

- If we exceed our RCU/WCU, we get "_ProvisionedThroughputException_"

- Reasons: 
    - Hot keys - one partition key is being read too many times.
    - Very large items - RCU and WCU depend on size of items. 
    - Hot partitions. 

- Solutions:
    - Exponential backoff when exception is encountered (already in SDK).
    - Distribute partition keys as much as possible.
    - If RCU issue, use DynamoDB DAX.



## Basic APIs 

- **DeleteItem**

    - Delete an invidual row.
    - Can perform conditional delete.

- **DeleteTable**

    - Delete whole table and all its items.
    - Much quicker deletion than calling DeleteItem on all items.

- **BatchWriteItem**

    - Operations are done in parallel for better efficiency.
    - It's possible for part of batch to fail.
    - Up to 25 PutItem and/or DeleteItem in one call.
    - Up to 16 MB of data written.
    - Up to 400 KB of data per item.

- **GetItem**

    - Read based on primary key.
    - Primary key = HASH or HASH-RANGE.
    - Eventually consistent by default.
    - Can use strongly consistent read, but will use more RCU, also takes longer.

- **BatchGetItem**

    - Up to 100 items.
    - Up to 16 MB of data.
    - Items are retrieved in parallel to minimize latency.

- **Query**

    - Returns item based on:
        - partition key value
        - sort key value
    - Up to 1 MB of data.
    - Able to do pagination.
    - Can query table, a local secondary index, or a global secondary index.

- **Scan**

    - Scans the entire table and then filter out data - inefficient.
    - Returns up to 1 MB of data.
    - Use pagination to keep on reading.
    - Consumes a lot of RCU.
    - For faster performance, use parallel scans.


## Consistency Model 

**Eventually Consistent Read**

- If we read just after a write, it's possible we'll get unexpected response because of replication.
- Used by DynamoDb by default but the following API provide a ConsistentRead parameter which you can set to True 
    - GetItem
    - Query 
    - Scan

<div class="img-center"> 

![](/img/docs/aws-ddb-consistency-model.png)

</div>


 ## Primary Keys 

- **Option 1: Partition key only (HASH)**

    - Partition key must be unique for each iterm. 
    - Partition key must be diverse so that data is distributed. 
    - Example: user_id for a users table. 

        ![](/img/docs/aws-ddb-option1.png)


- **Option 2: Partition key + Sort key**

    - Combination must be unique. 
    - Data is grouped by partition key. 
    - Sort key = range key 
    - Example: users-game table 
        - user_id for partition key 
        - game_id for sort key

        ![](/img/docs/aws-ddb-option2.png)





## New Features

- **Transactions**

    - All or nothing type of operations.
    - We can coordinate insert, update and delete operations across multiple tables.
    - Include up to 10 unique items or up to 4MB of data per transaction.

- **On-demand**

    - No capacity planning needed (WCU/RCU) - scales automatically.
    - It is 2.5x more expensive than provisioned capacity.
    - Helpful for spikes and unpredictable loads or if the application has a very low throughput.

## Other Features

- **Security**

    - We get VPC endpoints to access DynamoDB without internet.
    - IAM policies
    - Encryption at rest using AWS KMS.
    - Encryption at transit is handled by SSL/TLS.

- **Backup and restore**

    - DynamoDB provides point in time restores  (just like any RDS).
    - Backup does not have any performance impact on the tables.

- **Global tables**
    - Multi region, fully replicated, high performance.
        
- **Replication**    
    - Dynamo provides active-active replication.
    - To replicate data, DynamoDB Streams should be enabled.
    - Useful for low latency, DR purposes.

- **Migration**

    - DMS can be used to migrate data to DynamoDB (from Mongo, Oracle, MySQL, st3, etc.).


 