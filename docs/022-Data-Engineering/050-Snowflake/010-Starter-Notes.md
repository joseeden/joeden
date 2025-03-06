---
title: "Starter Notes"
description: "Starter Notes on Snowflake"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 10
last_update:
  date: 1/14/2022
---

## Overview

Snowflake is a data warehousing platform used by companies for storing and analyzing large datasets.

- A place for storing data for analysis and reporting.
- Data is analyzed using SQL queries.

Snowflake is easy to use and doesn’t require managing hardware or software manually.

- Start using Snowflake right after signing up.
- No setup needed, Snowflake handles infrastructure.

## Features

Snowflake has several features to streamline data storage, transformation, and analysis.

- **Data Lake integration**: Connect with cloud storage services like AWS, GCP, and Azure.
- **Data pipelines**: Organize, clean, and apply rules to data.
- **Data privacy**: Ensures "least-privilege access" to sensitive data.


## Snowsight UI

Snowsight is a UI tool for interacting with Snowflake, primarily used for data analysis.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-204630.png)

</div>


## Data Marketplace in Snowsight

Snowsight includes a marketplace for datasets that can be used for analysis.

- Free and paid datasets from Snowflake providers.
- Helps bring in external data to enhance insights.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-204712.png)

</div>


## Snowflake's Data Architecture

Snowflake's architecture has three main layers for processing and storing large datasets.

- **Cloud Services**: Manages access, optimizes queries, and tracks usage.
- **Query Processing**: Uses virtual warehouses and MPP to process queries.
- **Database Storage**: Compresses and stores data in a columnar format.

<div class="img-center"> 

![](/img/docs/snowflake-architecture-overview.png)

</div>

