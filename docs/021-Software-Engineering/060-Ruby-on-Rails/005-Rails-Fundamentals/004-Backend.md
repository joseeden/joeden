---
title: "Backend"
description: "Backend"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
- Ruby on Rails
sidebar_position: 4
last_update:
  date: 8/24/2023
---

## Overview

The backend of a Rails application handles data storage and data processing. 

- The backend stores and manages application data
- The database and models work together behind the scenes
- Controllers connect the backend to the frontend 

In short, the backend is where data lives and where most data-related logic happens.

## Database and Model Layers

The database layer is the persistence layer of the application. This is where all data is stored long term.

- The database stores data in tables
- Models connect the application to the database
- Models and the database form the core backend

Think of the database and models as separate from the web interface. They can exist even without a frontend, and they focus only on storing and retrieving data.



At the storage level, data is organized into tables that group related information.

- Tables store rows of related data
- Columns describe what each piece of data represents
- Tables can be linked using shared columns

Each table focuses on a single type of data. Each row is one record, and each column describes a property of that record. When tables are linked using shared IDs, the database becomes relational.

Consider the sample `articles` table below: 

| id  | title       | description            | user_id |
| --- | ----------- | ---------------------- | ------- |
| 1   | First post  | Introduction article   | 101     |
| 2   | Second post | Follow-up content      | 101     |
| 3   | Third post  | Another sample article | 203     |
| 4   | Fourth post | Deeper topic overview  | 145     |
| 5   | Fifth post  | Final example entry    | 203     |

In this example, each article stores a `user_id` that points to the user who created it. This link forms a clear relationship between users and their articles, and allows the application to move between related data easily.

:::info 

The `id` is generated automatically, so it does not need manual handling.

:::



## CRUD Operations

Most database-backed application follow four basic operations, known as **CRUD**, to manage data consistently and safely.

- Create new records
- Read existing records
- Update existing records
- Delete records

To perform CRUD operations on the database, applications need a way to talk to it using **Structured Query Language (SQL)**. SQL is the standard language for most databases and allows the application to create, read, update, and delete rows. Different database systems may have slight variations, but the basic SQL principles stay the same.


For the applications to talk to the database, they need...**Strucutred Query Language** or **SQL**..

- SQL is the standard query language
- Most databases follow the same SQL principles
- Queries perform CRUD operations

SQL allows applications to insert, fetch, update, and delete rows. While different database systems have small differences, the core ideas remain the same.


## Active Record and ORM in Rails

Rails does not require you to write SQL directly.

- Rails uses an ORM called Active Record
- Ruby code is translated into SQL
- Models handle database communication

Active Record acts as a middle layer. It converts Ruby methods into SQL queries, which keeps your application code clean and readable.


## Models and ApplicationRecord

Rails models inherit database behavior through a shared base class.

- Models inherit from ApplicationRecord
- ApplicationRecord inherits from Active Record
- This adds a clean abstraction layer

From Rails 5 onward, models inherit from ApplicationRecord instead of directly from Active Record. The main idea stays the same: Ruby code is used to interact with the database through models.


## Simple example of a model

In the example below, the `Article` class represents the `articles` table and allows database operations using Ruby code.

```ruby
class Article < ApplicationRecord
end
```

This model lets the application create, read, update, and delete articles without writing raw SQL, which keeps the backend logic simple and consistent.


## Closing summary

The backend of a Rails application is built around databases, models, and Active Record. Data is stored in tables, relationships link records together, and CRUD operations manage changes. Active Record connects everything, allowing Ruby code to safely and clearly control how data flows through the application.
