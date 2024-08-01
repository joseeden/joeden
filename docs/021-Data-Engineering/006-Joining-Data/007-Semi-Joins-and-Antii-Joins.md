---
title: "Semi-Joins and Anti-Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 7
last_update:
  date: 2/27/2022
---


## Additive Joins

In SQL, joins are typically used to combine data from two or more tables. The joins discussed in the previous pages are "additive," meaning they add columns to the original left table.


As a recap: 

`INNER JOIN` adds columns to the original left table based on matching rows in both tables. For example, an `INNER JOIN` on the `id` field adds additional columns from the right table to the left table.

```sql
SELECT *
FROM left_table
INNER JOIN right_table
ON left_table.id = right_table.id;
```

Explanations: 

- **Fields with different names** are added with their original names.
- **Fields with the same name** can result in duplicate columns, which can be renamed using aliasing.

To make it clearer, see the diagram below. 

![](/img/docs/additive-joins-inner-joinsssss.png)