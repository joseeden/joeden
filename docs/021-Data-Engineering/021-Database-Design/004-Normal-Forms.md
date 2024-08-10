---
title: "Normal Forms"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 4
last_update:
  date: 2/27/2022
---



## Normal Forms (NF)

Normal forms are used in normalizing a database, which involves organizing the data to reduce redundancy and improve integrity. Each normal form builds on the previous one, introducing stricter rules for how data should be structured. By following these rules, databases become easier to maintain and less prone to errors, such as update anomalies or data inconsistencies.

To learn more about normalization, please see [Schemas and Normalization.](./003-Schemas-and-Normalization.md)

## Types of Normal Forms 

### First Normal Form (1NF)

First Normal Form ensures that each column contains atomic values and that there are no repeating groups of data. This means every entry in a column is indivisible, and each record must be unique.

Consider a table of students and their courses before 1NF:

| Student_id | Name      | Courses       |
|------------|-----------|---------------|
| 101        | Alice     | Math, English |
| 102        | Bob       | Science       |
| 103        | Carol     | Math, History |

To convert this to 1NF, ensure that each course is in a separate row, splitting it into two tables:

**Student Table**

| Student_id | Name  |
|------------|-------|
| 101        | Alice |
| 102        | Bob   |
| 103        | Carol |

**Student-Course Table**

| Student_id | Course  |
|------------|---------|
| 101        | Math    |
| 101        | English |
| 102        | Science |
| 103        | Math    |
| 103        | History |




### Second Normal Form (2NF)

Second Normal Form builds on 1NF by removing partial dependencies, meaning all non-key attributes must be fully dependent on the primary key. In a table with a composite primary key, every non-key attribute should depend on the whole key, not just part of it.

- Must satisfy 1NF First
- If primary key is one column, then automatically satisfies 2NF 
- If there is a composite primary key, then each non-key column must be dependent on all the keys 

Consider a table that tracks student progress in various courses:

| Student_id | Course_id | Instructor_id | Instructor | Progress |
|------------|-----------|---------------|------------|----------|
| 101        | 2021      | 301           | Dr. Smith  | 85%      |
| 101        | 2042      | 302           | Dr. Jones  | 90%      |
| 102        | 2021      | 301           | Dr. Smith  | 75%      |
| 103        | 2053      | 303           | Dr. Brown  | 88%      |


The primary keys are:

- `Student_id` 
- `Course_id`

The non-key columns:

- `Instructor`

    - Dependent only on `Course_id`
    - Instructors depends on the courses, not the students taking the course.

- `Instructor_id` 

    - Similar with `Instructor` in terms of dependency.
    - Dependent only on `Course_id`
    - Instructors depends on the courses, not the students taking the course.

- `Progress`

    - Dependent on both `Student_id` and `Course_id`


To achieve 2NF, separate the data into two tables:

**Student-Course Table**

| Student_id | Course_id | Progress |
|------------|-----------|----------|
| 101        | 2021      | 85%      |
| 101        | 2042      | 90%      |
| 102        | 2021      | 75%      |
| 103        | 2053      | 88%      |

**Instructor-Course Table**

| Course_id | Instructor_id | Instructor |
|-----------|---------------|------------|
| 2021      | 301           | Dr. Smith  |
| 2042      | 302           | Dr. Jones  |
| 2053      | 303           | Dr. Brown  |


In these tables:

- **Student-Course Table**: 

    - The `Progress` is fully dependent on the composite key (`Student_id`, `Course_id`).
    
- **Instructor-Course Table**: 

    - `Course_id` is the primary key here.
    - `Instructor` and  `Instructor_id` is fully dependent on the `Course_id`.
    - This ensures there are no partial dependencies.

This separation resolves partial dependencies, ensuring that each non-key attribute is related to the entire primary key in its respective table, thus achieving 2NF.



### Third Normal Form (3NF)

