---
title: "Structured and Unstructured Data"
description: "Structured and Unstructured Data"
tags: [Data Engineering, Databases]
sidebar_position: 2
last_update:
  date: 2/27/2022
---



## Overview

Data can come in different forms, each with its own characteristics and uses.

- **Structured Data:**

  - Uses well-defined schema and tables
  - Organized in a fixed format
  - Easily searchable and queryable
  - Examples include databases and spreadsheets

- **Unstructured Data:**

  - Lacks a predefined data model
  - Not easily organized or queried
  - Examples include text documents, images, and videos
  - No fixed structure or format

## SQL versus NoSQL

There's no one-size-fits-all database solution. Each type has its own use case, so it's important to understand when to use which.


<div class="img-center"> 

![](/img/docs/db-sql-vs-nosql.png)

</div> 

**SQL** or Standard Query Language Databases refers to structured, relational databases. With structure data, we have:

- The more tables, the more inserts are required 
- Joins are required to retrieve data
- Structure is hard to break
- Organized data reduces redundant information
- Data model cannot change easily
- Data model needs to be thought of upfront to ensure consistency 
- Requires more work for developers

**NoSQL**, on the other hand, refers to unstructured, non-relational databases. With NoSQL, we can:

- Easily next data, allowing related details to be in one spot
- Nested files solves the issue of needing to join documents 
- Flexible structure allows for easy iterations
- Structure can change
- Could use structured on unstructured data
- Less time focusing on the database, more time to code

 
<div class="img-center">

![](/img/docs/dbsqlnosqlnotacompetition.png)

</div> 

## Database Schema 

A database schema defines the structure of a database, including tables, fields, relationships, and constraints. It acts as a blueprint for organizing and representing data.

Example of SQL to create a schema for Customer and Order tables:

```bash
-- Creating a Customer table schema
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(15)
);

-- Creating an Orders table schema with a foreign key relationship to Customer
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
```

To join the table:

```sql
SELECT Customer.CustomerID, Customer.FirstName, Customer.LastName, Orders.OrderID, Orders.OrderDate, Orders.TotalAmount
FROM Customer
INNER JOIN Orders ON Customer.CustomerID = Orders.CustomerID;
```

## Star Schema 

In data warehousing, a star schema is often used. It optimizes analytical databases like Redshift.

- **Fact tables**: Records that represent events, such as orders
- **Dimension tables**: Information on the world, like customer names or product prices

    <div class="img-center">

    ![](/img/docs/data-eng-star-schema.png)
    
    </div>


## Sample Labs

### Lab 1 - Schema

A PostgreSQL database is set up locally, containing the schema below. Use pandas to query the database using the read_sql() function and db_engine.


<div class="img-center">

![](/img/docs/schema-lab-diag.png)

</div>

The pandas package imported as pd will store the query result into a DataFrame object, so you can use any DataFrame functionality on it after fetching the results from the database.

- Select the first_name and last_name from the "Customer" table, ordered by last name and then first name.
- Show the first 3 rows of data using `.head()`.
- Show general information using `.info()`.

Given SQL Statement:

```sql
# Complete the SELECT statement
data = pd.read_sql("""
```

Answer:

```sql
# Complete the SELECT statement
data = pd.read_sql("""
SELECT first_name, last_name FROM "Customer"
ORDER BY last_name, first_name
""", db_engine)

# Show the first 3 rows of the DataFrame
print(data.head(3))

# Show the info of the DataFrame
print(data.info())
```

Output:

```bash
  first_name last_name
0    Connagh    Bailey
1      Brook     Bloom
2        Ann    Dalton
```

### Lab 2 - Joining on Relations

The power of SQL lies in joining information from multiple tables. Use the JOIN statement to combine the "Customer" and "Order" tables.

- Create the SELECT statement to join the "Customer" with the "Order" table.
- Print the id column of the resulting data.

Answer: 

- Write the SQL command to join the tables and select relevant columns:

  ```sql
  SELECT Customer.CustomerID, Customer.FirstName, Customer.LastName, Orders.OrderID, Orders.OrderDate, Orders.TotalAmount
  FROM Customer
  INNER JOIN Orders ON Customer.CustomerID = Orders.CustomerID;
  ```

- Using pandas to run the SQL query and fetch the data:

  ```python
  import pandas as pd

  # Assuming db_engine is already defined and connected to your PostgreSQL database
  data = pd.read_sql("""
  SELECT Customer.CustomerID, Customer.FirstName, Customer.LastName, Orders.OrderID, Orders.OrderDate, Orders.TotalAmount
  FROM Customer
  INNER JOIN Orders ON Customer.CustomerID = Orders.CustomerID;
  """, db_engine)

  # Display the data
  print(data)
  ```

- The output will display the joined data from the "Customer" and "Order" tables:

  ```bash
    CustomerID FirstName LastName  OrderID  OrderDate  TotalAmount
  0           1    Connagh    Bailey       10  2023-07-01         99.99
  1           2      Brook     Bloom       11  2023-07-02        149.99
  2           3        Ann    Dalton       12  2023-07-03         79.99
  ```

