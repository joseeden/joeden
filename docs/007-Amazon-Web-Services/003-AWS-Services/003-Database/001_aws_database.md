---
title: "AWS Databases"
description: "Different database options in AWS"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Choosing the Right Database

The following are some of the guideline questions to ask when choosing the database to use:

- Is the workload read-heavy, write-heavy or balanced? 
- What are the throughput needs? 
- Will the throughput change, fluctuate or will we have to scale the DB over time?
- How much data do we store and for how long? 
- Will the size of the data grow? 
- What is the average size of an object in the DB? How frequently are these objects accessed?
- Should the data be stored for a week or forever? 
- Is the database going to be a source of truth?
- What are the latency concerns?
- What is the data model? 
- How will the data be queried? 
- Will the data be structured, semi-structured or unstructured?
- Do we need strong schema or flexible schema? 
- Do we need reporting? Do we need advanced search?
- What are the license costs? 
- Can we switch to a cloud native database such as Aurora, DynamoDB, etc?

 


## Database Types on AWS

Database Types | AWS Service | Description |
---------|----------|----------|
| RDBMS (SQL/OLTP) | RDS <br /> Aurora | Great for joins and normalized data |
| NoSQL | DynamoDB <br /> ElastiCache (key/value pairs) <br /> Neptune (graphs) <br /> DocumentDB (json) | No joins, no SQL
| Object Store | S3 (for big objects) <br /> Glacier (for backups, archive) | For object storage and archival
| Data Warehouse | Redshift (OLAP) <br /> Athena | SQL Analytics / BI Use cases
| Search | ElasticSearch (JSON) | Free text, unstructured searches |
| Graphs | Neptune | Displays relationships between data |

## Amazon Relational Databases (RDS)

Amazon RDS is a managed database service for relational databases

- Provides cost-efficient, resizable capacity
- AWS manages common database administration tasks.
- AWS provisions an EC2 instance behind the scenes and EBS Volume

## Aurora

Amazon Aurora (Aurora) is a fully managed relational database engine that's compatible with MySQL and PostgreSQL.

- Data is held in 6 replicas across 3 AZs
- Up to 15 read replicas (only 5 for RDS)
- It has some auto healing capabilities
- Auto scaling read replicas which can be global
- Can be global, for disaster recovery purposes or latency purposes
- Auto scaling of storage form 10GB to 64TB
- We define an EC2 instance for Aurora instances
- Same security, monitoring and maintenance features as RDS
- Aurora has a serverless option

Use cases:

- Similar to RDS, but with less maintenance, more flexibly, more performant at a higher cost

 

## ElastiCache

Managed Redis or Memcached which provides a high performance, resizable, and cost-effective in-memory cache, while removing complexity associated with deploying and managing a distributed cache environment.

- In-memory data store, sub-millisecond latency
- Must provision and EC2 instance type
- Offers support for clustering (Redis)
- Multi AZ
- Read replicas (sharding)
- Security through IAM, SG, KMS, Redis Auth
- Backups, snapshots and point in time restore (for Redis)
- It has managed and scheduled maintenance
- Monitoring happens through CloudWatch

**Uses cases**

- Key/value store
- Frequent reads, less writes
- Cache results for DB queries
- Store session data for websites

 

## DynamoDB

Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance. 

- Managed NoSQL database, proprietary to AWS
- Serverless, provisioned capacity
- Supports auto scaling, provides on demand capacity as well
- Can replace ElastiCache as a key/value store
- Highly available, Multi AZ by default\
- Reads and writes are decoupled, DAX for read cache
- Reads can be eventually consistent or strongly consistent
- Security, authentication and authorization is done through IAM
- Enable DynamoDB Streams to stream all the changes in DynamoDB and integrate with AWS Lambda
- Provides backup/restore features, Global Table feature
- Monitoring is done through CloudWatch
- The tables can only be queried on primary key, sort key or indexes

Use cases:

- Serverless application development
- Distributed serverless cache

 

## Redshift

Amazon Redshift is a fast, fully managed, petabyte-scale data warehouse service that is optimized for datasets ranging from a few hundred gigabytes to a petabyte or more and costs less than $1,000 per terabyte per year, a tenth the cost of most traditional data warehousing solutions.

- Redshift is based on PostgreSQL, but it's not used for OLTP
- It's **OLAP - only analytical processing (analytics and data warehousing)**
- 10x better performance than other data warehouses, scales to PBs of data
- Columnar database - data is stored in columns
- Massively parallel query execution (MPP), highly available
- Pay as you go based on the instances provisioned
- Has a SQL interface for performing the queries
- Great to use with BI tools such as AWS Quicksight or Tableau
- Data is loaded form S3, DynamoDB, Database Migration Service (DMS), other DBs
- Can scale from 1 node up to 128 nodes, up to 160 GB of space per node
- Node types: compute nodes for performing queries, result is sent to leader nodes
- Redshift Spectrum: perform queries directly against S3 (no need to load the data)
- Provides backup and restore
- Security is accomplished with VPC/IAM/KMS
- Redshift Enhanced VPC Routing: COPY/UNLOAD goes through VPC

### Redshift Snapshots and Disaster Recovery

- Snapshots are point-in-time backups of a cluster, stored internally in S3
- Snapshots are incremental (only what has changed is saved)
- Snapshots can be restored into new Redshift clusters
- Snapshots can be automated: every 8 hours, every 5 GB, or on schedule
- Manual snapshots: snapshots are retained until we delete them
- We can configure Redshift to automatically copy snapshots to another regions

### Redshift Spectrum

- Data can be queried from S3 without the need to load it into Redshift
- We must have a Redshift cluster available to start the query
- The query is then submitted to thousands of Redshift Spectrum nodes

 

## Neptune

Amazon Neptune is a fast, reliable, fully managed graph database service that makes it easy to build and run applications that work with highly connected datasets.

- Highly available across 3 AZ, up to 15 read replicas
- Provides point-in-time recovery, continuous back-up to S3
- Support for KMS encryption at rest + HTTPS

Use cases:

- Highly relational data
- Social networking
- Knowledge graphs

 

## OpenSearch

OpenSearch is a fully open-source search and analytics engine for use cases such as log analytics, real-time application monitoring, and clickstream analysis.

- Can search any field, as well as partial matches 
- Complement to another database
- We can provision a cluster of instances
- Built-in integration with:
    - Amazon Kinesis Data Firehose
    - AWS IoT 
    - Amazon CloudWatch Logs for data ingestion
- Security through Cognito and IAM, KMS encryption, SSL and VPC
- Comes with Kibana and Logstahs - ELK stack

 