Third Normal Form eliminates transitive dependencies, ensuring non-key attributes are not dependent on other non-key attributes.

- Must satisfy 2NF first 
- Non-key columns should not depend on other non-key columns.

In the sample table below, the primary key is the `Course ID`.

- `Instructor` is dependent on `Instructor ID`
-  This creates a transitive dependency since `Instructor` can be derived from `Instructor ID` instead of directly from `Course ID`.

| Course ID | Instructor ID | Instructor | Technology  |
|-----------|---------------|------------|-------------|
| 2021      | 301           | Dr. Smith  | Python      |
| 2042      | 302           | Dr. Jones  | Java        |
| 2053      | 303           | Dr. Brown  | JavaScript  |
| 2064      | 304           | Dr. White  | C++         |
| 2075      | 305           | Dr. Green  | Ruby        |

To achieve 3NF, we separate the table into two tables to eliminate transitive dependencies:

**Courses Table**

| Course ID | Instructor | Technology  |
|-----------|------------|-------------|
| 2021      | Dr. Smith  | Python      |
| 2042      | Dr. Jones  | Java        |
| 2053      | Dr. Brown  | JavaScript  |
| 2064      | Dr. White  | C++         |
| 2075      | Dr. Green  | Ruby        |

**Instructors Table**

| Instructor ID | Instructor |
|---------------|------------|
| 301           | Dr. Smith  |
| 302           | Dr. Jones  |
| 303           | Dr. Brown  |
| 304           | Dr. White  |
| 305           | Dr. Green  |

In these tables:

- **Courses Table**: 

    - Attributes `Instructor` and `Technology` are now directly related to `Course ID` without depending on any other non-key attribute.

- **Instructors Table**: 

    - The instructor information is separated into its own table.
    - This removes the transitive dependency on `Instructor ID`.

This structure ensures that all non-key attributes in the `Courses` table are directly dependent on the primary key, `Course ID`, and eliminates transitive dependencies.


## Other Normal Forms 

The first three normal forms are commonly used in normalization, but there are other normal forms as well.


### Boyce-Codd Normal Form (BCNF)

BCNF is a stricter version of 3NF, ensuring every determinant is a candidate key.

Consider a table where a professor can only teach one subject in a particular room, but a room can host different professors at different times:

| Professor | Subject | Room |
|-----------|---------|------|
| Dr. Smith | Math    | 101  |
| Dr. Jones | English | 102  |
| Dr. Smith | Science | 101  |

This table violates BCNF because Room determines the Subject. To achieve BCNF:

**Room-Subject Table**

| Room | Subject |
|------|---------|
| 101  | Math    |
| 102  | English |

**Professor-Assignment Table**

| Professor | Room |
|-----------|------|
| Dr. Smith | 101  |
| Dr. Jones | 102  |

### Fourth Normal Form (4NF)

Fourth Normal Form eliminates multi-valued dependencies, ensuring that there are no non-trivial multi-valued dependencies other than a candidate key.

Suppose a student can have multiple hobbies and skills independently:

| Student_id | Hobby    | Skill   |
|------------|----------|---------|
| 101        | Cycling  | Python  |
| 101        | Painting | SQL     |
| 102        | Cycling  | Java    |
| 102        | Drawing  | Python  |

This table has a multi-valued dependency because hobbies and skills are independent attributes. To achieve 4NF, separate these into two tables:

**Hobby Table**

| Student_id | Hobby    |
|------------|----------|
| 101        | Cycling  |
| 101        | Painting |
| 102        | Cycling  |
| 102        | Drawing  |

**Skill Table**

| Student_id | Skill   |
|------------|---------|
| 101        | Python  |
| 101        | SQL     |
| 102        | Java    |
| 102        | Python  |

### Fifth Normal Form (5NF)

Fifth Normal Form focuses on eliminating join dependencies, ensuring that all join dependencies are implied by candidate keys.

Suppose a project requires multiple employees with different skills, and each skill needs specific tools:

