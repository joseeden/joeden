---
title: "Roles and Access Control"
description: "Database Design"
tags:
- Data Engineering
- Databases
- Database Design
sidebar_position: 9
last_update:
  date: 10/15/2019
---


## Granting and Revoking Access

Views can be used to control access to database objects. The SQL commands `GRANT` and `REVOKE` help manage user permissions to views and other database objects.

- `GRANT` provides users with specific permissions on objects like tables and views.
- `REVOKE` removes previously granted permissions.

Syntax:

```sql
GRANT privilege ON object TO role;
REVOKE privilege ON object FROM role;
```

Types of privileges commonly used in PostgreSQL:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `TRUNCATE`
- `REFERENCES`
- `TRIGGER`
- `CREATE`
- `CONNECT`
- `TEMPORARY`
- `EXECUTE`
- `USAGE`

Objects:

- table 
- schema 
- view, etc

Here's an example of how you can use the `GRANT` and `REVOKE` commands:

```sql
GRANT UPDATE ON ratings TO PUBLIC;
REVOKE INSERT ON films FROM db_user;
```

## Example: Revoking and granting access 

To-dos:

1. Revoke all database users' update and insert privileges on the `long_reviews` view.
2. Grant the `editor` user update and insert privileges on the `long_reviews` view.


<details>
    <summary>Solution</summary>

The correct queries are:

```sql
-- Revoke everyone's update and insert privileges
REVOKE UPDATE, INSERT ON long_reviews FROM PUBLIC; 

-- Grant the editor update and insert privileges 
GRANT UPDATE, INSERT ON long_reviews TO editor;  
```

</details>


## Database Roles

Roles are used to manage access permissions in a database system. They define what actions can be performed and can be assigned to multiple users.

- Roles determine privileges like login ability and database creation.
- They interact with authentication systems, specifying details like passwords.
- Roles are global and can be used across all databases in a cluster.

## Create a Role

Creating roles allows you to manage permissions for groups of users. Roles can have specific attributes defining their permissions.

- Use the `CREATE ROLE` command to define a new role.
- Attributes like passwords and expiration dates can be set at creation.
- Modify role attributes with the `ALTER` command, e.g., adding database creation rights.

As an example, we can create the role "data_analyst" using:

```sql
CREATE ROLE data_analyst; 
```

We can also specify attributes:

```sql
CREATE ROLE data_analyst
WITH PASSWORD 'admin1234'
VALID UNTIL '2020-01-01';   
```

To create an administrator role that can create databases:

```sql
CREATE ROLE admin CREATEDB; 
```

To change an attribute for an existing role, let's say we want the `admin` role to be able to create roles:

```sql
ALTER ROLE admin CREATEROLE; 
```




## Users and Groups (Roles)

In PostgreSQL, both users and groups are considered roles. Roles can be user-specific or it can act as groups for multiple users.

- A user role is for individual users.
- A group role encompasses multiple users.
- Database roles are distinct from operating system users.


## Assigning Roles

Assign users to roles to give them specific access levels. 

- Use `GRANT` to add a user to a group role, e.g., `GRANT data_analyst TO alex`.
- Use `REVOKE` to remove a user from a group when access is no longer required.

As an example, we can create the group role `developers`:

```sql
CREATE ROLE developers; 
```

Then we can create the individual user roles that will belong to the `developers` group role:

```sql
CREATE ROLE ted
WITH PASSWORD 'admin1234'
VALID UNTIL '2020-01-01';   

GRANT developers TO ted;
```

To remove ted from the group, we can use the `REVOKE` command:

```sql
REVOKE developers FROM ted;  
```

Let's say we want to grant update and insert privileges to `data_scientist` role on the `team_records_view`:

```sql
GRANT UPDATE, INSERT ON team_records_view TO data_scientist; 
```


## Benefits and Pitfalls of Roles

Roles streamline access management by grouping users with similar permissions. However, there are potential issues to consider.

- Roles persist beyond the tenure of individual employees, simplifying management.
- Care must be taken to ensure roles don't provide excessive access to users.





