---
title: "Data Types in PostgreSQL"
description: "PostgreSQL"
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 8
last_update:
  date: 2/27/2022
---


## Most Common Data Types

PostgreSQL offers several common data types, many of which align with SQL standards and are found in other database systems:

- `Text`: allows character strings of any length.
- `Varchar/Char`: sets a maximum length or a fixed length for character strings.
- `Boolean`: supports true/false values and can also include a "NULL" for unknown states.
- `Numeric`: supports numbers with arbitrary precision.
- `Integer`: handles whole numbers within a specified range.
- `Bigint`: accommodates larger numbers beyond the integer range.

Here is a table format:

| Name            | Type         | Aliases      | Description                                                  |
|-----------------|--------------|--------------|--------------------------------------------------------------|
| `integer`       | Numeric       | `int`, `int4` | Stores whole numbers                                        |
| `bigint`        | Numeric       | `int8`       | Stores large whole numbers                                  |
| `smallint`      | Numeric       | `int2`       | Stores small whole numbers                                  |
| `decimal`       | Numeric       | `numeric`    | Stores exact numeric values with arbitrary precision         |
| `numeric`       | Numeric       | `decimal`    | Stores exact numeric values with arbitrary precision         |
| `real`          | Numeric       | `float4`     | Stores floating-point numbers with single precision         |
| `double precision` | Numeric   | `float8`     | Stores floating-point numbers with double precision         |
| `char(n)`       | Character     | `character`  | Stores fixed-length strings                                 |
| `varchar(n)`    | Character     | `character varying` | Stores variable-length strings with a limit             |
| `text`          | Character     | -            | Stores variable-length strings with no specific length limit|
| `date`          | Date and Time | -            | Stores dates                                                |
| `time`          | Date and Time | -            | Stores time of day                                          |
| `timestamp`     | Date and Time | -            | Stores date and time                                        |
| `timestamptz`   | Date and Time | -            | Stores date and time with time zone                         |
| `boolean`       | Boolean       | `bool`       | Stores truth values (`TRUE`, `FALSE`)                       |
| `bytea`         | Binary        | -            | Stores binary data (e.g., images, files)                    |
| `json`          | JSON          | -            | Stores JSON data                                            |
| `jsonb`         | JSON          | -            | Stores JSON data in a binary format for faster queries      |
| `integer[]`     | Array         | -            | Array of integers                                           |
| `text[]`        | Array         | -            | Array of text strings                                       |
| `point`         | Geometric     | -            | Stores a point in a 2D plane                                |
| `line`          | Geometric     | -            | Stores a line defined by the general linear equation        |
| `circle`        | Geometric     | -            | Stores a circle with a center and radius                    |
| `cidr`          | Network       | -            | Stores IPv4 or IPv6 network addresses                       |
| `inet`          | Network       | -            | Stores individual IP addresses                              |
| `uuid`          | UUID          | -            | Stores universally unique identifiers                       |
| `money`         | Money         | -            | Stores currency amounts                                     |


## Text Data Types 

Text data types in PostgreSQL are used to store and manage various types of text information. The three main text data types are `TEXT`, `VARCHAR`, and `CHAR`. Each type serves different purposes depending on the nature of the text data you want to store.

### TEXT Data Type

The `TEXT` data type is the most flexible option for storing text in PostgreSQL.

- Suitable for text data of unknown or varying length
- Can store from 0 characters up to potentially millions
- Ideal for storing large or unrestricted text, like descriptions, feedback, or content

Example:

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    notes TEXT                          -- Comments about the customer
);
```


### VARCHAR Data Type

The `VARCHAR` data type is similar to `TEXT` but allows for specifying a maximum length.

- Stores variable-length text up to a defined maximum
- Restriction can be imposed on column values: `VARCHAR(N)`, where "N" is the maximum length
- An error is generated if the input exceeds the defined length
- Useful for fields where length constraints are necessary, such as usernames or titles

Example:


```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),             -- First name limited to 50 characters
    last_name VARCHAR(50),              -- Last name limited to 50 characters
    notes TEXT                          -- Comments about the customer
);
```

### CHAR Data Type

The `CHAR` data type is used for fixed-length text.

- Stores text of a specific, fixed length
- If input is shorter than defined length, spaces are added to reach the required length
- Suitable for standard-length data like codes, identifiers, or predefined formats

Example:

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),             -- First name limited to 50 characters
    last_name VARCHAR(50),              -- Last name limited to 50 characters
    middle_initial CHAR,                -- Middle initial; single character
    zip_code CHAR(5),                   -- Fixed 5-character string
    notes TEXT                          -- Comments about the customer
);
```


