---
title: "Snowflake SQL"
description: "Snowflake SQL"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 10
last_update:
  date: 1/15/2022
---


## Overview

Snowflake SQL is a cloud-based database system for storing and querying data. It’s easy to use and similar to other SQL databases like PostgreSQL.

For more information, please see the [official Snowflake Documentation.](https://docs.snowflake.com/en/user-guide/snowsql)

## Connecting via SnowSQL  

[Install SnowSQL](https://docs.snowflake.com/en/user-guide/connecting#step-1-download-and-install-snowsql) and log in:  

```sh
snowsql -a myaccount -u myuser
```

Expected output:  

```sh
Password:
Connected to Snowflake.
```

## SQL Flavors  

Snowflake SQL is similar to other databases like PostgreSQL, T-SQL, and MySQL, with minor differences in syntax and data types.  

Most SQL commands remain the same across databases:  

```sql
SELECT name, age 
FROM employees
WHERE age > 30
GROUP BY age;
```

