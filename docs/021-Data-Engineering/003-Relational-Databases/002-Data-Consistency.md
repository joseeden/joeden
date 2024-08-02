---
title: "Attribute Constraints"
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

Here are some common data types used in PostgreSQL:


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


## Dealing with Data Types (Casting)

Data types restrict operations on data. For instance, you can’t perform arithmetic operations between integers and text. To handle this, type casting converts data types as needed. PostgreSQL’s `CAST` function lets you convert text to integers or other types for calculations.

- Type casting allows conversion between data types.
- Use functions like `CAST` to perform necessary conversions for operations.