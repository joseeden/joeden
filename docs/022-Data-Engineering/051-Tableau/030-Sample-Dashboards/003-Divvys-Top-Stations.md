---
title: "Divvy's Top Station"
description: "Divvy's Top Station"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 3
last_update:
  date: 5/21/2024
---


## Workbook  

In this lab, we'll use a workbook to create a dashboard analyzing the popularity of Divvy's top stations.  

**Download the workbook here:** 

- [1_1_simple_dashboard.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks) 
- [1_3_simple_dashboard-complete.twbx](https://github.com/joseeden/joeden/tree/master/docs/022-Data-Engineering/051-Tableau/000-Sample-Datasets/002-Creating-Dashboards/Workbooks) 

## Problem

Find:  

1. The station with the most trips.  
2. The station with the most trips starting at 5 PM.  
3. How many subscribers took a trip at 11 in the morning.

## Building the dashboard

**Steps:** 

1. Open the workbook and click **New dashboard**.  
2. Name it **Top Stations Activity Dashboard**.  
3. Add `Stations Map` and `Station Ranking` to the dashboard.  
4. Set the dashboard size to **Automatic**.  
5. Click `Station Ranking`, then select the down arrow > **Fit** > **Entire View**.  
6. Add `Starts by Hour` below `Station Ranking`.  
7. Move `Rank of Count of Trips`, `Count of Trips`, and `Time Block` to the right.  
8. Right-click `Start Time` in `Starts by Hour` > **Hide Field Labels for Columns**.  
9. Rename the **Count of Trips** axis to **Number of Trips** in both charts.  
10. Hide worksheet titles in the dashboard.  
11. Click each graph, then click **Use as Filter** (funnel icon) to make them interactive.  

**Solution:**

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-33.gif)

</div>


**Findings:** 

- **Streeter Dr and Grand Ave** is the most popular station with **21,468 trips**. 
- **Daley Center Plaza** has the most trips starting at **5 PM**.

## Including User KPIs

**Steps:** 

1. Add `User Type Counts` above the station map and hide the title.  
2. Ensure the table fits the available space.  
3. Adjust the table as needed.  
4. Click the new graph and select **Use as Filter** (funnel icon).  
5. Create a new worksheet named **Trip Counts**.  
6. Drag `UserType` to the **Rows** shelf.  
7. Drag `Trips(Count)` to the text card in the **Marks** shelf.  
8. Right-click `UserType` and select **Hide Field Labels for Rows**.  
9. Open the **Starts by Hour** worksheet and click **Tooltip**.  
10. In the **Edit Tooltip** box, select **Insert** > **Sheets** > **Trip Counts**.  
11. Click **OK**.
12. Go back to the dashboard and hover to the time chart for `Starts by Hour`. The tooltip should now display trip counts details.

**Solution:**

<div class="img-center"> 

![](/gif/docs/snowflake-create-query-sampleee-34.gif)

</div>


**Findings:** 

Based on the trip count details in the tooltip when hovering over **11 AM** in the `Starts by Hour` graph, there are **47,917 subscribers** who took a trip at that time. 