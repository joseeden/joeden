---
title: "Multiple Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 3
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





## Multiple Joins

We can also use SQL to combine multiple joins in a single query. Start with an `INNER JOIN`, then add another `INNER JOIN` to the result. Adjust table and field names based on which table's id you're using for the join.

``sql
SELECT *

FROM left_table 
`INNER JOIN` right_table
ON left_table.id = right_table.id 

`INNER JOIN` another_table 
ON left_table.id = another_table.id;
``


### First Join 

For example, to identify countries that have both a president and a prime minister, and then find out the year each prime minister started their term, we can use the `prime_minister_terms` table, which includes prime ministers' names and their start years.

We can use `INNER JOIN` between the `presidents` and `prime_ministers` tables, and use the country as the matching value. This join provides a combined table of countries with both a president and a prime minister. We'll also add the country names and the continent fields to provide more details.

``sql
SELECT p1.country, 
       p1.continent,
       prime_minister 
       president, 
FROM prime_ministers as p1  
`INNER JOIN` presidents as p2 
USING (country);
``


Output: 

| country  | continent    | prime_minister | president                |
|----------|--------------|----------------|--------------------------|
| India    | Asia         | Narendra Modi  | Ram Nath Kovind          |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Italy    | Europe       | Mario Draghi   | Sergio Mattarella        |




### Extending the Join

Next, join this result with the `prime_minister_terms` table on the `prime_minister` field. The final output will show countries with both leaders and the years their prime ministers took office. 

``sql
SELECT p1.country, 
       p1.continent,
       president, 
       prime_minister,
       pm_start

FROM prime_ministers as p1  
`INNER JOIN` presidents as p2 
USING (country)

`INNER JOIN` prime_minister_terms as p3 
USING (prime_minister);
``

Output: 

| country  | continent    | prime_minister | president                |
|----------|--------------|----------------|--------------------------|
| India    | Asia         | Narendra Modi  | Ram Nath Kovind          |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Italy    | Europe       | Mario Draghi   | Sergio Mattarella        |




## Joining Multiple Keys 

Note that the values in the join fields don’t always match one-to-one between tables. Sometimes, multiple records in the right table correspond to a single record in the left table.

``sql
SELECT *
FROM left_table 
`INNER JOIN` right_table
ON left_table.id = right_table.id 
    AND left_table.date = right_table.date
``

To refine your results, add another join condition using the AND keyword in the ON clause. For instance, you might join on both id and date fields. This approach ensures that records match on both criteria.

<div class='img-center'>

![](/img/docs/db-rs-joining-multiple-keysss.png)

</div>


