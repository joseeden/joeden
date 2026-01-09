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

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-09-234717.png)

</div>

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

In this example, each row represents an article and stores a `user_id` that points to the user who created it. This link forms a clear relationship between users and their articles, and allows the application to move between related data easily.

:::info 

The `id` is generated automatically, so it does not need manual handling.

:::



## CRUD Operations

Most database-backed application follow four basic operations, known as **CRUD**, to manage data consistently and safely.

- Create new records
- Read existing records
- Update existing records
- Delete records

To perform CRUD operations on the database, applications need a way to talk to it using **Structured Query Language (SQL)**. It is the standard language for most databases and allows the application to create, read, update, and delete rows. Different database systems may have slight variations, but the basic SQL principles stay the same.

## Active Record and ORM in Rails

Raills does not require you to manually write SQL. Instead, it uses a **Object Relational Mapper (ORM)** called **Active Record** which translates Ruby code into SQL queries. 

<div class='img-center'>

![](/img/docs/belongs_to.png)

</div>

From Rails 5 onward, models inherit from `ApplicationRecord`, which itself inherits from Active Record. This setup allows all models to automatically gain database functionality.

```bash
# app/models/application_record.rb 
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
```

