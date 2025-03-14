---
title: "Combining Tables"
description: "Combining Tables"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 51
last_update:
  date: 5/25/2024
---


import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';


## Overview

Data analysis often requires merging multiple files. Instead of writing code, Tableau lets you combine data with drag-and-drop. Two common methods are:  

- **Unions** – Stacking data vertically  
- **Joins** – Linking tables based on relationships  

## Unions  

Unions combine data by stacking rows. Useful when data is stored in separate files by time period, like:  

- Monthly sales reports  
- Quarterly customer data  

**Example:** A company provides trip data in separate quarterly files. To analyze yearly trends, these files can be stacked together as long as they have the same column structure.  

<div class="img-center"> 

![](/img/docs/tableau-combine-data-union.png)

</div>

<!-- 
<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-14-135224.png)

</div> -->


## Joins  

Joins combine tables with related information using a common key. Often used in relational databases to avoid redundancy.  

**Example:** Two tables:  

1. **Employees** – Names, department, email, and location ID  
2. **Offices** – Location ID and office address  

To match employees with their office address, use a join on **Location ID** as the key. Employees without a matching office get a **NULL** value.  

<div class="img-center"> 

![](/img/docs/tableau-combine-data-join.png)

</div>


## Types of Joins  

Different join types return different results:  

- **Inner Join** – Only matched rows  
- **Left Join** – All left table rows + matched right table rows  
- **Right Join** – All right table rows + matched left table rows  
- **Full Outer Join** – All rows from both tables  

## Lab: Superstore Dataset  

We'll use a fictional **Superstore** dataset with 7 tables:  

- **Orders (2016-2020)** – Order details (who, what, where, when)  
- **Returns** – IDs of returned orders  
- **Sales Reps** – Sales representatives by region  

## Using Union 

Download the files here:

- [Superstore (2016-2020).xlsx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Datasources)
- [1_1_superstore_using_union_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)

#### Problem 

1. Determine the total row count after merging the 2016 to 2020 sheets.  
2. Identify the year with the fewest orders in the South Region.

#### Steps

Load the data:

- Open Tableau Public.
- Click **Microsoft Excel** to open the file  
- The sheets appear under **Connections**  

Create the union by stacking the data from multiple sheets into one table.  

- Drag `Orders 2018` into the workspace amd double-click it.
- Drag `Orders 2019` and `Orders 2020` into "Drag Table to Union".
- Right-click → Edit Union → Add `Orders 2016 and 2017` one by one.  

Since our table now includes multiple years, we should rename it.  

- Close **Edit Union**.
- Right-click the table → **Rename** → Enter **Orders 2016-2020**  

Now, let’s verify the data in a worksheet.  

- Open a **new worksheet**.
- Under Tables, drag the `Orders 2016-2020` to the Text card.

Next, create a new worksheet that displays the order date and region.

- Click the New Worksheet button at the bottom.
- Drag `Profit` to Columns.
- Drag `Order Date` and `Region` to rows in that order.
- Drag `Region` to Color in the Marks card.
- Hover the data for the South region for each year.

#### Solution 

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/qHomEyxVeg4' 
/>


#### Findings 

1. There are a total of **11,979 rows** after combining the sheets.
2. The **South** region had its least number of orders in 2018.


## Using Join

We'll now use joins to add a dataset containing return orders to our worksheet to better analyze customer satisfaction.

Download the files here:

- [Superstore (2016-2020).xlsx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Datasources)

- [1_1_superstore_using_union.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)

- [1_1_superstore_using_union_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)


#### Problem 

1. Find the region with the most returns from 2016 to 2020.

#### Steps

Go to the Datasource:

- Double-click **Orders 2016-2020**.  
- Drag `Returns` to the right and drop it.  
- A join icon will appear — click it and select "Left Join".  
- Go to Sheet 1 to ensure the row count remains unchanged.  

Create a chart for returned orders:

- In Sheet 1, drag `Order Date` and `Region` to Rows.  
- Drag `Orders 2016-2020` to Columns.  
- Set Marks type to "Bar".  
- Drag `Returned` to Color in the Marks card.  
- Right-click the "Null" legend → Edit Alias → Rename to "No".  
- Hover over the graph to find the region with the most returns.  

#### Solution 

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/iOO-HNfkH7E' 
/>


#### Findings 

1. The **West** region has the highest number of orders but also the most returns each year.


## Adding a Join 

We'll enhance our analysis by adding a dataset with regional sales representatives.

Download the files here:

- [1_3_superstore_adding_joins.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)

- [1_3_superstore_adding_joins_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/003-Connecting-Data/Workbooks)


#### Problem 

1. Determine the sales representative who has the least amount of return orders.

#### Steps

Go back to the Datasource tab to do the second join:

- Double-click **Orders 2016-2020**.  
- Drag `Sales Reps` to the right and drop it.  
- Click the join icon, select "Left Join," and join on "Region." 

Create the chart for the returned orders per sales representative:

- Create a new worksheet and rename it **Returned Orders by Sales Rep**.  
- Drag `Orders 2016-2020` to Columns and `Order Date` to Rows.  
- Set Marks type to "Bar".  
- Drag `Person` to Color in the Marks card.  
- Drag `Returned` to Filters → Select "Yes" → Click OK.  
- Click **Label** in the Marks card → Enable **Show Marks Label**.  
- Change the view from **"Standard"** to **"Entire View"**.  


#### Solution 

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/UpS2lG29wUw' 
/>


#### Findings 

1. **Cassandra Brandow** has the lowest number of return orders
