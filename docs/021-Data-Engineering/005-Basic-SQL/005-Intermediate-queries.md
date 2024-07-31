---
title: "Advanced Queries"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Films Database

We'll use a **films** database with the four tables listed below. 

<details>
    <summary>`films` table</summary>

| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |


</details>



<details>
    <summary>`people` table</summary>

    | id | name              | birthdate  | deathdate  |
    |----|-------------------|------------|------------|
    | 1  | Leonardo DiCaprio | 1974-11-11 | NULL       |
    | 2  | Bong Joon-ho      | 1969-09-14 | NULL       |
    | 3  | Marlon Brando     | 1924-04-03 | 2004-07-01 |
    | 4  | Hayao Miyazaki    | 1941-01-05 | NULL       |
    | 5  | Christopher Nolan | 1970-07-30 | NULL       |
    | 6  | Tom Hardy         | 1977-09-14 | NULL       |
    | 7  | Quentin Tarantino | 1963-03-27 | NULL       |
    | 8  | Sofia Coppola     | 1971-05-14 | NULL       |
    | 9  | Natalie Portman   | 1981-06-09 | NULL       |
    | 10 | Ridley Scott      | 1937-11-30 | NULL       |
    | 11 | Emma Watson       | 1990-04-15 | NULL       |

</details>



<details>
    <summary>`reviews` table</summary>

    | id | film_id | num_user | num_critic | imdb_score | num_votes | facebook_likes |
    |----|---------|----------|------------|------------|-----------|----------------|
    | 1  | 1       | 10000    | 250        | 8.8        | 2050000   | 1500000        |
    | 2  | 2       | 8500     | 300        | 8.6        | 600000    | 1200000        |
    | 3  | 3       | 7500     | 150        | 9.2        | 1600000   | 900000         |
    | 4  | 4       | 9000     | 200        | 8.6        | 650000    | 800000         |
    | 5  | 5       | 9500     | 275        | 8.6        | 1500000   | 1000000        |
    | 6  | 1       | 11000    | 260        | 9.0        | 2100000   | 1550000        |
    | 7  | 2       | 8700     | 310        | 8.7        | 620000    | 1250000        |
    | 8  | 3       | 7600     | 160        | 9.3        | 1650000   | 950000         |

</details>



<details>
    <summary>`roles` table</summary>

    | id | film_id | person_id | role        |
    |----|---------|-----------|-------------|
    | 1  | 1       | 1         | Actor       |
    | 2  | 2       | 2         | Director    |
    | 3  | 3       | 3         | Actor       |
    | 4  | 4       | 4         | Director    |
    | 5  | 5       | 5         | Director    |
    | 6  | 1       | 6         | Actor       |
    | 7  | 2       | 7         | Director    |
    | 8  | 3       | 8         | Actor       |
    | 9  | 4       | 9         | Director    |
    | 10 | 5       | 10        | Director    |
    | 11 | 1       | 11        | Actor       |
    | 12 | 2       | 1         | Actor       |
    | 13 | 3       | 2         | Director    |
    | 14 | 4       | 3         | Actor       |
    | 15 | 5       | 4         | Director    |
    | 16 | 1       | 5         | Actor       |

</details>


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
| 11               |

## COUNT Multiple Fields

To count more than one field, use COUNT multiple times. For example, to count names and birth dates:

```sql
SELECT COUNT(name) AS count_names, COUNT(birthdate) AS count_birthdates
FROM people;
```

Expected Output:

| count_names | count_birthdates |
|-------------|------------------|
| 11          | 11               |

## Using * with COUNT 

To count the number of records in a table, use COUNT with an asterisk:

```sql
SELECT COUNT(*) AS total_records
FROM people;
```

Expected Output:

| total_records |
|---------------|
| 11            |

## DISTINCT

The DISTINCT keyword selects unique values from a field, removing duplicates. For example, to see unique languages in the films table:

```sql
SELECT DISTINCT(language)
FROM films;
```

Expected Output:

| language |
|----------|
| English  |
| Korean   |
| French   |
| Spanish  |

## COUNT with DISTINCT

Combining COUNT with DISTINCT counts the number of unique values in a field. For instance, to count distinct birth dates in the people table:

```sql
SELECT COUNT(DISTINCT birthdate) AS unique_birthdates
FROM people;
```

Expected Output:

| unique_birthdates |
|-------------------|
| 10                |


The number of unique birth dates differs from the total count because some people share the same birthday.