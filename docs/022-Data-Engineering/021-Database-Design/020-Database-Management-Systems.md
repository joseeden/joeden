---
title: "Database Management Systems (DBMS)"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 20
last_update:
  date: 10/15/2019
---

## Overview

A Database Management System (DBMS) is software designed to create, manage, and maintain databases. It plays a key role in handling data, managing the database schema, and providing the engine that controls data access, locking, and modifications.

Key functions of a DBMS:

- Manages data and defines its logical structure through the schema
- Provides an engine that allows data operations such as access, modification, and locking
- Serves as the interface between the database and users or applications

## Types of DBMS

Choosing the right DBMS depends on the type of data you manage and how you intend to use it. The two most common types are:

- SQL DBMS (Relational)
- NoSQL DBMS (Non-relational)

### SQL DBMS

A SQL DBMS, or Relational Database Management System (RDBMS), is based on a structured data model using tables and relations. RDBMS typically employs SQL to access and manage data. 

Consider using an RDBMS when:

- Working with structured, static data that follows a predefined schema
- Data consistency is critical, as in accounting systems

Examples: 

- SQL Server
- PostgreSQL
- Oracle SQL


### NoSQL DBMS

A NoSQL DBMS is non-relational and provides more flexibility than an RDBMS. Data doesn't need to fit into predefined rows and columns, making it a good option for rapidly growing datasets without a clear schema. 

Common use cases include handling:

- Large amounts of unstructured or semi-structured data
- Rapidly changing data environments

NoSQL databases are generally classified into four types:

- Key-value store
- Document store
- Columnar
- Graph


## Types of NoSQL DBMS

### Key-Value Store

Key-value databases store unique key-value pairs where the key is used to retrieve its associated value. This model is simple but effective for managing session data in web applications, such as shopping cart contents.

- **Keys**: Unique identifier to retrieve an associated value.
- **Value**: Can be anything; integer, strings, JSON structures, etc.

Example: Redis

### Document Store

Similar to key-value stores, document databases store data as **structured documents**, allowing for more complex queries. These are great for content management systems where entities, like blog posts or videos, can be stored as individual documents.

Example: MongoDB

### Columnar Database

Columnar databases store data by columns rather than rows, making them highly scalable and efficient for big data analytics. They excel in scenarios where fast querying of large datasets is crucial.

Example: Cassandra

### Graph Database

Graph databases excel at handling highly interconnected data, making them ideal for social networks and recommendation systems where relationships between data points are important.

Example: Neo4j

## Choosing the Right DBMS

The choice between SQL and NoSQL DBMS depends on the specific business requirements:

- **SQL DBMS**: Suitable for applications with a fixed structure that require consistent, structured data
- **NoSQL DBMS**: Best for applications dealing with rapidly changing, large-scale data, such as in big data analytics

![](/img/docs/dbms-choosign-the-right-dbmsssss.png)