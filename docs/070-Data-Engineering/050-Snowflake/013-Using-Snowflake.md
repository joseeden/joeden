---
title: "Using Snowflake"
description: "Using Snowflake"
tags: 
- Snowflake
- Data Engineering
- Data Analytics
- Data Warehouse
- Data Modelling
sidebar_position: 13
last_update:
  date: 1/14/2022
---

## Creating a Snowflake Account

Getting started with Snowflake begins by creating an account so you can access the platform and use Snowsight.

1. Go to Snowflake website
2. Choose free trial or paid account
3. Select cloud provider like AWS, Azure, or GCP
4. Pick a region close to your location
5. Confirm email and log in

After signup, you are taken into Snowsight, which is the main interface for working with Snowflake. This is where you run queries, manage data, and start building your environment.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-06-204630.png)

</div>

This step is the entry point into Snowflake because everything else like users, roles, and warehouses only exists after the account is created.


## Roles  

Roles control what a user can do in Snowflake.

| Role            | Description                                |
| --------------- | ------------------------------------------ |
| `ACCOUNTADMIN`  | Full access including billing and security |
| `SECURITYADMIN` | Manages permissions for users and objects  |
| `USERADMIN`     | Creates and manages users and roles        |
| `SYSADMIN`      | Manages databases, tables, and warehouses  |
| `PUBLIC`        | Default limited access role                |

<!-- Example: Granting `SYSADMIN` role to a user  

```sql
GRANT ROLE SYSADMIN TO USER analyst_user;
```   -->

To start using Snowflake, you need to first create a user and a role. Roles control access, and users inherit permissions from roles.

### Creating a Role

A role defines permissions for a group of users.

- Go to **Admin ➜ Users & Roles ➜ Roles**
- Click **Add Role**
- Name the role and add a description
- (Optional) assign it to a higher role like `SYSADMIN`

In SQL, you can create the same role like this:

```sql
CREATE ROLE HR_ANALYST;
```

### Creating a User

A user represents a person or system that logs into Snowflake.

- Go to **Admin ➜ Users & Roles ➜ Users**
- Click **Add User**
- Enter details and set default role

In SQL, you can create a user like this:

```sql
CREATE USER new_analyst 
PASSWORD = 'SecurePass123' 
DEFAULT_ROLE = HR_ANALYST;
```

At this point, the user exists but cannot access data until roles are granted.


### Assigning Roles to Users

After creating users and roles, you must connect them so permissions can be applied.

- Roles must be assigned to users
- Permissions are controlled through roles, not directly on users
- Roles can also inherit other roles

In the example below, the `SYSADMIN` role is granted to a user:

```sql
GRANT ROLE SYSADMIN TO USER analyst_user;
```

This allows the user to inherit all permissions from `SYSADMIN`.


### Role Hierarchy (Role within Role)

Roles can also be nested to simplify access management.

In this example, `HR_ANALYST` is granted to `SYSADMIN`, meaning anyone with `SYSADMIN` also gets `HR_ANALYST` permissions.

```sql
GRANT ROLE HR_ANALYST TO ROLE SYSADMIN;
```

This way, you can manage permissions at a higher level and avoid granting multiple roles to each user.


## Virtual Warehouses (Compute Setup)

A warehouse must exist before running queries.

- Small warehouses are enough for testing
- Larger warehouses handle heavy workloads
- Warehouses can be started and stopped anytime

Common sizes:

- `X-Small` for basic workloads
- `Small` for light queries
- `Medium` for heavier processing


### Creating a Virtual Warehouse

To create a warehouse, you can use the Snowflake UI or SQL commands. 

1. Go to **Admin ➜ Warehouses**.  
2. Click **Add Warehouse**, enter a name, and create it.  
3. Grant the role access.  

In SQL, the warehouse can be created with the following command:

```sql
CREATE WAREHOUSE analyst_wh 
WAREHOUSE_SIZE = 'SMALL';
```

Expected result:

```text
Warehouse ANALYST_WH successfully created
```

Now the warehouse can process queries.


### Granting Warehouse Access

Even after creation, access must be granted. This means that roles must first be granted the appropriate permissions to use the warehouse.

In the example below, the role `SYSADMIN` is granted usage on the `analyst_wh` warehouse:

```sql 
GRANT USAGE ON WAREHOUSE analyst_wh TO ROLE SYSADMIN;
```

