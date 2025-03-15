---
title: "Amazon RDS"
description: "Relational database service"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 2
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Overview

Amazon RDS is a managed database service for relational databases

- Provides cost-efficient, resizable capacity
- AWS manages common database administration tasks.
- AWS provisions an EC2 instance behind the scenes and EBS Volume

## DB Engines supported

A DB engine is the specific relational database software that runs on your DB instance. Amazon RDS currently supports the following engines:

- MySQL
- PostreSQL
- Oracle
- Microsoft SQL Server
- Aurora
- MariaDB

## Advantages and Disadvantages

**Advantages:**

    - Security through IAM, security groups, KMS, SSL.
    - Backup/Snapshot/Point in time restore functionality.
    - Support for multi AZ deployment.
    - Read replicas.
    - Monitoring happens through CloudWatch.
    - Managed and scheduled maintenance.
    - Pay per hour based on provisioned EC2 and EBS.
    - Scaling capability (vertical and horizontal).
    - Storage backed by EBS (GP2 or IO).

**Disadvantages:**

    - No SSH into the instance which hosts the database.


## Use cases

- Store relational datasets.
- Perform SQL queries.
- Transactional inserts, deletes, updates.

## RDS Backups

Backups are automatically enabled in RDS. AWS RDS provides automated backups:

- Daily fill backup of the database (during the maintenance window).
- Transaction logs are backed-up by RDS every 5 minutes which provides the ability to do point in time restores.
- There is a 7 day retention for the backups which can be increased to 35 days.

DB Snapshots:

- There are manually triggered backups by the users.
- Retention can be as long as the user wants.
- Helpful for retaining the state of the database for longer period of time.

## RDS Read Replicas

Read replicas helps to scale the read operations.

- We can create up to 5 read replicas
- These replicas can be within AZ, cross AZ or in different regions
- The data between the main database and the read replicas is replicated **asynchronously** - reads are eventually consistent
- Read replicas can be promoted into their own database
- Read replicas are used for SELECT operations (not INSERT, UPDATE, DELETE)

Use case for read replicas:

- Production database is up and running taking on normal load
- There is a new feature for running some reporting for analytics which may cause slow downs and may overload the database
- To fix this we can create read replicas for reporting

Network cost for read replicas:

- In AWS there is network cost if data goes from one AZ to another
- In case of cross AZ replication, additional costs may incur because of network traffic
- To reduce costs, we could have the read replicas in the same AZ

## RDS Multi AZ (Disaster Recovery)

- RDS Multi AZ replication is done using **synchronous** replication.
- In case of multi AZ configuration we get one DNS name.
- In case of the main database goes down, the traffic is automatically re-routed to the failover database.
- Multi AZ is not used for scaling.
- The read replicas can be set up as Multi AZ for Disaster Recovery.

 
