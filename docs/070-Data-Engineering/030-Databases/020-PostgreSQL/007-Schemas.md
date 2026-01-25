---
title: "Schemas"
description: "PostgreSQL"
tags: 
- Data Engineering
- Databases
- SQL
- PostgreSQL
sidebar_position: 7
last_update:
  date: 10/11/2019
---


## Overview

Schemas in PostgreSQL are like directories that organize tables and other database objects. They are essential for managing and structuring data within a database.

<div class='img-center'>

![](/img/docs/postgresql-understanding-schemaasss.png)

</div>



## Key Uses of Schemas

- **User-specific organization**  

   - Allow each user to have their own set of tables.
   - Prevents data interference among users.
   - Example: Developers can work with their own schemas using replicas of the production database.

- **Organizational clarity**  

   - Organize distinct components within a database.
   - Separate data by business units in a single database.
   - Example: Different schemas for each business unit within a company.

## Default Schema and Table Creation

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


## Creating a Schema

The `CREATE SCHEMA` command allows you to create a new schema within the database.

```sql
CREATE SCHEMA schema_name; 
```

## Example: Create a Schema

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


## Naming Restrictions

Schema names:

- Must be under 32 characters
- Should begin with a letter or underscore
- Cannot start with "pg_" (reserved for system-level schemas)