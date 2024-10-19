---
title: "Full, Cross, and Self Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 5
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



## `FULL JOIN`

A `FULL JOIN` combines the results of a `LEFT JOIN` and a `RIGHT JOIN`, ensuring that all records from both tables are included in the result set. If there is no match, the result set will have null values for every column from the table that lacks a corresponding row.

![](/img/docs/sample-diagram-fulll-joinssss.png)

Syntax:

```sql
SELECT left_table.id AS L_id 
       right_table.id AS R_id
       left_table.val AS L_val
       right_table.val AS R_val
FROM left_table
FULL JOIN right_table
USING (id);
```

:::info[NOTE]

The keyword `FULL OUTER JOIN` can also be used.

:::


## Examples on `FULL JOIN`

Consider the `prime_ministers` and `presidents` tables. To list all countries along with their prime ministers and presidents:

```sql
SELECT 
    p1.country, 
    p1.prime_minister, 
    p2.president
FROM prime_ministers AS p1
FULL JOIN presidents AS p2 
ON p1.country = p2.country
LIMIT 10;
```

Output:

| country        | prime_minister | president                  |
|----------------|----------------|----------------------------|
| USA            | NULL           | Joe Biden                  |
| France         | NULL           | Emmanuel Macron            |
| South Korea    | NULL           | Moon Jae-in                |
| India          | Narendra Modi  | Ram Nath Kovind            |
| Germany        | Angela Merkel  | Frank-Walter Steinmeier    |
| Italy          | Mario Draghi   | Sergio Mattarella          |
| Brazil         | NULL           | Jair Bolsonaro             |
| Mexico         | NULL           | Andrés Manuel López Obrador|
| China          | NULL           | Xi Jinping                 |
| Russia         | NULL           | Vladimir Putin             |

Note that the `NULL` values can appear in both columns. 


## `CROSS JOIN`

A `CROSS JOIN` creates all possible combinations of rows between two tables. This results in a *Cartesian* product, where each row from the first table is combined with every row from the second table.

<div class='img-center'>

![](/img/docs/sample-diagram-cross-joinsssssss.png)

</div>


Syntax: 

```sql
SELECT id1, id2 
FROM table1
CROSS JOIN table2
```


## Examples on `CROSS JOIN`

Consider a scenario where we want to list all possible meetings of prime ministers from Asia with presidents from South America. This means each prime minister will have to set a meeting with every presidents in South America, and vice versa.

```sql
SELECT prime_minister, president
FROM prime_ministers AS p1
CROSS JOIN presidents AS p2
WHERE p1.continent IN ('Asia')
    AND p2.continent IN ('South America');
```

## Self Joins

Self joins allow you to compare rows within the same table. They are useful for scenarios where you need to relate records in a table to other records within the same table.


## Examples on Self Join 

Let's say we want to pair countries with other countries in the same continent using the `prime_ministers` table. 

```sql
SELECT 
    p1.country AS country1, 
    p2.country AS country2, 
    p1.continent
FROM prime_ministers AS p1
INNER JOIN prime_ministers AS p2
ON p1.continent = p2.continent 
    AND p1.country <> p2.country
LIMIT 10;
```

Note that "not equal to" can be written with either operators:

```sql
!= 
<> 
``` 


Output:

| country1     | country2     | continent    |
|--------------|--------------|--------------|
| United Kingdom | Germany     | Europe       |
| United Kingdom | Italy       | Europe       |
| Germany      | United Kingdom | Europe       |
| Germany      | Italy       | Europe       |
| Italy        | United Kingdom | Europe       |
| Italy        | Germany     | Europe       |
| Canada       | USA         | North America|
| USA          | Canada      | North America|
| India        | Japan       | Asia         |
| India        | South Korea | Asia         |

This output shows pairs of countries that are in the same continent, excluding pairs where the country fields are identical (for example, Germany being paired with Germany).