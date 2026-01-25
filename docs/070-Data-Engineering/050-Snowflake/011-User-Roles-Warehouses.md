---
title: "Users, Roles, and Warehouses"
description: "Users, Roles, and Warehouses"
tags: 
- Data Engineering
- Data Science
- Data Warehouse
- Data Analysis
- Data Modelling
- Snowflake
sidebar_position: 11
last_update:
  date: 1/14/2022
---

## Overview 

Snowflake uses roles to control access and warehouses to manage compute resources. 

## Snowflake Roles  

| **Role**         | **Description**                                           |  
|-----------------|------------------------------------------------------|  
| **ACCOUNTADMIN** | Full account access, including billing and security. |  
| **SECURITYADMIN** | Manages permissions for all objects (databases, tables, users). |  
| **USERADMIN**    | Creates and manages users and roles.                  |  
| **SYSADMIN**     | Manages objects it creates (databases, tables, warehouses). |  
| **PUBLIC**       | Default role for all users with limited access.        |  

Example: Granting `SYSADMIN` role to a user  

```sql
GRANT ROLE SYSADMIN TO USER analyst_user;
```  

## Creating a Custom Role  

Steps: 

- Go to **Admin > Users & Roles > Roles**.  
- Click **Add Role**, name it, and add a description.  
- Grant it `SYSADMIN` privileges.  

Using SQL to create a role for HR analysts:

```sql
CREATE ROLE HR_ANALYST;
GRANT ROLE HR_ANALYST TO ROLE SYSADMIN;
```  

## Creating a User  

Steps: 

- Go to **Admin > Users & Roles > Users**.  
- Click **Add User**, enter details, and set default role.  

Using SQL to add a new user with a custom role:

```sql
CREATE USER new_analyst PASSWORD = 'SecurePass123' DEFAULT_ROLE = HR_ANALYST;
```  

## Virtual Warehouses

When to create a new warehouse:

- When you need larger warehouses for big data processing.  
- For smaller queryes, use smaller warehouses.
- Larger warehouses improve query speed.  

Warehouse sizes:

- **X-Small** → 1 compute node  
- **Small** → 2 compute nodes  
- **Medium** → 4 compute nodes  

Creating a Virtual Warehouse:

1. Go to **Admin > Warehouses**.  
2. Click **Add Warehouse**, enter a name, and create it.  
3. Grant **SYSADMIN** role access.  

Using SQL to create and grant access:

```sql
CREATE WAREHOUSE analyst_wh WAREHOUSE_SIZE = 'SMALL';
GRANT USAGE ON WAREHOUSE analyst_wh TO ROLE SYSADMIN;
```  

Users with the `SYSADMIN` role can now run queries using this warehouse.