---
title: "Sorting and Filtering"
description: "Sorting and Filtering"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 16
last_update:
  date: 5/18/2024
---


## Overview 

Filtering helps focus on relevant data by removing unnecessary information.  

- **Types of Filters** – Filter by category, date, location, or numeric values  
- **Filter Order** – Filters apply in a specific sequence, affecting results  
- **Dimension Filters** – Used for categories, like filtering by room type  
- **Measure Filters** – Used for numerical values, like filtering price ranges  

## Types of Filters 

There is an order of operations when filter are executed:

1. Extract filters
2. Data source filters 
3. Context filters
4. Dimension filters
5. Measure filters

Extract and data source filters occur when you are connecting and loading data sources, which usually happens when you're opening a worksheet.

## Dimension Filters (Blue)  

Used for filtering categories.  

- **Include or exclude categories** – Example: Filter by room type  
- **Wildcard filters** – Find matches using characters  
- **Conditional filters** – Filter based on other fields  
- **Top/Bottom filters** – Show highest or lowest records  

## Measure Filters (Green)  

Used for filtering numbers.  

- **Range filters** – Set minimum and maximum values  
- **Null filters** – Include or exclude missing values  

## Sorting   

Sorting organizes data for better analysis.  

- **Default Sorting** – Alphabetical order for categories  
- **Metric Sorting** – Sort by numbers, like sorting products by profit  
- **Ascending/Descending** – Arrange values from highest to lowest or vice versa  

## Filter Null Values  

Null values can affect analysis, so filtering them out is useful.  

- **Exclude Nulls** – Remove missing data from the view  
- **Show Only Nulls** – Focus on incomplete data  
- **Replace Nulls** – Fill missing values with a default value

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-9.gif)

</div>


## Filter Top and Bottom Values 

To filter just the top or bottom values, select the specific filter > Edit filter > Top > by field. Then specify the number and the dimension you want to filter. 

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-10.gif)

</div>