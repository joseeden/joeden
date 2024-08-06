---
title: "OLAP and OLTP"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 1
last_update:
  date: 2/27/2022
---

## How should we manage data?

- **Schemas**: *How should my data be logically organized?*
- **Normalization**: *Should my data have minimal dependency and redundancy?*
- **Views**: *What joins will be done most often?*
- **Access Control**: *Should all users of the data have the same level of access?*
- **DBMS**: *How do I pick between all the SQL and NoSQL options?*

## Approaches to Data Processing 

Two main approaches, OLTP and OLAP, serve different purposes in processing data.

- **OLTP**
  - Designed for handling routine transactions quickly.
  - Used for tasks like tracking book prices and processing sales.
  - Supports daily operations with frequent, simple tasks.
  - Accessible to a wide range of users for smooth operations.

- **OLAP**
  - Focuses on long-term data analysis for decision-making.
  - Used for identifying sales trends and top-selling books.
  - Handles complex queries for comprehensive insights.
  - Accessed mainly by analysts and data scientists.

## Working Together

OLTP and OLAP systems complement each other to enhance data management.

  - OLTP data is extracted for OLAP analysis in data warehouses.
  - OLAP insights refine business practices and influence OLTP transactions.
  - Their synergy turns transactional data into strategic insights.

Choosing the right data processing approach is essential for a functional database system.

<div class='img-center'>

![](/img/docs/olap-oltp-diagram.png)

</div>
