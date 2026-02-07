---
title: "Primary and Surrogate Keys"
description: "Relational Database"
tags:
- Data Engineering
- Databases
- SQL
sidebar_position: 5
last_update:
  date: 10/5/2019
---

## Primary Keys

Primary keys are essential in database design. They ensure each record in a table is unique and can be easily referenced by other tables.

- Primary keys uniquely identify records.
- They must be on columns with unique, non-null values.
- They are consistent for current and future data.

### Specifying Primary Keys

Defining primary keys during table creation is straightforward. You can specify a primary key for one or more columns. 

- Primary keys can be specified at table creation.
- Multiple columns can form a single primary key.
- Use minimal columns for efficiency.

Simply add the `PRIMARY KEY` command after specifying the field during table creation.

```sql
CREATE TABLE table_name (
    a integer PRIMARY KEY,
    b numeric
    c text,
    d text,
    e text
);
```

If you want to specify more than one column as primary keys, you can write them this way. Note that regardless of how many columns field inside the `PRIMARY KEY` function, they are still considered as one combination, thus one primary key only

```sql
CREATE TABLE table_name (
    a integer,
    b numeric
    c char(16),
    d text,
    e text,
    PRIMARY KEY (a, b)
);
```

### Adding Primary Keys

Adding primary key constraints to existing tables follows a similar process as adding unique constraints. You need to assign a name to the primary key constraint, just as with unique constraints.

- Use a naming convention for primary key constraints.
- The process is similar to adding unique constraints.

Syntax:

```sql
ALTER TABLE table_name
ADD CONSTRAINT some_name PRIMARY KEY (column_name);
```

## Surrogate Keys

Surrogate keys are artificial primary keys that aren't based on existing data columns. They exist to provide a consistent, unchanging identifier for records which are independent of any natural data attributes. 

- Surrogate keys minimize the number of columns in a primary key.
- They provide a stable identifier that doesn’t change over time.

### Reasons for Surrogate Keys

Ideally, a primary key should consist of as few columns as possible and remain constant over time. By using an artificial key, you ensure the identifier stays the same even if other attributes change.

- Surrogate keys ensure consistency over time.
- They simplify primary key construction.

### Example: Surrogate Keys

Below table listing six different cars. Since you only "make" and "model" columns are the only combination that makes the records unique, you'd need to use both for the primary key, which isn't ideal. When only multiple columns qualify, consider a surrogate key.

| Model     | Make   | Color     |
|-----------|--------|-----------|
| Civic     | Honda  | Blue      |
| Accord    | Honda  | Red       |
| Model S   | Tesla  | Black     |
| Mustang   | Ford   | Yellow    |
| Corolla   | Toyota | White     |
| Corolla   | Toyota | White     |
| Camry     | Toyota | Silver    |
| Explorer  | Ford   | Red       |
| Altima    | Nissan | Blue      |
| Rogue     | Nissan | Black     |
| A4        | Audi   | Yellow    |
| A4        | Audi   | Yellow    |

If you want to create this table:

```sql
CREATE TABLE cars (
    make VARCHAR(64) NOT NULL,
    model VARCHAR(64) NOT NULL,
    color VARCHAR(32) NOT NULL
);

SELECT * FROM cars; 

-- add the records
INSERT INTO cars (model, make, color) VALUES
('Civic', 'Honda', 'Blue'),
('Civic', 'Honda', 'Red'),
('Accord', 'Honda', 'Green'),
('Model S', 'Tesla', 'Black'),
('Mustang', 'Ford', 'Yellow'),
('Corolla', 'Toyota', 'White'),
('Corolla', 'Toyota', 'Gray'),
('Camry', 'Toyota', 'Silver'),
('Explorer', 'Ford', 'Orange'),
('Altima', 'Nissan', 'Blue'),
('Rogue', 'Nissan', 'Red'),
('A4', 'Audi', 'White');

SELECT * FROM cars; 
```

### Adding a Surrogate Key

To address the issue on the table above, add a surrogate key column like "id." PostgreSQL's `serial` data type automatically generates unique, auto-incrementing numbers. 

- Add "id" columns using the "serial" type for auto-increment.
- The primary key constraint prevents duplicate IDs.
- This ensures each record has a unique identifier.

To do this:

```sql
ALTER TABLE cars
ADD COLUMN id serial PRIMARY KEY; 

SELECT * FROM cars;
```

| Model     | Make   | Color     | id |
|-----------|--------|-----------|----|
| Civic     | Honda  | Blue      | 1  |
| Accord    | Honda  | Red       | 2  |
| Model S   | Tesla  | Black     | 3  |
| Mustang   | Ford   | Yellow    | 4  |
| Corolla   | Toyota | White     | 5  |
| Corolla   | Toyota | White     | 6  |
| Camry     | Toyota | Silver    | 7  |
| Explorer  | Ford   | Red       | 8  |
| Altima    | Nissan | Blue      | 9  |
| Rogue     | Nissan | Black     | 10 |
| A4        | Audi   | Yellow    | 11 |
| A4        | Audi   | Yellow    | 12 |

