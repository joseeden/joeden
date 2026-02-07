---
title: "Inner Joins"
description: "Advanced SQL"
tags:
- Data Engineering
- Databases
- SQL
sidebar_position: 1
last_update:
  date: 8/28/2019
---


## Sample Tables

Here is the schema for the sample **World** table:

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>


To download the actual files, you can get them from my Github repository:

- [states.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/states.csv)
- [presidents.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/presidents.csv)
- [prime_ministers.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/prime_minister_terms.csv)
- [monarchs.csv](@site/docs/065-Software-Engineering/021-Jupyter-Notebooks/000-Sample-Datasets/datacamp-world-database/monarchs.csv)


## `INNER JOIN` 

`INNER JOIN` is one of the two most common joins, along with `LEFT JOIN`. To understand it, imagine two tables, "left_table" and "right_table", both containing a column named "id" which acts as the key. Keys uniquely identify records in a table. These tables also have columns called left_val and right_val. 

<div class='img-center'>

![](/img/docs/sample-table-for-inner-joinssss.png)

</div>

When performing an `INNER JOIN`, we look for matching values in the key column across both tables. You can join tables on any field, not just key fields. In our example, the `INNER JOIN` matches records in both tables where the "id" values are the same. The `INNER JOIN` results in records with ids 1 and 4.

<div class='img-center'>

![](/img/docs/sample-table-for-inner-joinssss-result.png)

</div>

For example, to find countries that has both Presidents and Prime Ministers:

```sql
SELECT 
  prime_ministers.country, 
  prime_ministers.continent, 
  prime_minister, 
  president
FROM prime_ministers
INNER JOIN presidents
ON prime_ministers.country = presidents.country;
```

To understand this, look at the query in this order:

- `FROM`: defines the first table (or left table)
- `INNER JOIN`: defines the second table that has the matching value/s (or right table)
- `ON`: defines the values found in both tables. 
- `SELECT`: specifiy the fields

Output: 

| country        | continent    | prime_minister          | president                |
|----------------|--------------|-------------------------|--------------------------|
| India          | Asia         | Narendra Modi           | Ram Nath Kovind          |
| Germany        | Europe       | Angela Merkel           | Frank-Walter Steinmeier  |
| Italy          | Europe       | Mario Draghi            | Sergio Mattarella        |

:::info[note]

The 'table.column_name` format must be used when selecting columns that exist in both tables to avoid SQL error.

:::

## Aliasing with `AS`

To simplify our query, we can alias table names with the `AS` keyword, just like we do with columns. This helps avoid repetitive typing. Using the previous example, we can shorten the query:

```sql
SELECT 
  p1.country, 
  p1.continent, 
  prime_minister, 
  president
FROM prime_ministers AS p1
INNER JOIN presidents AS p2 
ON p1.country = p2.country;
```

## Aliasing without `AS`

Note that the `AS` keyword is entirely optional as SQL will still read it the same way without the keyword:

```sql
SELECT 
  p1.country, 
  p1.continent, 
  prime_minister, 
  president
FROM prime_ministers p1
INNER JOIN presidents p2 
ON p1.country = p2.country;
```

According to ANSI/ISO SQL the `AS` keyword is optional. But some relational database management systems (RDBMS) products want it, while others don't want it. However, its main purpose are the following:

1. **Readability**. Imagine your query have 20, 50 or even 100 columns. Using `AS` will help anyone reading the query to know what is a column and what is an alias.

2. **Compatability**. If you plan on ever moving to a RDBMS, that RDBMS might not support short-hand aliasing.

As an example, if we have the `SELECT` statement with many columns:

```sql
SELECT a, b, c, d
. . . 
```

It is very easy to occasionally skip the comma:

```sql
SELECT a b, c, d
. . . 
```

If you don't use `AS` then this looks like correct code and it can be difficult to figure out. If you always use `AS` for column aliases, then you know it is incorrect. For more information, you can read the links below:

- [What is the point using "AS" keyword in SQL when aliasing can be done without it?](https://stackoverflow.com/questions/42326469/what-is-the-point-using-as-keyword-in-sql-when-aliasing-can-be-done-without-it)

- [Bad Habits to Kick: AS instead of = for column aliases](https://sqlblog.org/2012/01/23/bad-habits-to-kick-using-as-instead-of-for-column-aliases)


## `USING` 

For an even more concise query, use the `USING` command when joining on identical column names. Since both tables have a "country" column, `USING` (country) can replace the `ON` clause.

```sql
SELECT 
  p1.country, 
  p1.continent, 
  prime_minister, 
  president
FROM prime_ministers AS p1
INNER JOIN presidents AS p2 
USING (country);
```



