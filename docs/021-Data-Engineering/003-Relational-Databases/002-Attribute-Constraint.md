---
title: "Attribute Constraint"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 2
last_update:
  date: 2/27/2022
---



## Overview

Databases are designed to organize data within a specific structure and enforce rules such as data types and relationships. These rules, known as **integrity constraints**, ensure data follows a predefined format.

- Constraints enforce data consistency and structure.
- They ensure adherence to specified data formats.

## Integrity Constraints

Integrity constraints come in three main types:

- **Attribute Constraints** 

    - Specify the data type for each column, like integers or text
    - Ensure that only valid data is stored
    
- **Key Constraints** 

    - Use primary keys to uniquely identify each record
    - Ensure no duplicates
    
- **Referential Integrity Constraints** 

    - Link tables together to maintain consistency across related data
    - Manage relationships between tables

## Why Constraints?

Constraints enforce a consistent format for data entry, which simplifies processing and ensures reliability. For instance, they ensure that all birthdates follow the same format, reducing errors and maintaining uniformity.

- Constraints standardize data entry formats.
- They improve data processing efficiency and accuracy.

## Data Types as Attribute Constraints

PostgreSQL offers various data types, such as "bigint" for large numbers and "character varying" for text. Specialized types, like "cidr" for IP addresses, help enforce specific data formats.

- Data types include basic types and more specialized options.
- They ensure data fits expected formats and structures.

## Dealing with Data Types (Casting)

Data types restrict operations on data. For instance, you can’t perform arithmetic operations between integers and text. To handle this, type casting converts data types as needed. PostgreSQL’s `CAST` function lets you convert text to integers or other types for calculations.

- Type casting allows conversion between data types.
- Use functions like `CAST` to perform necessary conversions for operations.

As an example, create a database with two columns:

```sql
CREATE TABLE weather (
  temperature integer,
  wind_speed text);
```

If we try to multiply `temperature` and `wind_speed`, we will get an error:

```sql 
SELECT temperature * wind_speed AS wind_chill 
FROM weather; 
```

![](/img/docs/multiplying-columns-with-different-data-types-error.png)

The correct command would be:

```sql 
SELECT temperature * CAST(wind_speed as INTEGER) AS wind_chill 
FROM weather; 
```


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


## Specifying Types

When creating tables, you specify data types for each column. For example:

```sql
CREATE TABLE students (
    ssn INTEGER,                    
    name VARCHAR(64),
    dob DATE,
    average_grade NUMERIC(3, 2),
    tuition_paid BOOLEAN
);
```

Where:

- Social Security Number (ssn) is stored as an integer for whole numbers.
- Name is stored as a string with up to 64 characters.
- Date of Birth (dob) is naturally stored as a date type.
- Average Grade is a numeric value with three digits total, including two decimal places.
- Tuition Paid is a boolean to represent true or false states.

These choices define the structure and constraints for the data.

- Integer types are used for whole number storage.
- Precision and scale define numeric formats.

## Alter Types 

Changing data types after a table has been created is straightforward using the `ALTER TABLE ALTER COLUMN` command. For instance, you might extend the maximum name length to 128 characters. 

```sql
ALTER TABLE students
ALTER COLUMN name 
TYPE varchar(128)
```

Note that if the `name` exceeds 128 characters, you'll get an error message and some characters may be lost during the alteration, as strings longer than the specified characters will be truncated. PostgreSQL may also attempt to convert the data to the new type.

```bash
ERROR:  value too long for type character varying(16) 
```

To handle this situation, you need to explicitly define how to truncate or modify the existing data so it fits the new type constraints.

```sql
ALTER TABLE professors 
ALTER COLUMN firstname 
TYPE varchar(16) 
USING SUBSTRING(firstname FROM 1 FOR 128); 
```

When changing types, you may need to adjust existing data to fit the new type. The `USING` keyword allows you to specify transformations. For example, if converting an "average_grade" column to an integer, you could use `USING` to round values to the nearest whole number.

Let's say the `average_grade` has a value of "6.51". It will be rounded to "7" before type conversion.

```sql
ALTER TABLE students
ALTER COLUMN average_grade 
TYPE integer 
USING ROUND(average_grade)  
```





