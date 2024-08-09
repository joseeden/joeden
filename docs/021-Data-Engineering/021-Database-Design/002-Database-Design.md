---
title: "Database Design"
description: "Database Design"
tags: [Data Engineering, Databases, Database Design]
sidebar_position: 2
last_update:
  date: 2/27/2022
---



## Overview 

Database design defines how data is logically organized within a database. It influences data retrieval and updates, and involves key concepts like models and schemas.

- **Database models**: High-level specifications like relational models.
- **Schemas**: Define the database structure and must be followed for structured data.

## Data Modeling

Data modeling is the initial step in database design and outlines a data model at three levels. These levels define the entities, relationships, and physical storage, ensuring a consistent framework for database implementation.

- **Conceptual model**

    - Identifies entities, relationships, and attributes
    - Data structure diagrams, e.g. entity-relational diagrams
    - UML diagrams

- **Logical model**

    - Maps entities to tables and relationships
    - Database models and schemas
    - Relational model and star schema

- **Physical model**

    - Details physical data storage.
    - Partitions, CPUs, indexes, backup systems, and tablespaces


## Translating to Example 

An example of database design involves storing song information, with entities like songs, albums, and artists represented as tables. 

<center>Conceptual Model</center>


<div class='img-center'>


![](/img/docs/database-design-sample-creating-songs-table.png)

</div>

<center>Logical Model</center>

<div class='img-center'>

![](/img/docs/database-design-sample-creating-songs-table-logicall.png)

</div>

While translating entities directly into tables is quick, exploring alternative methods can optimize performance and maintain data integrity.


## Alternative Design

Alternative design choices can reduce complexity or enhance data integrity. For instance, a single table can simplify access, while separate tables for shared attributes like genre and label can maintain data consistency.

- **Single table**: Simplifies joins but may complicate data integrity.

    <div class='img-center'>

    ![](/img/docs/database-design-sample-creating-songs-table-single-table.png)

    </div>

- **Additional tables**: Improve integrity by centralizing shared attributes.

    <div class='img-center'>

    ![](/img/docs/database-design-sample-creating-songs-table-multiple-tablesss.png)

    </div>



## Dimensional Models 

Dimensional modeling adapts the relational model for data warehouses, focusing on OLAP queries. It uses the **star schema**, which is straightforward and flexible for analytical tasks, enhancing usability for data analysts. Dimensional models include these two models which serve distinct purposes. 

- **Fact tables**: Hold metrics and change often, with foreign keys to dimension tables.
- **Dimension tables**: Describe attributes, changing less frequently.

In a song analysis scenario, the fact table could list songs, while dimension tables detail albums and artists.

<div class='img-center'>

![](/img/docs/database-design-sample-creating-songs-table-facts-dimensions.png)

</div>

## Running Example

You'll use running data as example here. You want to collect the data from our weekly running routine to track how long you are running each week, as well as the route and distances of each run.

These would be the attributes:

| Columns		| Data Type 	|
|---------------|---------------|
| duration_mins | float			| 
| week 			| int			| 
| month 		| varchar(160)	| 
| year 			| int			| 
| park_name 	| varchar(160)	| 
| city_name 	| varchar(160)	| 
| distance_km 	| float			| 
| route_name 	| varchar(160)	| 

Create a dimension table called **route** that will hold the route information.

```sql
CREATE TABLE route(
	route_id INTEGER PRIMARY KEY,
    park_name VARCHAR(160) NOT NULL,
    city_name VARCHAR(160) NOT NULL,
    distance_km FLOAT NOT NULL,
    route_name VARCHAR(160) NOT NULL
);

SELECT * FROM route;
```

![](/img/docs/running-example-dimension-table-route.png)


Create a dimension table called **week** that will hold the week information.

```sql
CREATE TABLE week(
	week_id INTEGER PRIMARY KEY,
    week INTEGER NOT NULL,
    month VARCHAR(160) NOT NULL,
    year INTEGER NOT NULL
);
```

![](/img/docs/running-example-dimension-table-week.png)


If we are to redesign the tables, we can up with the facts table and two dimension tables.

<div class='img-center'>

![](/img/docs/running-example-dimension-table-facts-table-redesign.png)

</div>