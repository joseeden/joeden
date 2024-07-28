---
title: "Database Fundamentals"
description: "SQL Fundamentals"
tags: [Data Engineering, Databases]
sidebar_position: 1
last_update:
  date: 2/27/2022
---


## Database 

A **Database** is a software that is used to store data - basically any piece of information that we may need at a later time. A lot of data that'll be stored in databases are used for data analytics. Organization use these data to predict patterns, find ways to utilize and improve them, and then determine strategies to best serve the customers

Common relational databases(SQL):

- MySQL
- SQL Server
- Oracle 
- DB2
- PostgreSQL

Common non-relatonal databases(NoSQL):

- MongoDB
- Cassandra
- SQLite
- Redis
- Couchbase

## Where does the database fit in an application?

An application consist of two main components: the frontend and the backend. 

- **Frontend** is what the users see when they access a website or open the application in their devices. The user are able to see details through the frontend, as well as input information but they don't have access to the backend, where the database lies.

- **Backend** is where the details are received, processed, and stored. This is where the server-side processing occurs. 

**Databases** are part of the backend of an application. They enable the application to "remember" any information by storing and organizing them.

<div class="img-center"> 

![](/img/docs/db-backendfrontend.png)

</div>

<center><small>Photo courtesy of [Future Era Solutions](https://future-era.solutions/posts/frontend-vs-backend) </small></center>


## How Data is Obtained 

An applications's structure can vary from application to application and different organizations will have different ways of building applications, but in general, this is how data is obtained. 

1. User opens the application through a browser/device.
2. Application reach outs to API or backend server.
3. Backend server talks to the data layer, including the database.
4. Database receives the request and checks the collection or tables.
5. The database then passes the details back to API server, all the way to the application being accessed by the user.


<div class="img-center"> 

![](/img/docs/db-howdataisobtained.png)

</div>



## Structured and Unstructured

Data can come in different forms, each with its own characteristics and uses.

- **Structured Data**

  - Uses well-defined schema and tables
  - Organized in a fixed format
  - Easily searchable and queryable
  - Examples include databases and spreadsheets

- **Unstructured Data**

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
