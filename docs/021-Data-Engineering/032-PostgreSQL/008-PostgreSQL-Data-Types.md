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

