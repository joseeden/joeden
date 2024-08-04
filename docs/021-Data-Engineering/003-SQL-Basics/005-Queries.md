---
title: "Queries"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 5
last_update:
  date: 2/27/2022
---



## Overview

SQL helps answer questions within and across relational database tables. 

- Querying book checkouts by a specific patron and date in a library database
- Comparing salaries across departments in an HR database

SQL is often used alongside other tools like spreadsheets. While spreadsheets work well for smaller, simpler datasets, SQL is better for large, complex datasets, such as those in retail platforms. Organizing data in a database and using SQL queries is more effective.

- Identifying products with the highest sales or worst reviews
- Analyzing trends in website traffic, customer reviews, and product sales
- SQL excels with large amounts of data and complex relationships.

## Keywords

Keywords are reserved words that specify the operation we want to perform. The two most common keywords are `SELECT` and `FROM`.

- `SELECT` specifies which fields to retrieve
- `FROM` specifies the table where these fields are located

Below is A SAMPLE **patrons** table:


| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John           | 2021        | 15.75      |
| 234567   | Jane           | 2020        | 5.00       |
| 345678   | Alice          | 2019        | 0.00       |
| 456789   | Bob            | 2022        | 7.50       |
| 567890   | Charlie        | 2021        | 12.30      |



To list all library patrons, the query starts with the SELECT statement followed by the FROM statement on the next line. It's best practice to end the query with a semicolon to indicate it's complete.

```sql
SELECT name
FROM patrons;
```

Expected Output:

| name          |
|---------------|
| John Doe      |
| Jane Smith    |
| Alice Johnson |
| Bob Brown     |
| Charlie Davis |



Note:

- Keywords are capitalized, while table and field names are lowercase
- The result set shows all patron names without altering the database
- Save SQL code to share results with collaborators

## Selecting Multiple Fields

To select multiple fields, list them after the SELECT keyword, separated by commas. The order of the fields in the query determines their order in the result set.

```sql
SELECT card_num, name
FROM patrons;
```


| card_num | name         |
|----------|--------------|
| 123456   | John Doe     |
| 234567   | Jane Smith   |
| 345678   | Alice Johnson|
| 456789   | Bob Brown    |
| 567890   | Charlie Davis|


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



## Aliasing

Renaming columns in the result set can improve clarity or brevity. This is done using aliasing. Below is a sample **employees** table:

| id       | name           | dept_id   | job_level_id  | year_hired  |
|----------|----------------|-----------|---------------|-------------|
| 123456   | John           | 1         | 3             | 2021        |
| 234567   | Jane           | 2         | 3             | 2020        |
| 345678   | Alice          | 2         | 1             | 2019        |
| 456789   | Bob            | 3         | 2             | 2022        |
| 567890   | Charlie        | 2         | 2             | 2021        |


To select the `name` and `year_hired` from the employees table and rename the `name` column to `first_name`, use the AS keyword.

```sql
SELECT name AS first_name, year_hired
FROM employees;
```

Expected Output:

| first_name | year_hired |
|------------|------------|
| John       | 2021       |
| Jane       | 2020       |
| Alice      | 2019       |
| Bob        | 2022       |
| Charlie    | 2021       |

## Selecting Distinct Records

To get a list of unique values, such as years in which employees were hired, use the DISTINCT keyword. Without DISTINCT, duplicate years may appear in the result set.

```sql
SELECT DISTINCT year_hired
FROM employees;
```

Expected Output:

| year_hired |
|------------|
| 2021       |
| 2020       |
| 2019       |
| 2022       |

## DISTINCT with Multiple Fields

To return unique combinations of multiple fields, list the fields after the DISTINCT keyword. For example, to see the years different departments hired employees, query the `dept_id` and `year_hired` fields.

```sql
SELECT DISTINCT dept_id, year_hired
FROM employees;
```

Expected Output:

| dept_id | year_hired |
|---------|------------|
| 1       | 2021       |
| 2       | 2020       |
| 2       | 2019       |
| 3       | 2022       |
| 2       | 2021       |

As we can see, individual fields may still have repeat values, but each combination is unique. For example, the second. third, and fifth record are all unique combination:


## Views

Views are virtual tables created from saved SQL SELECT statements. They store the query code rather than the data, so the view's results update automatically with changes to the underlying data. To create a view, use CREATE VIEW followed by the view name and the AS keyword.

```sql
CREATE VIEW employee_hire_years AS
SELECT name, dept_id, year_hired
FROM employees;
```

Once created, a view can be queried just like a normal table.

```sql
SELECT *
FROM employee_hire_years;
```

Expected Output:

| name    | dept_id | year_hired |
|---------|---------|------------|
| John    | 1       | 2021       |
| Jane    | 2       | 2020       |
| Alice   | 2       | 2019       |
| Bob     | 3       | 2022       |
| Charlie | 2       | 2021       |

