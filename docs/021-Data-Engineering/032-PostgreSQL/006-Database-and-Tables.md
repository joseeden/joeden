---
title: "Databases, Tables, and Schemas"
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


## Understanding Schemas 

Schemas in PostgreSQL are like directories that organize tables and other database objects. They are essential for managing and structuring data within a database.

<div class='img-center'>

![](/img/docs/postgresql-understanding-schemaasss.png)

</div>


### Key Uses of Schemas

- **User-specific organization**  

   - Allow each user to have their own set of tables.
   - Prevents data interference among users.
   - Example: Developers can work with their own schemas using replicas of the production database.

- **Organizational clarity**  

   - Organize distinct components within a database.
   - Separate data by business units in a single database.
   - Example: Different schemas for each business unit within a company.

### Default Schema and Table Creation

New tables are added to the `public` schema by default. For example, a `topic` table is stored as `public.topic`, making it easy to differentiate from tables with the same name in other schemas.

```sql
CREATE TABLE topic (
  id serial PRIMARY KEY 
  description NOT NULL
) 
```

To query the table:

```sql
SELECT * FROM public.topic; 
```


### Creating a Schema

The `CREATE SCHEMA` command allows you to create a new schema within the database.

```sql
CREATE SCHEMA schema_name; 
```

### Example: Create a Schema

For example, a company with different departments like legal, sales, finance, and technology can group their respective tables into separate schemas. This way, each department's tables are organized within their own namespace, making data management more structured.

Schema for the Marketing department: 

```sql
CREATE SCHEMA marketing;

CREATE TABLE marketing.campaigns (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    budget DECIMAL(10, 2),
    start_date DATE,
    end_date DATE
);

CREATE TABLE marketing.analytics (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES marketing.campaigns(id),
    clicks INTEGER,
    impressions INTEGER,
    conversions INTEGER
);
```

Schema for the Legal department: 

```sql
CREATE SCHEMA legal;

CREATE TABLE legal.contracts (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    contract_date DATE,
    expiration_date DATE,
    value DECIMAL(10, 2)
);

CREATE TABLE legal.case_files (
    id SERIAL PRIMARY KEY,
    case_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    status TEXT,
    last_update DATE
);
```

Schema for the Finance department: 

```sql
CREATE SCHEMA finance;

CREATE TABLE finance.transactions (
    id SERIAL PRIMARY KEY,
    date DATE,
    amount DECIMAL(10, 2),
    description TEXT,
    account_id INTEGER
);

CREATE TABLE finance.budgets (
    id SERIAL PRIMARY KEY,
    department TEXT NOT NULL,
    year INTEGER NOT NULL,
    allocated DECIMAL(10, 2),
    spent DECIMAL(10, 2)
);

CREATE TABLE finance.invoices (
    id SERIAL PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    issue_date DATE,
    due_date DATE,
    amount DECIMAL(10, 2)
);
```


### Naming Restrictions

Schema names:

- Must be under 32 characters
- Should begin with a letter or underscore
- Cannot start with "pg_" (reserved for system-level schemas)