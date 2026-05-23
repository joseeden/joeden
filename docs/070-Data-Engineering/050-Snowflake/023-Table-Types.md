---
title: "Table Types and Views"
description: "Table Types and Views in Snowflake"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 23
last_update:
  date: 9/27/2022
---


## Overview

Snowflake tables come in three main types that balance protection and cost.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23213712.png)

</div>

## Table Types

Each table type controls how long data is kept and how recovery works.

| Table Type | Features                                                                                                       | Use Case                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Permanent  | <ul><li>Includes Time Travel and Fail-safe</li><li>Full protection</li><li>Default table type</li></ul>        | Used for critical production data that must be fully recoverable |
| Transient  | <ul><li>Includes Time Travel only</li><li>No Fail-safe</li><li>Lower storage cost</li></ul>                    | Used for staging and intermediate processing                     |
| Temporary  | <ul><li>Exists only during a session</li><li>No Time Travel or Fail-safe</li><li>Short-lived storage</li></ul> | Used for quick calculations and temporary work within a session  |

Permanent tables are safest, transient tables are cheaper, and temporary tables are the most lightweight.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23214031.png)

</div>

## Specialized Table Types

Snowflake also provides advanced table types for specific workloads where standard tables are not enough for the use case.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23214618.png)

</div>

Each specialized table type solves a different problem.

| Table Type      | Features                                                                                                                               | Use Case                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Dynamic Tables  | <ul><li>Auto-refresh from queries</li><li>Keep data automatically updated</li><li>Use refresh logic without manual jobs</li></ul>      | Used when you need continuously updated results without scheduling pipelines |
| External Tables | <ul><li>Read data directly from cloud storage</li><li>Do not store data inside Snowflake</li><li>Avoids data loading</li><li>Query data in place</li></ul>         | Used when data already exists in S3, GCS, or Azure and should not be loaded  |
| Hybrid Tables   | <ul><li>Support mixed workloads</li><li>Support both reads and writes</li><li>Combine transactional and analytical use cases</li></ul> | Used when applications need fast writes and analytics on the same data       |


## Apache Iceberg Tables

Iceberg tables allow multiple systems to share the same data.

- Works with multiple engines like Spark and Trino
- Avoids data duplication and supports Snowflake integration
- Time Travel is supported, but Fail-safe is not available.

Two catalog options exist:

- Snowflake-managed catalog
- External catalog like AWS Glue

Iceberg is useful when Snowflake is part of a larger data lake ecosystem.

<div class='img-center'>

![](/img/docs/Screenshot2026-05-23214741.png)

</div>

## Time Travel and Fail-safe

Snowflake provides these two recovery features depending on table type and edition.

| Feature     | Description                                                                                                                        | Use                                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Time Travel | <ul><li>Allows data recovery within a time window</li></ul>                                                                        | Used for quick rollback and historical queries when you need to restore or view past data changes.      |
| Fail-safe   | <ul><li>Provides a final recovery layer</li><li>Managed internally by Snowflake</li><li>Not directly accessible by users</li></ul> | Used as a backend recovery mechanism after Time Travel expires, mainly for disaster recovery scenarios. |


## Views in Snowflake

Views control how data is accessed without changing how it is stored. They help balance freshness, performance, and security depending on how the data is used or shared.

| Type              | Key Behavior                                                                                                                         | Use Case                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Standard View     | <ul><li>Runs query in real time</li><li>No stored results</li><li>Always reflects latest data</li></ul>                              | Used when you need always-fresh results and don’t need performance optimization for repeated queries.                              |
| Materialized View | <ul><li>Stores precomputed results</li><li>Requires storage and maintenance</li><li>Improves repeated query performance</li></ul>    | Used for frequently run queries where performance is more important than always recalculating data.                                |
| Secure View       | <ul><li>Hides underlying SQL logic</li><li>Works with standard and materialized views</li><li>Adds controlled access layer</li></ul> | Used when sharing data externally while protecting business logic, such as exposing calculated metrics without revealing formulas. |

