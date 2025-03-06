---
title: "Joins"
description: "Joins in Snowflake"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 13
last_update:
  date: 1/17/2022
---


## Overview  

Joins combine data from multiple tables. Snowflake supports common SQL joins, plus special ones like `NATURAL JOIN` and `LATERAL JOIN`.  

Schema diagram for the Pizza dataset:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-07-011118.png)

</div>


## Natural Join  

Automatically matches columns with the same name, removing duplicates.  

- No need for an `ON` condition.  
- Can be combined with `OUTER JOIN`.  
- Simplifies queries when matching column names are consistent.  

**Syntax:**

```sql
SELECT ... 
FROM table_one [
          {
            | NATURAL [
                { LEFT | RIGHT | FULL }  [ OUTER ]
              ]
          }
        ] 
        JOIN table_two 
```

**Comparison:** 

- Without `NATURAL JOIN`

    ```sql
    SELECT * 
    FROM pizzas AS p 
    JOIN pizza_type AS t 
      ON t.pizza_type_id = p.pizza_type_id
    ```

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-03-07-011953.png)

    </div>

- With `NATURAL JOIN`

    ```sql
    SELECT * 
    FROM pizzas AS p 
    NATURAL JOIN pizza_type AS t
    ```

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-03-07-012022.png)

    </div>


**No `ON` Condition:** With `NATURAL JOIN`, we don't need to specify an `ON` condition. Attempting to specify an `ON` condition will cause an error:  

```sql
SELECT * 
FROM pizzas AS p 
NATURAL JOIN pizza_type AS t 
  ON t.pizza_type_id = p.pizza_type_id
```

Error:

```sql
Error: Syntax error near 'ON'
```

## Lateral Join  

Allows a subquery to reference columns from the left-hand table.  

- Useful for complex queries.  
- Makes results more dynamic than regular joins.  
- Must alias the subquery after `LATERAL`.  
- Both left-hand an right-hand expressions can be view or subquery

**Syntax:**

```sql
SELECT ... 
FROM <left_hand_expression> , -- 
LATERAL 
  (<right_hand_expression>)
```

**Example:**

```sql
SELECT 
  p.pizza_id,
  lat.name, 
  lat.category
FROM pizzas as p,  
LATERAL 
  ( 
    SELECT *
    FROM pizza_type AS t  
    WHERE p.pizza_type_id = t.pizza_type_id
  ) AS lat;
```
  
**Why use `LATERAL`?**  

A standard `JOIN` could work, but `LATERAL` is better for complex operations that depend on preceding tables. It reduces redundant joins and improves query efficiency on large datasets.