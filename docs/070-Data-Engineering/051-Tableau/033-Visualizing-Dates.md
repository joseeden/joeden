---
title: "Visualizing Dates"
description: "Visualizing Dates"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 33
last_update:
  date: 5/19/2024
---


## Overview

Dates help analyze when events happened and identify trends over time. Tableau makes it easy to work with dates in visualizations.  

- **Date Fields in Tableau**  
  - Dates are stored in the **Dimensions** area.  
  - Identified by a **calendar icon** in the Data pane.  

      ![](/img/docs/Screenshot-2025-03-09-183902.png)

- **Built-in Date Hierarchy**  
  - Tableau allows drilling down from **Year → Quarter → Month → Day**.  
  - Helps analyze trends at different levels.  


## Setting Up the Visualization  

In this example, we’ll use a dataset from the United Nations Statistics Division to visualize the trend of births in a country over the years.

**Download the workbook here:** [3_1_UN_stats_yearly_data.twbx](https://github.com/joseeden/joeden/tree/master/docs/070-Data-Engineering/051-Tableau/000-Sample-Datasets/001-Introduction-to-Tableau/Workbooks)

Let's start with creating the line chart to see the trends.  

1. Drag **Date** to **Columns**.  
2. Drag **Births** to **Rows**.  
3. Drag **Country** to **Filters** and select a country (e.g., Portugal).  
4. Tableau automatically groups data by **Year**.  


    <div class="img-center"> 

    ![](/gif/docs/snowflake-create-query-sampleee-21.gif)

    </div>


## Adjust the Granularity 

Using the previous dataset, we can modify it to adjust the granularity:

1. Click the arrow next to **YEAR(Date)** and select **Month**.  
2. There are two sections here: discrete (blue) and continuous (green).

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-03-09-185638.png)

    </div>

3. If months appear **without years**, Tableau is treating them as a **discrete dimension** (blue).  
4. To show a timeline, select **Month** from the second section in the dropdown.  
5. This makes it a **continuous measure** (green), displaying each month in each year.  

    <div class="img-center"> 

    ![](/gif/docs/snowflake-create-query-sampleee-22.gif)

    </div>
