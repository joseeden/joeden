---
title: "Subquerying and CTEs"
description: "Subquerying and CTEs (Common Table Expressions)"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 14
last_update:
  date: 1/18/2022
---



## Overview  

Subqueries and CTEs help refine and simplify complex queries. A **subquery** is a query inside another query, while **Common Table Expressions (CTE)** provide a cleaner way to structure complex subqueries.  

Schema diagram for the Pizza dataset:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-07-011118.png)

</div>


## Uncorrelated Subquery  

An uncorrelated subquery runs independently from the main query.  

- The subquery provides a result that the main query uses.  
- It does not reference any columns from the outer query.  

Example:

```sql
SELECT pizza_type_id
FROM pizzas  
WHERE price = (
  SELECT MAX(price)
  FROM pizzas
) 
```

Result:

- The main query selects the pizzas that match the max price in the subquery.
- The subquery calculates the maximum price in the entire `pizzas` table.

If there are multiple pizzas with the same maximum price, the query will return all their `pizza_type_id` values.  

## Correlated Subquery  

A correlated subquery depends on the outer/main query and references columns from it.  

- The subquery’s result varies for each row in the outer query.  
- It allows comparisons based on values from the outer query.  

Example:

```sql
SELECT 
  pt.name,
  pz.price,
  pt.category
FROM pizzas AS pz   
JOIN pizza_type AS pt 
  ON pz.pizza_type_id = pt.pizza_type_id
WHERE pz.price = (
  SELECT MAX(p2.price) 
  FROM pizzas AS p2  
  WHERE p2.pizza_type_id = pz.pizza_type_id
  );
```

Result:

- This query retrieves the name, price, and category of the most expensive pizza in each category.  
- The correlated subquery compares the price of each pizza with the highest price within its own category (`pizza_type_id`).  
- For each pizza, the subquery checks the maximum price for that specific `pizza_type_id`, and if a pizza's price matches the maximum, it is included in the result.

If there are multiple pizzas in a category with the same highest price, they will all be returned.


## Common Table Expressions (CTEs)  

CTEs simplify complex queries by creating temporary result sets that can be reused in the main query.  

- They make queries easier to read and manage.  
- You can use multiple CTEs in a single query.  

Example:

```sql
WITH max_price AS (  
    SELECT 
      pizza_type_id, 
      MAX(price) AS max_price  
    FROM pizzas  
    GROUP BY pizza_type_id  
)  

SELECT 
  pt.name, 
  pz.price, 
  pt.category
FROM pizzas AS pz 
JOIN pizza_type AS pt 
  ON pz.pizza_type_id = pt.pizza_type_id
JOIN max_price mp                           -- Join with CTE max_price
  ON pt.pizza_type_id = mp.pizza_type_id  
WHERE pz.price < mp.max_price;              -- Compare price with max_price CTE
```

Result:

- This query retrieves the name, price, and category of pizzas that are cheaper than the most expensive pizza in each category.
- The `max_price` CTE first calculates the highest price for each pizza category.
- In the main query, the `pizzas` table is joined with the `pizza_type` table and the `max_price` CTE to filter out pizzas that are cheaper than the most expensive pizza in their respective categories.
- The result includes pizzas that are not the most expensive within their category.

This makes the query more readable by breaking it into smaller, manageable parts and avoids repeating complex subqueries.

## Using Multiple CTEs  

You can use more than one CTE in a query for different purposes.  

Example:

```sql
WITH max_price AS (
    SELECT 
      pizza_type_id, 
      MAX(price) AS max_price  
    FROM pizzas  
    GROUP BY pizza_type_id
),
avg_price AS (
    SELECT 
      pizza_type_id, 
      AVG(price) AS avg_price  
    FROM pizzas  
    GROUP BY pizza_type_id
)

SELECT 
  pt.name, 
  pz.price, 
  pt.category,
  mp.max_price, 
  ap.avg_price
FROM pizzas AS pz
JOIN pizza_type AS pt 
  ON pz.pizza_type_id = pt.pizza_type_id
JOIN max_price mp 
  ON pt.pizza_type_id = mp.pizza_type_id
JOIN avg_price ap 
  ON pt.pizza_type_id = ap.pizza_type_id
WHERE pz.price < mp.max_price
  AND pz.price > ap.avg_price;
```

Result:

- This query retrieves the name, price, and category of pizzas that are cheaper than the most expensive pizza in their category but more expensive than the average pizza price in the same category.
- The `max_price` CTE calculates the highest price for each pizza category, while the `avg_price` CTE calculates the average price.
- The main query joins the `pizzas` table with the `pizza_type`, `max_price`, and `avg_price` CTEs to filter pizzas that fall between the average and the maximum price for their category.

This approach allows using multiple CTEs for different calculations, which improves readability and organize complex queries.

