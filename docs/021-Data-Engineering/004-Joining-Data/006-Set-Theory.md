---
title: "Set Theory for SQL Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 6
last_update:
  date: 2/27/2022
---




## Sample Tables

Here is the schema for the sample **World** table:

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>


To download the actual files, you can get them from my [Github repository](https://github.com/joseeden/joeden/tree/master/assets/datasets).

- [states.csv](@site/assets/datasets/datacamp-world-database/states.csv)
- [presidents.csv](@site/assets/datasets/datacamp-world-database/presidents.csv)
- [prime_ministers.csv](@site/assets/datasets/datacamp-world-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/assets/datasets/datacamp-world-database/prime_minister_terms.csv)
- [monarchs.csv](@site/assets/datasets/datacamp-world-database/monarchs.csv)



## Set Operations and Venn Diagrams

SQL includes three main set operations: `UNION`, `INTERSECT`, and `EXCEPT`. These operations can be visualized using Venn diagrams, where each circle represents a table. The areas shaded show the results of what is included after applying the set operations to the tables.

![](/img/docs/set-operations-venn-diagramssss.png)


## `UNION` 

The `UNION` operator combines records from two tables but removes duplicate records. For example, if you have two tables, `left` and `right`, performing a UNION will include all unique records from both tables. If records are identical, UNION will keep only one instance of each.

<div class='img-center'>

![](/img/docs/set-operations-unionssss.png)

</div>

Syntax: 

```sql
SELECT *
FROM left_table
UNION 
SELECT *
FROM right_table;
```


## `UNION ALL` 

Unlike `UNION`, `UNION ALL` includes all records from both tables, including duplicates. So, using UNION ALL will give you every record from both tables, even if there are duplicates. 

<div class='img-center'>

![](/img/docs/set-operations-unionsss-all.png)

</div>


Syntax: 

```sql
SELECT *
FROM left_table
UNION ALL
SELECT *
FROM right_table;
```


Note that the columns selected from both tables must be the same in number and data type. For instance, we can't stack a number field on top of a character field.

<div class='img-center'>

![](/img/docs/set-operations-union-same-field-typesss-with-commentsss.png)

</div>



## Examples of Union 

Use `UNION` to combine records from the `monarchs` and `prime_ministers` tables. This will display the prime ministers and monarchs.

```sql
SELECT monarch AS leader, country
FROM monarchs
UNION
SELECT prime_minister AS leader, country
FROM prime_ministers
ORDER BY country, leader
LIMIT 10;
```

Output:

| leader              | country       |
|---------------------|---------------|
| Scott Morrison      | Australia     |
| King Philippe       | Belgium       |
| Justin Trudeau      | Canada        |
| Narendra Modi       | India         |
| Emperor Naruhito    | Japan         |
| Yoshihide Suga      | Japan         |
| Jacinda Ardern      | New Zealand   |
| Cyril Ramaphosa     | South Africa  |
| King Felipe VI      | Spain         |
| Queen Elizabeth II  | United Kingdom|

To list all monarchs who also acted as prime ministers, we can use `UNION ALL`.

```sql
SELECT monarch AS leader, country
FROM monarchs
UNION ALL
SELECT prime_minister AS leader, country
FROM prime_ministers
ORDER BY country, leader
LIMIT 10;
```


| leader              | country       |
|---------------------|---------------|
| Scott Morrison      | Australia     |
| King Philippe       | Belgium       |
| Justin Trudeau      | Canada        |
| Queen Elizabeth II  | United Kingdom|
| Narendra Modi       | India         |
| Emperor Naruhito    | Japan         |
| Emperor Naruhito    | Japan         | *(from UNION ALL)*
| Yoshihide Suga      | Japan         |
| Jacinda Ardern      | New Zealand   |
| Cyril Ramaphosa     | South Africa  |
| King Felipe VI      | Spain         |


## `INTERSECT`

The `INTERSECT` operation takes two tables and returns only the records that exist in both tables. Using Venn diagrams, you can visualize this by seeing where the two circles overlap.

<div class='img-center'>

![](/img/docs/venn-diagram-intersectttt.png)

</div>

Imagine two tables: `left_table` and `right_table`. When you perform an INTERSECT, the result is the common records between the two tables. Any records not present in both tables are excluded from the result.

<div class='img-center'>

![](/img/docs/set-operations-intersectttttt.png)

</div>

The syntax for INTERSECT is quite similar to UNION and UNION ALL:

```sql
SELECT column1, column2, ...
FROM left_table
INTERSECT
SELECT column1, column2, ...
FROM right_table;
```

Explanation: 

- Perform a `SELECT` on the first table.
- Perform a `SELECT` on the second table.
- Use `INTERSECT` between them to get common records.


## `INTERSECT` vs. `INNER JOIN`

To understand the difference, consider how `INTERSECT` and `INNER JOIN` work:

- **INTERSECT**: Returns only the records that are exactly the same in both tables, without duplicates.

    ```sql
    SELECT *
    FROM left_table
    INTERSECT
    SELECT *
    FROM right_table;
    ```
    
- **INNER JOIN**: Combines rows from both tables based on a related column, and includes duplicates if they exist.

    ```sql
    SELECT *
    FROM left_table
    INNER JOIN right_table
    ON left.id = right.id 
      AND left.val = right.val
    ```

For example, if both tables have identical records for certain columns, INTERSECT will return these common records once, whereas `INNER JOIN` will list all matching records, potentially leading to duplicates.

<div class='img-center'>

![](/img/docs/set-operations-intersectttttt-inner-joinnnn.png)

</div>


## Examples of Intersect 


Using the INTERSECT operation, we can find countries that have both a prime minister and a president in the database.

```sql
SELECT country
FROM prime_ministers
INTERSECT
SELECT country
FROM presidents;
```

Explanation:

- Both `SELECT` statements choose the `country` column from their respective tables.
- INTERSECT returns countries present in both tables.

Output:

| country        |
|----------------|
| Germany        |
| India          |
| Italy          |
| South Korea    |

## Intersect on Two Fields 


If we select two columns, such as `country` and `prime_minister`, instead of just `country`.


```sql
SELECT country, prime_minister 
FROM prime_ministers
INTERSECT
SELECT country, president
FROM presidents;
```

The command attempts to find matches for both `country` and `prime_minister` in the `prime_ministers` table and `country` and `president` in the `presidents` table.

Since prime ministers and presidents are not the same people, the result is an empty table.

Output:

| country | prime_minister |
|---------|----------------|
|         |                |


However, there are some leaders who serve both  as prime ministers and monarchs.

```sql
SELECT country, prime_minister AS leader
FROM prime_ministers
INTERSECT
FROM monarchs;
```

Output:

| country       | leader            |
|---------------|-------------------|
| Brunei        | Hassanal Bolkiah  |
| Oman          | Sultan Qaboos     |

## `EXCEPT` 

The `EXCEPT` operation in SQL helps identify records that are present in one table but not in the other. Specifically, it retains only the records from the left table that are not present in the right table.


<div class='img-center'>

![](/img/docs/set-operations-exceptttt.png)


</div>

To visualize `EXCEPT`, imagine two tables: `left_table` and `right_table`. The `EXCEPT` operation will return records from the `left_table` that do not exist in the `right_table`. Records not relevant to the `EXCEPT` operation are excluded.

<div class='img-center'>

![](/img/docs/set-operations-except-diagram-tablesss.png)


</div>


The syntax for the EXCEPT operation is straightforward:

```sql
SELECT column1, column2, ...
FROM table1
EXCEPT
SELECT column1, column2, ...
FROM table2;
```

Explanations:

- Perform a `SELECT` statement on the first table.
- Perform a `SELECT` statement on the second table.
- Use `EXCEPT` to exclude matching records from the right table.

## Examples for `EXCEPT`

Let's say we want to find monarchs who do not also hold the title of prime minister. The EXCEPT operation can be used for this purpose.

```sql
SELECT monarch, country
FROM monarchs
EXCEPT
SELECT prime_minister, country
FROM prime_ministers;
```

Output:

| monarch         | country      |
|-----------------|--------------|
| Queen Elizabeth | United Kingdom |
| King Felipe     | Spain        |
| King Willem     | Netherlands  |

