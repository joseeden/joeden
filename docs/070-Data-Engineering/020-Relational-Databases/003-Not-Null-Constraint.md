---
title: "Not-Null Constraint"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 3
last_update:
  date: 10/5/2019
---


## Overview

The not-null constraint ensures that a column cannot contain "NULL" values, enforcing this rule for both the current and future states of the database. You can only apply this constraint to columns that already have no "NULL" values. Once applied, inserting "NULL" values into that column is impossible.

- Ensures non-nullability of specified columns.
- Must be applied to columns with no existing "NULL" values.

## What Does NULL Mean?

Understanding "NULL" values can be tricky since they represent various scenarios and there is no singular definition of "NULL," as it can have different meanings depending on the context.

- "NULL" can mean unknown, nonexistent, or inapplicable.
- Different contexts give "NULL" different meanings.

## Example of `NOT NULL`

Create a "students" table. Note that columns like social security numbers and last names must not be "NULL," as this information is essential for every student. To do this, add the `not null`.

```sql
CREATE TABLE students (
    ssn INTEGER not null,                    
    name VARCHAR(64) not null,
    dob DATE not null,
    home_phone INTEGER,     
    office_phone INTEGER    
);
```

However, columns like "home_phone" and "office_phone" should allow "NULL" values since some students may not have a phone or an office. 

- "NULL" values can represent different meanings.
- Comparing "NULL" with "NULL" always returns "FALSE."

## Add or Remove a Not-Null Constraint

To modify an existing table after it has been created:

- Use `ALTER COLUMN` to modify constraints on existing tables.
- Use `ALTER COLUMN DROP NOT NULL` to remove it.
- Adding constraints requires columns with no existing "NULL" values.

Syntax:

```sql
ALTER TABLE table_name 
ALTER COLUMN column_name 
SET NOT NULL; 
```

## The Unique Constraint

The unique constraint ensures that no duplicates exist in a column, meaning each value can only appear once. 

- Ensures uniqueness by preventing duplicate entries.
- Useful for columns where redundancy must be avoided.
- Can only be added to columns with no duplicates.

To create a column with a unique constraint:

- Use `UNIQUE` to enforce uniqueness on new columns.
- Apply `ADD CONSTRAINT` to existing tables for uniqueness.

During table creation:

```sql
CREATE TABLE table_name (
    column_name UNIQUE
),
```

Adding constraints to an existing table:

```sql
ALTER TABLE table_name
ADD CONSTRAINT some_name UNIQUE(column_name) 
```

The `some_name` can be any name which will be used to label and identify the constraint for the specific column.