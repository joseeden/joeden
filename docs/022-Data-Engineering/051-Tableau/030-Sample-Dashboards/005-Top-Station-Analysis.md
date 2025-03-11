---
title: "Top Station Analysis"
description: "Top Station Analysis"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 5
last_update:
  date: 5/21/2024
---


## Workbook  

In this lab, we'll improve the dashboard for [Divvy's Top Stations](/docs/022-Data-Engineering/051-Tableau/030-Sample-Dashboards/003-Divvys-Top-Stations.md) by using containers to arrange elements, clean up legends, and improve filters. 

**Download the workbook here:**  

- [3_1_divvy_top_stations.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)  
- [3_2_divvy_top_stations_complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks)  


## Problem 

Find the following:  

1. The most common start time for trips from **Canal St** and **Adams St**.  
2. The peak start time for **Customers** during the **summer**.  
3. The total number of rides by **Subscribers** at **8 AM in winter**.  


## Steps

1. **Add a horizontal container**  
   - Drag a horizontal container to the top for the dashboard title

2. **Add a title**  
   - Insert a text object into the container.  
   - Set the text to "Station Analysis".
   - Format it with **Tableau Bold, size 24**.  

3. **Add a company logo**  
   - Drag an image object next to the title.  
   - Select a logo from your local files.
   - Set it to **fit** and **center**.  

4. **Add filter instructions**  
   - Insert another text object next to the title.  
   - Set the text to "Select and apply filter".
   - Set font style to **Tableau Bold, size 12**.  

5. **Remove unnecessary filters**  
   - Delete all other filters on the right except `Seasons` and `Time Block`. 

      :::info 

      If a filter is removed from the dashboard, it still applies to the worksheet.  

      :::

6. **Customize the filter**  
   - Click the arrow down on `Time Block` filter > **Customize** > **Apply**.
   - Set all filters (`Seasons` and `Time Block`) and legends to **Floating**.
   - Move the filters to the banner section (top).
   - Move the `Time Block` legend in the `Start by Hour` graph.

7. **Add the usertype filter**
   - Go to the "Start by Hour" worksheet and locate `Usertype` under **Trips**.
   - Right-click on `Usertype` > **Show Filter**
   - Go back to the dashboard and click arrow down on the `Start by Hour` graph.
   - Click **Filters** > **Usertype**
   - Set filter to **Floating** and move it at the banner section (top).


## Solution 

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-37.gif)

</div>


## Findings  

1. Most trips from **Canal St** and **Adams St** started at **7 AM**.  
2. The peak start time for **Customers** in **summer** is **5 AM**.  
3. **Subscribers** took **21,437 rides** at **8 AM in winter**.