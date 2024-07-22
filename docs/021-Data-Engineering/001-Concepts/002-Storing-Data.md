---
title: "Storing Data"
description: "Notes from DataCamp's Understanding Engineering Course"
tags: [Data Engineering]
sidebar_position: 2
last_update:
  date: 2/27/2022
---


## Types of Data

- **Structured Data**

    - Easily searchable and organized, like a spreadsheet with set columns.
    - Relational databases, queried using SQL (Structured Query Language).
    - About 20% of data is structured.
    - Example: Employee tables, where each row represents an employee and columns hold specific information.

- **Semi-Structured Data**

    - Resembles structured data but allows more flexibility, often stored in NoSQL databases.
    - Formats include JSON, XML, YAML.
    - NoSQL databases as storage
    - Example:JSON file of users’ favorite artists, where each user ID contains varied numbers of favorite artists.

- **Unstructured Data**

    - Data that doesn’t follow a model, making it hard to search and organize.
    - Typically found in data lakes, sometimes in data warehouses or databases.
    - Extremely valuable but requires machine learning and AI for effective extraction.
    - Example: Lyrics, songs, album pictures, artist profile pictures, music videos.

## Enhancing Unstructured Data

Using the streaming platform example:

- We can use machine learning to analyze song features or having artists provide additional information like genre and tags, converting unstructured data into semi-structured data for easier searching and organizing.

- By categorizing data into structured, semi-structured, and unstructured types, organizations can better manage, search, and utilize their data.

## SQL 

SQL (Structured Query Language) is essential for interacting with relational databases.

- Preferred language for querying RDBMS (Relational Database Management Systems).
- Allows accessing, grouping, filtering, and aggregating multiple records.
- Influential and similar to English, making it easy to write and understand.
- Data engineers use SQL to create and maintain databases.
- Data scientists use it to query databases.

### Usage 

As an example, data engineers can use SQL to create a table with SQL involves specifying columns and data types.

```sql
CREATE TABLE employees (
    employee_id INT, 
    first_name VARCHAR(255), 
    last_name VARCHAR(255), 
    role VARCHAR(255), 
    team VARCHAR(255), 
    full_time BOOLEAN, 
    office VARCHAR(255)
);
```

Data scientists can then query the table to retrieve specific information, like for example, names of employees with "Data" in their role title.

```sql
SELECT first_name, last_name 
FROM employees 
WHERE role LIKE '%Data%'
```

### Database Schema

Databases consist of multiple related tables. The schema defines relationships between these tables.

As an example, here is a common database schema is music streaming platforms:

<div class="img-center"> 

![](/img/docs/sql-db-schema-example.png)

</div>

### SQL Implementations

Various SQL implementations exist, with minor differences. Switching between them is like switching keyboard layouts or dialects of English; mostly similar with a few changes.

- MySQL
- PostgreSQL
- SQL Server
- Oracle Database
- SQLite


## Data Lakes and Data Warehouses

### Differences 

Data lakes store all collected raw data in its original, unprocessed form. 

- Handle massive amounts of data; structured, semi-structured, and unstructured. 
- Cost-effective but less optimized for analytics
- Requires a data catalog for organization.
- Data lakes support real-time analytics on large datasets.

Data warehouses, in contrast, store specific data for targeted use cases, like user details or listening sessions for analysis. 

- Stores processed, specific data.
- Structured to facilitate business analytics 
- Typically smaller than data lakes. 
- More expensive, data warehouses are optimized for querying and reporting.
- Data warehouses are used for ad-hoc, read-only queries.

### Data Catalog for Data Lakes

A data catalog is essential for managing the data in a data lake due to its unstructured nature. It tracks data sources, usage, maintenance, and updates. This tool helps maintain data governance and ensures reproducibility of analyses.

- Prevents the data lake from becoming a "data swamp."
- Manages data availability, usability, integrity, and security.
- Reduces reliance on tribal knowledge and facilitates scalable data management.

### Database vs. Data Warehouse

The term "database" is broad and refers to any organized data stored and accessed on a computer. A data warehouse is a specific type of database designed for storing and querying structured data to support business analytics.