---
title: "forgetting Keys"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Sample Tables A

This is our current database model. We have the following entity types with primary keys:

- **Courses**: This table includes information about the courses offered.

- **Instructors**: This table includes data about instructors who teach courses.

- **Students**: This table lists students enrolled in the institution.

- **Enrollments**: This table tracks which students are enrolled in which courses.

### Schemas 

- `courses` table

    | Column Name   | Data Type    | Constraints           | Description                            |
    |---------------|--------------|------------------------|----------------------------------------|
    | `course_id`    | `SERIAL`      | `PRIMARY KEY`          | Unique identifier for the course        |
    | `course_name`  | `VARCHAR(100)`| `NOT NULL`             | Name of the course                      |
    | `credits`      | `INTEGER`     | `NOT NULL`             | Number of credits for the course        |

- `instructors` table

    | Column Name    | Data Type    | Constraints           | Description                            |
    |----------------|--------------|------------------------|----------------------------------------|
    | `instructor_id` | `SERIAL`      | `PRIMARY KEY`          | Unique identifier for the instructor   |
    | `instructor_name`| `VARCHAR(100)`| `NOT NULL`            | Name of the instructor                 |

- `students` table

    | Column Name    | Data Type    | Constraints            | Description                            |
    |----------------|--------------|------------------------|----------------------------------------|
    | `student_id`    | `SERIAL`      | `PRIMARY KEY`          | Unique identifier for the student      |
    | `student_name`  | `VARCHAR(100)`| `NOT NULL`             | Name of the student                    |
    | `email`         | `VARCHAR(100)`| `UNIQUE`, `NOT NULL`   | Email address of the student           |

- `enrollments` table

    | Column Name   | Data Type    | Constraints                            | Description                                |
    |---------------|--------------|----------------------------------------|--------------------------------------------|
    | `enrollment_id`| `SERIAL`      | `PRIMARY KEY`                           | Unique identifier for the enrollment       |
    | `student_id`   | `INTEGER`     | `NOT NULL`, `REFERENCES students(student_id)` | Foreign key referencing the students table |
    | `course_id`    | `INTEGER`     | `NOT NULL`, `REFERENCES courses(course_id)`  | Foreign key referencing the courses table  |
    | `enrollment_date` | `DATE`    | `NOT NULL`                              | Date when the student enrolled in the course |



### The Database Model

Each student can enroll in multiple courses, and each course can have multiple students enrolled in it. This many-to-many relationship is represented in the diagram below with a rhombus, showing the **cardinality**: a student can be enrolled in zero or more courses, and a course can have zero or more students.

<div class='img-center'>

[](/img/docs/sample-databases-courses-with-n-to-n-cardinality.png)

</div>

### Creating the Tables 

**Courses** Table
`course_id` is a surrogate key automatically generated as a serial number.

```sql
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL
);
```


**Instructors** Table
`instructor_id` is a surrogate key, ensuring each instructor has a unique identifier.

```sql
CREATE TABLE instructors (
    instructor_id SERIAL PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL
);
```


**Students** Table

```sql
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

**Enrollments** Table
`enrollment_id` is a surrogate key.

```sql
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    course_id INTEGER REFERENCES courses(course_id)
);
```

## Sample Tables B

A second set of tables are also use in some of the examples.

<div class='img-center'>

[](/img/docs/sample-databases-cars-manufacturrers-drivers.png)

</div>


## Foreign Keys

To implement the relationships between the tables, we can use foreign keys. Foreign keys are columns that point to the primary key of another table. There are important rules for foreign keys:

- **Domain and Data Type Consistency**

    - The domain and data type must match the primary key's type.

- **Referential Integrity**

    - Foreign key values must exist in the primary key of the referenced table. 
    - This ensures that all entries in the foreign key column correspond to existing entries in the primary key column.

- **Duplicates and Nulls**

    - Foreign keys are not actual keys, it can have duplicates and null values, unlike primary keys.

### Specifying Foreign Keys for New Tables

When creating a new table, you can specify a foreign key similarly to a primary key. 
We can create the first table and specify the first column as the primary key.

```sql
CREATE TABLE table_a (
    column_a1 VARCHAR(255) PRIMARY KEY,
    column_a2 VARCHAR(255)
);
```

For the second table, we also specify one column as the primary key but we also specify the second column as a foreign key which points to the primary key of the first table. This is done using the `REFERENCES` command. Notice that the primary key (from first table) and the foreign key (second table) have the same data type.


```sql
CREATE TABLE table_b (
    column_b1 VARCHAR(255) PRIMARY KEY,
    column_b2 VARCHAR(255) REFERENCES table_a (column_a1)
)
```

### Example: Foreign Keys

Let's create two tables from **Sample Tables B** : manufacturers and cars. 

The **manufacturers** table will contain two columns, the `name` column being the primary key for this table.

```sql
CREATE TABLE manufacturers (
    name VARCHAR(255) PRIMARY KEY,
    country VARCHAR(255)
);

