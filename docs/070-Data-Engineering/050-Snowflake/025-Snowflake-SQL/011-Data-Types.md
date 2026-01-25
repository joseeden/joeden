---
title: "Data Types"
description: "Data Types"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 11
last_update:
  date: 1/15/2022
---

## Overview 

Snowflake supports various data types, including common SQL types and unique Snowflake-specific types.  

**Common Data Types**  

| Data Type        | Description |
|-----------------|-------------|
| **Strings**     | `VARCHAR`, `CHAR`, `TEXT` store text values. |
| **Numbers**     | `INTEGER` stores whole numbers. |
| **Booleans**    | `BOOLEAN` holds `TRUE` or `FALSE` values, useful for filtering. |
| **Dates & Times** | Various datetime types exist for handling timestamps. |
| **NUMBER**      | Similar to `NUMERIC`, allows up to 38 digits of precision and scale. |
| **TIMESTAMP_LTZ** | Stores date, time, and local timezone information. |

**Unique Snowflake Data Types**  

| Data Type        | Description |
|-----------------|-------------|
| **NUMBER**      | Similar to `NUMERIC`, allows up to 38 digits of precision and scale. |
| **TIMESTAMP_LTZ** | Stores date, time, and local timezone information. |


## Data Type Conversion  

Sometimes, converting data types is necessary for performance and accuracy.  

**Methods to Convert Data Types**  

1. **CAST() Function**  

    ```sql
    SELECT CAST('80' AS INT);
    ```

2. **Double Colon (::) Operator**  

    ```sql
    SELECT '80'::INT;
    ```


Example: Converting `order_timestamp` to `DATE`  

```sql
SELECT CAST(order_timestamp AS DATE) FROM orders;
```

Expected result:  

```
order_date  
2024-03-06  
```

## Conversion Functions  

Other conversion functions:

- **TO_VARCHAR()** – Converts numbers or timestamps to text.  
- **TO_DATE()** – Converts text into a date format.  

Example: Using `TO_VARCHAR()`  

```sql
SELECT TO_VARCHAR(12345);
```

Expected result:  

```
'12345'
```

## Check Data Types  

To see column data types in a table:  

```sql
DESC TABLE employees;
```  

This shows column names, types, and other details.