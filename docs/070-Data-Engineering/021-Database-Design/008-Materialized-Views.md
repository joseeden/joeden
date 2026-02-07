---
title: "Materialized Views"
description: "Database Design"
tags:
- Data Engineering
- Databases
- Database Design
sidebar_position: 8
last_update:
  date: 10/15/2019
---



## Two Types of Views

In SQL, there are two main types of views: non-materialized and materialized. Each serves a different purpose and operates in a distinct manner.

- **Non-materialized views**: 

    - Virtual tables that execute queries in real-time without storing data on disk.
    - When you encounter "views" plainly, they're most likely non-materialized views. 
    - For more information, please see [Database Views](./006-Database-Views.md) and [Managing Views](./007-Managing-Views.md).

- **Materialized views**: 
    
    - Physically materialized
    - Results of queries are stored on disk for faster data retrieval.

## Materialized Views

Materialized views are advantageous for improving performance by storing query results on disk. When you query a materialized view, it accesses the stored query results on the disk, rather than running the query like a non-materialized view and creating a virtual table.

- Access precomputed data quickly, which is useful for complex queries.
- Require periodic refreshes to update stored results.
- Refresh or rematerialized when prompted or scheduled.
- Refresh schedules can be daily or hourly, based on data change frequency.

Materialized views are ideal for scenarios involving heavy data analysis and complex queries.

- Suitable for data warehouses where analysis is more common than data updates.
- Ideal for running long queries and getting results quickly. 

It is not recommended for frequently updated data, as materialized views only reflect data as of the last refresh. This means that if your data is changing frequently, the analysis could be running too often on outdated data.

## Implementing Materialized Views

Creating materialized views is similar to creating regular views but involves additional steps for refreshing data.

- Use `MATERIALIZED` in the SQL statement to create one.
- Refresh using the `REFRESH MATERIALIZED VIEW` command.
- Automatic refreshes can be scheduled using cron jobs or similar tools.

Sample:

```sql
CREATE MATERIALIZED VIEW my_view_name AS
SELECT * FROM existing_table;
```

To refresh views:

```sql
REFRESH MATERIALIZED VIEW my_view_name  
```

## Managing Dependencies

Materialized views can depend on other views, requiring careful management to maintain data accuracy.

- Refreshing multiple views at the same time is not efficient due to possible dependencies.
- Ensure that dependent views are refreshed in the correct order to prevent outdated data.
- For example, if view Y depends on view X, refresh X before Y.

    <div class='img-center'>

    ![](/img/docs/materialized-views-managing-dependencies.png)

    </div>

## Tools for Managing Dependencies

Advanced tools help manage complex dependencies and ensure efficient data refreshes.

- Use tools like **Airflow** or **Luigi** to track and schedule view refreshes.
- They utilize **Directed Acyclic Graphs (DAGs)** to manage dependencies and avoid circular dependencies. 
