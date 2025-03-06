---
title: "Data Cleaning"
description: "Data Cleaning"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
sidebar_position: 41
last_update:
  date: 12/3/2021
---


## Overview

When data is loaded into the warehouse, it often comes in different formats. To make sure it's clean and consistent, we need to clean and standardize the data.

## Data Format Cleaning

Data often comes with inconsistencies in formats, like dates or names. 

- **Inconsistent Name Capitalization**: Fix the case of names to be consistent.
- **Date Formatting**: Standardize date formats across all data sources.

Example:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-194712.png)

</div>


## Address Parsing

Address parsing involves breaking down an address into components like city and state. This helps keep the data clean and consistent.

- **Parsing Addresses**: Split the address into smaller parts (e.g., city, state, zip code).
- **Validation**: Some tools can check and validate the address to ensure it's correct.

Example:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-195504.png)

</div>

## Data Validation

Data validation checks if the values meet certain rules. Common checks include:

- **Range Check**: Ensures data values are within an acceptable range (e.g., age is not 300 years old).
- **Type Check**: Ensures the correct data type is used (e.g., age should be an integer, not a string).

Example:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-195941.png)

</div>

## Duplicate Row Elimination

Duplicate data can be removed to ensure clean records. For example, we may want to avoid repeating doctor IDs in our database.

Example:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-201226.png)

</div>


## Data Governance

Data governance ensures that data is well-defined, consistent, and accurate from the start. It helps reduce the need for cleaning during the ETL or ELT process by setting rules for data quality.

- **Establish Data Rules**: Define what clean data looks like.
- **Improve Data Quality**: With strong governance, fewer errors make it into the ETL/ELT process.
