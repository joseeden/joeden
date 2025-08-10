---
title: "Starter Notes"
description: "Starter Notes on ADF"
tags: 
- Data Engineering
- Databases
- Microsoft Azure
- Azure Data Factory
sidebar_position: 10
last_update:
  date: 9/28/2019
---

## Overview

**Azure Data Factory (ADF)** is a tool that helps move and transform data in the cloud.

- It helps collect data from different places  
- It automates how data is moved and changed  
- It runs in the cloud and is easy to scale

ADF is a powerful tool that makes it easier to build data pipelines without managing servers yourself.

## Why Data Matters

Companies today use data to stay ahead and make smart decisions.

- Data comes from many places like websites, devices, and apps  
- The volume of data is too big to handle manually  
- Processing large data needs new tools and skills

## How it Works 

ADF helps collect, move, and change data from different sources.

- **Cloud-based**: You don’t need servers or to worry about updates  
- **Pay-as-you-go**: You only pay for what you use  
- **Scalable**: It can handle small or big jobs easily  

Think of it as a smart assistant that automates how your data flows.

## Connecting to Data

ADF supports many data sources, both cloud-based and on-premises.

- Over 80 built-in connectors  
- Works with SQL, Blob Storage, Salesforce, and more  
- Can run data tasks across cloud and local systems  

This helps companies pull data together into one place for analysis.

## Orchestration and Automation

ADF lets you control and schedule how data moves and gets processed.

- Build pipelines to move data from one place to another  
- Automate jobs to run on schedule or by trigger  
- Monitor and manage everything in one place  

Once set up, your data flows can run automatically without manual work.

## Data Transformations

ADF can transform data by changing, cleaning, or combining it during the pipeline.

- Use **data flows** to transform data without code  
- Use **external services** like Databricks or Azure Functions for more complex work  
- Perform tasks like sorting, filtering, joining, or aggregating  

This brings ADF closer to traditional big data and business intelligence tools.

## ETL vs ELT

There are two main ways to process data: ETL and ELT.

- **ETL** (Extract, Transform, Load): Data is changed before saving it  
- **ELT** (Extract, Load, Transform): Data is saved first, then changed later  
- ADF supports both methods  

Choose ETL when your logic is complex and needs to be applied before storing. On the other hand, use ELT when you need flexibility or work with modern data warehouses.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-04-18-184357.png)

</div>


## When to Use ADF 

Azure Data Factory (ADF) is not the only Azure service that works with data, so it’s important to know when ADF is the right tool.

✅ Use ADF for repeating data flows, not one-time tasks  
✅ Use ADF when you need to schedule or automate data processes  
✅ Use ADF for regular data movement and automation.
❌ Use other tools for specific cases like database or file migrations  

<div class="img-center"> 

![](/img/docs/Screenshot-2025-04-18-184809.png)

</div>

ADF can be used to orchestrate, but for heavy processing or real-time data, ADF can be combined with other Azure services.

- Works with batch data, not real-time streams  
- Handles simple data changes without needing to write code  
- Can trigger other services like Databricks when needed  

## Comparing ADF to SSIS

SSIS (SQL Server Integration Services) is an older on-prem tool. 

- SSIS is powerful, but runs on your own servers  
- ADF is cloud-based and scales easily  
- SSIS has some features ADF doesn’t (e.g., Excel connector)  

If you’ve used SSIS before, you can still run those SSIS packages in ADF. That way, you get the best of both tools.

## ADF Versions

ADF has two versions. Version 2 is better and should be used going forward.

| Feature                        | ADF v1                        | ADF v2                                                  |
|-------------------------------|-------------------------------|----------------------------------------------------------|
| Interface                     | JSON files only               | Graphical interface + JSON support                      |
| Features                      | Basic                         | More features and capabilities                          |
| Automation Support            | Manual                        | Uses JSON in background, easier for CI/CD automation    |

:::info 

Always use ADF version 2 for new projects. It’s more user-friendly and future-ready.

:::


## Working with ADF

There are many ways to create and manage ADF pipelines.

- Use the Azure Portal, PowerShell, .NET, Python, REST APIs, or ARM templates  
- Integrates with Azure DevOps, Key Vault, Monitor, and more  
- Supports event triggers like detecting a new file in storage  

ADF fits well into modern DevOps and automation workflows, especially when used with other Azure services.

## Security and Storage

ADF is secure but it doesn't store data itself.

- Data moves through ADF but is stored in your selected destination  
- Supports encrypted traffic using HTTPS and TLS  

ADF handles moving and processing data, while storage is managed by systems like Azure SQL, Blob Storage, or Data Lake.