---
title: "Sorting"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 13
last_update:
  date: 2/27/2022
---

## Sample Table

We'll use a **films** table for th examples. 


| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |




## Using ORDER BY

In SQL, the `ORDER BY` keyword sorts the results based on one or more fields. By default, it sorts in ascending order, which means from the smallest to the largest value or alphabetically from A to Z. 

- To sort films by budget from smallest to largest:

  ```sql
  SELECT title, budget
  FROM films
  ORDER BY budget;
  ```
  
  Output:

  | title        | budget   |
  |--------------|----------|
  | The Godfather| 6000000  |
  | Parasite     | 11400000 |
  | Amélie       | 10000000 |
  | Inception    | 160000000|
  | Coco         | 175000000|

- To sort films alphabetically by title:

  ```sql
  SELECT title
  FROM films
  ORDER BY title;
  ```
  
  Output:

  | title        |
  |--------------|
  | Amélie       |
  | Coco         |
  | Inception    |
  | Parasite     |
  | The Godfather|

## Ascending

You can explicitly specify ascending order using the `ASC` keyword, though it's optional since ascending is the default order.

Sorting Titles in Ascending Order:

```sql
SELECT title
FROM films
ORDER BY title ASC;
```

Output:

| title        |
|--------------|
| Amélie       |
| Coco         |
| Inception    |
| Parasite     |
| The Godfather|

## Descending

To sort results in descending order, use the `DESC` keyword. 

- Sorting by Budget from Largest to Smallest:

  ```sql
  SELECT title, budget
  FROM films
  ORDER BY budget DESC;
  ```
  
  Output:

  | title        | budget   |
  |--------------|----------|
  | Coco         | 175000000|
  | Inception    | 160000000|
  | Amélie       | 10000000 |
  | Parasite     | 11400000 |
  | The Godfather| 6000000  |

- If there were NULL values in the budget field, you could use a `WHERE` clause to exclude them:
 
  ```sql
  SELECT title, budget
  FROM films
  WHERE budget IS NOT NULL
  ORDER BY budget DESC;
  ```

## Sorting Fields

You don’t have to include the field you're sorting by in the `SELECT` statement, though it can be helpful for clarity.

Sorting by Release Year but Selecting Only Title:

```sql
SELECT title
FROM films
ORDER BY release_year;
```

Output:

| title        |
|--------------|
| The Godfather|
| Amélie       |
| Inception    |
| Coco         |
| Parasite     |

## ORDER BY Multiple Fields

`ORDER BY` can sort by multiple fields. It first sorts by the first field and then by the subsequent fields if there are ties.

Sorting by Release Year and then Budget:

```sql
SELECT title, release_year, budget
FROM films
ORDER BY release_year, budget;
```

Output:

| title        | release_year | budget   |
|--------------|--------------|----------|
| The Godfather| 1972         | 6000000  |
| Amélie       | 2001         | 10000000 |
| Inception    | 2010         | 160000000|
| Coco         | 2017         | 175000000|
| Parasite     | 2019         | 11400000 |

## Different Orders

You can specify different orders for different fields.

Sorting by Release Year in Ascending and Budget in Descending:

```sql
SELECT title, release_year, budget
FROM films
ORDER BY release_year ASC, budget DESC;
```

Output:

| title        | release_year | budget   |
|--------------|--------------|----------|
| The Godfather| 1972         | 6000000  |
| Amélie       | 2001         | 10000000 |
| Inception    | 2010         | 160000000|
| Coco         | 2017         | 175000000|
| Parasite     | 2019         | 257590152|

## Order of Execution

In SQL, `ORDER BY` is processed after the `FROM`, `WHERE`, and `SELECT` clauses, and just before the `LIMIT` clause if used.

- **Order of Execution:

  1. `FROM`
  2. `WHERE`
  3. `SELECT`
  4. `ORDER BY`
  5. `LIMIT`