---
title: "Queries"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases]
sidebar_position: 4
last_update:
  date: 2/27/2022
---



## Overview

SQL helps answer questions within and across relational database tables. For instance, in a library database, we can use SQL to identify which books James checked out in 2022. In an HR database, SQL can be used to compare salaries for employees in Marketing and Accounting to see if pay is balanced across departments.

- Querying book checkouts by a specific patron and date
- Comparing salaries across departments in an HR database

## Best for Large Datasets

SQL is often used alongside other tools like spreadsheets. While spreadsheets work well for smaller, simpler datasets, SQL is better for large, complex datasets, such as those in retail platforms. Organizing data in a database and using SQL queries is more effective.

- Analyzing trends in website traffic, customer reviews, and product sales
- Identifying products with the highest sales or worst reviews
- Observing changes in website traffic after introducing a new feature

SQL excels with large amounts of data and complex relationships.

## Keywords

To write SQL code, we need to learn some keywords. Keywords are reserved words that specify the operation we want to perform. The two most common keywords are SELECT and FROM.

- SELECT specifies which fields to retrieve
- FROM specifies the table where these fields are located

## Our First Query

Let's put these parts together. To list all library patrons, the query starts with the SELECT statement followed by the FROM statement on the next line. It's best practice to end the query with a semicolon to indicate it's complete.

```sql
SELECT name
FROM patrons;
```

Expected Output:

| name        |
|-------------|
| John Doe    |
| Jane Smith  |
| Alice Johnson|
| Bob Brown   |
| Charlie Davis|

- Keywords are capitalized, while table and field names are lowercase
- The result set shows all patron names without altering the database
- Save SQL code to share results with collaborators

## Selecting Multiple Fields

To select multiple fields, list them after the SELECT keyword, separated by commas. The order of the fields in the query determines their order in the result set.

```sql
SELECT card_num, name
FROM patrons;
```

Expected Output:

| card_num | name         |
|----------|--------------|
| 123456   | John Doe     |
| 234567   | Jane Smith   |
| 345678   | Alice Johnson|
| 456789   | Bob Brown    |
| 567890   | Charlie Davis|

- Example: Selecting card number and name fields in a specified order

## Selecting All Fields

To select all fields in a table, use an asterisk (*) instead of listing each field name.

```sql
SELECT *
FROM patrons;
```

Expected Output:

| card_num | name         | member_year | total_fine |
|----------|--------------|-------------|------------|
| 123456   | John Doe     | 2021        | 15.75      |
| 234567   | Jane Smith   | 2020        | 5.00       |
| 345678   | Alice Johnson| 2019        | 0.00       |
| 456789   | Bob Brown    | 2022        | 7.50       |
| 567890   | Charlie Davis| 2023        | 12.30      |

- Easier way to retrieve all fields in a table without specifying each one