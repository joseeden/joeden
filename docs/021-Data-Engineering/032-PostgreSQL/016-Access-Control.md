---
title: "Access Control"
description: "Granting and revoking user and group privileges on database objects"
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 16
last_update:
  date: 2/27/2022
---


## Default Superuser

In PostgreSQL, the default `postgres` user has superuser privileges, which allows for extensive database management.

- Created automatically during installation
- Capable of creating and dropping databases
- Can insert, delete, and manage tables
- Should be used with caution due to its broad permissions

## Example: Personal Finance Database

If existing finance tools don’t meet your needs, you can create a PostgreSQL database to manage your finances.

- Track bank accounts, purchases, debts, and investments
- Stored on your personal computer, which is not publicly accessible
- Create a specific user for daily operations and use the `postgres` user for advanced tasks

## Creating New Users

Setting up a new database often involves creating users with restricted access. To do this, we can use the `CREATE USER` command to add new users with limited privileges. 

```sql
CREATE USER newuser; 
```

Note that new users cannot access tables created by others. 

## Setting User Password

To secure user accounts, you should assign passwords. We can add a password using:

```sql
CREATE USER newuser WITH PASSWORD 'secret';
```

Users can later change their passwords with:

```sql
ALTER USER newuser WITH PASSWORD 'new_password';
```

## Roles and Privileges

In PostgreSQL, roles include both individual user accounts and groups of users. These roles control access to various database objects like databases, tables, and schemas.

- User accounts are one type of role
- Groups can consist of one or more users
- Roles determine access to database objects

### The GRANT Command

To allow other roles to access a database object, the owner must use the `GRANT` command. This command specifies which privileges are granted to which roles.

```sql
GRANT p ON o-b-j TO grantee
```

Where: 

- `p` is the privilege (e.g., SELECT, DELETE, UPDATE)
- `o-b-j` is the database object (e.g., table)
- `grantee` is the role receiving the privilege

### Example: Personal Finance Database

To demonstrate the `GRANT` command, consider a personal finance database with an account table created by a superuser.

When a new user `ted` is created, it has no access to the account table.

```sql
CREATE USER ted WITH PASSWORD '!Qwaszxerdfcv10101';
```

To allow write access, use the superuser account to grant `ted` privileges to add, update, and query accounts:

```sql
GRANT INSERT ON account TO ted;
GRANT UPDATE ON account TO ted;
GRANT SELECT ON account TO ted;
```


### Table Modification Privileges

Not all privileges can be granted directly. Some actions, like altering table structure, require table ownership. This means that only the table owner can perform some of these actions.

- Users cannot modify table structure without ownership
- To enable such modifications, transfer table ownership using `ALTER TABLE`

    ```sql
    ALTER TABLE table_name OWNER TO user_name; 
    ```

After ownership transfer, the user can now perform restricted commands.


## Access Control with Schemas

Schemas act as containers for database objects like tables, helping manage access to multiple objects efficiently.

- Control access by granting privileges on entire schemas
- Allows for managing permissions across related tables

### Example: Schema Use in Finances Database

To manage individual and shared finances, you can use schemas to separate accounts.

- Create two schemas: "me" and "spouse"
- Move existing tables from the public schema to these new schemas
- Organize accounts separately while sharing access where needed

The SQL commands that you can use:

```sql
-- create the schemas 
CREATE schema me; 
CREATE schema spouse; 

-- create the tables 
CREATE TABLE me.account (...)
CREATE TABLE spouse.account (...)
```

```sql
CREATE USER 
```

### Granting Schema Privileges

When creating user accounts for specific schemas, you need to assign appropriate privileges.

- Grant USAGE privileges to users for accessing specific schemas
- Assign specific privileges (e.g., SELECT, INSERT) for different schemas as needed

The SQL commands that you can use:

```sql
-- create the user 
CREATE USER better_half WITH PASSWORD '!p@ncak3h0us32023!'

-- grant USAGE on the "spouse" schema so user can access it
GRANT USAGE ON SCHEMA spouse TO "better_half";
GRANT USAGE ON SCHEMA public TO "better_half";

-- grant WRITE privileges
GRANT 
  SELECT, 
  INSERT,
  UPDATE,
  DELETE
ON ALL TABLES IN SCHEMA public 
TO "better_half";  

GRANT 
  SELECT, 
  INSERT,
  UPDATE,
  DELETE
ON ALL TABLES IN SCHEMA spouse 
TO "better_half"; 
```



### Using Groups

Managing privileges for multiple users can be simplified using group roles.

- Create a group role to assign privileges to multiple users at once
- Add users to the group to inherit these privileges

As an example, create a `family` group and grant it privileges on tables or schemas:


```sql
-- create the group 
CREATE GROUP family;

-- grant usage to schema 
GRANT USAGE ON SCHEMA public TO family; 

-- grant the privileges
GRANT SELECT, INSERT, UPDATE, DELETE 
ON ALL TABLES IN SCHEMA public TO family;
```

After this, individual user accounts can be created/added to the `family` group:

```sql
ALTER GROUP family 
ADD USER ted;

ALTER GROUP family 
ADD USER better_half;
```




### Shared and Individual Data Access

With schemas and groups, you can manage both shared and personal data access efficiently.

- Group has access to all public schema tables
- Each member can have a separate schema for personal data management