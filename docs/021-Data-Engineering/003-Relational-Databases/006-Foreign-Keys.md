---
title: "Foreign Keys"
description: "Relational Database"
tags: [Data Engineering, Databases, SQL]
sidebar_position: 6
last_update:
  date: 2/27/2022
---


## Sample Tables A

This is the first set of tables that will be used in the examples in this guide. These tables will be created in the succeeding sections below.

<div class='img-center'>

![](/img/docs/sample-databases-courses-students-instructors-enrollments.png)

</div>

Each student can enroll in multiple courses, and each course can have multiple students enrolled in it. This many-to-many relationship is represented in the diagram below with a rhombus, showing the **cardinality**: a student can be enrolled in zero or more courses, and a course can have zero or more students.

<div class='img-center'>

![](/img/docs/sample-databases-courses-with-n-to-n-cardinality.png)

</div>

## Sample Tables B

This is the second set of tables that will be used in the examples in this guide. These tables will be created in the succeeding sections below.

<div class='img-center'>

![](/img/docs/sample-databases-cars-manufacturrers-drivers.png)

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
ADD CONSTRAINT  fkey_b FOREIGN KEY (column_b3) REFERENCES table_a (column_a1);
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


### More example 

For this one, we'll use the set of tables from  **Sample Tables A**. 
Start with creating the individual tables:

- **Courses** Table
    `course_id` is a surrogate key automatically generated as a serial number.

    ```sql
    CREATE TABLE courses (
        course_id INT PRIMARY KEY,
        course_name VARCHAR(100),
        credits INT NOT NULL
    );

    SELECT * FROM courses;
    ```

    ![](/img/docs/second-example-for-foreign-keysss-table-courses.png)


- **Instructors** Table
    `instructor_id` is a surrogate key, ensuring each instructor has a unique identifier.

    ```sql
    CREATE TABLE instructors (
        instructor_id INT PRIMARY KEY,
        instructor_name VARCHAR(100) NOT NULL
    );

    SELECT * FROM instructors;
    ```

    ![](/img/docs/second-example-for-foreign-keysss-table-instructors.png)


- **Students** Table

    ```sql
    CREATE TABLE students (
        student_id INT PRIMARY KEY,
        student_name VARCHAR(100),
        email VARCHAR(100)
    );
    
    SELECT * FROM students;
    ```

    ![](/img/docs/second-example-for-foreign-keysss-table-students.png)

- **Enrollments** Table

    ```sql
    CREATE TABLE enrollments (
        enrollment_id INT PRIMARY KEY,
        student_id INT,
        course_id INT,
        enrollment_date DATE,
    );
    
    SELECT * FROM enrollments;
    ```

    ![](/img/docs/second-example-for-foreign-keysss-table-enrollments.png)

Add the sample records:

```sql
-- Insert records into Courses table
INSERT INTO courses (course_id, course_name, credits) VALUES
(101, 'Introduction to SQL', 3),
(102, 'Data Structures', 4),
(103, 'Operating Systems', 4),
(104, 'Database Management', 3),
(105, 'Computer Networks', 3),
(106, 'Web Development', 2),
(107, 'Artificial Intelligence', 3),
(108, 'Machine Learning', 3);
```

![](/img/docs/courses-table-sample-records.png)


```sql
-- Insert records into Instructors table
INSERT INTO instructors (instructor_id, instructor_name) VALUES
(201, 'Dr. John Smith'),
(202, 'Dr. Emily Johnson'),
(203, 'Dr. Sarah Brown'),
(204, 'Dr. Michael Davis'),
(205, 'Dr. Linda Wilson'),
(206, 'Dr. Richard Taylor'),
(207, 'Dr. Laura Lee'),
(208, 'Dr. Robert White');
```

![](/img/docs/instructors-table-sample-records.png)


```sql
-- Insert records into Students table
INSERT INTO students (student_id, student_name, email) VALUES
(301, 'Alice Johnson', 'alice.johnson@email.com'),
(302, 'Bob Smith', 'bob.smith@email.com'),
(303, 'Charlie Brown', 'charlie.brown@email.com'),
(304, 'David Williams', 'david.williams@email.com'),
(305, 'Emma Thomas', 'emma.thomas@email.com'),
(306, 'Fiona Davis', 'fiona.davis@email.com'),
(307, 'George Miller', 'george.miller@email.com'),
(308, 'Hannah Wilson', 'hannah.wilson@email.com');
```

![](/img/docs/students-table-sample-records.png)


```sql
-- Insert records into Enrollments table
INSERT INTO enrollments (enrollment_id, student_id, course_id, enrollment_date) VALUES
(401, 301, 101, '2024-01-15'),
(402, 302, 102, '2024-01-16'),
(403, 303, 101, '2024-01-17'),
(404, 304, 103, '2024-01-18'),
(405, 305, 102, '2024-01-19'),
(406, 306, 104, '2024-01-20'),
(407, 307, 105, '2024-01-21'),
(408, 308, 106, '2024-01-22'); 
```

![](/img/docs/enrollments-table-sample-records.png)

After creating the tables and adding the sample records, we can specify the foreign keys. Among our tables, the **enrollments** table has foreign keys:

