---
title: "Filtering with Having"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 15
last_update:
  date: 8/23/2019
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


## Filtering grouped data

In SQL, the `WHERE` clause cannot be used to filter results based on aggregate functions. For instance, if we want to filter results based on the number of films released per year, using WHERE won’t work. To address this, SQL provides the HAVING clause, specifically designed to filter grouped data. 

For example, if you want to find years where more than two films were released, you would use the HAVING clause to achieve this.

Example:

```sql
SELECT release_year, COUNT(title) AS film_count
FROM films
GROUP BY release_year
HAVING COUNT(title) > 2;
```

Output:

```sql
| release_year | film_count |
|--------------|------------|
| 2010         | 1          |
| 2017         | 1          |
```

## Order of Execution

Understanding the SQL execution order is key to writing effective queries. Consider the following sequence of operations in a query:

- `FROM`: Defines the data source.
- `WHERE`: Filters individual rows before grouping.
- `GROUP BY`: Groups rows into aggregated records.
- `HAVING`: Filters groups after aggregation.
- `SELECT`: Specifies the fields to return.
- `ORDER BY`: Sorts the results.
- `LIMIT`: Restricts the number of rows returned.

For instance, if we have a query with the following components:

```sql
SELECT release_year, COUNT(title) AS film_count
FROM films
WHERE country = 'USA'
GROUP BY release_year
HAVING COUNT(title) > 2
ORDER BY release_year
LIMIT 5;
```

Output:

```bash
| release_year | film_count |
|--------------|------------|
| 2010         | 1          |
```

The SQL engine processes it in this order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, and LIMIT. The HAVING clause comes after GROUP BY because it filters based on aggregate results.


## HAVING vs. WHERE

The `WHERE` clause filters individual records, while HAVING filters groups of records. Consider these two scenarios:

### Scenario 1

"Which films were released in 2017?"

Here, you don’t need grouping; you simply filter on a specific year.
  
```sql
SELECT title
FROM films
WHERE release_year = 2017;
```

Output:

```bash
| title |
|-------|
| Coco  |
```


### Scenario 2

"In which years did the average film duration exceed 120 minutes?"

This question involves grouping by year and then filtering based on the average duration. Since `WHERE` can’t handle aggregate functions, you use HAVING.
  
Steps:

1. Select the release year and calculate the average duration.
2. Filter the years where this average exceeds 120 minutes.
3. Group by release year for aggregation.

Example:

```sql
SELECT release_year, AVG(duration) AS avg_duration
FROM films
GROUP BY release_year
HAVING AVG(duration) > 120;
```

Output:

```bash
| release_year | avg_duration |
|--------------|--------------|
| 1972         | 175.0        |
| 2010         | 148.0        |
| 2017         | 105.0        | 
```

### Scenario 3 

To do:

- Select country from the films table, and get the distinct count of certification aliased as certification_count.
- Group the results by country.
- Filter the unique count of certifications to only results greater than 2.

Solution:

```sql
SELECT country, COUNT(DISTINCT certification) AS certification_count
FROM films
GROUP by country
HAVING COUNT(DISTINCT certification) > 2;
```

Output:

```bash
country | certification_count
--------|----------------------
USA     | 3
```

### Scenario 4

To do:

- Select the country and the average budget as `average_budget`, rounded to two decimal, from films.
- Group the results by country.
- Filter the results to countries with an average budget of more than one billion (1000000000).
- Sort by descending order of the `average_budget`.

Solution:

```sql
SELECT country, ROUND(AVG(budget),2) AS average_budget
FROM films 
GROUP BY country 
HAVING ROUND(AVG(budget),2) > 10000000 
ORDER BY average_budget DESC;  
```

Output:

```bash
| country      | average_budget |
|--------------|----------------|
| USA          | 337500000.00   |
| South Korea  | 11400000.00    |
```



### Scenario 5

Select the `release_year` for each film in the films table, filter for records released after 1990, and group by `release_year`.

```sql
SELECT release_year
FROM films 
WHERE release_year > 1990 
GROUP BY release_year; 
```

Modify the query to include the average budget aliased as `avg_budget` and average gross aliased as `avg_gross` for the results we have so far.

```sql
SELECT release_year, AVG(budget) AS avg_budget, AVG(gross) AS avg_gross
FROM films
WHERE release_year > 1990
GROUP BY release_year;
```

Modify the query once more so that only years with an average budget of greater than 60 million are included.

```sql
SELECT release_year, AVG(budget) AS avg_budget, AVG(gross) AS avg_gross
FROM films
WHERE release_year > 1990
GROUP BY release_year
HAVING AVG(budget) > 60000000; 
```

Finally, order the results from the highest average gross and limit to one.

```sql
SELECT release_year, AVG(budget) AS avg_budget, AVG(gross) AS avg_gross
FROM films
WHERE release_year > 1990
GROUP BY release_year
HAVING AVG(budget) > 60000000
ORDER BY AVG(gross) DESC
LIMIT 1;
```