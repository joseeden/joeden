---
title: "SQL Joins"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 1
last_update:
  date: 2/27/2022
---


## Sample Tables

Here is the schema for the sample **leaderships** table:

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

- [states.csv](@site/assets/datasets/states.csv)
- [presidents.csv](@site/assets/datasets/presidents.csv)
- [prime_ministers.csv](@site/assets/datasets/prime_ministers.csv)
- [prime_minister_terms.csv](@site/assets/datasets/prime_minister_terms.csv)
- [monarchs.csv](@site/assets/datasets/monarchs.csv)


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



## Database Relationships

### One-to-Many 

The most common type of relationship in databases is the one-to-many relationship, where a single entity can be linked to multiple other entities. 

For example, Malcolm Gladwell has authored several books. We can put his book on a "books" table along with other books by other authors. We can then have a second table called "authors" which will contain several famous authors.

![](/img/docs/db-rs-one-to-many.png)

We could join the "books" table with the "authors" table using an "author_id" field that can be found in both tables.

```sql
SELECT authors.last_name, title
FROM authors
INNER JOIN books 
ON authors.author_id = books.author_id;
```

Output:

| last_name     | title                                                                             |
|----------|------------------------------------------------------------------------------------|
| Gladwell | The Tipping Point: How Little Things Can Make a Big Difference                     |
| Gladwell | Blink: The Power of Thinking Without Thinking                                      |
| Gladwell | Outliers: The Story of Success                                                     |
| Gladwell | What the Dog Saw: And Other Adventures                                             |
| Gladwell | David and Goliath: Underdogs, Misfits, and the Art of Battling Giants              |
| Gladwell | Talking to Strangers: What We Should Know about the People We Don’t Know           |
| Gladwell | The Bomber Mafia: A Dream, a Temptation, and the Longest Night of the Second World War |


### One-to-One 

A one-to-one relationship involves a unique pairing between entities, making it less common. An example is fingerprints: each fingerprint is unique to one person. 

![](/img/docs/db-rs-one-to-one-colored-image.png)

In the context of an airport's border control, a database might have a "people" table and a "fingerprints" table. Each person’s fingerprint is linked to their record in the "people" table via their passport number. 

![](/img/docs/db-rs-one-to-one.png)

Even though an individual has multiple fingerprints, they can be stored as different fields in a single record, maintaining a one-to-one relationship between a person and their set of fingerprints.


### Many-to-Many 

Many-to-many relationships occur when multiple entities can be associated with multiple other entities. An example is languages and countries. 

![](/img/docs/db-rs-many-to-many-colored-diagram.png)

Consider Germany, Belgium, and the Netherlands: each country can have multiple official languages, and a language can be official in multiple countries. For example, Belgium's official languages are French, German, and Dutch, while Dutch is also official in the Netherlands.


## Multiple Joins

We can also use SQL to combine multiple joins in a single query. Start with an `INNER JOIN`, then add another `INNER JOIN` to the result. Adjust table and field names based on which table's id you're using for the join.

```sql
SELECT *

FROM left_table 
INNER JOIN right_table
ON left_table.id = right_table.id 

INNER JOIN another_table 
ON left_table.id = another_table.id;
```


### First Join 

For example, to identify countries that have both a president and a prime minister, and then find out the year each prime minister started their term, we can use the `prime_minister_terms` table, which includes prime ministers' names and their start years.

We can use `INNER JOIN` between the `presidents` and `prime_ministers` tables, and use the country as the matching value. This join provides a combined table of countries with both a president and a prime minister. We'll also add the country names and the continent fields to provide more details.

```sql
SELECT p1.country, 
       p1.continent,
       prime_minister 
       president, 
FROM prime_ministers as p1  
INNER JOIN presidents as p2 
USING (country);
```


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

```sql
SELECT p1.country, 
       p1.continent,
       president, 
       prime_minister,
       pm_start

FROM prime_ministers as p1  
INNER JOIN presidents as p2 
USING (country)

INNER JOIN prime_minister_terms as p3 
USING (prime_minister);
```

Output: 

| country  | continent    | prime_minister | president                |
|----------|--------------|----------------|--------------------------|
| India    | Asia         | Narendra Modi  | Ram Nath Kovind          |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Germany  | Europe       | Angela Merkel  | Frank-Walter Steinmeier  |
| Italy    | Europe       | Mario Draghi   | Sergio Mattarella        |




### Joining Multiple Keys 

Note that the values in the join fields don’t always match one-to-one between tables. Sometimes, multiple records in the right table correspond to a single record in the left table.

```sql
SELECT *
FROM left_table 
INNER JOIN right_table
ON left_table.id = right_table.id 
    AND left_table.date = right_table.date
```

To refine your results, add another join condition using the AND keyword in the ON clause. For instance, you might join on both id and date fields. This approach ensures that records match on both criteria.

<div class='img-center'>

![](/img/docs/db-rs-joining-multiple-keysss.png)

</div>
