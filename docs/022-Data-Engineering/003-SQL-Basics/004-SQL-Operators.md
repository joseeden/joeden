---
title: "SQL Operators"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 4
last_update:
  date: 2/27/2022
---

## Overview

SQL operators are used to perform operations on data within the database. They are used in the SQL WHERE Clause to specify conditions and in the SELECT, UPDATE, and DELETE statements. Each SQL operator has specific rules about the types of data on which it can operate.

## Arithmetic Operators

Arithmetic operators perform mathematical operations.

- Addition (+)

- Subtraction (-)

- Multiplication (*)

- Division (/)

- Modulus (%)

For more information, please see [Arithmetic Operations.](./011-Arithmetic-Operations.md)

## Comparison Operators

Comparison operators are used in conditions that compare one expression with another. The result of a comparison can be TRUE, FALSE, or UNKNOWN.

- Equal to 

    ```bash 
    =
    ```

- Not equal to 

    ```bash 
    <>  or  !=
    ```

- Greater than

    ```bash 
    >
    ```

- Less than

    ```bash 
    <
    ```

- Greater than or equal to 

    ```bash 
    >=
    ```
    
- Less than or equal to 

    ```bash 
    <=
    ```

## Logical Operators

Logical operators combine multiple conditions.

- `AND`: TRUE if all conditions separated by AND are TRUE

- `OR`: TRUE if any of the conditions separated by OR is TRUE

- `NOT`: TRUE if the following condition is FALSE

## Bitwise Operators

Bitwise operators perform bit-level operations on bit patterns or binary numerals.

- AND (&)

- OR (|)

- NOT (~)

- XOR (^)

## Set Operators

Set operators combine the results of two or more SELECT statements.

- `UNION`: Combines the result sets of two or more SELECT statements, removing duplicate rows.

- `UNION ALL`: Combines the result sets of two or more SELECT statements, including duplicate rows.

- `INTERSECT`: Returns rows that are common to the result sets of two or more SELECT statements.

- `MINUS`: Returns rows in the first SELECT statement that are not returned by the second SELECT statement.