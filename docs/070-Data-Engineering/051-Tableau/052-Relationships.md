---
title: "Relationships"
description: "Relationships"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 52
last_update:
  date: 5/25/2024
---

import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';



## Overview 

Relationships let you connect tables based on common fields without merging them.   

- A newer alternative to joins and unions.  
- Keeps tables separate – maintains individual table fields.  
- Adapts the join type dynamically based on the visualization.  

Imagine you have an **Orders** table and a **Manufacturers** table. Instead of joining them, you create a **relationship** using the `Product Name` field. The tables remain separate, but Tableau decides how to pull data depending on what’s used in the visualization.  

```python
# Orders table
Order_ID   Product_Name   Sales
--------------------------------
101        Laptop        1000
102        Phone         500
103        Tablet        800
```
```python
# Manufacturers table
Product_Name   Manufacturer
----------------------------
Laptop        Dell
Phone         Apple
Tablet        Samsung
```  

## Why Use Relationships?  

Unlike joins, relationships keep tables separate while adjusting how data is combined depending on the visualization.

- **No predefined join type** – Adjusts join types automatically.  
- **Prevents data loss** – Unlike fixed joins, it keeps unmatched rows when necessary.  
- **Reduces data prep** – Avoids complex SQL or database views.  
- **More flexible** – Can change dynamically without affecting other sheets.  

## Joins vs. Relationships  

With joins, you must choose **Left Join, Right Join, or Inner Join** upfront, which may remove important data. With relationships, Tableau picks the best join type automatically based on what fields you use. 

| Feature             | Joins | Relationships |
|---------------------|-------|--------------|
| Merge tables?       | Yes   | No           |
| Static or dynamic?  | Static (fixed join type) | Dynamic (adapts to visualization) |
| Risk of data loss?  | Yes (depends on join type) | No (keeps unmatched rows when needed) |
| Flexibility         | Less flexible | More flexible |  

## Lab: Workbook 

In this example, we'll use the workbook below to determine which manufacturers create products that generate the most and the least profit for our fictional Superstore.

**Download the files here:** 

- [Manufacturers.csv](https://github.com/joseeden/joeden/tree/master/docs/070-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Datasources)

- [1_4_superstore_establishing_relationship.twbx](https://github.com/joseeden/joeden/tree/master/docs/070-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)

- [1_4_superstore_establishing_relationship_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/070-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)


#### Problem

**Top-performing manufacturer:**  
- Find the manufacturer with the highest profit in the Technology category.  
- Calculate the total profit for this manufacturer.  

**Worst-performing manufacturer:**  
- Identify the manufacturer with the lowest profit.  
- Determine the total profit and number of orders.  


#### Steps 

Determine profit per manufacturer:

- Open the workbook and go to the **Data Source** tab.  
- Select **Superstore (2016-2020).xlsx** to load the data.  
- Double-click **Orders 2016-2020** to check existing unions and joins.  
- Close the canvas before proceeding.  
- In the **Connections** panel, click **Add** -> **Text File** -> Select **Manufacturers.csv**.  
- Drag **Manufacturers.csv** next to **Orders 2016-2020**.  
- Tableau will automatically create a relationship between the tables.  

Create profit chart:

- Go to the **Profit by Manufacturer** worksheet.  
- Drag **Manufacturer** to Rows.  
- Click **Show Me** and select **Treemap**.  
- Hover over the treemap to view profit details.  

Find manufacturer with lowest profit:

- Create a new sheet called **Least Profit**.  
- Drag **Profit** to Columns and **Manufacturer** to Rows.  
- Drag **Manufacturer** to Filters and apply a condition:  

  - Filter by field: **Profit**  
  - Set condition: **Sum less than 0**  

- Click **OK**.  
- Drag **Orders 2016-2020** to Color in the Marks card.

#### Solution 

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/X-CwD6lWQjI' 
/>


### Findings  

- Canon generated the highest profit at 44,904.  
- Cubify had the lowest performance with only 4 orders.
