---
title: "Starter Notes"
description: "Starter Notes on Snowflake"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 10
# last_update:
#   date: 1/14/2022
---

## Overview

Snowflake is a cloud data warehouse platform used for storing, processing, and analyzing large datasets.

- Stores structured and semi-structured data
- Uses SQL for querying and analysis
- Runs on AWS, Azure, and Google Cloud
- Separates storage and compute resources

Features:

- Data Lake integration with AWS, Azure, and GCP
- Data pipelines for cleaning and transforming data
- Role-based access control for data privacy
- Separate billing for storage and compute


## Traditional databases

Traditional databases usually kept storage and compute on the same server.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23104057.png)

</div>

This means that storage and compute were tightly connected and had to be scaled together.

- Scaling was harder as systems grew
- More users and queries caused performance issues
- You had to scale everything together

For example, if a team only needed more compute power, they still had to buy more storage too. This increased cost and complexity. 

Snowflake solves this by separating the layers. 


## Snowflake Architecture

Snowflake's architecture has three main layers for processing and storing large datasets.

| Snowflake layer      | Main component   | Purpose                                             |
| -------------------- | ---------------- | --------------------------------------------------- |
| Storage layer        | Database Storage | Compresses and stores data in a columnar format     |
| Compute layer        | Query Processing | Uses virtual warehouses and MPP to process queries  |
| Cloud services layer | Cloud Services   | Manages access, optimizes queries, and tracks usage |

Each layer works independently but still communicates with the others.

<div class="img-center"> 

![](/img/docs/snowflake-architecture-overview.png)

</div>


### Storage Layer

The storage layer keeps your data in a compressed column-based format.

- Data is stored in the cloud
- Works on AWS, Azure, or Google Cloud
- Storage scales independently

Your datasets stay stored even when no queries are running.

### Compute Layer

The compute layer runs queries using virtual warehouses.

- Queries run inside virtual warehouses
- Warehouses can scale independently
- Multiple warehouses can run at the same time

A warehouse can be started only when needed and stopped afterward.

### Cloud Services Layer

The cloud services layer manages the platform behind the scenes.

- Handles authentication
- Manages metadata
- Optimizes queries
- Controls transactions

This layer prepares the query before compute resources are used.

Snowflake keeps these layers separate so teams can scale more efficiently.


## Storage and Compute Costs

Snowflake charges storage and compute separately. This allows teams to manage costs more effectively.

- Storage has a fixed ongoing cost
- Compute costs apply only during usage
- Idle warehouses do not consume compute credits

For example, a team can create a temporary warehouse for a large job and shut it down afterward. Once suspended, compute costs stop.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23104207.png)

</div>


## Shared Storage Model

Snowflake allows multiple teams to use the same data without sharing compute resources.

- Teams can use separate warehouses
- Workloads stay isolated
- One team's heavy query does not slow others down

For example, three teams in a company can use separate warehouses in Snowflake without interfering with each other. All teams can access the same data storage, but they run their queries on different compute resources. 

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23104918.png)

</div>



## Snowflake Editions

Snowflake provides several editions for different business needs.

<!-- <div class='img-center'>

![](/img/docs/Screenshot2026-05-23105035.png)

</div> -->

For more information, please see [Snowflake Editions](https://docs.snowflake.com/en/user-guide/intro-editions) documentation.

| Editions                  | Description                                                        | Usecases or useful for                                                               |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Standard Edition          | Basic Snowflake setup for general use                              | Small teams, startups, and internal analytics with lower cost needs                  |
| Enterprise Edition        | Scalable version designed for growing organizations                | Large teams, multi-department reporting, and workloads needing longer data retention |
| Business Critical Edition | Security-focused edition with stronger compliance controls         | Finance, healthcare, and regulated industries that need strict security              |
| Virtual Private Snowflake | Fully isolated Snowflake environment with dedicated infrastructure | Government, defense, and highly sensitive workloads requiring full isolation         |


## Global Cloud Support

Snowflake runs on major cloud providers worldwide. It works across multiple regions and providers, such as:

- AWS
- Azure
- Google Cloud

Your Snowflake account runs in one selected region and provider, but the platform itself stays cloud-independent.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23105226.png)

</div>


## Working with Snowflake  

Snowflake provides multiple interfaces depending on the task.

For more information, please see [Tools in Snowflake](/docs/070-Data-Engineering/050-Snowflake/011-Tools.md).
  
| Method                    | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| Web Interface (Snowsight) | User-friendly UI for running queries                        |
| Worksheets                | Interface for executing and managing SQL queries            |
| Notebooks                 | Supports SQL and Python for data pipelines                  |
| Drivers                   | ODBC and JDBC drivers for external application connectivity |
| SnowSQL                   | Command-line tool for direct database access                |
| APIs                      | REST APIs for programmatic access to Snowflake features     |
| VS Code Extension         | Plugin for running queries directly from VS Code            |

**Update:**

- *Worksheets* and *Notebooks* are now part of *Workspace*.
- The *SnowSQL* command-line tool has been replaced by the *Snowflake CLI*, 


