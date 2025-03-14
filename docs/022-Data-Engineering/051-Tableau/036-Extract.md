---
title: "Extract"
description: "Extract"
tags: 
- Data Engineering
- Data Science
- Data Visualization
- Tableau
sidebar_position: 36
last_update:
  date: 5/25/2024
---



## Overview

There are different ways to save your work in Tableau. 

- **Packaged Workbook (.twbx)**  
  - A single file that includes the workbook and any local files (datasets, images).  
  - Best for sharing with others who don’t have access to the original data.  

- **Workbook (.twb)**  
  - Contains only the workbook; linked files are not included.  
  - Keeps file size small if the data source is accessible.  

- **Extracts (.hyper or .tde)**  
  - A local snapshot of data that improves performance.  
  - .hyper is used in newer versions, replacing .tde.  

- **Data Source Files (.tds or .tdsx)**  
  - Stores connection details and modifications (calculated fields, groups).  
  - Useful for reusing customized data connections.  

## Extracts  

An extract is a local copy of your data that improves performance and allows offline access.  

- Faster loading and saving  
- Supports large datasets  
- Uses Tableau’s *Hyper engine* for speed  
- Retains data prep like joins and field changes  
- Works without a live data connection

:::info 

Extracts are only available in Tableau Desktop, not Tableau Public.

:::


## Live Connections vs. Extracts  

- **Live Connection**  
  - Directly connects to the data source (Excel, database, etc.).  
  - Data updates in real-time as changes occur.  
  - Performance depends on the network and database speed.  

- **Extract**  
  - Requires refreshing to get updated data.  
  - Faster than live connections since it stores processed data.  
  - Allows offline work without database access.  

## When to Use Each  

- **Use Live Connections** if you need real-time data updates.  
- **Use Extracts** for better performance, working offline, or handling large datasets.