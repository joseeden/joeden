---
title: "Semi-structured Data"
description: "Handling Semi-structured Data"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 18
last_update:
  date: 1/19/2022
---


## Overview

Semi-structured data doesn't follow a fixed schema but offers flexibility, which makes it easier to adapt to changing requirements.  

- **Structured data** is organized, easy to search, and has a set format.  
- **Semi-structured data** is flexible, with no strict format but still contains some organization (e.g., JSON).  

Unlike structured data, semi-structured data allows changes in the data format without breaking the system.  

## JSON  

**JSON** (JavaScript Object Notation) is a popular format for semi-structured data. It stores data in key-value pairs, where the key is a label and the value is the data.  

Example of JSON:  

```json
{
  "cust_id": 1,
  "name": "John Doe"
}
```

JSON in Snowflake:

- Snowflake supports JSON with the `VARIANT` data type.  
- This allows Snowflake to handle semi-structured data efficiently.  

## How Snowflake stores JSON data

Snowflake’s `VARIANT` type makes working with evolving data structures like JSON easy.  

- `VARIANT` supports both JSON objects and arrays.  
- Objects store key-value pairs, and arrays store lists of values.  

Example table creation:

```sql
CREATE TABLE customer_data (
  customer_info VARIANT
);
```

## Semi-structured Data Functions  

This function converts JSON strings into the `VARIANT` data type.  

Example:  

```sql
SELECT PARSE_JSON(
  '{
      "id": "51205289", 
      "name": "John", 
      "age": 30,
      "email": "johnsmith@abc.com"
   }'
  ) AS customer_info;
```

## `OBJECT_CONSTRUCT`  

The `OBJECT_CONSTRUCT` can create a JSON object from key-value pairs. To use this, pass the keys and values as arguments to generate JSON.  

Example:  

```sql
SELECT OBJECT_CONSTRUCT(
    'id', 51205289,
    'name', 'John', 
    'age', 30,
    'email', 'johnsmith@abc.com'
  ) AS customer_info;
```

## Querying JSON Data in Snowflake  

Snowflake allows querying JSON data using colon notation. Use this notation to extract values from JSON objects stored in `VARIANT` columns.  

Example:  

```sql
SELECT 
  customer_info:id,
  customer_info:age, 
  customer_info:name,
  customer_info:email,
FROM customer_data;
```

## Querying Nested JSON Data  

Nested JSON data can be queried using either colon or dot notation.  

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipcode": "62701"
  }
}

```

Example (using colon notation):  

```sql
SELECT customer_info:address:street AS street_name
FROM customer_data;
```

Example (using dot notation): 

```sql
SELECT customer_info.address.street AS street_name
FROM customer_data;
```  

Both queries will return the street name "123 Main St" from the nested address JSON field.