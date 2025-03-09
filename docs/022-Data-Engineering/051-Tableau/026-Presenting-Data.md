---
title: "Presenting Data"
description: "Presenting Data"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 26
last_update:
  date: 5/20/2024
---


## Overview

When creating a graph, it's important to focus on clarity and readability. 

## Formatting a Graph

Here's an example of a poorly formatted graph:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-215718.png)

</div>

- Unclear title
- No legend
- Small font size
- Missing axis titles

By improving these elements, the graph becomes much clearer.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-09-215827.png)

</div>

Changes made:

- Replaced one line with a bar chart to show global sales separately.
- Added a clear title and increased the font size for better readability.
- Labeled the axes and included a legend for easy interpretation.
- The graph now shows video game sales by release year and region, with 2008 being the highest-selling year.

## Formatting Tips

To improve your visualizations, use these techniques:

- **Informative titles**: Clearly explain what the graph shows.
- **Legible fonts and colors**: Make sure the text is large enough and the colors are easy to distinguish.
- **Legends**: Help viewers understand what different colors represent.
- **Axes titles**: Label your axes to make them clear.
- **Tooltips**: Add tooltips so users can learn more by hovering over the graph.

Tableau provides default formatting options that are easy to adjust if needed.

## Workbook vs. Sheet Formatting

You can format both at the workbook and sheet level. 

- **Workbook** 

  - This is like an entire Excel file. 
  - It contains multiple sheets.
  - Used to organize, save, share, and publish results.

- **Sheet** 

  - A single tab in the workbook, similar to an Excel tab. 
  - There are three types of sheets: 

    - Worksheets (used for creating visualizations)
    - Dashboards
    - Stories

## Example: Dual-Axis Graph 

In this example, we have a dataset that tracks video game sales from 1980 to 2010. We'll use it to compare global and European sales of Atari over time.  

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-26.gif)

</div>

**Steps:**  

1. Set `Release Year` as the column and `Global Sales` as the row.  
2. Drag `EU Sales` to the right until a dotted line appears.  
3. Right-click and select **Synchronize Axis**.  
4. Ensure both axes have aligned numbers.  
5. Right-click the right axis and uncheck **Show Header**.  
6. Change `Global Sales` from **Line** to **Bar** chart in the **Marks** card.  
7. Center the title.  
8. Rename the Y-axis to **"Video Game Sales (in millions)"**.  
9. Drag `Publisher` to **Filters** and select **Atari** only.  

**Insights:**  

The graph shows Atari’s peak sales in the early 2000s, followed by a sharp decline, leading to bankruptcy in 2013.


## Example: Filter by Genre  

Using the previous dataset, we'll filter by genre to find the "Puzzle" video game sales in North America.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-27.gif)

</div>

**Steps:**  

1. Drag `Measure Values` onto `EU Sales` in the rows.  
2. This replaces `EU Sales` with `Measure Values`.  
3. Remove unnecessary measures from the **Marks** shelf:  
   - `Video Games (Count)` (row count)  
   - `Global Sales` (already in the bar chart)  
4. Currently, you need to hover each bar in the stacked bar to see the sales for each region.
5. To change this, update the tooltip to show all sales data:  
   - Select `SUM(EU Sales)`, hold **Shift**, and click the last `SUM` on **Marks**.  
   - Drag them to the **Tooltip** card.  
6. Hover over the graph. Sales for all regions should now appear in the tooltip.
7. In the **Filters** shelf:  
   - Filter `Publisher` to **Nintendo**.  
   - Filter `Genre` to **Puzzle**.  

**Insights:**  

The graph shows a major spike in **1989** due to **Tetris**, which made up almost **90%** of puzzle game sales that year.

## Example: Bar Charts and Colors

In this example, we'll create a bar chart and apply three different **Dimensions** to color.

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-28.gif)

</div>


**Steps:**  

1. Drag `Global Sales` to **Rows**, while `Release Year` to **Columns.**
2. Center the graph title and change font size to 16.
3. Drag `Name` to the Color card in the **Marks** shelf.
4. Ignore the warning and press "Add all members".
5. Drag `Genre` to the Color card to replace `Name`.

**Insights:**  

Based on the Color card, we can see the that the `Genre` is the only dimension that adds extra information to the graph.