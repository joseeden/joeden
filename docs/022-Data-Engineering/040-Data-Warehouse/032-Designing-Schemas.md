---
title: "Designing Schemas"
description: "Designing Schemas"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 32
last_update:
  date: 11/30/2021
---


## Kimball's Four-Step Process  

Kimball's approach helps design data models for analytics. It follows four steps.  

### Step 1 - Select the Process  

Choose a business process to model, like:  

- Sales and billing  
- Product tracking  
- Marketing campaigns  

Each process should be relevant for analysis and reporting.  

### Step 2 - Declare the Grain  

Decide the level of detail in the fact table:  

- Choose the **lowest possible level** (e.g., individual sales, not total sales per month)  
- Ensures flexibility for analysis  

Example: In a music service, store data at the song level, not album level.  

### Step 3 - Identify the Dimensions  

Define the descriptive attributes linked to each fact record:  

- **Time** (Year, Month, Quarter)  
- **Location** (City, State, Country)  
- **User details** (Name, Email)  

Dimensions provide context for facts.  

### Step 4 - Identify the Facts  

Select numerical values to measure the process:  

- **Music service** → Play count, revenue per song  
- **Ride-sharing** → Distance traveled, ride duration  

Facts should match the grain level.  

## Slowly Changing Dimensions

When dimensional data changes over time, we need to handle these updates carefully. This concept is known as **slowly changing dimensions (SCD)**. 

### The Challenge

Values in dimension tables can change over time, but we must preserve historical accuracy.  

Example:  

- A car’s classification changes from "electric vehicle" to "electric crossover" over time.  
- Fact tables (like sales) remain unchanged, while dimension tables track these changes.  

### Type I: Overwrite the Old Value

The current value is updated in the dimension table.  

- No historical data is kept.
- Simple but can cause issues if you need to rerun reports with old data.

Example:

```sql
UPDATE product_dimension
SET category = 'electric-crossover'
WHERE product_id = 12345;
```

*This will erase the old "electric vehicle" data in the product table.*

Original table:

| product_id | description | category        |
|------------|-------------|-----------------|
| 12345      | Tesla Model Y | electric vehicle |

New table:

| product_id | description | category        |
|------------|-------------|-----------------|
| 12345      | Tesla Model Y | electric-crossover |

### Type II: Add a New Row for Changes

A new row is added with a new ID for the updated value.  

- Historical data is preserved.  
- Useful for keeping track of changes over time.  
- Date ranges can also be added to track when each value was active.

Example:

```sql
INSERT INTO product_dimension (product_id, description, category, start_date, end_date)
VALUES (20053, 'Tesla Model Y', 'electric-crossover', '2023-01-01', '9999-12-31');
```

*This preserves the old "electric vehicle" record and adds the new one with updated values, while also tracking the date ranges when each category was valid.*

Original table:

| product_id | description | category        |
|------------|-------------|-----------------|
| 12345      | Tesla Model Y | electric vehicle |

New table:

| product_id | description    | category        | start_date | end_date   |
|------------|----------------|-----------------|------------|------------|
| 12345      | Tesla Model Y  | electric vehicle| NULL       | 2022-12-31 |
| 20053      | Tesla Model Y  | electric-crossover | 2023-01-01 | 9999-12-31 |

### Type III: Track Previous and Current Values

A new column is added to store the previous value.  

- Only a limited number of changes can be tracked (typically two).  
- Suitable for capturing a snapshot of both current and past values.

Example:

```sql
ALTER TABLE product_dimension
ADD previous_category VARCHAR(50);

UPDATE product_dimension
SET previous_category = 'electric vehicle', category = 'electric-crossover'
WHERE product_id = 12345;
```

*This tracks both the current and previous category values in the same row, making it easy to view both while limiting changes to just two categories.*


Original table:

| product_id | description | category        |
|------------|-------------|-----------------|
| 12345      | Tesla Model Y | electric vehicle |


New table:

| product_id | description    | category         | previous_category  |
|------------|----------------|------------------|--------------------|
| 12345      | Tesla Model Y  | electric-crossover | electric vehicle  |


### Modern Approach: Store Snapshots

Instead of overwriting or adding rows, **store snapshots of the dimension table** at different points in time.  

- Works well due to **lower storage costs** and modern hardware capabilities.

Example:

```sql
-- Snapshot table for product dimension
CREATE TABLE product_dimension_snapshot AS
SELECT * FROM product_dimension;
```

*Snapshots are saved periodically, and historical reports use the snapshot corresponding to that time.*