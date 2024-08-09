---
title: "Schemas and Normalization"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 3
last_update:
  date: 2/27/2022
---



## Overview 

The star schema is a basic form of dimensional modeling that uses fact and dimension tables. Some use both the terms "dimensional modeling" and "Star schema" interchangeably. The star schema is made up of two tables:

- **Fact tables**: Hold metrics and change often, with foreign keys to dimension tables.
- **Dimension tables**: Describe attributes, changing less frequently.

In a bookstore example, the start schema can be used to track book sales across the US and Canada.

- Fact tables store sales data such as sales amount and quantity.
- Dimension tables provide details on books, sales time, and stores.
- Structure looks like a star with one-to-many relationships.

## Star Schema Example

In this setup, the fact table holds sales data linked to dimension tables with book, time, and store information. 

<div class='img-center'>

![](/img/docs/schema-examples-fact_booksales-complete-diagram.png)

</div>

The schema's star shape comes from the one-to-many connections, with stores involved in many sales but each sale tied to a single store.

- Fact table contains key sales metrics.
- Dimension tables include book, time, and store information.
- One-to-many relationships create the star shape.

### Create the Tables 

Creating the dimension table for books:

```sql
CREATE TABLE dim_book_star (
    book_id INT PRIMARY KEY,
    title VARCHAR(256),
    author VARCHAR(256),
    publisher VARCHAR(256),
    genre VARCHAR(128)
);

SELECT * FROM dim_book_star;
```

![](/img/docs/schema-exampless-booksales-book-star.png)


Creating the dimension table for stores:

```sql
CREATE TABLE dim_store_star (
    store_id INT PRIMARY KEY,
    store_address VARCHAR(256),
    city VARCHAR(128),
    state VARCHAR(128),
    country VARCHAR(128)
);

SELECT * FROM dim_store_star;
```

![](/img/docs/schema-exampless-booksales-book-dim-store-star.png)


Creating the dimension table for time:

```sql
CREATE TABLE dim_time_star (
    time_id INT PRIMARY KEY,
    day INT,
    month INT,
    quarter INT,
    year INT
);

SELECT * FROM dim_time_star;
```

![](/img/docs/schema-exampless-booksales-book-dim-time-star.png)


Creating the fact table for book sales:

```sql
CREATE TABLE fact_booksales (
    sales_id INT PRIMARY KEY,
    book_id INT,
    time_id INT,
    store_id INT,
    sales_amount FLOAT,
    quantity INT,
    FOREIGN KEY (book_id) REFERENCES dim_book_star(book_id),
    FOREIGN KEY (time_id) REFERENCES dim_time_star(time_id),
    FOREIGN KEY (store_id) REFERENCES dim_store_star(store_id)
);

SELECT * FROM fact_booksales;
```

![](/img/docs/schema-exampless-booksales-fact_booksales.png)


### Insert Sample Records 

Inserting records into **dim_book_star**:

```sql
INSERT INTO dim_book_star VALUES
(1, '1984', 'George Orwell', 'Secker & Warburg', 'Dystopian'),
(2, 'To Kill a Mockingbird', 'Harper Lee', 'J. B. Lippincott & Co.', 'Drama'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Charles Scribner''s Sons', 'Novel'),
(4, 'Catch-22', 'Joseph Heller', 'Simon & Schuster', 'Satire'),
(5, 'Brave New World', 'Aldous Huxley', 'Chatto & Windus', 'Dystopian'),
(6, 'Moby Dick', 'Herman Melville', 'Harper & Brothers', 'Adventure'),
(7, 'War and Peace', 'Leo Tolstoy', 'The Russian Messenger', 'Historical Fiction'),
(8, 'Hamlet', 'William Shakespeare', 'N/A', 'Tragedy'),
(9, 'Pride and Prejudice', 'Jane Austen', 'T. Egerton', 'Romance'),
(10, 'The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown and Company', 'Novel');

SELECT * FROM dim_book_star;
```

