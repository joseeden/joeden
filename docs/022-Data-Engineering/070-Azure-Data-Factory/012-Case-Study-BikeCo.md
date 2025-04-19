---
title: "Case Study: BikeCo"
description: "Case Study: BikeCo"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 12
last_update:
  date: 10/14/2021
---


## Overview 

**BikeCo** is a company that designs, builds, and sells bikes, parts, accessories, and custom gear for riders. They want to perform ML experiments find their most profitable product based on cahracteristics like:

- Cost 
- Retail price
- Items sold

For this we can use ADF pipeline to:

- Copy sales data from a cloud SQL database to blob storage  
- Use a simple transformation to clean the data  
- Call an external machine learning service for analysis  

This pipeline can run on a schedule and help the analytics team find insights from sales data. 

- Each part of ADF will have clear job
- They will help move and process data in the cloud

## Solution

The next sections will show how Azure Data Factory is used for ETL and data transformation to meet the goals of this case study.