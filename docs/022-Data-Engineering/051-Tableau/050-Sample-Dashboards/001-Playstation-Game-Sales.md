---
title: "Playstation Game Sales"
description: "Playstation Game Sales"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 1
# last_update:
#   date: 5/21/2024
---


import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';


## Workbook 

In this example, we'll use a dataset on video game sales to determine:  

- The most popular gaming platform  
- The best-selling game  

The workbook includes four worksheets:  

- Platform Analysis Over Time
- Sales by Platform
- Sales by Genre
- Top Video Games

**Download the workbook here:** [4_3_video_games_sales_dashboard.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/001-Introduction-to-Tableau/Workbooks)  

:::info  
The steps below have already been completed in the workbook. To try them yourself, reset the worksheet by clicking **Clear Sheet** in the toolbar.  
:::


## Most Popular Game and Platform

Create a dashboard called **Playstation Overview 1994**. 

#### Steps

1. Drag **Platform Analysis Over Time** to the empty dashboard.  
2. Click the **Legend** box, then the small arrow.  
3. Select **Floating** from the dropdown menu.  
4. Move the legend to the top left of the graph.  
5. Add the other three sheets and arrange them in this order:  

   ![](/img/docs/Screenshot-2025-03-10-005001.png)  

6. Make the **Genre** legend floating and place it next to **Top Video Games**.  


#### Solution
<!-- 
<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-29.gif)

</div>
 -->


<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-29.gif)

</div>



#### Insights

- **PS2** was the most popular platform.  
- **Grand Theft Auto** was the top-selling action game.

## Adding Filters

Continuing on the previous example, we'll add filters to the dashboard to focus on specific games and genres. Our goal is to find how many copies (in millions) **Sony Computer Entertainment** sold for the **PS2** in the **Racing** genre.  


#### Steps

1. Toggle **Show dashboard title** (lower left).  
2. Center the title and set font size to **20**.  

Filtering by Publisher:

3. Click the **Sales by Genre** graph, then the small arrow.  
4. Select **Filters** > **Publisher**.  
5. Click the dropdown arrow on the filter > **Single Value (dropdown)**.  
6. Drag the filter below the title.  

Filtering by Genre:

7. Click the **Treemap** on **Sales by Genre**, then select **Use as Filter**.  
8. Click any genre in the treemap to filter data.  
9. Click the same genre again to remove the filter.  
10. The other graphs will update based on the filter selection.  

Finding the Sales for PS2 Racing Games:

11. Scroll up and filter **Publisher** to **Sony Computer Entertainment**.  
12. In **Sales by Genre**, click the **Racing** section.  
13. Hover over **PS2** in **Sales by Platform**.  

#### Solution

<!-- <div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-30.gif)

</div> -->

<ReactPlayerWrapper 
    controls
    url='https://youtu.be/lD_8Jkr4x48' 
/>


#### Insights

Sony Computer Entertainment sold **35.41 million** copies for the **PS2** in the **Racing** genre.
