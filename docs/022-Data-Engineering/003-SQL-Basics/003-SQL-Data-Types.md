---
title: "SQL Data Types"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 3
last_update:
  date: 8/23/2019
---


## Overview

When creating a table, it's important to specify the data type for each field based on the type of data it will hold. Data types matter for a few reasons.

- Different data types are stored differently and take up varying amounts of space
- Certain operations only make sense for specific data types, like multiplying numbers but not text

It's important to note that these data types can vary slightly depending on the databa


Below is the **patrons** table that has fields with different data types:

<div class='img-center'>

| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John           | 2021        | 15.75      |
| 234567   | Jane           | 2020        | 5.00       |
| 345678   | Alice          | 2019        | 0.00       |
| 456789   | Bob            | 2022        | 7.50       |
| 567890   | Charlie        | 2021        | 12.30      |

</div>

## Numeric Data Types 

These include integers, decimals, and floating-point numbers. Here are some common operations:

- `INT`: A whole number with no fractional component.

- `DECIMAL or NUMERIC`: Exact numerical, precision p, scale s.

- `FLOAT or REAL`: Approximate numerical, mantissa precision p.

- `BIT`: Integer that can be 0, 1, or null.

Operations:

- Arithmetic operations: 

    ```bash
    +, -, *, /
    ```

- Comparison operations: 

    ```bash
    <, >, <=, >=, =, <>
    ```


### Integers

Integer data types store whole numbers. SQL offers several data types for integers.

- Handles numbers from just under negative two billion to just over positive two billion
- Different types are available based on the size of the numbers you need to store

In the patrons table, the years in the `member_year` column are integers.

### Floats

Float data types store numbers with fractional parts. SQL has various float data types depending on the precision required.

- **NUMERIC** data type can store floats with up to 38 digits total.
- This includes those before and after the decimal point.

In the patrons table, the `total_fine` field is a float.


## Date and Time Data Types

These are used to store date, time, timestamp data. 

- `DATE`: Date value (format: YYYY-MM-DD).
- `TIME`: Time values (format: HH:MI:SS).
- `DATETIME`: Combination of date and time (format: YYYY-MM-DD HH:MI:SS).
- `TIMESTAMP`: A timestamp.

Here are some common operations:

- Date arithmetic: +, -
- Date functions: `NOW()`, `DATE()`, `YEAR()`, `MONTH()`, `DAY()`
- Interval calculations



## Strings

In programming, a "string" is a sequence of characters, like letters or punctuation.

- Some are meant for short strings, up to 250 characters, saving storage space
- The **VARCHAR** data type is flexible, storing both small and large strings.
- The VARCHAR data type can hold up to tens of thousands of characters
- Due to its flexibility, VARCHAR is commonly used for storing strings

SQL has different data types for strings.

- `CHAR(n)`: Fixed-length character string, with size n.
- `VARCHAR(n)`: Variable-length character string, with maximum size n.

For example, the names in the **patrons** table are strings like "John" and "Jane." 


## Binary Data Types

This type stores true or false values. The operations on boolean data include logical operations AND, OR, NOT.

- `BINARY(n)`: Fixed-length binary string.

- `VARBINARY(n)`: Variable-length binary string.

- `IMAGE`: Variable width binary string.

## Miscellaneous Data Types

- `BOOLEAN`: Stores TRUE, FALSE, or UNKNOWN values.

- `ENUM`: String object with a value chosen from a list of permitted values.


## Schemas

A database schema is like a blueprint, showing the design of a database. It includes information about tables and their relationships.

- Indicates what data type each field can hold
- Shows relationships between tables, e.g. **patrons** table related to **checkouts** table.

For example, the schema for the **patrons** and **checkouts** table would look something like this:

- patrons
    - card_num: INT
    - name: VARCHAR 
    - member_year: INT
    - total_fine: NUMERIC 

- checkouts
    - id: INT
    - start_date: DATE
    - due_date: DATE
    - card_num: INT
    - book_id: INT

### Creating the Table 

Below is an example of a series of SQL commands to create a schema for **Customer** and **Order** tables:

```sql
-- Creating a Customer table schema
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(15)
);

-- Creating an Orders table schema with a foreign key relationship to Customer
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
```

To join the table:

```sql
SELECT Customer.CustomerID, Customer.FirstName, Customer.LastName, Orders.OrderID, Orders.OrderDate, Orders.TotalAmount
FROM Customer
INNER JOIN Orders ON Customer.CustomerID = Orders.CustomerID;
```

### Star Schema 

In data warehousing, a star schema is often used. It optimizes analytical databases like Redshift.

- **Fact tables**: Records that represent events, such as orders
- **Dimension tables**: Information on the world, like customer names or product prices

    <div class="img-center">

    ![](/img/docs/data-eng-star-schema.png)
    
    </div>

For more information, please see [Schemas and Normalization](../021-Database-Design/003-Schemas-and-Normalization.md)



## Database Storage

Information in a database table is stored on the hard disk of a server. Servers are powerful, centralized computers providing services over a network.

- Servers handle data access, host websites, or store files
- Dedicated servers are typically large and powerful to manage high volumes of requests and data