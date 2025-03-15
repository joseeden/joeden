---
title: "S3 Storage Classes"
description: "S3 Storage Classes"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 4
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::




## Overview

These are the different S3 Storage Classes:

- Amazon S3 Standard-General Purpose
- Amazon S3 Standard-Infrequent Access (IA)
- Amazon S3 One Zone-Infrequent Access
- Amazon S3 Intelligent Tiering
- Amazon Glacier
- Amazon Glacier Deep Archive
- AmazonS3 Reduced Redundancy Storage (deprecated)

## S3 Standard - General Purpose

- High durability (13 nines SLA) of objects across multiple AZ
- SLA: if we store 10 million objects in S3, we can expect to loose on average a single file per 10K years
- 99.99% availability per year
- It can sustain 2 concurrent facility failures

## S3 Standard - Infrequent Access

- Suitable for data that is less frequently accessed, but it should be retrieved quickly when it is needed
- Same durability as General Purpose, 99.9% availability
- Lower cost than General Purpose

## S3 One Zone - Infrequent Access

- Same as Standard IA, but data is stored in a single AZ
- Same durability as Standard IA. Data can be lost if an AZ goes down
- 99.5% availability per year
- Lower cost than IA

## S3 One Zone - Intelligent Tiering

- Automatically moves objects between two access tiers based on access patterns
- Has a small monthly monitoring fee
- Same durability as General Purpose, having availability of 99.9%

## S3 Glacier

- Low cost object storage for archiving/backup data
- Data is retained for longer terms (10s of years)
- Alternative to on-premise magnetic tape
- Same durability as General Purpose
- Cost per storage per month is really low, but we pay for data retrieval as well
- Each item in Glacier is called an **archive**, archives are stored in **Vaults**
- Provides 3 retrieval options:
    - Expedited (1 to 5 minutes): costs $10
    - Standard (3 to 5 hours)
    - Bulk (5 to 12 hours)
- Minimum storage duration for Glacier is 90 days

## S3 Glacier Deep Archive

- For very long term storage - cheaper than S3 Glacier
- Retrieval options:
    - Standard (12 hours)
    - Bulk (48 hours)
- Minimum storage duration is 180 days
 

