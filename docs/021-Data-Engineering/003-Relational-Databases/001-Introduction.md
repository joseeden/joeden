---
title: "Introduction"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 1
last_update:
  date: 2/27/2022
---


## Overview 

Relational databases are great for organizing real-world things like customers and products into tables. Each table focuses on one type of thing, which helps avoid repeating the same information. You can also define how different things relate to each other, like a customer purchasing multiple products or a product being bought by several customers.

- Each table focuses on one type of entity.
- Defines relationships between different entities.

## Sample Tables 

Here is the schema for the sample **World** table. This tables we'll be used for the examples in this guide.

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>

To download the actual files, you can get them from my [Github repository](https://github.com/joseeden/joeden/tree/master/assets/datasets).

- [states.csv](@site/assets/datasets/world-database/states.csv)
- [presidents.csv](@site/assets/datasets/world-database/presidents.csv)
- [prime_ministers.csv](@site/assets/datasets/world-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/assets/datasets/world-database/prime_minister_terms.csv)
- [monarchs.csv](@site/assets/datasets/world-database/monarchs.csv)



## Building a Database

We can begin with a single table and expand it by adding rules like constraints and keys to keep our data accurate and organized.

- Start small and expand our database.
- Use constraints and keys to keep data accurate.

An example of database is PostgreSQL. To explore a PostgreSQL database, we need to use SQL queries. The `information_schema` database has lots of useful details about our database’s setup and works in systems like MySQL and SQL Server.

## Looking at Table Columns

To check out table columns, use the `information_schema` database. The "columns" table shows you a table’s column details once you know its name, like how the "products" table might hold columns for product name and price.

```sql
SELECT table_schema, table_name
FROM information_schema.tables
```

The output would look something like this. Notice that there's are differnt table schemas here: `world`, `cinema`, `public`, and `pg_catalog`.

| Table Schema | Table Name          |
|--------------|---------------------|
| world        | economies           |
| world        | languages           |
| world        | populations         |
| world        | economies2010       |
| world        | countries_plus      |
| world        | currencies          |
| cinema       | descriptions        |
| public       | books               |
| pg_catalog   | pg_type             |
| world        | prime_ministers     |
| world        | states              |

<small>Some records are not shown.</small>

To look at tables with specific schemas, use the `WHERE` command:

```sql
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public';          -- specify the schema here
```

To list columns of a specific table (e.g., products):

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'states';
```

Output:

| Column Name       | Data Type        |
|-------------------|------------------|
| name              | character varying|
| continent         | character varying|
| indep_year        | integer          |
| fert_rate         | real             |
| women_parli_perc  | real             |
