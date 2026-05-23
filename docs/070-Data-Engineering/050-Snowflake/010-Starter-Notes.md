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

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23105035.png)

</div>

### Standard Edition

Standard works well for smaller teams and new projects.

- Good for startups
- Suitable for internal analytics
- Lower cost option

### Enterprise Edition

Enterprise is designed for larger organizations.

- Better scaling support
- Longer data retention
- Useful for multi-team reporting

### Business Critical Edition

Business Critical focuses on compliance and security.

- Supports regulated environments
- Useful for healthcare and finance
- Adds stronger security controls

### Virtual Private Snowflake

Virtual Private Snowflake provides dedicated infrastructure.

- Fully isolated environment
- Designed for strict security requirements
- Common in government or defense use cases

Each edition matches different operational and compliance needs.


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

## Snowsight

Snowsight is the browser-based interface and is where most users spend their time.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-204630.png)

</div>

The main interface includes:

- Navigation menu (vertical left panel)
- Search bar
- Quick actions
- Recent projects and files (Recently viewed)


### Workspaces

Workspaces are Snowflake’s modern development environment inside Snowsight.

- File-based editor
- Supports SQL and Python
- Supports notebooks
- Allows multiple files side by side

Older accounts may still use Worksheets, which is the legacy editor Workspaces are the preferred option going forward.

Workspaces is composed of 6 sections.

Reference: https://docs.snowflake.com/en/user-guide/ui-snowsight/workspaces

| No. | Feature           | Description                                                                            |
| --- | ----------------- | -------------------------------------------------------------------------------------- |
| 1   | Workspaces        | File-based development area for SQL and Python where users build and organize projects |
| 2   | Worksheets        | Interface for writing and running SQL queries in Snowflake                             |
| 3   | Database Explorer | Tool for browsing databases, schemas, and tables                                       |
| 4   | Editor            | Area used to write and modify SQL or code                                              |
| 5   | Results           | Panel that shows output of executed queries                                            |
| 6   | Query History     | Logs of all executed queries with status and performance details                       |

<div class='img-center'>

![](/img/docs/ui-snowsight-workspaces.png)

</div>

### Context Settings

Every query runs using a selected context, which includes:

- Role
- Warehouse
- Database
- Schema

You can set context in the UI or directly in SQL. If the context is incorrect, queries may fail or return unexpected results.

In the example below, the variables are:

- `analytics_db` as the database
- `public` as the schema
- `compute_wh` as the warehouse

```sql
USE WAREHOUSE compute_wh;
USE DATABASE analytics_db;
USE SCHEMA public;
```

Expected result:

```text
Context updated successfully
```

### Query History

Query History helps track and troubleshoot queries. It is commonly used for troubleshooting and performance monitoring.

- Shows executed queries
- Displays runtime information
- Identifies who ran the query
- Shows warehouse usage

If a query does not appear, filters may be hiding it.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23110752.png)

</div>

## VS Code Extension

The Snowflake VS Code extension allows developers to work directly from VS Code. This is useful during development and testing workflows.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23111427.png)

</div>

## Snowflake CLI

The Snowflake CLI is used for automation and terminal-based operations.

- Supports automation workflows
- Useful in CI/CD pipelines
- Replaces the older SnowSQL tool

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23111741.png)

</div>


## Marketplace 

Snowsight includes a marketplace for datasets that can be used for analysis.

- Free and paid datasets from Snowflake providers.
- Helps bring in external data to enhance insights.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-204712.png)

</div>


