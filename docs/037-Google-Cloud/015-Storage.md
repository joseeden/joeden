---
title: "Storage"
description: "GCP Storage Services"
tags: 
- Cloud
- GCP 
- Google
- Google Cloud
- DevOps
- Certifications
sidebar_position: 3
last_update:
  date: 9/21/2020
---



## Overview

Using data starts with proper storage. GCP offers storage services that let businesses collect, manage, and analyze large datasets efficiently.

- Store massive amounts of data securely
- Access data quickly for analysis
- Scale storage as needs grow

GCP offers storage that grows with the business' needs.

- Petabyte-scale capacity
- Automatic replication across regions

Data is encrypted and backed up across locations, so your files and records remain safe and available at all times.

<div class='img-center'>

![](/img/docs/09282025-gcp-multi-region.png)

</div>


## Types of data and storage

Different types of data need different storage solutions.

- **Structured data**: Organized in tables with rows and columns, like a database
- **Unstructured data**: Includes images, videos, audio, or raw text, without a fixed format
- **Semi-structured data**: Partially organized, like JSON, key-value pairs, or trees

Structured data fits in **Cloud SQL**, unstructured data goes in **Cloud Storage**, and semi-structured data is ideal for **Bigtable**. Choosing the right storage ensures speed, flexibility, and scalability.

## Cloud SQL

Cloud SQL is designed for structured data.

- Stores data in tables
- Supports relational queries
- Scales as needed

Cloud SQL keeps structured data organized, accessible, and ready for analysis.

## Cloud Storage

Cloud Storage handles unstructured data.

- Stores files like images, videos, or documents
- Scales automatically
- Encrypts data for security

Cloud Storage provides safe, scalable storage for large and varied files, making data easy to manage.


## Bigtable

Some data is shaped like a tree. For example, an organization chart starts with the CEO and branches down to all employees.

- Cannot fit well in rows and columns
- Works better with non-relational storage

Bigtable is designed for both relational and non-relational data, including tree-like data.

- Handles massive workloads
- Provides low latency and high throughput

It is well-suited for industries like IoT, finance, advertising, and streaming data, where handling information quickly and at large scale is critical.

<div class='img-center'>

![](/img/docs/09282025-google-bigtable.png)

</div>