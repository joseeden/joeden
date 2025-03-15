---
title: "Database Normalization"
description: "Database normalization maintains data integrity and reduces data duplication."
tags: [Data Engineering, Databases, SQL, PostgreSQL]
sidebar_position: 15
last_update:
  date: 10/11/2019
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

There is an in-depth explanation on how normalization fully works on the [Schemas and Normalization](/docs/022-Data-Engineering/021-Database-Design/003-Schemas-and-Normalization.md#normalization) page.


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



## 1st Normal Form (1NF)

The first step in database normalization is ensuring each table is in 1st Normal Form (1NF), which requires that table values be atomic, meaning each value is indivisible.

To learn more, please see the deep dive on [Normal Forms.](/docs/022-Data-Engineering/021-Database-Design/004-Normal-Forms.md)


### Example: Student Records

Imagine a high school that wants to manage student records in a database. Initially, they create a `student` table with columns for the student's name, courses, and homeroom. 

| student_id | name          | courses                 | homeroom |
|------------|---------------|-------------------------|----------|
| 1          | Susan Clark   | Math, Physics           | A101     |
| 2          | Robert Adams  | History, Math, Physics  | B201     |
| 3          | Thomas Brown  | Math, Chemistry, Biology | C301     |

However, this design leads to several issues:

- **Update Errors**: 
- 
    - With the current design, courses are listed in a single column. 
    - If a student changes a course, the courses column must be updated correctly.
    - If not handled properly, it might result in duplicated data.
    - This duplication can affect reports and other processes.
    
- **Insertion Errors**: 

    - Student's course list has 50-character limit.
    - If this limit is exceeded, the design cannot handle it properly.
    - While increasing the character limit is an option, the real issue is combining all courses into a single column.

- **Deletion Errors**: 

    - Dropping a course might lead to the unintended loss of other course records.


### Satisfying 1NF

To resolve these issues, the `student` table must satisfy 1NF:

- **Atomic Values**: Ensure each course is stored in its own record rather than combining them in a single column.
- **Simplified Student ID**: Use a simple integer for the `student_id` and allow it to be used across multiple records.
- **Separate Name Fields**: Split the `name` column into `first_name` and `last_name`.

By restructuring the `student` table:

- Each course is represented by a single record.
- The table has more rows, but the data is now atomic.
- The `name` column is divided into `first_name` and `last_name`.

This final design includes five columns and fully satisfies 1NF. 

| student_id | first_name | last_name  | course     | homeroom |
|------------|------------|------------|------------|----------|
| 1          | Susan      | Clark      | Math       | A101     |
| 1          | Susan      | Clark      | Physics    | A101     |
| 2          | Robert     | Adams      | History    | B201     |
| 2          | Robert     | Adams      | Math       | B201     |
| 2          | Robert     | Adams      | Physics    | B201     |
| 3          | Thomas     | Brown      | Math       | C301     |
| 3          | Thomas     | Brown      | Chemistry  | C301     |
| 3          | Thomas     | Brown      | Biology    | C301     |


## 2nd Normal Form (2NF)

To ensure a database is in 2nd Normal Form (2NF), it must first meet the requirements of 1st Normal Form (1NF) and then ensure that all non-key columns depend only on the table's primary key.

To learn more, please see the deep dive on [Normal Forms.](/docs/022-Data-Engineering/021-Database-Design/004-Normal-Forms.md)

### Example: Textbook Records

A proposed table for managing textbooks includes:

- **Textbook ID**: Unique identifier for each textbook.
- **Title**: Title of the textbook.
- **Publisher Name**: Name of the textbook's publisher.
- **Publisher Website**: Website of the publisher.
- **Stock Quantity**: Number of copies available in stock.

SQL command:

```sql
-- Create the textbook table
CREATE TABLE textbook (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    publisher_name VARCHAR(100) NOT NULL,
    publisher_website VARCHAR(100) NOT NULL    
    title VARCHAR(100) NOT NULL,
    stock_quantity SMALLINT NOT NULL DEFAULT 0
); 
```

How the table would look like with records added:

| textbook_id | title                | publisher_name | publisher_website         | stock_quantity |
|-------------|----------------------|----------------|----------------------------|----------------|
| 1           | Introduction to Math | ABC Publishing | www.abcpublishing.com     | 50             |
| 2           | Advanced Physics     | XYZ Press       | www.xyzpress.com           | 30             |
| 3           | Statistical Concepts | Martin House    | www.martinhouse.com        | 20             |
| 4           | Calculus Basics      | ABC Publishing  | www.abcpublishing.com     | 15             |

There are some issues found with the proposed table:

- **Data Duplication**: Publisher details are repeated for each textbook, leading to redundancy.
- **Update Anomalies**: Changes to a publisher’s details require updates to multiple rows.
- **Insertion Anomalies**: New publishers without textbooks cannot be added.
- **Deletion Anomalies**: Removing a textbook could also remove publisher information if it was the only textbook from that publisher.

### Satisfying 2NF

To resolve these issues, separate publisher information into its own table and link it with the textbook table through a foreign key.


```sql
-- Create the textbook table
CREATE TABLE textbook (
    textbook_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    publisher_id INT NOT NULL REFERENCES publisher(publisher_id),
    stock_quantity INT NOT NULL
);

-- Create the publisher table
CREATE TABLE publisher (
    publisher_id SERIAL PRIMARY KEY,
    publisher_name VARCHAR(100) NOT NULL,
    publisher_website VARCHAR(100) NOT NULL
);
```

How the revised tables should look like with records:

- **Textbook Table**

    | textbook_id | title                | publisher_id | stock_quantity |
    |-------------|----------------------|--------------|----------------|
    | 1           | Introduction to Math | 1            | 50             |
    | 2           | Advanced Physics     | 2            | 30             |
    | 3           | Statistical Concepts | 3            | 20             |
    | 4           | Calculus Basics      | 1            | 15             |


- **Publisher Table**

    | publisher_id | publisher_name | publisher_website        |
    |--------------|----------------|---------------------------|
    | 1            | ABC Publishing | www.abcpublishing.com    |
    | 2            | XYZ Press       | www.xyzpress.com          |
    | 3            | Martin House    | www.martinhouse.com       |


## 3rd Normal Form (3NF)

3rd Normal Form (3NF) is a key step in database normalization. It builds on 2nd Normal Form by ensuring that all non-key columns are directly dependent on the table's primary key. 

- 3NF requires a table to be in 2NF.
- Non-key columns should only depend on the primary key.
- This reduces data redundancy and improves database integrity.
- This eliminates any indirect, or transitive, dependencies.

To learn more, please see the deep dive on [Normal Forms.](/docs/022-Data-Engineering/021-Database-Design/004-Normal-Forms.md)

### Transitive Dependencies

A transitive dependency occurs when a non-key column depends on another non-key column rather than directly on the primary key. This can lead to unnecessary data duplication and potential inconsistencies.

- Involves three columns: X, Y, and Z.
- Column Y depends on column X, and Column Z depends on Column Y.
- Knowing the value of X allows you to infer the value of Z, even though X and Z aren’t directly related.

Tables with transitive dependencies can lead to several issues, especially when updates or deletions are necessary.

- Updating a instructor’s room number requires changes in multiple rows.
- New instructors cannot be added without assigning them to a course.
- Deleting all of a instructor’s courses removes the instructor's information entirely.

To eliminate transitive dependencies, we should separate the related data into distinct tables. This approach simplifies data management and ensures the database meets 3rd Normal Form requirements.

### Example: Course Room Assignments

Consider a table that stores course room assignments. In this example, the course name determines the instructor, and the instructor determines the room number, creating a transitive dependency.

- The course name is used to identify the instructor.
- The instructor’s name is used to determine the room number.
- This setup means the course name indirectly determines the room number.

The pre-filled table would look like this:

| id   | course_name | instructor   | room_num |
|------|-------------|--------------|----------|
| 1001 | Mathematics | John Doe     | 101      |
| 1002 | Physics     | Jane Smith   | 102      |
| 1003 | Chemistry   | John Doe     | 101      |
| 1004 | History     | Emily Davis  | 103      |
| 1005 | Biology     | Jane Smith   | 102      |

To remove all transitive dependencies, related data should be placed into separate tables.

- Create a separate instructor table with a unique identifier (primary key).
- Store the instructor’s room number in the instructor table.
- Link the course to the instructor using a foreign key.

### Satisfying 3NF

We can reorganize the data structure to maintain all necessary information while reducing redundancy and dependency issues.

- Rename the course table to "course_assignment" to reflect its purpose.
- Remove the instructor and room number columns.
- Add a "instructor_id" foreign key to connect courses to instructors.

#### 1. Create a `instructor` table

This table stores the instructor’s information, including their assigned room.

```sql
CREATE TABLE instructor (
    instructor_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    room_num VARCHAR(10) NOT NULL
);
```

#### 2. Modify the `course` table and rename it to `course_assignment`

Rename the original `course` table to `course_assignment`, remove the `instructor` and `room_num` columns, and add a `instructor_id` foreign key.

```sql
CREATE TABLE course_assignment (
    id INTEGER PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    instructor_id INTEGER REFERENCES instructor(instructor_id)
);
```

#### 3: Insert Sample Data

(Optional) Insert records into `instructor` table:

```sql
INSERT INTO instructor (name, room_num) VALUES
('John Doe', '101'),
('Jane Smith', '102'),
('Emily Davis', '103');
```

(Optional) Insert records into `course_assignment` table:

```sql
-- Sample Records
INSERT INTO course_assignment (id, course_name, instructor_id) VALUES
(1001, 'Mathematics', 1),
(1002, 'Physics', 2),
(1003, 'Chemistry', 1),
(1004, 'History', 3),
(1005, 'Biology', 2);
```

#### 4. Final Tables

Final Table Structures and Records:

- `instructor` Table

    | instructor_id | name        | room_num |
    |---------------|-------------|----------|
    | 1             | John Doe    | 101      |
    | 2             | Jane Smith  | 102      |
    | 3             | Emily Davis | 103      |

- `course_assignment` Table

    | id   | course_name | instructor_id |
    |------|-------------|---------------|
    | 1001 | Mathematics | 1             |
    | 1002 | Physics     | 2             |
    | 1003 | Chemistry   | 1             |
    | 1004 | History     | 3             |
    | 1005 | Biology     | 2             |


## More Examples 

### 1NF: Student grades

A high school instructor wants to improve how student grades are recorded. The initial table structure for `test_grades` is:

```sql
CREATE TABLE test_grades (
    student_id INTEGER NOT NULL,
    course_name VARCHAR(50) NOT NULL,
    grades TEXT NOT NULL
);
```

This setup makes it hard to manage and calculate grades. Inserting new grades requires a complex query. To simplify and ensure the table is in 1st Normal Form (1NF), the structure should be updated.


<details>
    <summary>Solution</summary>

This new table removes the complex `grades` column, making it easier to insert and calculate grades.

```sql
CREATE TABLE test_grade (
    student_id INTEGER NOT NULL,
    course_name VARCHAR(50) NOT NULL,
    grade NUMERIC NOT NULL
);
```

</details>


### 2NF: Courses 

The school's administration is setting up a database to store course details and needs to select the appropriate columns for the `course` table. Here are the possible columns:

- `id` - Primary key for the course.
- `name` - Course name, a variable length string (max 50 characters, not NULL).
- `meeting_time` - Time representing when the course meets.
- `student_name` - Variable length string (max 50 characters, not NULL), representing an enrolled student.
- `max_students` - Integer for maximum student enrollment (up to 30 students due to classroom capacity).

<details>
    <summary>Solution</summary>


To design a `course` table that satisfies 2NF, include only the columns that depend entirely on the course ID. This excludes `student_name` and `meeting_time` because they are not directly related to the primary key.

```sql
-- Create the course table
CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    max_students SMALLINT
);
```

This setup ensures that the `course` table adheres to 2NF by including only columns that are fully dependent on the primary key.


</details>



### 2NF: Cafeteria Menu

The cafeteria staff wants to better organize their data, specifically tracking meal options available throughout the school year. Initially, they defined a table to store this information, but it didn't follow database normalization principles, which can lead to data anomalies and inefficiencies.

Original Table:

```sql
CREATE TABLE meal (
    id INTEGER,
    name VARCHAR(50) NOT NULL,
    ingredients VARCHAR(150), -- comma-separated list
    avg_student_rating NUMERIC,
    date_served DATE,
    total_calories SMALLINT NOT NULL
);
```


<details>
    <summary>Solution</summary>


To improve the design and satisfy 2nd Normal Form (2NF):

- **Separate the ingredients and dates**: Ingredients and dates should not be stored directly in the `meal` table. Instead, they should be in their own tables, linked by foreign keys.
- **Use a primary key**: The `id` column should serve as the primary key for the `meal` table.

SQL Commands:

```sql
-- Create the ingredient table to store individual ingredients
CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Redefine the meal table, ensuring it adheres to 2NF
CREATE TABLE meal (
	id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avg_student_rating NUMERIC,
    total_calories SMALLINT NOT NULL
);

-- Create a table to store the dates when meals are served
CREATE TABLE meal_date (
  	meal_id INTEGER REFERENCES meal(id),
    date_served DATE NOT NULL
);

-- Create a linking table to associate meals with ingredients
CREATE TABLE meal_ingredient (
  	meal_id INTEGER REFERENCES meal(id),
    ingredient_id INTEGER REFERENCES ingredient(id)
);
```

This design adheres to 2NF by separating non-key dependencies into their own tables, thus reducing redundancy and improving data integrity.

</details>



### 3NF: University Records 

The original table design for the university includes details about the university, such as its address and zip code. 

SQL Command:

```sql
CREATE TABLE university (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    street_address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code INTEGER NOT NULL
);
```

The pre-filled table would look like this:

| id  | name         | street_address    | city        | state     | zip_code |
|-----|--------------|-------------------|-------------|-----------|----------|
| 1   | University A | 123 University St | Springfield | Illinois  | 62704    |
| 2   | University B | 456 College Ave   | Austin      | Texas     | 73301    |
| 3   | University C | 789 Campus Dr     | Berkeley    | California| 94704    |


We need to normalized the tables using 3rd Normal Form (3NF). To achieve this, we need to eliminate transitive dependencies by creating a separate table for zip codes.


<details>
    <summary>Solution</summary>


To remove transitive dependencies, related data is split into separate tables.

Create the `zip` Table:

```sql
CREATE TABLE zip (
    code INTEGER PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL
);
```

Output table with sample records: 

| code | city        | state      |
|------|-------------|------------|
| 62704| Springfield | Illinois   |
| 73301| Austin      | Texas      |
| 94704| Berkeley    | California |

Create the `university` Table:

```sql
CREATE TABLE university (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    street_address VARCHAR(100) NOT NULL,
    zip_code INTEGER REFERENCES zip(code)
);
```

Output table with sample records: 

| id  | name         | street_address    | zip_code |
|-----|--------------|-------------------|----------|
| 1   | University A | 123 University St | 62704    |
| 2   | University B | 456 College Ave   | 73301    |
| 3   | University C | 789 Campus Dr     | 94704    |

</details>



### All Together: Loan Program

The steps will guide you through the process of altering the tables to satisfy the requirements for 1st Normal Form (1NF), 2nd Normal Form (2NF), and 3rd Normal Form (3NF).

Initial Table:

```sql
CREATE TABLE borrower (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL
);
```

Sample Table Records:

| id  | full_name        |
|-----|------------------|
| 101 | Alice Johnson     |
| 102 | Bob Smith         |
| 103 | Charlie Davis     |
| 104 | Dana Lee          |
| 105 | Evan Martin       |

#### 1. 1NF 

Instructions for 1NF:

- Add first_name and last_name columns.
- Remove the full_name column.

<details>
    <summary>Solution</summary>

Alter the existing table:

```sql
-- Add new columns to the borrower table
ALTER TABLE borrower
ADD COLUMN first_name VARCHAR(50) NOT NULL,
ADD COLUMN last_name VARCHAR(50) NOT NULL;

-- Remove column from borrower table to satisfy 1NF
ALTER TABLE borrower
DROP COLUMN full_name;
```

Sample Table Records (After 1NF):

| id  | first_name | last_name   |
|-----|------------|-------------|
| 101 | Alice      | Johnson     |
| 102 | Bob        | Smith       |
| 103 | Charlie    | Davis       |
| 104 | Dana       | Lee         |
| 105 | Evan       | Martin      |


</details>


#### 2. 2NF 

The `loan` table currently has a `bank_zip` column, which can cause redundancy and anomalies. To address this, we will move the `bank_zip` data into the bank table.

Sample `loan` table before normalization:

| loan_id | borrower_id | bank_id | bank_zip | amount |
|---------|-------------|---------|----------|--------|
| 1001    | 20001       | 301     | 12345    | 50000  |
| 1002    | 20002       | 302     | 67890    | 75000  |
| 1003    | 20001       | 303     | 54321    | 45000  |
| 1004    | 20003       | 304     | 67890    | 30000  |
| 1005    | 20002       | 301     | 12345    | 60000  |


<details>
    <summary>Solution</summary>


1. **Add a New Column to the Bank Table**  
   We need to add a `zip` column to the `bank` table to store the zip code associated with each bank.

   ```sql
   -- Add a new column named 'zip' to the 'bank' table 
   ALTER TABLE bank
   ADD COLUMN zip VARCHAR(10) NOT NULL;
   ```

2. **Remove the Redundant Column from the Loan Table**  
   With the zip code now stored in the `bank` table, we can remove the `bank_zip` column from the `loan` table.

   ```sql
   -- Remove the 'bank_zip' column from 'loan' to satisfy 2NF
   ALTER TABLE loan
   DROP COLUMN bank_zip;
   ```


Sample Table After Normalization:

- **bank**

    | id  | name           | zip     |
    |-----|----------------|---------|
    | 301 | Bank of Alpha  | 12345   |
    | 302 | Bank of Beta   | 67890   |
    | 303 | Gamma Bank     | 54321   |
    | 304 | Delta Bank     | 67890   |

- **loan**

    | loan_id | borrower_id | bank_id | amount |
    |---------|-------------|---------|--------|
    | 1001    | 20001       | 301     | 50000  |
    | 1002    | 20002       | 302     | 75000  |
    | 1003    | 20001       | 303     | 45000  |
    | 1004    | 20003       | 304     | 30000  |
    | 1005    | 20002       | 301     | 60000  |


</details>


#### 3. 3NF 

To track the type of program for each loan, create a new table called `program`. This table will store details like program ID, description, and maximum loan amount. 

The maximum loan amount depends only on the loan's program. By referencing the `program_id` in the `loan` table, we can eliminate the need for storing the program and max amount directly in the `loan` table. This change satisfies 3NF.

<details>
    <summary>Solution</summary>

Create the `program` table and alter the `loan` tgable:

```sql
-- Define 'program' table with max amount for each program
CREATE TABLE program (
  	id serial PRIMARY KEY,
  	description text NOT NULL,
  	max_amount DECIMAL(9,2) NOT NULL
);

-- Alter the 'loan' table to satisfy 3NF
ALTER TABLE loan
ADD COLUMN program_id INTEGER REFERENCES program(id), 
DROP COLUMN program,
DROP COLUMN max_amount;
```

The sample records for the `program` and `loan` tables after applying 3NF normalization should look like this:

- `program` table (after 3NF normalization)

    | id  | description              | max_amount |
    |-----|--------------------------|------------|
    | 1   | Small Business Loan       | 50000.00   |
    | 2   | Startup Loan              | 100000.00  |
    | 3   | Expansion Loan            | 150000.00  |
    | 4   | Emergency Relief Program  | 25000.00   |
    | 5   | Agricultural Loan         | 75000.00   |

- `loan` table (after 3NF normalization)

    | id   | borrower_id | bank_id | program_id |
    |------|-------------|---------|------------|
    | 1001 | 501         | 301     | 1          |
    | 1002 | 502         | 302     | 2          |
    | 1003 | 503         | 303     | 3          |
    | 1004 | 504         | 304     | 4          |
    | 1005 | 505         | 305     | 5          |

</details>