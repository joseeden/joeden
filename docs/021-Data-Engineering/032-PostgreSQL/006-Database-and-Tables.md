---
title: "Databases and Tables"
description: "PostgreSQL"
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 6
last_update:
  date: 2/27/2022
---

## Introduction to PostgreSQL

PostgreSQL is an object-relational database system. It organizes its components, which are referred to as **objects**, in a structured manner. At the top level, the database itself is the primary object. 

### Creating a Database

Use the command below to create a database in PostgreSQL:

```sql
CREATE DATABASE db_name; 
```

Key points:

- The command isn’t case-sensitive
- Using uppercase for the command can improve readability

### Database Naming Restrictions

Rules for the database name:

- Database name must start with a letter or underscore
- Cannot exceed 31 characters
- Cannot start with numbers


## Understanding Tables

Tables are the fundamental structures within a database where data is stored. They are composed of rows and columns, much like a spreadsheet.

Columns, also known as **fields**, are defined by specific data types, while each row represents a record, holding values for each field specific to that record. The size of a table can vary widely, depending on the amount of data it needs to store.

### Creating a Table

To create a new table in a PostgreSQL database, use the `CREATE TABLE` command:

```sql
CREATE TABLE table_name (
 column_a data_type,
 column_b data_type,
 column_c data_type
);
```

The command is followed by a unique table name, parentheses enclosing a list of field names and their associated data types, and optional constraints. The command ends with a semicolon.

### Table Naming Restrictions 

Rules for the table name:

- Must be unique within the database 
- Can be up to 31 characters long.
- Names must start with a letter or underscore.

### Adding Constraints 

Constraints can be added to enforce specific rules, such as `NOT NULL`, ensuring that certain fields always contain a value.

```sql
-- Create a new table to hold the cars rented by customers
CREATE TABLE customer_rentals (
  customer_id INT PRIMARY KEY,
  car_id VARCHAR(128) NULL,
  invoice_id VARCHAR(128) NULL
); 
```

For more information on constraints, please see [Integrity Constraints.](/docs/021-Data-Engineering/020-Relational-Databases/002-Attribute-Constraint.md)