SELECT * FROM manufacturers;
```

Create sample records:

```sql
INSERT INTO manufacturers 
VALUES
    ('Ford', 'USA'),
    ('Volkswagen', 'Germany'),
    ('General Motors', 'USA'),
    ('Toyota', 'Japan'),
    ('Nissan', 'Japan');

SELECT * FROM manufacturers;
```

| Name          | Country |
|---------------|---------|
| Ford          | USA     |
| Volkswagen    | Germany |
| General Motors| USA     |
| Toyota        | Japan   |
| Nissan        | Japan   |

Next, create the **cars** table and specify the `manufacturer_name` as the foreign key that points to the `name` column in the **maufacturers** table.

```sql
CREATE TABLE cars (
    model VARCHAR(255) PRIMARY KEY,
    manufacturer_name VARCHAR(255) REFERENCES manufacturers (name)
);

SELECT * FROM cars;
```

Create sample records.

```sql
INSERT INTO cars (model, manufacturer_name) 
VALUES
    ('Mustang', 'Ford'),
    ('Golf', 'Volkswagen'),
    ('Camaro', 'General Motors'),
    ('Corolla', 'Toyota'),
    ('Altima', 'Nissan'),
    ('Passat', 'Volkswagen');

SELECT * FROM cars;
```

| Model   | Manufacturer Name |
|---------|-------------------|
| Mustang | Ford              |
| Golf    | Volkswagen        |
| Camaro  | General Motors    |
| Corolla | Toyota            |
| Altima  | Nissan            |
| Passat  | Volkswagen        |

Now, if we try to add a record in the **cars** table with an invalid manufacturer or a manufacturer that doesn't exist in the **manufacturers** table, we will get an error. 

```sql
INSERT INTO cars 
VALUES
    ('Carrera', 'Porsche');

SELECT * FROM cars; 
```

![](/img/docs/foreign-key-violation-because-manufacturer-doesnt-exist.png)



### Specifying Foreign Keys for Existing Tables

Adding foreign keys to existing tables follows the same syntax as adding primary keys and unique constraints:

```sql
ALTER TABLE table_b
ADD CONSTRAINT fk_b FOREIGN KEY (column_b3) REFERENCES table_a (column_a1);
```

This approach allows you to enforce referential integrity across your database, ensuring that relationships between tables are accurately maintained.

### Example: Foreign Keys on Existing Tables

Going back to the previous examples, we currently have two tables: **manufacturers** and **cars**. We'll create a third table called **drivers** with three columns: `license_no`, `name`, and `car_model'.

[](/img/docs/sample-databases-cars-manufacturrers-drivers.png)

To create the third table:

```sql
CREATE TABLE drivers (
    license_no VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    car_model VARCHAR(255) 
);

SELECT * FROM drivers;
```

:::info[note]

Although the **drivers** table is a new table since we created it just now, we did not specify any foreign keys during table creation. Thus we will treat it as an existing table with no foreign keys. 

:::

Now we want to specify the `car_model` as the foreign key for the **drivers** table which points to the `model` column in the **cars** table.

```sql
ALTER TABLE drivers 
ADD CONSTRAINT car_model_fk FOREIGN KEY (car_model) REFERENCES cars(model);
```

Adding a valid record:

```sql
INSERT INTO drivers
VALUES
    ('1234ABCD', 'John Smith', 'Mustang');

SELECT * FROM drivers;
```

| license_no    | name          | car_model |
|---------------|---------------|-----------|
| 1234ABCD      | John Smith    | Mustang   |


Adding an invalid record:

```sql
INSERT INTO drivers
VALUES
    ('5678EFGH', 'John Smith', 'Cybertruck');

SELECT * FROM drivers;
```


![](/img/docs/foreign-key-violation-because-car-model-doesnt-exist.png)


### `JOIN` tables linked by a foreign key

While foreign keys and primary keys are not strictly necessary for join queries, they greatly help by telling you what to expect. For instance, you can be sure that records referenced from table A will always be present in table B – so a join from table A will always find something in table B. If not, the foreign key constraint would be violated.

```sql
SELECT manufacturers.country, cars.manufacturer_name, cars.model
FROM cars
INNER JOIN manufacturers
ON cars.manufacturer_name = manufacturers.name;
```

| Country | Manufacturer Name | Model  |
|---------|-------------------|--------|
| USA     | Ford              | Mustang|
| Germany | Volkswagen        | Golf   |
| USA     | General Motors    | Camaro |
| Japan   | Toyota            | Corolla|
| Japan   | Nissan            | Altima |
| Germany | Volkswagen        | Passat |


## More example 

For this one, we'll use the set of tables from  **Sample Tables A**.

