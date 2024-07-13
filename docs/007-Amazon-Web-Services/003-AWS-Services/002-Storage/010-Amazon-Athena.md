---
title: "Amazon Athena"
description: "Serverless, interactive analytics service"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 10
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

Athena is a serverless interactive query service which makes it easy to search and analyze data in AWS S3 using SQL.

The source data is stored on S3 and Athena can read from this data. In Athena you are defining a way to get the original data and defining how it should show up for what you want to see.

- Serverless service to perform analytics directly against S3 files
- Uses schema-on-read, the original data is never changed and remains in its original form.
- The schema which you define in advance, modifies data in flight when its read.
- It provides a JDBC/ODBC driver

## How Athena works

- Tables are defined in advance in a data catalog and data is projected when read. 
- It allows SQL-like queries on data without transforming the data itself.
- This can be saved in the console or fed to other visualization tools.
- Original data setis optimized which reduces the amount of space used for the data and the costs for querying that data.

## Pricing

- We are charged per query amount of data scanned, we are billed for what are we using.

## Supported file formats

- csv, json, orc, Avro, Parquet. 
- In the back-end it uses Presto query engine

## Uses cases 

- Business intelligence
- Analytics
- Reporting
- Log analysis

## How to get started

1. Create an S3 bucket with data in a supported format.
2. Create an Athena database.  
3. Create an Athen external table pointing to the S3 bucket.
4. Search data in Athena using normal SQL (Select).
