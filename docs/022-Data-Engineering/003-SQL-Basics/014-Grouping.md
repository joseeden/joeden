---
title: "Grouping"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 14
last_update:
  date: 2/27/2022
---

## Sample Table

We'll use a **films** table for the examples. 


| id | title        | release_year | country     | duration | language | certification | gross      | budget     |
|----|--------------|--------------|-------------|----------|----------|---------------|------------|------------|
| 1  | Inception    | 2010         | USA         | 148      | English  | PG-13         | 829895144  | 160000000  |
| 2  | Parasite     | 2019         | South Korea | 132      | Korean   | R             | 257590152  | 11400000   |
| 3  | The Godfather| 1972         | USA         | 175      | English  | R             | 246120986  | 6000000    |
| 4  | Amélie       | 2001         | France      | 122      | French   | R             | 174200000  | 10000000   |
| 5  | Coco         | 2017         | USA         | 105      | Spanish  | PG            | 807082196  | 175000000  |


## Grouping Data

In practice, we often need to summarize data by grouping it. For instance, we might want to group film data by certification and calculate summary statistics, such as the average duration for each certification.

## GROUP BY Single Fields

SQL uses the `GROUP BY` clause to group data based on one or more fields. This is often combined with aggregate functions to get summary statistics for each group. 

To find the average duration of films for each certification:

```sql
SELECT certification, AVG(duration) AS avg_duration
FROM films
GROUP BY certification;
```

Output:

| certification | avg_duration |
|---------------|--------------|
| PG            | 105          |
| PG-13         | 148          |
| R             | 149          |

## Error Handling

When using `GROUP BY`, all fields in the `SELECT` statement that are not aggregated must be included in the `GROUP BY` clause. If a field is selected but not grouped or aggregated, SQL will return an error.

Example:

```sql
SELECT certification, title
FROM films
GROUP BY certification;
```

Error Message: Field `title` is not aggregated or included in the `GROUP BY` clause.

Corrected Query:

```sql
SELECT certification, COUNT(title) AS film_count
FROM films
GROUP BY certification;
```

## GROUP BY Multiple Fields

`GROUP BY` can be applied to multiple fields, which affects how the data is grouped. The order of fields in the `GROUP BY` clause determines the grouping hierarchy.

To see the number of films by certification and language:

```sql
SELECT certification, language, COUNT(title) AS film_count
FROM films
GROUP BY certification, language;
```

Output:

| certification | language   | film_count |
|---------------|------------|------------|
| PG            | Spanish    | 1          |
| PG-13         | English    | 1          |
| R             | English    | 2          |
| R             | Korean     | 1          |
| R             | French     | 1          |

## GROUP BY with ORDER BY

Combining `GROUP BY` with `ORDER BY` allows you to group data, perform calculations, and then sort the results. 

- To group and sort by film count:

    ```sql
    SELECT certification, COUNT(title) AS film_count
    FROM films
    GROUP BY certification
    ORDER BY film_count DESC;
    ```
    Output:

    | certification | film_count |
    |---------------|------------|
    | R             | 3          |
    | PG-13         | 1          |
    | PG            | 1          |

    **Explanation**: The `ORDER BY` clause is used after `GROUP BY` to sort the results based on the aggregated data. The query shows that there are more films with an R rating compared to other certifications.

- Select the release_year, country, and the maximum budget aliased as max_budget for each year and each country; sort your results by release_year and country.


    ```sql
    SELECT release_year, country, MAX(budget) AS max_budget
    FROM films 
    GROUP BY release_year, country
    ORDER BY release_year, country;
    ```

    Output: 

    | release_year | country      | max_budget |
    |--------------|--------------|------------|
    | 1972         | USA          | 6000000    |
    | 2001         | France       | 10000000   |
    | 2010         | USA          | 160000000  |
    | 2017         | USA          | 175000000  |
    | 2019         | South Korea  | 11400000   |



## Order of Execution

In SQL, the `GROUP BY` clause is processed after the `FROM` clause and before `ORDER BY`. The typical order of execution is:

1. `FROM` (to determine the data source)
2. `GROUP BY` (to group the data)
3. `SELECT` (to select fields and perform aggregations)
4. `ORDER BY` (to sort the results)
5. `LIMIT` (to restrict the number of results)