![](/img/docs/schema-exampless-booksales-sample-record-dim_book_star.png)


Inserting records into **dim_store_star**:

```sql
INSERT INTO dim_store_star VALUES
(1, '1234 Book St', 'San Francisco', 'CA', 'USA'),
(2, '5678 Read Ave', 'New York', 'NY', 'USA'),
(3, '91011 Novel Rd', 'Chicago', 'IL', 'USA'),
(4, '1213 Story Blvd', 'Los Angeles', 'CA', 'USA'),
(5, '1415 Chapter Ct', 'Seattle', 'WA', 'USA'),
(6, '1617 Page Ln', 'Boston', 'MA', 'USA'),
(7, '1819 Ink Dr', 'San Diego', 'CA', 'USA'),
(8, '2021 Manuscript Pl', 'Austin', 'TX', 'USA'),
(9, '2223 Script St', 'Denver', 'CO', 'USA'),
(10, '2425 Prose Pkwy', 'San Jose', 'CA', 'USA');

SELECT * FROM dim_store_star;
```

![](/img/docs/schema-exampless-booksales-sample-record-dim_store_star.png)


Inserting records into **dim_time_star**:

```sql
INSERT INTO dim_time_star VALUES
(1, 1, 1, 1, 2020),
(2, 2, 1, 1, 2020),
(3, 3, 1, 1, 2020),
(4, 4, 2, 1, 2020),
(5, 5, 2, 1, 2020),
(6, 6, 2, 1, 2020),
(7, 7, 3, 1, 2020),
(8, 8, 3, 1, 2020),
(9, 9, 3, 1, 2020),
(10, 10, 4, 2, 2020);

SELECT * FROM dim_time_star;
```

![](/img/docs/schema-exampless-booksales-sample-record-dim_time_star.png)



Inserting records into **fact_booksales**:

```sql
INSERT INTO fact_booksales VALUES
(1, 1, 1, 1, 59.99, 12),
(2, 2, 2, 2, 39.99, 9),
(3, 3, 3, 3, 49.99, 7),
(4, 4, 4, 4, 29.99, 15),
(5, 5, 5, 5, 34.99, 11),
(6, 6, 6, 6, 44.99, 13),
(7, 7, 7, 7, 31.99, 6),
(8, 8, 8, 8, 54.99, 14),
(9, 9, 9, 9, 24.99, 16),
(10, 10, 10, 10, 19.99, 20);

SELECT * FROM fact_booksales;
```

![](/img/docs/schema-exampless-booksales-sample-record-fact_booksales.png)



```sql
  
```



## Snowflake Schema

The snowflake schema builds on the star schema by adding more tables and normalizing dimension tables. It gets its name because its structure resembles a snowflake.

- Schema has more tables than the star schema.
- Dimension tables are normalized for more detail.

The star schema extends one dimension, while the snowflake schema extends over more than one dimension. This is because the dimension tables are normalized.

![](/img/docs/sample-snowflakeeees.png)


## Normalization

Normalization breaks tables into smaller, connected ones to reduce redundancy and boost data integrity. This involves identifying repeating data and creating new tables. 

- Identifies repeating data groups and create new tables.
- Organizes data effectively with new tables.

In the star schema's book dimension, elements like authors, publishers, and genres repeat. We can create separate tables for these elements, forming a snowflake schema.

<div class='img-center'>

![](/img/docs/snowflake-schema-breakdown-dim_book_sf.png)

</div>

Cities, states, and countries can have multiple bookstores. This dimension extends over three levels: city, state, and country.

<div class='img-center'>

![](/img/docs/snowflake-schema-breakdown-dim_store_star.png)

</div>

The time dimension has a hierarchy where days are part of months, which are part of quarters, and so on. 

<div class='img-center'>

![](/img/docs/snowflake-schema-breakdown-dim_time_star.png)

</div>

Combining all normalized dimensions together:


<div class='img-center'>

![](/img/docs/snowflake-schema-breakdown-dim-putting-it-all-together.png)

</div>