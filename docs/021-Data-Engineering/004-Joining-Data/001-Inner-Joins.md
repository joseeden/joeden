---
title: "Inner Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 1
last_update:
  date: 2/27/2022
---


## Sample Tables

Here is the schema for the sample **World** table:

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>


To download the actual files, you can get them from my [Github repository](https://github.com/joseeden/joeden/tree/master/assets/datasets).

- [states.csv](@site/assets/datasets/world-database/states.csv)
- [presidents.csv](@site/assets/datasets/world-database/presidents.csv)
- [prime_ministers.csv](@site/assets/datasets/world-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/assets/datasets/world-database/prime_minister_terms.csv)
- [monarchs.csv](@site/assets/datasets/world-database/monarchs.csv)


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
SELECT prime_ministers.country, prime_ministers.continent, prime_minister, president
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

## Aliasing 

To simplify our query, we can alias table names with the AS keyword, just like we do with columns. This helps avoid repetitive typing. 

Using the previous example, we can shorten the query:

```sql
SELECT p1.country, p1.continent, prime_minister, president
FROM prime_ministers AS p1
INNER JOIN presidents AS p2 
ON p1.country = p2.country;
```

## `USING` 

For an even more concise query, use the `USING` command when joining on identical column names. Since both tables have a "country" column, `USING` (country) can replace the `ON` clause.

```sql
SELECT p1.country, p1.continent, prime_minister, president
FROM prime_ministers AS p1
INNER JOIN presidents AS p2 
USING (country);
```



