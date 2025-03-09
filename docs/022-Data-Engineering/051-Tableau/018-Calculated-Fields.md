---
title: "Calculated Fields"
description: "Calculated Fields"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 18
last_update:
  date: 5/18/2024
---


## Overview

Calculated fields let you create new data using existing fields. This helps in transforming, categorizing, or performing calculations without altering the original dataset.  

Examples:

- **Currency Conversion** – Convert sales from USD to Euros using a fixed exchange rate.  
- **Data Cleaning** – Round gas prices or check if an email contains "@gmail.com".  
- **Date Extraction** – Extract the year from a full date field for easier grouping.  
- **Custom Metrics** – Calculate the price-to-earnings (P/E) ratio by dividing price by earnings.  

## Creating a Calculated Field  

To create a new calculated fiel:

1. Go to Analysis > Create Calculated Field
2. Enter field name and the formula in the space below.
3. Move the new field name to the **Measure Values**

By default, Tableau will use `SUM` on the new calculated field. Change it to use `AVERAGE`.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-11.gif)

</div>

To edit a calculated field, click the dropdown > Edit. To see other functions, click the arrow.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-12.gif)

</div>

## Functions in Calculated Fields  

Functions help perform operations inside calculated fields. They use parentheses to hold arguments, like this:  

```sql
ROUND([Gas Price], 2)
```
