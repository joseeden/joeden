---
title: "Architecture"
description: "Data Warehouse Architecture"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 20
last_update:
  date: 11/28/2021
---


## Overview

A data warehouse has multiple layers that handle different stages of the data process. 

It allows users to access summarized data for analysis, reporting, and mining. The staging area transforms raw data from various sources into a structured format for easy querying. 

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-04-232519.png)

</div>

Data marts are an extension of this structure. They store specialized data for specific departments, like finance, amd makes it easier for users to run tailored analyses.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-04-232559.png)

</div>


## Data Source 

This layer holds all the data we collect.

- Data types: Files, databases, transactional systems.
- Example: Sales transactions or employee data.

## Data Staging 

Before data can go into the warehouse, it needs cleaning and organizing.

**ETL Process:**  

- **Extract**: Pull data from sources.  
- **Transform**: Clean the data, apply business rules, and do math (like averaging).  
- **Load**: Put cleaned data into the next layer, in batches or all-at-once

Example: Extracting emails from raw customer support data and cleaning it up for the warehouse.  


## Data Storage 

Here is where the data lives long-term.

- Data is stored in the warehouse or marts for analysis.
- Example: Cleaned data from staging is now in the warehouse or data marts.

## Data Presentation 

This is where users interact with the data.

- Users run queries and use BI tools to analyze the data.
- Use data mining tools.
- Create direct queries.
- Example: Power BI or Tableau connects to the data warehouse for reports.

