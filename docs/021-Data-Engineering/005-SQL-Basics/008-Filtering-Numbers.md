---
title: "Filtering Numbers"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 8
last_update:
  date: 2/27/2022
---


## Sample Table 

We'll use the **films** table as example.

| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |

## WHERE Clause

To filter data, we use the `WHERE` clause. This clause helps us focus on data that is relevant to our specific questions. 

- Focus on specific data
- Specify conditions
- Filter for relevance

## Comparison Operators

To filter numbers, we can use comparison operators like greater than. For example, to see films released after 1975, we use the greater than operator.

```sql
SELECT title
FROM films 
WHERE release_year > 1975;
```

Output:

| title        |
|--------------|
| Inception    |
| Parasite     |
| Amélie       |
| Coco         |


To find films release on a specific year, let's say 2017:

```sql
SELECT title
FROM films 
WHERE release_year = 2017;
```

Output:

| title        |
|--------------|
| Coco         |


## Not Equal To

To exclude films from the year 2017, we combine less than and greater than operators. This creates a "not equal to" condition in SQL.

```sql
SELECT title
FROM films 
WHERE release_year <> 2017;
```

Output:

| title         |
|-------------- |
| Inception     |
| Parasite      |
| The Godfather |
| Amélie        |


Below are a summary of comparison operators that we can use:

- Greater than: after
- Less than: before
- Equal to
- Greater than or equal to
- Less than or equal to
- Not equal to

## WHERE with Strings

The `WHERE` clause also works with strings using the equals operator. We must use single quotation marks around the strings. For example, to filter titles where the country is Japan, we use single quotes around 'France'.


```sql
SELECT title
FROM films 
WHERE country = 'France';
```

Output:

| title        |
|--------------|
| Amélie       |



## Order of Execution

A final note on using WHERE: this clause comes after FROM in a query. 

- Written order: SELECT, FROM, WHERE, LIMIT
- Execution order: FROM, WHERE, SELECT, LIMIT

As an example, this would be the correct way to write:

```sql
SELECT title
FROM films 
WHERE country = 'USA'
LIMIT 2;
```

But it will be executed in this order:

```sql
FROM films 
WHERE country = 'USA'
SELECT title
LIMIT 2;
```

Output:

| title         |
|-------------- |
| Inception     |
| The Godfather |
| Coco          |


## A few more examples

We'lll use the **reviews** table:

| id | film_id | num_user | num_critic | imdb_score | num_votes | facebook_likes |
|----|---------|----------|------------|------------|-----------|----------------|
| 1  | 1       | 10000    | 250        | 8.8        | 20500   | 15000        |
| 2  | 2       | 8500     | 300        | 8.6        | 6000    | 12000        |
| 3  | 3       | 7500     | 150        | 9.2        | 16000   | 9000         |
| 4  | 4       | 9000     | 200        | 8.6        | 6500    | 80000        |
| 5  | 5       | 9500     | 275        | 8.6        | 15000   | 10000        |
| 6  | 1       | 11000    | 260        | 9.0        | 21000   | 15500        |
| 7  | 2       | 8700     | 310        | 8.7        | 6200    | 12500        |
| 8  | 3       | 7600     | 160        | 9.3        | 16500   | 95000        |


Select the film_id and imdb_score from the reviews table and filter on scores higher than 9.0.

```sql
SELECT film_id, imdb_score
FROM reviews
WHERE imdb_score > 9.0;
```

Output:

| film_id | imdb_score |
|---------|------------|
| 3       | 9.2        |
| 3       | 9.3        |


Select the film_id and facebook_likes of the first 5 records with less than 15000 likes from the reviews table.

```sql
SELECT film_id, facebook_likes
FROM reviews
WHERE facebook_likes < 15000
LIMIT 5;
```

Output:

| film_id | facebook_likes |
|---------|----------------|
| 1       | 15000          |
| 2       | 12000          |
| 3       | 9000           |
| 4       | 8000           |
| 5       | 10000          |


Count how many records have a num_votes of at least 15,000; use the alias films_over_15K_votes.

```sql
SELECT COUNT(*) AS films_over_15K_votes
FROM reviews
WHERE num_votes >= 15000;
```

Output:

| films_over_15K_votes |
|----------------------|
| 4                    |