| Project | Employee | Skill   | Tool  |
|---------|----------|---------|-------|
| A       | Alice    | Coding  | Laptop|
| A       | Bob      | Testing | Toolkit|
| B       | Alice    | Testing | Toolkit|
| B       | Carol    | Design  | Sketchpad|

To achieve 5NF, decompose this table:

**Project-Employee Table**

| Project | Employee |
|---------|----------|
| A       | Alice    |
| A       | Bob      |
| B       | Alice    |
| B       | Carol    |

**Employee-Skill Table**

| Employee | Skill   |
|----------|---------|
| Alice    | Coding  |
| Bob      | Testing |
| Carol    | Design  |

**Skill-Tool Table**

| Skill   | Tool    |
|---------|---------|
| Coding  | Laptop  |
| Testing | Toolkit |
| Design  | Sketchpad|


## More examples 

### 1NF

Below is a denormalized table called **customers** containing car rental records:


| customer_id | customer_name  | cars_rented             | invoice_id         | premium_member | salutation |
|-------------|----------------|-------------------------|--------------------|----------------|------------|
| 2871        | Alex Johnson   | 7XY123                  | 5498               | false          | Dr         |
| 3924        | Mia Chen       | 3TH678                  | 7623               | false          | Mr         |
| 4785        | Noah Wilson    | 9JK234, 8LM567, 1BC890  | 1839, 9462, 2750   | true           | Ms         |
| 5648        | Emma Garcia    | 2DE345, 6GH789          | 3847, 5129         | true           | Mrs        |

To-dos:

1. `cars_rented` holds one or more `car_ids` and `invoice_id` holds multiple values. 
2. Create a new table to hold individual `car_ids` and `invoice_ids` of the `customer_ids` who've rented those cars.
3. Drop two columns from customers table to satisfy 1NF

<details>
    <summary>Solution</summary>

Run the SQL commands below:

```sql
-- Create a new table to hold the cars rented by customers
CREATE TABLE customer_rentals (
  customer_id INT NOT NULL,
  car_id VARCHAR(128) NULL,
  invoice_id VARCHAR(128) NULL
);

-- Drop two columns from customers table to satisfy 1NF
ALTER TABLE customers
DROP COLUMN cars_rented,
DROP COLUMN invoice_id;

SELECT * FROM customer_rentals;
```

![](/img/docs/more-example-car-cust-rental.png)

We now have two tables: 

- **customers** which holds customer information 
- **customer_rentals** which holds the car_ids rented by different `customer_ids`. 

This satisfies 1NF. In a real situation, we would need to fill the new table before dropping any columns.

</details>


### 2NF 

Below is an expanded version of the **customer_rentals** table:

| customer_id | car_id  | start_date | end_date   | model       | manufacturer | type_car    | condition | color  |
|-------------|---------|------------|------------|-------------|--------------|-------------|-----------|--------|
| 3210        | 7XM245  | 2020-05-10 | 2020-05-15 | Focus 2020  | Ford         | sedan       | good      | white  |
| 4521        | 8QN365  | 2021-06-12 | 2021-06-18 | Mustang 2021| Ford         | convertible | excellent | black  |
| 3827        | 6LB457  | 2021-07-19 | 2021-07-21 | RAV4 2021   | Toyota       | SUV         | excellent | silver |
| 3827        | 6LB457  | 2021-08-01 | 2021-08-12 | RAV4 2021   | Toyota       | SUV         | excellent | silver |
| 3827        | 5ZX673  | 2020-09-05 | 2020-09-10 | RAV4 2021   | Toyota       | SUV         | good      | black  |
| 4938        | 7XM245  | 2020-11-11 | 2020-11-15 | Focus 2020  | Ford         | sedan       | good      | white  |
| 4938        | 7XM245  | 2021-01-04 | 2021-01-10 | Focus 2020  | Ford         | sedan       | fair      | white  |

