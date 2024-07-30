---
title: "Summarizing Data"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 10
last_update:
  date: 2/27/2022
---

## Sample Table 

We'll use the **films** table for the examples:

| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |



## Aggregate Functions

There are aggregate functions that allow us to perform calculations on a set of values. These functions include finding the average, sum, minimum, and maximum of a specified field. Aggregate functions follow the `SELECT` keyword, similar to `COUNT`.

- **Average:** Finds the mean value.
- **Sum:** Adds up all the values.
- **Minimum:** Finds the smallest value.
- **Maximum:** Finds the largest value.

## Examples for Aggregate Functions 

- To find the average budget of the films in the table:

    ```sql
    SELECT AVG(budget) AS average_budget
    FROM films;
    ```

    Output:

    | average_budget |
    |----------------|
    | 60000000       |


- To sum up the total gross revenue from all films:

    ```sql
    SELECT SUM(gross) AS total_gross
    FROM films;
    ```

    Output:

    | total_gross |
    |-------------|
    | 1310799482  |



## `MIN` and `MAX` Functions

The `MIN` function returns the lowest value, and the `MAX` function returns the highest value in a specified field. 

Example: To determine the minimum and maximum budgets:

```sql
SELECT MIN(budget) AS minimum_budget, MAX(budget) AS maximum_budget
FROM films;
```

Output:

| minimum_budget | maximum_budget |
|----------------|----------------|
| 10000000       | 175000000      |


## Non-Numerical Data

Although some aggregate functions are mathematical, many can be used with non-numerical fields. COUNT, MIN, and MAX work well with strings and dates.

To discover the film titles that come first and last alphabetically:

```sql
SELECT MIN(title) AS first_title, MAX(title) AS last_title
FROM films;
```

Output:

| first_title    | last_title    |
|----------------|---------------|
| Amélie         | The Godfather |


## Aliasing for Clarity

When using aggregate functions, it’s best practice to alias your results for clarity. This helps make your code more readable.

```sql
SELECT MIN(release_year) AS earliest_release_year, MAX(release_year) AS latest_release_year
FROM films;
```

Output:

| earliest_release_year | latest_release_year |
|-----------------------|---------------------|
| 1972                  | 2019                |



## Combining `WHERE` with Aggregate Functions

Using the `WHERE` clause with aggregate functions helps refine data analysis by applying conditions before aggregation. The `WHERE` clause filters records, while aggregate functions summarize the filtered results.


## Examples for Aggregate + `WHERE`

- Average Budget for Movies Released in 2010 or Later

    ```sql
    SELECT AVG(budget) AS avg_budget_2010_or_later
    FROM films
    WHERE release_year >= 2010;
    ```

    Output:

    | avg_budget_2010_or_later |
    |--------------------------|
    | 85400000                 |

- Total Budget of Movies Released in 2010

    ```sql
    SELECT SUM(budget) AS total_budget_2010
    FROM films
    WHERE release_year = 2010;
    ```

    Output:

    | total_budget_2010 |
    |-------------------|
    | 160000000         |

- Smallest Budget of Movies Released in 2010

    ```sql
    SELECT MIN(budget) AS min_budget_2010
    FROM films
    WHERE release_year = 2010;
    ```

    Output:

    | min_budget_2010 |
    |-----------------|
    | 160000000       |

- Highest Budget and Count of Movies Released in 2010

    ```sql
    SELECT MAX(budget) AS max_budget_2010,
        COUNT(budget) AS count_budgets_2010
    FROM films
    WHERE release_year = 2010;
    ```

    Output:

    | max_budget_2010 | count_budgets_2010 |
    |-----------------|---------------------|
    | 160000000       | 1                   |

## Using ROUND for Precision

The `ROUND()` function is used to round numerical values to a specified number of decimal places. This is particularly useful for financial data where precision is required.


- Average Budget Rounded to Two Decimal Places

    ```sql
    SELECT ROUND(AVG(budget), 2) AS avg_budget_rounded
    FROM films
    WHERE release_year >= 2010;
    ```

    Output:

    | avg_budget_rounded |
    |--------------------|
    | 85400000.00        |

- Budget Rounded to Whole Numbers

    ```sql
    SELECT ROUND(AVG(budget)) AS avg_budget_whole
    FROM films
    WHERE release_year >= 2010;
    ```

    Output:

    | avg_budget_whole |
    |------------------|
    | 85400000         |

- Rounding to the Hundred Thousand

    ```sql
    SELECT ROUND(AVG(budget), -5) AS avg_budget_hundred_thousand
    FROM films
    WHERE release_year >= 2010;
    ```

    Output:

    | avg_budget_hundred_thousand |
    |------------------------------|
    | 85000000                    |
