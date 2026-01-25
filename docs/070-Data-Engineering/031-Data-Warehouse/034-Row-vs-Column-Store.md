---
title: "Row vs. Column Store"
description: "Row vs. Column Store"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 34
last_update:
  date: 11/30/2021
---


## Overview

The type of data store used affects the speed and efficiency of database queries, particularly for transactional or analytical tasks. **Column stores** are best suited for these analytical queries, while **row stores** are better for transactional workloads.

## Basics of Computer Storage

Computers store data in blocks on the hard drive. 

- Data can span multiple blocks.
- Accessing data stored in fewer blocks is faster.
  
For analytical workloads, storing data in fewer blocks improves query speed.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-192651.png)

</div>


## Row Store 

In a row store, data for each row is stored together.

- Good for transactional workloads.
- New data is added quickly by writing to a new block.
- Not ideal for analytical querie.

Example: Health Table containing flu infection data.

| Year | Age Group | Hospitalization Percentage |
|------|-----------|-------------------|
| 2019 | 18-49     | 13.9              |
| 2019 | 50-64     | 22.5              |
| 2019 | 65+       | 63.57             |
| ...  |           |                   |
| 2020 | 18-49     | 18.1              |
| ...  |           |                   |
| 2021 | 18-49     | 15.6              |

If we want to calculate the average hospitalization percentage for a specific year (2019, 2020, or 2021), the system has to read multiple blocks to retrieve the data.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-192922.png)

</div>

If we need the **average** hospitalization percentage for 2019, the system reads all blocks related to 2019, which takes longer.

## Column Store 

In a column store, data for each column is stored together.

- Best for analytical workloads.
- Only the necessary columns need to be read, makes queries faster.
- All data in a column is of the same type, it's stored more efficiently.

If we want the **average** hospitalization percentage for 2019, the system only reads the "Hospitalization %" column, which is quicker.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-193508.png)

</div>


## Comparison 

**Row Store**

- Data is stored together by row
- Ideal for transactional workloads
- Slower for analytical queries

**Column Store**

- Data is stored by column
- Best for analytical workloads
- Faster for querying large amounts of data
- Better for compression