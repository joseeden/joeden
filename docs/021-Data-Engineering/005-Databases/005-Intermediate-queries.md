---
title: "Advanced Queries"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Films Database

We'll use a **films** database with the four tables listed below. 


- `films` table

    | id   | title             | release_year | country   | duration | language | certification | gross     | budget     |
    |------|-------------------|--------------|-----------|----------|----------|---------------|-----------|------------|
    | 1    | Inception         | 2010         | USA       | 148      | English  | PG-13         | 829895144 | 160000000  |
    | 2    | Parasite          | 2019         | South Korea | 132    | Korean   | R             | 257590152 | 11400000   |
    | 3    | The Godfather     | 1972         | USA       | 175      | English  | R             | 246120986 | 6000000    |
    | 4    | Spirited Away     | 2001         | Japan     | 125      | Japanese | PG            | 395580000 | 19000000   |
    | 5    | Interstellar      | 2014         | USA       | 169      | English  | PG-13         | 701729206 | 165000000  |

- `people` table

    | id   | name              | birthdate  | deathdate  |
    |------|-------------------|------------|------------|
    | 1    | Leonardo DiCaprio | 1974-11-11 | NULL       |
    | 2    | Bong Joon-ho      | 1969-09-14 | NULL       |
    | 3    | Marlon Brando     | 1924-04-03 | 2004-07-01 |
    | 4    | Hayao Miyazaki    | 1941-01-05 | NULL       |
    | 5    | Christopher Nolan | 1970-07-30 | NULL       |

- `reviews` table

    | id   | film_id | num_user | num_critic | imdb_score | num_votes | facebook_likes |
    |------|---------|----------|------------|------------|-----------|----------------|
    | 1    | 1       | 10000    | 250        | 8.8        | 2050000   | 1500000        |
    | 2    | 2       | 8500     | 300        | 8.6        | 600000    | 1200000        |
    | 3    | 3       | 7500     | 150        | 9.2        | 1600000   | 900000         |
    | 4    | 4       | 9000     | 200        | 8.6        | 650000    | 800000         |
    | 5    | 5       | 9500     | 275        | 8.6        | 1500000   | 1000000        |

- `roles` table

    | id   | film_id | person_id | role            |
    |------|---------|-----------|-----------------|
    | 1    | 1       | 1         | Actor           |
    | 2    | 2       | 2         | Director        |
    | 3    | 3       | 3         | Actor           |
    | 4    | 4       | 4         | Director        |
    | 5    | 5       | 5         | Director        |

The database schema outlines table names, field names, and data types.

| Table   | Field         | Data Type |
|---------|---------------|-----------|
| films   | id            | INT4      |
|         | title         | VARCHAR   |
|         | release_year  | INT4      |
|         | country       | VARCHAR   |
|         | duration      | INT4      |
|         | language      | VARCHAR   |
|         | certification | VARCHAR   |
|         | gross         | INT8      |
|         | budget        | INT8      |
| people  | id            | INT4      |
|         | name          | VARCHAR   |
|         | birthdate     | DATE      |
|         | deathdate     | DATE      |
| reviews | id            | INT4      |
|         | film_id       | INT4      |
|         | num_user      | INT4      |
|         | num_critic    | INT4      |
|         | imdb_score    | FLOAT4    |
|         | num_votes     | INT4      |
|         | facebook_likes| INT4      |
| roles   | id            | INT4      |
|         | film_id       | INT4      |
|         | person_id     | INT4      |
|         | role          | VARCHAR   |

## COUNT 

The COUNT function returns the number of records with a value in a specified field. To count birth dates in the people table, use:

```sql
SELECT COUNT(birthdate) AS count_birthdates
FROM people;
```

Expected output:

| count_birthdates |
|------------------|
| 5                |

## COUNT  Multiple Fields

To count more than one field, use COUNT multiple times. For example, to count names and birth dates:

```sql
SELECT COUNT(name) AS count_names, COUNT(birthdate) AS count_birthdates
FROM people;
```

Expected Output:

| count_names | count_birthdates |
|-------------|------------------|
| 5           | 5                |

## Using * with COUNT 

To count the number of records in a table, use COUNT with an asterisk:

```sql
SELECT COUNT(*) AS total_records
FROM people;
```

Expected Output:

| total_records |
|---------------|
| 5             |

## DISTINCT

The DISTINCT keyword selects unique values from a field, removing duplicates. For example, to see unique languages in the films table:

```sql
SELECT DISTINCT(language)
FROM films;
```

Expected Output:

| language  |
|-----------|
| English   |
| French    |
| Spanish   |
| ...       |

## COUNT  with DISTINCT

Combining COUNT with DISTINCT counts the number of unique values in a field. For instance, to count distinct birth dates in the people table:

```sql
SELECT COUNT(DISTINCT birthdate) AS unique_birthdates
FROM people;
```

Expected Output:

| unique_birthdates |
|-------------------|
| 5                 |


The number of unique birth dates differs from the total count because some people share the same birthday.