To-dos:

1. Create a new table for the non-key columns that were conflicting with 2NF criteria.
2. Drop those non-key columns from customer_rentals.

<details>
    <summary>Solution</summary>

We can use the query below to check the primary keys in the given **customer_rentals** table:

```sql
SELECT 
    kcu.column_name, 
    tc.constraint_type
FROM 
    information_schema.table_constraints AS tc 
JOIN 
    information_schema.key_column_usage AS kcu
ON 
    tc.constraint_name = kcu.constraint_name
WHERE 
    tc.table_name = 'customer_rentals' 
    AND tc.constraint_type = 'PRIMARY KEY'; 
```

![](/img/docs/2nf-hearing-customer-rentals-checking-the-primary-keyssss.png)

Based on the output above, the following columns are the primary keys:

- `customer_id` 
- `start_date`
- `car_id`

The following non-key columns depend on `car_id`, but are independent of the other two primary keys:

- `model`
- `manufacturer`
- `type_car`
- `conditions`
- `colors` 

The customer or start date cannot change these attributes. We can put these columns in a new table and dropped them from **customer_rentals** table.

Create the table to store details about each car: 

```sql
CREATE TABLE cars (
  car_id VARCHAR(256) NULL,
  model VARCHAR(128),
  manufacturer VARCHAR(128),
  type_car VARCHAR(128),
  condition VARCHAR(128),
  color VARCHAR(128)
);
```

![](/img/docs/more-examples-2nf-created-carssss.png)

Modify the **customer_rentals** table by dropping the columns that were moved to the cars table. This will ensure the table satisfies 2NF by eliminating partial dependencies.

```sql
ALTER TABLE customer_rentals
  DROP COLUMN model,
  DROP COLUMN manufacturer, 
  DROP COLUMN type_car,
  DROP COLUMN condition,
  DROP COLUMN color; 
```

![](/img/docs/more-examples-2nf-alter-table-customer-rentalssss.png)

</details>


### 3NF 

We have expanded the **cars** table from above and created the **rental_cars** table below which uses the `car_id` attributes as the primary key.

| car_id | model        | manufacturer | type_car    | condition | color  |
|--------|--------------|--------------|-------------|-----------|--------|
| 6XZ123 | Focus 2020   | Ford         | sedan       | excellent | white  |
| 7PQ789 | Accord 2019  | Honda        | sedan       | good      | silver |
| 8LM456 | Model S 2021 | Tesla        | electric    | new       | black  |
| 9AB654 | Mustang 2020 | Ford         | convertible | fair      | red    |

To-dos:

1. Create a new table for the non-key columns that were conflicting with 3NF criteria.
2. Drop those non-key columns from rental_cars.


<details>
    <summary>Solution</summary>

Confirm the primary keys first:

```sql
SELECT 
    kcu.column_name, 
    tc.constraint_type
FROM 
    information_schema.table_constraints AS tc 
JOIN 
    information_schema.key_column_usage AS kcu
ON 
    tc.constraint_name = kcu.constraint_name
WHERE 
    tc.table_name = 'rental_cars' 
    AND tc.constraint_type = 'PRIMARY KEY';  
```

![](/img/docs/3nf-new-example-verify-the-primary-key-first.png)


Create a new table to satisfy 3NF:

```sql
CREATE TABLE car_model(
  model VARCHAR(128),
  manufacturer VARCHAR(128),
  type_car VARCHAR(128)
);
```

![](/img/docs/3nf-example-rental-cars-create-new-table-car_model.png)

Drop columns in **rental_cars** to satisfy 3NF:

```sql
ALTER TABLE rental_cars
DROP COLUMN condition,
DROP COLUMN color;

SELECT * FROM rental_cars; 
```

![](/img/docs/3nf-example-rental-cars-drop-columnssssss.png)

From here we can see that creating 3NF tables help reduce data redundancy and potential data anomalies.

</details>