Now if we want to add new records, they will automatically get an `id` that doesn't exist in the table yet.

```sql
INSERT INTO cars (model, make, color) VALUES ('Civic', 'Honda', 'Green');
INSERT INTO cars (model, make, color) VALUES ('Civic', 'Honda', 'Orange');
INSERT INTO cars (model, make, color) VALUES ('Sentra', 'Nissan', 'Orange'); 

SELECT * FROM cars;
```

| Model     | Make   | Color     | id |
|-----------|--------|-----------|----|
| Civic     | Honda  | Blue      | 1  |
| Accord    | Honda  | Red       | 2  |
| Model S   | Tesla  | Black     | 3  |
| Mustang   | Ford   | Yellow    | 4  |
| Corolla   | Toyota | White     | 5  |
| Corolla   | Toyota | White     | 6  |
| Camry     | Toyota | Silver    | 7  |
| Explorer  | Ford   | Red       | 8  |
| Altima    | Nissan | Blue      | 9  |
| Rogue     | Nissan | Black     | 10 |
| A4        | Audi   | Yellow    | 11 |
| A4        | Audi   | Yellow    | 12 |
| Civic     | Honda  | Green     | 13 |
| Civic     | Honda  | Orange    | 14 |
| Sentra    | Nissan | Orange    | 15 |

### Adding an Existing Surrogate Key

If we try to add a new record and reuse an existing surrogate key, like the `id` from the table above, it will return an error:

```sql
INSERT INTO cars
VALUES ('Porsche', 'Porsche 911 Carrera', 'Guards Red', 1); 
```

![](/img/docs/adding-surrogate-key-but-exists-already.png)


### Combining Columns

Another approach is to combine two existing columns into one. First, add a new column with the `varchar` type, then update it with a concatenation of existing columns using the `CONCAT` function. This new column can become the surrogate primary key.

```sql
ALTER TABLE table_name
ADD COLUMN column_c varchar(256);

-- combine the new two existing columns and add to the new column
UPDATE table_name 
SET column_c = CONCAT(column_a, column_b); 

-- turn new column into surrogate primary key 
ALTER TABLE table_name
ADD CONSTRAINT prime_key PRIMARY KEY (column_c);
```

### Example: Combining Columns 

To test this, we can drop the `id` column for now so that it returns to the original table:

```sql
ALTER TABLE cars
DROP COLUMN id;

SELECT * FROM cars; 
```

| Model     | Make   | Color     |
|-----------|--------|-----------|
| Civic     | Honda  | Blue      |
| Accord    | Honda  | Red       |
| Model S   | Tesla  | Black     |
| Mustang   | Ford   | Yellow    |
| Corolla   | Toyota | White     |
| Corolla   | Toyota | White     |
| Camry     | Toyota | Silver    |
| Explorer  | Ford   | Red       |
| Altima    | Nissan | Blue      |
| Rogue     | Nissan | Black     |
| A4        | Audi   | Yellow    |
| A4        | Audi   | Yellow    |
| Civic     | Honda  | Green     | 
| Civic     | Honda  | Orange    | 
| Sentra    | Nissan | Orange    | 


Now recreate the `id` column but this time set it to the combination of both the `make` and `model`.

```sql
-- Add the id column
ALTER TABLE cars
ADD COLUMN id varchar(128);

-- Update id with make + model
UPDATE cars
SET id = CONCAT(make, model);

SELECT * FROM cars;
```

| Model     | Make   | Color     | ID            |
|-----------|--------|-----------|---------------|
| Civic     | Honda  | Blue      | HondaCivic    |
| Civic     | Honda  | Red       | HondaCivic    |
| Accord    | Honda  | Green     | HondaAccord   |
| Model S   | Tesla  | Black     | TeslaModel S  |
| Mustang   | Ford   | Yellow    | FordMustang   |
| Corolla   | Toyota | White     | ToyotaCorolla |
| Corolla   | Toyota | Gray      | ToyotaCorolla |
| Camry     | Toyota | Silver    | ToyotaCamry   |
| Explorer  | Ford   | Orange    | FordExplorer  |
| Altima    | Nissan | Blue      | NissanAltima  |
| Rogue     | Nissan | Red       | NissanRogue   |
| A4        | Audi   | White     | AudiA4        |
| Civic     | Honda  | Green     | HondaCivic    |
| Civic     | Honda  | Orange    | HondaCivic    | 
| Sentra    | Nissan | Orange    | NissanSentra  |

Now if we try to set the `id` as the primary key, we will get an error message.

```sql
ALTER TABLE cars
ADD CONSTRAINT id_pk PRIMARY KEY(id);

SELECT * FROM cars; 
```

![](/img/docs/setting-new-column-id-as-primary-key-but-go-duplicate-fields-error.png)

From this we can see that combining the make and model, and using it as `id` is not a good idea since we can have records with the same make and model.