## Numeric Data Types

When structuring a database, selecting the correct numeric data type ensures data is stored efficiently and accurately. PostgreSQL provides several numeric types, each suited for specific scenarios.

### Discrete Values

Discrete values are whole numbers without fractional components, ideal for counting items or tracking quantities where only integers are needed.

| Data Type | Description                               | Example Use Case                         | Range                                           |
|-----------|-------------------------------------------|------------------------------------------|-------------------------------------------------|
| SMALLINT  | Suitable for small-range values           | Storing a person's age                   | -32,768 to 32,767                               |
| INTEGER   | General-purpose whole numbers             | Counting sales or items                  | -2,147,483,648 to 2,147,483,647                 |
| BIGINT    | Large-range values                        | Tracking credit card transactions        | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| SERIAL    | Auto-incrementing integer, used for IDs   | Auto-incrementing ID                     | 1 to 2,147,483,647                              |
| BIGSERIAL | Auto-incrementing big integer for large IDs | Large auto-incrementing ID               | 1 to 9,223,372,036,854,775,807                  |

### Continuous Values

Continuous values include decimals, representing data that requires precision, such as financial or scientific data.

| Data Type        | Description                                         | Example Use Case      | Precision                                  |
|------------------|-----------------------------------------------------|-----------------------|--------------------------------------------|
| DECIMAL(8, 2)    | Stores exact numeric data with defined precision and scale | Storing salary data    | Up to 6 digits before and 2 digits after the decimal point |
| NUMERIC          | Same as DECIMAL, used for exact numeric values       | Financial calculations | Same as DECIMAL                            |
| REAL             | Single precision, suitable for approximate values    | Approximate values     | 6 decimal digits                           |
| DOUBLE PRECISION | Higher precision, used for scientific calculations   | Scientific data        | 15 decimal digits                          |

### Example: Numeric Data Types

Here’s an example of how you might define an employee table using both discrete and continuous values:

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    num_sales INTEGER,
    salary DECIMAL(8, 2)  -- 8 digits precision, 2 digits after the decimal point
);
```

We can also use `DEFAULT` values if no value is set for the column. Here's an example of an SBA campaign:

```sql
CREATE TABLE campaign (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  budget NUMERIC(7, 2),                     -- The campaign's budget
  num_days SMALLINT DEFAULT 30,             -- The duration of campaign in days
  goal_amount INTEGER DEFAULT 100,          -- The number of new applications desired
  num_applications INTEGER DEFAULT 0        -- The number of received applications
); 
```



## Bool and Temporal

### Boolean Data Type

The `BOOLEAN` data type in PostgreSQL is ideal for binary decisions or flags within your database. It is used to represent:

- `TRUE` or `FALSE` values 
- `NULL`, indicating an unknown value

`BOOLEAN` and `BOOL` are interchangeable in PostgreSQL. If no default value is specified for a `BOOLEAN` column, it defaults to `false`. However, you can explicitly set the default value based on your use case. 

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    in_stock BOOLEAN DEFAULT TRUE
);
```


### Temporal Data Types

Temporal data types are used to store dates, times, or both, making them essential for tracking events or time-sensitive data.

| Data Type  | Description                      |Format                 | Example Use Case                         |
|------------|----------------------------------|-----------------------|------------------------------------------|
| TIMESTAMP  | Stores both date and time        |2021-06-23 04:51:23    | Start date and time for a promotion      |
| DATE       | Stores only the date             |2021-06-23             | Employee birthdates                      |
| TIME       | Stores only the time             |04:51:23               | Scheduling daily automated reports       |

Temporal data types allow for precise control over date and time storage in your database. For example, the TIMESTAMP type can record the exact moment a marketing campaign begins, while the DATE type is sufficient for storing birthdates where the time of day is irrelevant.

Example:

```sql
CREATE TABLE promotions (
    promotion_id SERIAL PRIMARY KEY,
    promotion_name VARCHAR(100),
    start_time TIMESTAMP
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birthdate DATE
);
```

This setup allows you to track when promotions start and record employee birthdates accurately, using the appropriate temporal data type for each scenario.