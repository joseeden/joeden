---
title: "Tables"
description: "SQL Fundamentals"
tags: 
- Data Engineering
- Databases
- SQL
sidebar_position: 2
last_update:
  date: 8/23/2019
---


## Overview

Databases use tables to hold related data about specific subjects. Tables have rows (records) and columns (fields). While the fields are fixed when the database is created, the number of rows can increase indefinitely. 

- A record is a row in a table, containing data for an individual entry.
- A field is a column in a table; holds one type of information for all entries.

## Naming Practices

Best practices for naming tables:

- Use lowercase letters and underscores instead of spaces
- Prefer collective group names (e.g., "inventory") 
- Plural names are also acceptable (e.g., "products")

Best practices for naming fields:

- Use lowercase and singular names, avoiding spaces
- Ensure each field has a unique name and does not share its name with the table
- Example: Use "card_num" and "name" instead of "card_nums" and "names"

    | card_num | name           | member_year | total_fine |
    |----------|----------------|-------------|------------|
    | 123456   | John           | 2021        | 15.75      |
    | 234567   | Jane           | 2020        | 5.00       |
    | 345678   | Alice          | 2019        | 0.00       |
    | 456789   | Bob            | 2022        | 7.50       |
    | 567890   | Charlie        | 2021        | 12.30      |

## Unique Identifiers

A unique identifier, or "key," is a unique value that distinguishes each record in a table. Often a number, this key is crucial for identifying records. In the patrons table below, the `card_num` field serves as the unique identifier, not the name field, since multiple patrons might share the same name.

| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John Doe       | 2021        | 15.75      |
| 234567   | Jane Smith     | 2020        | 5.00       |
| 345678   | Alice Johnson  | 2019        | 0.00       |
| 456789   | Bob Brown      | 2022        | 7.50       |
| 567890   | Charlie Davis  | 2021        | 12.30      |

## Separating Data into Tables

Having more tables that is focused on a specific subject is better than a table combining multiple subjects. This approach helps maintain clarity and prevents confusion.

- More tables with distinct subjects are preferable
- Combining tables can cause duplicate information and non-unique values
- Conencted tables can answer questions while keeping table topics separate

For instance, consider a **patrons** table like this:

| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John Doe       | 2021        | 15.75      |
| 234567   | Jane Smith     | 2020        | 5.00       |
| 345678   | Alice Johnson  | 2019        | 0.00       |
| 456789   | Bob Brown      | 2022        | 7.50       |
| 567890   | Charlie Davis  | 2021        | 12.30      |

A **checkouts** table:

| id    | start_date | due_date   | card_num | book_id  |
|-------|------------|------------|----------|----------|
| 1001  | 01-07-2021 | 15-07-2021 | 123456   | AB1234Z  |
| 1002  | 05-07-2021 | 19-07-2021 | 234567   | CD5678X  |
| 1003  | 10-07-2021 | 24-07-2021 | 345678   | EF9101Y  |
| 1004  | 15-07-2021 | 29-07-2021 | 456789   | GH2345W  |
| 1005  | 20-07-2021 | 03-08-2021 | 567890   | IJ6789V  |

Since both tables are related, we can see information for each record clearly in both tables. As an example, we can find the year that Bob Brown started in the **patrons** table. If we want to see if he borrowed a book and when it is due, we can use his card number and check it on the **checkouts** table. 

Now if we combine both tables into one, the data becomes less clear. Each row now includes information about both the patron and their checkouts, leading to duplicated patron information and non-unique `card_num` values. This combination can make it harder to maintain and query the data effectively.

| card_num | name           | member_year | total_fine | id    | start_date | due_date   | book_id  |
|----------|----------------|-------------|------------|-------|------------|------------|----------|
| 123456   | John Doe       | 2021        | 15.75      | 1001  | 01-07-2021 | 15-07-2021 | AB1234Z  |
| 234567   | Jane Smith     | 2020        | 5.00       | 1002  | 05-07-2021 | 19-07-2021 | CD5678X  |
| 345678   | Alice Johnson  | 2019        | 0.00       | 1003  | 10-07-2021 | 24-07-2021 | EF9101Y  |
| 456789   | Bob Brown      | 2022        | 7.50       | 1004  | 15-07-2021 | 29-07-2021 | GH2345W  |
| 567890   | Charlie Davis  | 2021        | 12.30      | 1005  | 20-07-2021 | 03-08-2021 | IJ6789V  |
| 123456   | John Doe       | 2021        | 15.75      | 1006  | 01-08-2021 | 15-08-2021 | KL1122M  |
| 234567   | Jane Smith     | 2020        | 5.00       | 1007  | 05-08-2021 | 19-08-2021 | MN2233N  |



