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

A data warehouse has **multiple layers** that handle different stages of the data process. 

It allows users to access summarized data for analysis, reporting, and mining. The staging area transforms raw data from various sources into a structured format for easy querying. 

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-04-232519.png)

</div>

Data marts are an extension of this structure. They store specialized data for specific departments, like finance, amd makes it easier for users to run tailored analyses.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-04-232559.png)

</div>

## Layers 

### Data Source 

This layer holds all the data we collect.

- Data types: Files, databases, transactional systems.
- Example: Sales transactions or employee data.

### Data Staging 

Before data can go into the warehouse, it needs cleaning and organizing.

**ETL Process:**  

- **Extract**: Pull data from sources.  
- **Transform**: Clean the data, apply business rules, and do math (like averaging).  
- **Load**: Put cleaned data into the next layer, in batches or all-at-once

Example: Extracting emails from raw customer support data and cleaning it up for the warehouse.  


### Data Storage 

Here is where the data lives long-term.

- Data is stored in the warehouse or marts for analysis.
- Example: Cleaned data from staging is now in the warehouse or data marts.

### Data Presentation 

This is where users interact with the data.

- Users run queries and use BI tools to analyze the data.
- Use data mining tools.
- Create direct queries.
- Example: Power BI or Tableau connects to the data warehouse for reports.

## Presentation Layer

User interactions fall into three categories:  

| **Category**                | **Description**                                        |
|-----------------------------|--------------------------------------------------------|
| **Automated Reports & Dashboards** | Tools that generate reports and update dashboards automatically. |
| **BI & Data Analytics**     | Tools for exploring data and finding patterns.        |
| **Direct Queries**          | Writing SQL or using programming tools for advanced analysis. |

### Automated Reports & Dashboards  

Data warehouses enable automated reporting and dashboards, which saves time and keeps organizations informed.  

- Tools: Tableau, Power BI, Looker, SAP BW  
- No coding needed, makes data accessible to non-technical users  
- Analysts set up reports, which update automatically  

### BI & Data Analytics  

These tools help users analyze data and find insights.  

- Used to turn raw data into actionable information  
- Some tools support drag-and-drop, while others allow coding  
- Examples: Oracle Data Mining, RapidMiner, Alteryx, KNIME  

### Direct Queries  

Users write queries to extract specific data from the warehouse.  

- SQL is the main query language  
- Tools: SQL Server Management Studio, Azure Data Studio  
- R and Python offer advanced analysis and visualization  

## Data Warehouse Architectures  

Data warehouses follow different architectures to store and manage data. Two common approaches are the **top-down (Inmon)** and **bottom-up (Kimball)** methods.  

### Top-Down (Inmon Approach)

Bill Inmon's method focuses on a centralized warehouse before creating department-specific data marts.  

- **Centralized data storage** – Data is cleaned, defined, and standardized before entering the warehouse.  
- **Normalized structure** – Data is stored efficiently, reducing redundancy.  
- **Departmental data marts** – Data is later moved to specific business units for easier access.  

**Pros:**  

- Creates a single source of truth.  
- Uses less storage due to normalization.  
- Easier to expand by adding new data marts.  

**Cons:**  

- Slower reporting due to complex joins.  
- High upfront effort to define and standardize data.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-175846.png)

</div>


### Bottom-Up (Kimball Approach)

Ralph Kimball's method focuses on quick access to data through department-based data marts before integrating them into a warehouse.  

- **Quick data access** – Each department defines its data and builds data marts first.  
- **Denormalized star schema** – Data is structured for fast querying.  
- **Incremental growth** – The organization adds new departments over time.  

**Pros:**  

- Faster setup with lower initial costs.  
- Easier for users to query data directly.  

**Cons:**  

- More storage needed due to duplicated data.  
- Requires ongoing maintenance as more departments are added.  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-175944.png)

</div>
