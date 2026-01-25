---
title: "Referential integrity"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 7
last_update:
  date: 10/5/2019
---


## Overview

Referential integrity is a fundamental concept in database systems. It ensures a record in one table referencing another record in a different table must always point to an existing record.

- A record in Table A cannot refer to a nonexistent record in Table B.
- This integrity is maintained through foreign keys.

## Violations 

Referential integrity can be compromised in two primary ways:

- If Table A references Table B and a record in Table B is deleted.
- Inserting a record in Table A that refers to a non-existent record in Table B.

Foreign keys are designed to prevent these issues by throwing errors if such actions are attempted.

## Handling Violations

There are several ways to handle referential integrity violations beyond just throwing an error:

- `ON DELETE NO ACTION`

  - By default, the `ON DELETE NO ACTION` keyword is applied to foreign keys. 
  - This prevents deletion of a record in Table B if it's referenced in Table A. 

- `CASCADE`

  - Allows the deletion of a record in Table B.
  - Automatically deletes any referencing records in Table A, cascading the action.

## Additional Options 

Several other options are available for handling violations:

- `RESTRICT`: works similarly to "NO ACTION," with some technical differences.
- `SET NULL`: assigns a `NULL` value to foreign key if referenced record is deleted.
- "SET DEFAULT: changes foreign key to a predefined default value when the referenced record is removed, useful if a default is set for that column.


## Example

### 1. Create Tables with Foreign Key Constraints

Create both tables.

```sql
-- Create table for universities
CREATE TABLE universities (
    university_id INT PRIMARY KEY,
    university_name VARCHAR(100)
);

-- Create table for professors with a foreign key reference to universities
CREATE TABLE professors (
    professor_id INT PRIMARY KEY,
    professor_name VARCHAR(100),
    university_id INT,
    FOREIGN KEY (university_id) REFERENCES universities(university_id)
);
```

The tables will be created successfully if there are no errors.


### 2. Insert Valid Records

Add valid records for both **universities** and **professors** table.

```sql
-- Insert valid records into universities
INSERT INTO universities (university_id, university_name) 
VALUES
    (1, 'Harvard University'),
    (2, 'Stanford University');

-- Insert valid records into professors with valid university_id references
INSERT INTO professors (professor_id, professor_name, university_id) 
VALUES
    (101, 'Dr. Alice Smith', 1),
    (102, 'Dr. Bob Johnson', 2);
```

The records will be inserted successfully since the foreign key constraints are satisfied.

```sql
SELECT * FROM universities;
```

![](/img/docs/create-new-table-universitiesss.png)


```sql
SELECT * FROM professors;  
```

![](/img/docs/create-new-table-professorrrrss.png)



### 3. Insert Invalid Records

Attempt to insert a professor with a non-existent `university_id`:

```sql
INSERT INTO professors (professor_id, professor_name, university_id) 
VALUES
    (103, 'Dr. Charlie Brown', 3);
```

It will return this error:

```plaintext
ERROR:  insert or update on table "professors" violates foreign key constraint
DETAIL:  Key (university_id)=(3) is not present in table "universities".
```

This error occurs because there is no university with `university_id = 3`.

### 4. Handle Deletions with CASCADE

Modify the professors table to use ON DELETE CASCADE

```sql
ALTER TABLE professors DROP CONSTRAINT professors_university_id_fkey;

ALTER TABLE professors
ADD CONSTRAINT professors_university_id_fkey
FOREIGN KEY (university_id) REFERENCES universities(university_id) ON DELETE CASCADE;
```

Delete a university record and cascade delete related professors

```sql
DELETE FROM universities WHERE university_id = 1;
```

The record for `university_id = 1` in `universities` and any professors associated with `university_id = 1` will be deleted automatically.

```sql
SELECT * FROM universities;
```

![](/img/docs/handling-violations-using-on-delete-cascade.png)


```sql
SELECT * FROM professors;
```

![](/img/docs/handling-violations-using-on-delete-cascade-professorssss.png)



### 5. Using SET NULL on Deletion

Modify the foreign key to use `ON DELETE SET NULL`:

```sql
ALTER TABLE professors DROP CONSTRAINT professors_university_id_fkey;

ALTER TABLE professors
ADD CONSTRAINT professors_university_id_fkey
FOREIGN KEY (university_id) REFERENCES universities(university_id) ON DELETE SET NULL;
```

Delete a university record and set related `university_id` to `NULL` in professors:

```sql
DELETE FROM universities WHERE university_id = 2;
```

The `university_id` for `Dr. Bob Johnson` in the `professors` table will be set to `NULL` since the `university_id = 2` record is deleted.

```sql
SELECT * FROM universities;
```

![](/img/docs/handling-violations-using-on-delete-set-null-universities.png)


```sql
SELECT * FROM professors;
```

![](/img/docs/handling-violations-using-on-delete-set-null-professors.png)

