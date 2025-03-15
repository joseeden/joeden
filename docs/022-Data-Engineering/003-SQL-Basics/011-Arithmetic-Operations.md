---
title: "Arithmetic Operations"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 11
last_update:
  date: 8/23/2019
---


## Overview

SQL allows basic arithmetic operations such as addition, subtraction, multiplication, and division. Parentheses can be used to clarify the order of operations, though they are not always necessary if only one operation is performed. 

- **Addition:** `SELECT 10 + 5 AS result;`
- **Subtraction:** `SELECT 20 - 4 AS result;`
- **Multiplication:** `SELECT 7 * 3 AS result;`
- **Division:** `SELECT 8 / 3 AS result;`

## Sample Table 

We'll use the **films** table for the examples:

| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |



## Division Results

By default, SQL performs integer division when both operands are integers. This results in truncating any decimal portion. For more precise results, use floating-point numbers.

Example:

```sql
SELECT 8 / 3 AS result;
```

| result |
|--------|
| 2      |


Example with Precision:

```sql
SELECT 8.0 / 3.0 AS precise_result;
```

| precise_result |
|----------------|
| 2.6666666666666667 |



## Aggregate vs. Arithmetic

Aggregate functions, such as `SUM`, operate vertically on columns (fields), summing or otherwise processing data across rows. Arithmetic operations, however, work horizontally across individual rows.

- **Aggregate Functions:** Perform operations on entire columns.
- **Arithmetic Operations:** Work on individual rows or calculated results from columns.

## Without Aliasing

Note that we need to use aliases when using arithmetic operations. Without aliases, we'll get a weird heading name:

```sql
SELECT 8 / 3
```

| ?column?  |
|--------   |
| 2         |

## Aliasing with Arithmetic

As previously mentioned, it’s important to use aliases when performing arithmetic operations. This practice improves clarity, especially when summarizing data.

To get the profit, we can subtract the budget from the gross:

```sql
SELECT gross - budget AS profit
FROM films;
```

Output:

| profit    |
|-----------|
| 669895144 |
| 246120986 |
| 64120000  |
| 164200000 |
| 632082196 |

## Aliasing with Functions

Aliasing is crucial when using functions to avoid ambiguous field names. For instance, using multiple aggregate functions without aliases can lead to confusion.


Examples:

- To get the films with the highest grossing with the lowest budgets:

    ```sql
    SELECT MAX(gross) AS highest_gross,
        MIN(budget) AS lowest_budget
    FROM films;
    ```

    Output:

    | highest_gross | lowest_budget |
    |---------------|---------------|
    | 807082196     | 10000000      |


- Select the title and duration in hours for all films and alias as duration_hours; since the current durations are in minutes, you'll need to divide duration by 60.0.

    ```sql
    SELECT title, (duration/60.0) AS duration_hours
    FROM films;
    ```

- Find how many decades (period of ten years) the films table covers by using `MIN` and `MAX`; alias as `number_of_decades`.    

    ```sql
    SELECT (MAX(release_year) - MIN(release_year))/ 10.0 AS number_of_decades
    FROM films; 
    ```

## Order of Execution in SQL

The order of execution in SQL queries is: 

1. `FROM` 
2. `WHERE` 
3. `SELECT` 
4. `LIMIT`. 

Aliases defined in the `SELECT` clause are not available for use in the `WHERE` clause, as the alias is assigned later in the execution process.

Example:

```sql
SELECT gross - budget AS profit
FROM films
WHERE profit > 100000000;  -- This will cause an error
```

In this example, the alias `profit` is defined in the `SELECT` clause and cannot be used in the `WHERE` clause because the alias is not yet available during the `WHERE` clause execution. 

To filter based on a calculated field, use a subquery or a `HAVING` clause if dealing with aggregate functions.

```sql
SELECT *
FROM (
    SELECT gross - budget AS profit
    FROM films
) AS subquery
WHERE profit > 100000000;
```

## More examples of Aliasing with Functions 

We're using the **people** table for the examples:

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


Calculate the percentage of people who are no longer alive and alias the result as percentage_dead.

```sql
SELECT COUNT(deathdate)*100.0/COUNT(*) AS percentage_dead
FROM people; 
```