- `students` - points to the `student_id` key from the **students** table.
- `courses` - points to the `course_id` key from the **courses** table.

Diagram:


Since the tables are already created, we can use the `ALTER` command to specify the foreign keys.

```sql
ALTER TABLE enrollments
ADD CONSTRAINT fkey_student FOREIGN KEY (student_id) REFERENCES students(student_id);

ALTER TABLE enrollments
ADD CONSTRAINT fkey_course FOREIGN KEY (course_id) REFERENCES courses(course_id);
```

Now let's try to add invalid records on the **enrollments** table. 

- Try inserting an enrollment record where the `student_id` does not exist in the **students** table.

    ```sql
    INSERT INTO enrollments (enrollment_id, student_id, course_id, enrollment_date) 
    VALUES
        (409, 999, 101, '2024-02-01');  -- Assuming 999 is not a valid student_id
    ```

    ![](/img/docs/insert-value-error-enrollments.png)

- Try inserting an enrollment record where the `course_id` does not exist in the **courses** table.

    ```sql
    INSERT INTO enrollments (enrollment_id, student_id, course_id, enrollment_date) 
    VALUES
        (410, 301, 999, '2024-02-01');  -- Assuming 999 is not a valid course_id
    ```

    ![](/img/docs/insert-value-error-enrollments-2.png)


By trying to insert invalid data, we are able to confirm that the foreign key constraints are correctly set up and that they effectively enforce data integrity between related tables.



## Many-to-many Relationships

The tables in [Sample Tables A](#sample-tables-a) have shown a preview of how complex relationships between tables work.  Such relationship is called a **many-to-many (N:M) relationships**, where students can interact with multiple instructors across courses, and instructors can mentor several students. This requires an intermediary table to accurately represent these relationships in the database.

- **Previous Setup**: Used 1:N relationships between `Students` and `Courses`.
- **Complexity**: Need N:M relationships for students and instructors.

To capture the N:M relationships between `Students` and `Instructors`, we introduce an intermediary table, `student_instructors`, which will hold references to both students and instructors. This table can also include additional attributes, such as the instructor's role with each student.

- **New Table**: `student_instructors` for N:M relationships.
- **Attributes**: Include foreign keys and possibly additional data like `role`.


### Implementing N:M Relationships

The `student_instructors` table will contain foreign keys pointing to both the `students` and `instructors` tables. This setup ensures referential integrity and allows students to have multiple instructors and vice versa.


<div class='img-center'>

![](/img/docs/students-instructors-n-m-relationshipssss.png)

</div>


Create the intermediary table:

```sql
CREATE TABLE student_instructors (
    student_id INTEGER REFERENCES students(student_id),
    instructor_id INTEGER REFERENCES instructors(instructor_id),
    role VARCHAR(50)
);
```

:::info[no primary keys]

Notice that there is no primary keys for tables that have N:M relationships with other tables. The primary key can be defined as the combination of all three attributes in the `student_instructors` table.

:::


### Testing and Expected Outputs

Insert valid data to ensures relationships can be correctly established.

```sql
INSERT INTO student_instructors
VALUES (301, 201, 'Research Assistant');

INSERT INTO student_instructors
VALUES (302, 202, 'Teaching Assistant');

INSERT INTO student_instructors
VALUES (303, 203, 'Lab Assistant');

INSERT INTO student_instructors
VALUES (304, 204, 'Research Fellow');

INSERT INTO student_instructors
VALUES (305, 205, 'Student Mentor');

INSERT INTO student_instructors
VALUES (306, 206, 'Project Assistant');

INSERT INTO student_instructors
VALUES (307, 207, 'Course Assistant');

INSERT INTO student_instructors
VALUES (308, 208, 'Department Assistant');

INSERT INTO student_instructors
VALUES (301, 202, 'Graduate Assistant');

INSERT INTO student_instructors
VALUES (302, 203, 'Program Coordinator');

SELECT * FROM student_instructors;
```

Output:

<div class='img-center'>

![](/img/docs/students-instructors-n-m-relationshipssss-valid-data.png)

</div>



Insert invalid data to tests constraint enforcement.

```sql
INSERT INTO student_instructors
VALUES (999, 201, 'Non-existent Student');

INSERT INTO student_instructors
VALUES (301, 999, 'Non-existent Instructor');

INSERT INTO student_instructors
VALUES (999, 999, 'Both Non-existent');

INSERT INTO student_instructors
VALUES (310, 210, 'Invalid Student and Instructor');

INSERT INTO student_instructors
VALUES (311, 208, 'Non-existent Student');
```

Output:


![](/img/docs/students-instructors-n-m-relationshipssss-invalid-dataaa.png)


This updated structure accommodates complex relationships and ensures that referential integrity is maintained within the database.



### Check constraints 

For Sample Tables A:

```sql
SELECT 
    constraint_name, 
    table_name,
    constraint_type
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'; 
```

![](/img/docs/check-constraints-sample-table-a.png)


For Sample Tables B:

```sql
SELECT 
    constraint_name, 
    table_name,
    constraint_type
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'; 
```


![](/img/docs/check-constraints-sample-table-b.png)


:::info[Same command]

We can use the same SQL query to check the constraints for any table, as seen in both sample tables.

:::