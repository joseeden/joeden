---
title: "Multiple Joins"
description: "Advanced SQL"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 3
last_update:
  date: 2/27/2022
---


## Sample Tables

Here is the schema for the sample **World Leaders** table:

<div class='img-center'>

![](/img/docs/sample-database-schemaaa.png)

</div>

Click each table to see the records. Each table has a varied number of records. 


<details>
    <summary>`states` table</summary>

| country        | indep_year |
|----------------|------------|
| USA            | 1776       |
| France         | 1789       |
| United Kingdom | 1707       |
| Canada         | 1867       |
| Australia      | 1901       |
| India          | 1947       |
| South Korea    | 1945       |
| Japan          | 660        |
| Germany        | 1871       |
| Italy          | 1861       |
| Brazil         | 1822       |
| Mexico         | 1821       |
| China          | 1949       |
| Russia         | 1991       |
| Egypt          | 1922       |
| South Africa   | 1910       |
| Nigeria        | 1960       |
| Argentina      | 1816       |

</details>


<details>
    <summary>`presidents` table</summary>

| country        | continent    | president                |
|----------------|--------------|--------------------------|
| USA            | North America| Joe Biden                |
| France         | Europe       | Emmanuel Macron          |
| South Korea    | Asia         | Moon Jae-in              |
| India          | Asia         | Ram Nath Kovind          |
| Germany        | Europe       | Frank-Walter Steinmeier  |
| Italy          | Europe       | Sergio Mattarella        |
| Brazil         | South America| Jair Bolsonaro           |
| Mexico         | North America| Andrés Manuel López Obrador|
| China          | Asia         | Xi Jinping               |
| Russia         | Europe       | Vladimir Putin           |


</details>


<details>
    <summary>`prime_ministers` table</summary>

| country        | continent    | prime_minister          |
|----------------|--------------|-------------------------|
| United Kingdom | Europe       | Boris Johnson           |
| Canada         | North America| Justin Trudeau          |
| Australia      | Oceania      | Scott Morrison          |
| India          | Asia         | Narendra Modi           |
| Japan          | Asia         | Yoshihide Suga          |
| Germany        | Europe       | Angela Merkel           |
| Italy          | Europe       | Mario Draghi            |
| South Africa   | Africa       | Cyril Ramaphosa         |
| New Zealand    | Oceania      | Jacinda Ardern          |
| Spain          | Europe       | Pedro Sánchez           |
| Belgium        | Europe       | Alexander De Croo       |
| Sweden         | Europe       | Stefan Löfven           |

</details>


<details>
    <summary>`prime_minister_terms` table</summary>

| prime_minister    | pm_start |
|-------------------|----------|
| Boris Johnson     | 2019     |
| Justin Trudeau    | 2015     |
| Scott Morrison    | 2018     |
| Narendra Modi     | 2014     |
| Narendra Modi     | 2019     |
| Yoshihide Suga    | 2020     |
| Angela Merkel     | 2005     |
| Angela Merkel     | 2009     |
| Angela Merkel     | 2013     |
| Angela Merkel     | 2017     |
| Mario Draghi      | 2021     |
| Cyril Ramaphosa   | 2018     |
| Jacinda Ardern    | 2017     |
| Pedro Sánchez     | 2018     |
| Alexander De Croo | 2020     |
| Stefan Löfven     | 2014     |
| Stefan Löfven     | 2018     |

</details>


<details>
    <summary>`monarchs` table</summary>

| country        | continent    | monarch              |
|----------------|--------------|----------------------|
| United Kingdom | Europe       | Queen Elizabeth II   |
| Japan          | Asia         | Emperor Naruhito     |
| Canada         | North America| Queen Elizabeth II   |
| Australia      | Oceania      | Queen Elizabeth II   |
| Belgium        | Europe       | King Philippe        |
| Spain          | Europe       | King Felipe VI       |
| Sweden         | Europe       | King Carl XVI Gustaf |
| Netherlands    | Europe       | King Willem-Alexander|
| Norway         | Europe       | King Harald V        |
| Denmark        | Europe       | Queen Margrethe II   |

</details>


To download the actual files, you can get them from my [Github repository](https://github.com/joseeden/joeden/tree/master/assets/datasets).

- [states.csv](@site/assets/datasets/world-leaders-database/states.csv)
- [presidents.csv](@site/assets/datasets/world-leaders-database/presidents.csv)
- [prime_ministers.csv](@site/assets/datasets/world-leaders-database/prime_ministers.csv)
- [prime_minister_terms.csv](@site/assets/datasets/world-leaders-database/prime_minister_terms.csv)
- [monarchs.csv](@site/assets/datasets/world-leaders-database/monarchs.csv)





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


