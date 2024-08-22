---
title: "Database Normalization"
description: "Database normalization maintains data integrity and reduces data duplication."
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 15
last_update:
  date: 2/27/2022
---



## Redundant Data

In database design, redundancy can lead to inconsistencies and maintenance issues. Suppose we want to create a loan table with a FOREIGN KEY to a borrower table and an additional column for the bank's name. However, there's also a separate bank table that includes bank names.


```sql
-- Create loan table
CREATE TABLE loan (
    loan_id INT PRIMARY KEY,
    borrower_id INT REFERENCES borrower(borrower_id),
    bank_name VARCHAR(50),
    loan_amount NUMERIC(15, 2)
);

-- Create bank table
CREATE TABLE bank (
    bank_id INT PRIMARY KEY,
    bank_name VARCHAR(100) UNIQUE
);

-- Create borrower table
CREATE TABLE borrower (
    borrower_id INT PRIMARY KEY,
    borrower_name VARCHAR(100)
);
```

To visualize, here's the already-filled tables:

**Loan Table**

| loan_id | borrower_id | bank_name    | loan_amount |
|---------|-------------|--------------|-------------|
| 8347    | 45671       | ABC Bank     | 5000.00     |
| 1629    | 23984       | XYZ Bank     | 15000.00    |
| 3951    | 51723       | ABC Bank     | 7000.00     |
| 4893    | 18256       | XYZ Bank     | 30000.00    |
| 7248    | 94015       | DEF Bank     | 2500.00     |

**Bank Table**

| bank_id | bank_name    |
|---------|--------------|
| 101     | ABC Bank     |
| 202     | XYZ Bank     |
| 303     | DEF Bank     |

**Borrower Table**

| borrower_id | borrower_name |
|-------------|---------------|
| 45671       | John Doe      |
| 23984       | Jane Smith    |
| 51723       | Alice Johnson |
| 18256       | Bob Brown     |
| 94015       | Carol Davis   |


Problems with this setup:

- When two banks share the same name, it introduces possible confusion.
- Inconsistencies if a bank is acquired and not all loan records are updated.

To resolve these issues, reference the bank table using a FOREIGN KEY in the loan table instead of storing the bank name directly. This ensures:

- Unique identification of banks, even if they share a name.
- Consistent updates if a bank changes names.

Example:

```sql
CREATE TABLE loan (
    loan_id INT PRIMARY KEY,
    borrower_id INT REFERENCES borrower(borrower_id),
    bank_id INT REFERENCES bank(bank_id),
    loan_amount NUMERIC(15, 2)
);
```

## Consolidating Records

Handling similar entities, like applicants and borrowers, can cause duplication. Initially, separate tables might be used, but when an applicant is approved and becomes a borrower, data duplication may occur as can be seen below:

**Initial Applicant Table**

| applicant_id | applicant_name | loan_applied_for |
|--------------|----------------|------------------|
| 10234        | Mark White     | 10000.00         |
| 29384        | Lisa Green     | 20000.00         |
| 38475        | Nancy Blue     | 15000.00         |

**Initial Borrower Table**

| borrower_id | borrower_name | loan_approved | loan_amount |
|-------------|---------------|---------------|-------------|
| 58392       | Mark White    | TRUE          | 10000.00    |
| 67239       | Jack Black    | TRUE          | 25000.00    |
| 78923       | Lisa Green    | TRUE          | 20000.00    |


To avoid this, we can combine applicants and borrowers into a single table with a status column:

```sql
CREATE TABLE borrower (
    borrower_id INT PRIMARY KEY,
    name VARCHAR(100),
    loan_amount NUMERIC(15, 2),
    approved BOOLEAN
);
```

- `NULL` in `approved` represents an applicant.
- `TRUE` indicates an approved borrower.
- `FALSE` indicates a rejected applicant.

The consolidated table would look like this:

| borrower_id | name        | loan_amount | approved |
|-------------|-------------|-------------|----------|
| 58392       | Mark White  | 10000.00    | TRUE     |
| 67239       | Jack Black  | 25000.00    | TRUE     |
| 78923       | Lisa Green  | 20000.00    | TRUE     |
| 38475       | Nancy Blue  | 15000.00    | FALSE    |


## Benefits of Normalization

Normalization reduces redundancy, enhances consistency, and improves data organization, ensuring that all relevant information about an entity is stored in one place. Normalization achieves all of this by breaking tables into smaller, connected ones to reduce redundancy and boost data integrity. This involves identifying repeating data and creating new tables. 

- Identifies repeating data groups and create new tables.
- Organizes data effectively with new tables.

There is an in-depth explanation on how Normalization fully works on the [Schemas and Normalization](/docs/021-Data-Engineering/021-Database-Design/003-Schemas-and-Normalization.md#normalization) page.


### Example: Object-Data Mapping 

In the example below, the `client` table was defined without including a point of contact. The initial plan was to add `contact_name` and `contact_email` columns directly to the `client` table. However, this approach could lead to issues if a contact needs to be referenced in multiple tables. 

```sql
CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    site_url VARCHAR(50),
    num_employees SMALLINT,
    num_customers INTEGER
);
```

The original `client` table lacked a proper structure to handle contact information efficiently. To avoid redundancy and maintain proper data organization, it's better to separate the client and contact details.

1. **Create a Contact Table**  
   Define a separate `contact` table to store contact details, allowing for references in multiple tables if needed.

        ```sql
        -- Create the contact table
        CREATE TABLE contact (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL
        );
        ```

2. **Update the Client Table**  
   Add a `contact_id` column to the `client` table, creating a foreign key relationship with the `contact` table.

        ```sql
        -- Add contact_id to the client table
        ALTER TABLE client ADD contact_id INTEGER NOT NULL;

        -- Add a FOREIGN KEY constraint to the client table
        ALTER TABLE client ADD CONSTRAINT fk_c_id FOREIGN KEY (contact_id) REFERENCES contact(id);
        ```

This structure enhances data organization, making it easier to manage contacts and ensuring flexibility for future updates.