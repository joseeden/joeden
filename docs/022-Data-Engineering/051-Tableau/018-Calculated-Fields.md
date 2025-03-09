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

There's no need to memorize all of the functions because Tableau has a built-in documentations.

## Example: `ROUND`  

In the example below, we need to create a calculated field to round data of the `Women 25-34` measures. 

**Problem:**

We need too find thee number of countries in 1976 that has women in the 25-34 age bracket that are spending, on average, 10 years or more in school.


<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-13.gif)

</div>


**Steps:**

1. Create the `Rounded Women 25-34` calculated field.
2. Use `ROUND` function to round the column to whole numbers (0 decimal point).

    ```plaintext
    ROUND([Women 25-34], 0)
    ```

4. Drag the existing `Women 25-34` out of the **Marks** shelf to remove it.
5. Another way is to click the dropdown > Remove.
6. Drag the new `Rounded Women 25-34` to the text in the **Marks** shelf.
7. Remove the `Country` filters.
8. Add the `Years` field to the **Filters** shelf and filter for 1976.
9. Add `Rounded Women 25-34` to the **Filters** shelf and filter for "at least 10".

**Findings:**

Based on the filtered results, we can see that there are 4 countries in 1976 that has women in the 25-34 age bracket that are spending, on average, 10 years or more in school.

## Example: `RATIO` 

Ratios help compare two values. In this example, we compare the average years of education between men and women. A ratio close to 1 means their education levels are nearly equal.

**Problem:**

Find the ratio of men's and women's average years of education.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-14.gif)

</div>
 
**Steps:**

1. Create a calculated field called `Men:Women[25-34]`.
2. Set the funtion to calculate men:women ratio for years spent in school.

    ```plaintext
    [Men 25-34]/[Women 25-34]
    ```
4. Drag the new field to the text card in the **Marks** shelf.
5. Change the aggregation from `SUM` to `AVG`.

**Findings:**  

In Russia, the ratio is 0.9821, which means men have an average of 0.98 years of education for every year a woman is educated.


## Example: `AVERAGE` 

In this example, we'll create a calculated field for the average across women and men in the age group 25-34.

**Problem:**

Find the country with the highest average in the 25-34 age group.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-15.gif)

</div>

 
**Steps:**

1. Create a calculated field called `25-34`.
2. Set the funtion to sum the values for men and women in the 25-34 age group and divide by 2 to get the average.

    ```plaintext
    [Men 25-34]/[Women 25-34]
    ```
4. Drag the new field to the text card in the **Marks** shelf.
5. Change the aggregation from `SUM` to `AVG`.
6. Sort the data in descending order to get the highest average at the top.


**Findings:**  

The country with the highest average (13.397) is the United States.