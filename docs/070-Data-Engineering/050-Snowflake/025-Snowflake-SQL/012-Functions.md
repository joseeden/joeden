---
title: "Functions"
description: "Functions"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 12
last_update:
  date: 1/15/2022
---


## String Functions  

Snowflake provides useful functions for working with text data.  

- `INITCAP` – Capitalizes each word in a string.  

    Example:

    ```sql
    SELECT INITCAP(name) AS capitalized_name FROM pizza_type;
    ```

    Result:

    | name         | capitalized_name |
    |-------------|----------------|
    | pepperoni  | Pepperoni      |
    | bbq_chicken | Bbq Chicken   |


- `CONCAT` – Joins multiple strings together.  

    Example:

    ```sql
    SELECT CONCAT(category, ' - Pizza') AS pizza_category FROM pizza_type;
    ```

    Result:

    | category  | pizza_category  |
    |----------|----------------|
    | Classic  | Classic - Pizza |


## Date and Time Functions  

Snowflake has functions for handling dates and times.  

- `CURRENT_DATE` – Returns today’s date.  
- `CURRENT_TIME` – Returns the current time.  
- `EXTRACT` – Retrieves specific parts (year, month, day) from a date or timestamp.  

Example:

```sql
SELECT EXTRACT(MONTH FROM order_date) AS order_month FROM orders;
```

Result:

| order_date  | order_month |
|------------|------------|
| 2024-03-06 | 3          |

## Sorting and Grouping  

Sorting and grouping work similarly to PostgreSQL.  

- `ORDER BY` – Sorts query results.  
- `GROUP BY` – Groups data based on specified columns.  
- `GROUP BY ALL` – Groups by all selected columns without listing them individually.  

Example:

```sql
SELECT pizza_type_id, size, AVG(price) AS avg_price 
FROM pizzas 
GROUP BY ALL;
```
