---
title: "Managing Views"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 7
last_update:
  date: 2/27/2022
---


## Creating More Complex Views

Views in SQL can be as simple or complex as needed, incorporating aggregations, joins, and conditional logic. When designing a view, keep in mind that complex queries might have longer execution times.

For more information, please see [Database Views.](./006-Database-Views.md)

## Granting and Revoking Access

Views are useful for controlling access to data. Use the `GRANT` and `REVOKE` commands to manage user permissions. These commands allow you to specify which users have access to perform actions on database objects.

```sql
GRANT privilege ON object TO role;
REVOKE privilege ON object FROM role;
```

Types of privileges commonly used:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`

Objects:

- table 
- schema 
- view, etc

Here's an example of how you can use the `GRANT` and `REVOKE` commands:

```sql
GRANT UPDATE ON ratings TO PUBLIC;
REVOKE INSERT ON films FROM db_user;
```

## Updating a View

Users with the right privileges can update views. When updating a view, you are actually modifying the underlying tables. Not all views are updatable though; typically, they must be based on a single table and not use complex functions.

Here's an example of the `UPDATE` command:

```sql
UPDATE films SET kind = "Dramatic" WHERE kind = "Drama"
```

Criteria for updating views:

- View is made up of one table 
- Doesn't use a window or aggregate function


## Inserting into a View    

Inserting into a view works similarly to updating, targeting the underlying table. However, it's best practice to treat views as read-only to avoid complications.

Sample SQL command:

```sql
INSERT INTO films (
    code,
    title,
    did,
    date_prod,
    kind 
)
VALUES (
    "STAR-268",
    "Faleno",
    "268",
    "2021-05-14",
    "Comedy"
) 
```

## Dropping a View

To remove a view, use the `DROP` command. Be aware of dependencies, as views can be part of a chain in larger databases.

  - **RESTRICT**: Prevents dropping if dependencies exist.
  - **CASCADE**: Drops the view and any dependent objects.

Sample command:

```sql
DROP VIEW view_name CASCADE
DROP VIEW view_name RESTRICT
```

## Redefining a View

You can change a view's query with `CREATE OR REPLACE`. The new query must maintain the same structure as the existing one. 
```sql
CREATE OR REPLACE VIEW view_name AS new_query;
```

Note: 

- If a view with `view_name` exists, it is replaced
- `new_query` must generate the same column names, order, and data types as the old query
- The column output may be different
- New columns may be added at the end

If these criterias isn't possible, drop the existing view and create a new one.


## Altering a View

Auxiliary properties of a view, such as name, owner, or schema, can be modified using the `ALTER VIEW` command.

```sql
ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name SET DEFAULT expression
ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name DROP DEFAULT
ALTER VIEW [ IF EXISTS ] name OWNER TO new_owner
ALTER VIEW [ IF EXISTS ] name RENAME TO new_name
ALTER VIEW [ IF EXISTS ] name SET SCHEMA new_schema
ALTER VIEW [ IF EXISTS ] name SET ( view_option_name [= view_option_value] [,...] )
ALTER VIEW [ IF EXISTS ] name RESET ( view_option_name [, ...] )
```