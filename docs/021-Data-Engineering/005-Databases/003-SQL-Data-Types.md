---
title: "SQL Data Types"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases]
sidebar_position: 4
last_update:
  date: 2/27/2022
---


## SQL Data Types

When creating a table, it's important to specify the data type for each field based on the type of data it will hold. Data types matter for a few reasons.

- Different data types are stored differently and take up varying amounts of space
- Certain operations only make sense for specific data types, like multiplying numbers but not text

Below is the **patrons** table that has fields with different data types:

<div class='img-center'>

| card_num | name           | member_year | total_fine |
|----------|----------------|-------------|------------|
| 123456   | John           | 2021        | 15.75      |
| 234567   | Jane           | 2020        | 5.00       |
| 345678   | Alice          | 2019        | 0.00       |
| 456789   | Bob            | 2022        | 7.50       |
| 567890   | Charlie        | 2021        | 12.30      |

</div>


### Strings

In programming, a "string" is a sequence of characters, like letters or punctuation. For example, the names in the **patrons** table are strings like "John" and "Jane." SQL has different data types for strings.

- Some are meant for short strings, up to 250 characters, saving storage space
- The **VARCHAR** data type is flexible, storing both small and large strings.
- The VARCHAR data type can hold up to tens of thousands of characters
- Due to its flexibility, VARCHAR is commonly used for storing strings

### Integers

Integer data types store whole numbers. In the patrons table, the years in the `member_year` column are integers. SQL offers several data types for integers.

- THandles numbers from just under negative two billion to just over positive two billion
- Different types are available based on the size of the numbers you need to store

### Floats

Float data types store numbers with fractional parts, like the `total_fine` field in the patrons table. SQL has various float data types depending on the precision required.

- **NUMERIC** data type can store floats with up to 38 digits total.
- This includes those before and after the decimal point.

## Schemas

A database schema is like a blueprint, showing the design of a database. It includes information about tables and their relationships.

- Indicates what data type each field can hold
- Shows relationships between tables, e.g. **patrons** table related to **checkouts** table.

For example, the schema for the **patrons** and **checkouts** table would look something like this:

- patrons
    - card_num: INT
    - name: VARCHAR 
    - member_year: INT
    - total_fine: NUMERIC 

- checkouts
    - id: INT
    - start_date: DATE
    - due_date: DATE
    - card_num: INT
    - book_id: INT

### Creating the Table 

Below is an example of a series of SQL commands to create a schema for **Customer** and **Order** tables:

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

### Star Schema 

In data warehousing, a star schema is often used. It optimizes analytical databases like Redshift.

- **Fact tables**: Records that represent events, such as orders
- **Dimension tables**: Information on the world, like customer names or product prices

    <div class="img-center">

    ![](/img/docs/data-eng-star-schema.png)
    
    </div>


## Database Storage

Information in a database table is stored on the hard disk of a server. Servers are powerful, centralized computers providing services over a network.

- Servers handle data access, host websites, or store files
- Dedicated servers are typically large and powerful to manage high volumes of requests and data